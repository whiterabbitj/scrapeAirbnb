const {getListOfElementsTextValuesContent} = require('../common/airbnbCommon')
const config = require('../../../config.json')

function getExtraRoomDetails(propertyObject, page) {
    return new Promise(function (resolve) {
        getDetailsList(page).then(detailsList => {
            try{
                propertyObject.roomDetail.numbGuest = parseInt(detailsList[0].charAt(0));
                propertyObject.roomDetail.numbBedrooms = parseInt(detailsList[1].charAt(0));
                propertyObject.roomDetail.numbBeds = parseInt(detailsList[2].charAt(0));
                propertyObject.roomDetail.numbBathrooms = parseInt(detailsList[3].charAt(0));
                resolve(propertyObject)
            }
            catch (e) {
                console.log(e)
                resolve(e)
            }
        });
    });
}

const getDetailsList = async (page) => {
    try{
        const detailsListSelector = config.classDetailList;
        let detailsList = await getListOfElementsTextValuesContent(page, detailsListSelector);
        detailsList = detailsList[0].split(' ·  · ');
        return detailsList;
    }
    catch (e) {
        console.log("Issues with detail list!" + e);
    }
};

module.exports.getExtraRoomDetails = getExtraRoomDetails;
