/**
 * Created by tbui on 3/14/2016.
 */

describe("Global Search Bar Functionality - Users searching Dealerships: ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;
    var dealershipName = browser.params.testdealer.name;
    var dealershipCode = browser.params.testdealer.code;

    browser.driver.manage().window().maximize();

    beforeEach(function () {
        loginPage.get();
        loginPage.login('supportal', peoplenetAdminEmail, password);
    });

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });


    it("PA may search for dealer via global search bar", function () {
        //search for existing users by DEALER CODE
        navigation.clickThisGlobalSearchResult(dealershipCode, 'Dealer');

    });

    it("PA may search for dealer via global search bar", function () {
        //search for existing users by DEALER NAME
        navigation.clickThisGlobalSearchResult(dealershipName, 'Dealer');

    });


});