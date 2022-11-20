const {checkForError,logError,getListOfElementsTextValues} = require('../common/airbnbCommon')
const config = require('../../../config.json')


function getAmenitiesUrl(page) {
    return new Promise(function (resolve) {
        page.evaluate(() => document.location.href).then(amenitiesModalLink => {
            const insertionOfAmenities = amenitiesModalLink.indexOf('?');
            resolve([amenitiesModalLink.substring(0, insertionOfAmenities),
                '/amenities',
                amenitiesModalLink.substring(insertionOfAmenities)].join(''));
        });
    });
}

function getAmenityData(page) {
    return new Promise(function (resolve) {
        getAmenitiesUrl(page).then(urlAmenities => {
            page.goto(urlAmenities).then(url => {
                page.waitForNetworkIdle().then(() => {
                    checkForError(page, url).then(isError => {
                        if (isError)
                            resolve(logError(url));
                        else
                            getAmenities(page).then(result => {
                                resolve(result);
                            });
                    });
                });
            });
        });
    });
}

const getAmenities = async (page) => {
    const amenitiesLabelsSelector = config.classAmenities;
    const amenitiesLabels = await getListOfElementsTextValues(page, amenitiesLabelsSelector);
    return amenitiesLabels.filter((amenity) => !amenity.includes("Unavailable:")
    );
};

function cleanUpAmenities(item){
    const amenity = item.split(/\r?\n/)[0];
    const amenityDescription = item.split(/\r?\n/)[1]=== undefined ? "" : item.split(/\r?\n/)[1]
    return [amenity, amenityDescription].filter(Boolean).join("|");
}

module.exports.getAmenityData = getAmenityData;
module.exports.cleanUpAmenities = cleanUpAmenities;
