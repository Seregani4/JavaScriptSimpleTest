/**
 * Created by pshrestha on 1/7/2018.
 */

describe("Validate adding and editing Cummins Distributors -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var dealersPage = require('../../../pages/dealers.page.js');
    var distributorCode = '02867';
    var distributorStreet = '2600 E 2nd Street';
    var distributorCity = 'GILLETTE';
    var distributorName = 'CUMMINS ROCKY MOUNTAIN, LLC';
    var numHourTypes = 3;
    var partsCloseTime = '23:59';
    var serviceCloseTime = '23:59';
    var editedStreetAddress = '4400 Baker Rd. Suite 007';
    var editedCity = 'Minnetonka';
    var editedName = 'Peoplenet Cummins Inc.';
    var editedNumHourTypes = 2;
    var editedPartsCloseTime = '17:59';
    var editedServiceCloseTime = '11:59';

    browser.driver.manage().window().maximize();

    beforeEach(function () {
        // Get a fresh Angular "session" so we can avoid bootstrapping errors
        browser.driver.get("about:blank");
        browser.sleep(1000);
        loginPage.get();
    });

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');

    });

    it("1) Get a distributor and validate data", function () {
        dealersPage.getAndValidateDistributor(distributorCode, distributorStreet, distributorCity, distributorName);
        dealersPage.getAndValidateDistributorHours(distributorCode, numHourTypes, partsCloseTime, serviceCloseTime);
    });

    it("2) Edit the original distributor information and validate change", function (done) {
        dealersPage.editCumminsDistributor(distributorCode, editedStreetAddress, editedCity, editedName);
        setTimeout(function () {
            dealersPage.editCumminsDistributorHours(distributorCode, editedPartsCloseTime, editedServiceCloseTime, true);
            setTimeout(function () {
                done();
            }, 3000);
        }, 6000);
    });

    it("3) Validate changes made to the original distributor information", function (done) {
        dealersPage.getAndValidateDistributor(distributorCode, editedStreetAddress, editedCity, editedName);
        dealersPage.getAndValidateDistributorHours(distributorCode, editedNumHourTypes, editedPartsCloseTime, editedServiceCloseTime);
        setTimeout(function () {
            done();
        }, 6000);
    });

    it("4) Reset the Distributor data", function (done) {
        setTimeout(function () {
            dealersPage.editCumminsDistributor(distributorCode, distributorStreet, distributorCity, distributorName);
        }, 6000);
        setTimeout(function () {
            done();
        }, 6000);
    });

    it("5) Reset the Distributor hours", function (done) {
        setTimeout(function () {
            dealersPage.resetCumminsDistributorHours(distributorCode);
        }, 6000);
        setTimeout(function () {
            done();
        }, 6000);
    });

    it("6) Verify the original Distributor data", function (done) {
        dealersPage.getAndValidateDistributor(distributorCode, distributorStreet, distributorCity, distributorName);
        dealersPage.getAndValidateDistributorHours(distributorCode, numHourTypes, partsCloseTime, serviceCloseTime);
        setTimeout(function () {
            done();
        }, 6000);
    });
});