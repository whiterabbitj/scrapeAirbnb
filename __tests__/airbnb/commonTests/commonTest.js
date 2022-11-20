const config = require('../../../config.json');
const airbnbCommon = require('../../../src/airbnbScraper/common/airbnbCommon');

describe("valid url ", () => {
        test("checks a valid URL", () => {
        expect(airbnbCommon.isValidAirBnbListing(config.testValidUrl)).toBe(true);

        test("checks a invalid URL", () => {
            config.testInvalidUrl.map( url => {
                expect(airbnbCommon.isValidAirBnbListing(url)).toBe(false);
            });
    })})});


describe("checkForError ", () => {
    test("checks a invalid URL", () => {
        config.testInvalidUrl.map( url => {
            expect(airbnbCommon.isValidAirBnbListing(url)).toBe(false);
        })
    })})
