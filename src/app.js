'use strict';
const puppeteer = require('puppeteer');
const config = require('../config.json');
const scraper = require("./airbnbScraper/airbnbScraper");
const {writeToFile,clearOutputFileIfExists} = require("./utilities/utilities");

const urlsAvailable = config.urls;

async function getDataAirbnbData() {
    clearOutputFileIfExists(config.outputFile).then(() => {
        const promises = [];
        urlsAvailable.map(url => {
            puppeteer.launch().then(browser => {
                browser.newPage().then(page => {
                    promises.push(scraper.scrapeSpecificAirbnbUrl(url, page))
                    Promise.all(promises).then(result => {
                        writeToFile(config.outputFile, result);
                        browser.close().then().catch(errors => {
                            console.log(errors)
                        });
                    }).catch(errors => {
                        console.log(errors)
                    });
                })
            });
        });
    });
}

getDataAirbnbData().then().catch(errors => {
    console.log(errors)
    throw errors;
});
