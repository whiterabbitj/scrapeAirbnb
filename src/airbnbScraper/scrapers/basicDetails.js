const {getTextFromElement} = require('../common/airbnbCommon')
const config = require('../../../config.json')

function getBasicDetails(propertyObject, page) {
    return new Promise(async function (resolve) {
        getPropertyName(page).then(resultName => {
            propertyObject.propertyName = resultName;
            getPropertyType(page).then(resultType => {
                propertyObject.propertyType = resultType
                resolve(propertyObject);
            });
        });
    });
}


const getPropertyName = async (page) => {
    try{
        const propertyNameSelector = config.classPropertyName;
        return await getTextFromElement(page, propertyNameSelector);
    }
    catch (e) {
        return e;
    }
};

const getPropertyType = async (page) => {
    try{
        const hostedBySelector = config.classPropertyType;
        const hostedByLabel = await getTextFromElement(page, hostedBySelector);
        return hostedByLabel.substring(0, hostedByLabel.indexOf(" hosted by"));
    }
    catch (e) {
        return e;
    }
};



module.exports.getBasicDetails = getBasicDetails;
