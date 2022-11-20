const propertyDetails = require('./objects/propertyDetails').PropertyDetails;
const {isValidAirBnbListing, logError, checkForError} = require('./common/airbnbCommon');
const amenityData = require('./scrapers/amenityDetails');
const getBasicDetails = require('./scrapers/basicDetails');
const getExtraRoomDetails = require('./scrapers/extraDetails');

function scrapeSpecificAirbnbUrl(url, page) {
    return new Promise(function (resolve) {
        if (isValidAirBnbListing(url)) {
            console.log(`Getting data for listing ${url}...`);
            page.goto(url).then(() => {
                page.waitForNetworkIdle().then(() => {
                    checkForError(page, url).then(isError => {
                        if (isError)
                            resolve({error: logError(url)});
                        else
                            populateAllValues(page,url).then(result => {
                                resolve ({propertyDetails: result});
                            });
                    }).catch(errors =>{
                        console.log(errors)
                    });
                });
            });
        }
    });
}

function populateAllValues(page,url) {
    return new Promise(function (resolve) {
        const tempPropObj = new propertyDetails;
        tempPropObj.url = url;
        getBasicDetails.getBasicDetails(tempPropObj, page)
            .then(resultPropertyObject => {
                getExtraRoomDetails.getExtraRoomDetails(resultPropertyObject, page)
                    .then(resultPropertyObject => {
                        amenityData.getAmenityData(page).then(result => {
                            result.forEach(item => {
                                resultPropertyObject.amenityDetail.push(
                                    amenityData.cleanUpAmenities(item));
                            });
                            resolve(resultPropertyObject);
                        });
                    });
            });
    });
}

module.exports.scrapeSpecificAirbnbUrl = scrapeSpecificAirbnbUrl;
