const {isURL}  = require("validator");
const config = require('../../../config.json');

const isValidAirBnbListing = (url) => {
    const airBnbListingRegex = /airbnb.co.uk\/rooms\/\w+/;
    if (!isURL(url) || !airBnbListingRegex.test(url)) {
        console.log(`${url} is not a URL for an AirBnB listing.`);
        return false;
    } else {
        return true;
    }
};

const checkForError = async (page, url) => {
    let pageHtml = "";
    try {
        pageHtml = await page.evaluate(() => document.body.innerHTML);
    }
    catch (e) {
        throw new Error("Something went wrong!" + e);
    }
    const errorSelector = '_1uippt2';
    if (pageHtml.includes(errorSelector) ||
        page.url() === config.airbnbUrl) {
        console.log(`Issue with:${url}`);
        return true;
    }
    else
        return false;
};

function logError(url) {
    const errorMessage = 'Could not get data from url.';
    return {url, errorMessage};
}

const getTextFromElement = (page, selector) =>
    page.$eval(selector, (el) => el.textContent);

const getListOfElementsTextValues = (page, selector) =>
    page.$$eval(selector, el => el.map(e => e.parentElement.innerText));

const getListOfElementsTextValuesContent = (page, selector) =>
    page.$$eval(selector, el => el.map(e => e.textContent));



module.exports = {
    isValidAirBnbListing,
    checkForError,
    logError,
    getTextFromElement,
    getListOfElementsTextValuesContent,
    getListOfElementsTextValues,};
