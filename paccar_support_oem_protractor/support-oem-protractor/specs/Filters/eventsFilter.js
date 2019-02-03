/**
 * Created by Popazov on 7/17/2017.
 */



describe("Verifying Filtering for events Page -----  ----- ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var eventsPage = require('../../../pages/events.page.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;
    var eventLadger = 'OEM';
    var emitterType = 'VEHICLE';
    var vin = '1XPBDP9XXFD256720';
    var eventType = 'OEM_TRIP_END';
    var eventType2 = 'OEM_TRIP_PERIODIC';
    var eventType3 = 'OEM_FAULT_CODE';
    var eventTypes = [eventType2,eventType3]

    browser.driver.manage().window().maximize();

    beforeEach(function () {
        loginPage.get();
        loginPage.login('supportal', peoplenetAdminEmail, password);
        navigation.reportsButton.click();
        navigation.clickEventsLink();
    });

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("Verify Events Table Shows  Correct Results", function () {
        eventsPage.fillFiltersFields(eventLadger, emitterType, vin, eventType);
        eventsPage.searchBtn.click();
        eventsPage.verifyEventTypeColumn(eventType);
        eventTypes.forEach(function (eachEvent) {
            eventsPage.showSearchButton.click();
            eventsPage.selectEventType(eachEvent);
            eventsPage.searchBtn.click();
            eventsPage.verifyEventTypeColumn(eachEvent);
        });


    });
});