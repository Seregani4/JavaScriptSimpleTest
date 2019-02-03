/**
 * Created by Popazov on 7/27/2017.
 */




describe("Verify VIN discovery is set  on a device ----- ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var vehiclesPage = require('../../../pages/vehicles.page');
    var eventsPage = require('../../../pages/events.page.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;
    var moment = require('moment');
    var newDateTime = moment().format('YYYY-MM-DD');
    var tomorrowDate = moment(new Date()).add(1, 'days').format('MM/DD/YYYY');
    var vin = browser.params.vehicle.vin;
    var dsn = browser.params.vehicle.dsn3;
    var eventLedgerType = 'OEM';
    var emitterType = 'VEHICLE';
    var eventType = 'VIN_DISCOVERY';


    browser.driver.manage().window().maximize();

    beforeEach(function () {
        loginPage.get();
        loginPage.login('supportal', peoplenetAdminEmail, password);
    });

    afterEach(function () {
        browser.executeScript('window.localStorage.clear();');
    });

    it('Sent VIN discovery request', function () {
        //send VIN discovery event
        vehiclesPage.vinDiscoveryEvent(dsn, vin);
        navigation.clickReportsButton();
        navigation.clickEventsLink();
        eventsPage.fillFiltersFields(eventLedgerType, emitterType, vin, eventType);
        eventsPage.typeDate(tomorrowDate);
        eventsPage.searchBtn.click();
        eventsPage.verifyLastEventDate(newDateTime);

    });
});