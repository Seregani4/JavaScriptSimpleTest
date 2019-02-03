/**
 * Created by Popazov on 6/30/2017.
 */


describe("Device Event Ledger - Event List Table----- ", function () {

    var loginPage = require('../../..//pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var eventsPage = require('../../../pages/events.page.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var testVin = '1XPBDP9XXFD256720';
    var emiterType = 'VEHICLE';
    var password = browser.params.adduser.password;


    browser.driver.manage().window().maximize();

    beforeEach(function () {
        loginPage.get();
        loginPage.login('supportal', peoplenetAdminEmail, password);

    });

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    //PVP-2070
    it("Event list table has infinite scroll", function () {
        navigation.clickReportsButton();
        navigation.clickEventsLink();
        eventsPage.selectEmitterType(emiterType);
        eventsPage.emitterIdField.sendKeys(testVin);
        eventsPage.searchBtn.click();
        expect(eventsPage.backToTopBtn.isPresent()).toBe(false, 'Back to top button dispalyed');
        eventsPage.scrollTableToBottom();
        expect(eventsPage.backToTopBtn.isDisplayed()).toBe(true, 'Back to top button not dispalyed');
        eventsPage.scrollTableToTop();
        expect(eventsPage.backToTopBtn.isPresent()).toBe(false, 'Back to top button dispalyed');

    });


});