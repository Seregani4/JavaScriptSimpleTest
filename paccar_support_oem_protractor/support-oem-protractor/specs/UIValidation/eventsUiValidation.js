/**
 * Created by Cottomoeller on 5/10/2016.
 */
/**
 * Edited by Pshrestha on 4/6/2017.
 */

describe("Verifying Data Events Page ----- ", function(){

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var eventsPage = require('../../../pages/events.page.js');

    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var tsr1 = browser.params.testuseremails.tsr1;
    var tsr2 = browser.params.testuseremails.tsr2;
    var loginUserArray = [peoplenetAdminEmail,tsr1,tsr2];
    var password = browser.params.adduser.password;
    var vehicleVIN = '1XPBDP9XXFD256720';
    var deviceDSN = '7027898';

    browser.driver.manage().window().maximize();

    afterEach(function() {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("Verify all fields are visible on page", function () {
        loginPage.get();
        loginPage.login('supportal', peoplenetAdminEmail, password);
        navigation.reportsButton.click();
        navigation.clickEventsLink();
        eventsPage.verifyEventsData();
        eventsPage.verifyAllFieldsArePresent();
        eventsPage.verifyCalendarIsDisplayed();
        eventsPage.verifyEventLedgerDropdownValues();
    });

    it("Verify all fields are visible on report lookup by VEHICLE", function() {
        loginPage.get();
        loginPage.login('supportal', peoplenetAdminEmail, password);
        navigation.reportsButton.click();
        navigation.clickEventsLink();
        //Select Vehicle as Emitter Type
        eventsPage.emitterTypeField.click();
        eventsPage.emitterTypeField.sendKeys('VEHICLE');
        eventsPage.vehicleEmitterTypeDropdown.click();
        //Select a VIN to look up events for
        eventsPage.emitterIdField.click();
        eventsPage.emitterIdField.sendKeys(vehicleVIN);
        eventsPage.searchBtn.click();
        eventsPage.verifyEventsTableIsVisible();
        eventsPage.verifyEventsData();
    });

    it("Verify all fields are visible on report lookup by DEVICE", function() {
        loginPage.get();
        loginPage.login('supportal', peoplenetAdminEmail, password);
        navigation.reportsButton.click();
        navigation.clickEventsLink();
        //Select Vehicle as Emitter Type
        eventsPage.emitterTypeField.click();
        eventsPage.emitterTypeField.sendKeys('DEVICE');
        eventsPage.deviceEmitterTypeDropdown.click();
        //Select a DEVICE to look up events for
        eventsPage.emitterIdField.click();
        eventsPage.emitterIdField.sendKeys(deviceDSN);
        eventsPage.searchBtn.click();
        eventsPage.verifyEventsTableIsVisible();
        eventsPage.verifyEventsData();
    });

    //PVP-966
    loginUserArray.forEach(function (eachUser) {
        it("Verify " + eachUser + " user can see a MID type column", function () {
            browser.driver.get("about:blank");
            browser.sleep(1000);
            loginPage.get();
            loginPage.login('supportal', eachUser, password);
            navigation.reportsButton.click();
            navigation.clickEventsLink();
            eventsPage.emitterTypeField.click();
            eventsPage.emitterTypeField.sendKeys('DEVICE');
            eventsPage.deviceEmitterTypeDropdown.click();
            eventsPage.emitterIdField.click();
            eventsPage.emitterIdField.sendKeys(deviceDSN);
            eventsPage.searchBtn.click();
            eventsPage.verifyEventsTableIsVisible();
        });

    })
});