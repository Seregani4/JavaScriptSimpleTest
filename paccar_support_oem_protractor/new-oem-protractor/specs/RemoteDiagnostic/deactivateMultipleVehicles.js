/**
 * Created by Popazov on 2/6/2018.
 */

describe('Verify Remote Diagnostics functionality for multiple Vehicle -----> ', function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page');
    var vehiclesPage = require('../../../pages/vehicles.page');
    var validationUtil = require('../../../utilities/validation.util.js');
    var vehiclesUtil = require('../../../utilities/vehicle.util.js');
    var remoteDiagnosticsPage = require('../../../pages/remoteDiagnostics.page.js');
    var tablesUtil = require('../../../utilities/tables.util.js');
    var vehicleUtil = require('../../../utilities/vehicle.util.js');
    var moment = require('moment');
    var tomorrowDate = moment(new Date()).add(1, 'days').format('MM/DD/YYYY');
    var today = moment(new Date()).add(0, 'days').format('YYYY-MM-DD');
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var peoplenetAdmin = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;
    var vin = browser.params.vehicle.vin4;
    var vin2 = browser.params.vehicle.vin2;
    var vin3 = browser.params.vehicle.preferredVin;
    var vinArray = [vin2, vin3];
    var dsn = browser.params.vehicle.dsn;
    var dsn2 = browser.params.vehicle.dsn2;
    var dsn3 = browser.params.vehicle.realdata2dsn;
    var dsnArray = [dsn2, dsn3];
    var eventLedgerType = 'OEM';
    var emitterType = 'VEHICLE';
    var eventType = 'VIN_DISCOVERY';
    var lastEventDates = [];
    const _ = require('lodash');

    browser.driver.manage().window().maximize();

    beforeEach(function () {
        browser.driver.get("about:blank");
        browser.sleep(1000);
    });

    afterEach(function () {
        //clear browser storage to simulate logout!
        navigation.logOut();
        browser.executeScript('window.localStorage.clear();');
    });

    it('Deactivate multiple vehicle ', function () {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.clickRemoteDiagLink();
        vehiclesUtil.deactivateVehicle(vinArray.toString());
    });

    it("Get the last event time on supportal for multiple vehicles", function () {
        loginPage.loginToSupportalFromPaccar(peoplenetAdmin, password);
        navigation.reportsButton.click();
        navigation.eventsLink.click();
        vinArray.forEach(function (eachVin) {
            validationUtil.getlastEventTime(eventLedgerType, emitterType, eachVin, eventType, tomorrowDate)
                .then(function (text) {
                    lastEventDates.push(text);
                });
        });
        var randomVin = vinArray[Math.floor(Math.random() * vinArray.length)];
        vehiclesPage.validateOemLicenseStatus(randomVin, true);
    });

    vinArray.forEach(function (eachVin, index) {
        it('Sent vin Discovery to the vehicle ' + eachVin, function (done) {
            loginPage.get();
            loginPage.login('paccar', paccarAdminEmail, password);
            vehiclesPage.vinDiscoveryEvent(dsnArray[index], eachVin);
            setTimeout(function () { //need to wait before sent next vin discovery to prevent error 502
                done();
            }, 10000);
        });
    });

    it('Reactivate  vehicles ', function () {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.clickRemoteDiagLink();
        var random_boolean = Math.random() >= 0.5;
        if (random_boolean) {
            vehiclesUtil.reactivateVehicleTextField(vinArray.toString());
        }
        else {
            vehiclesUtil.reactivateVehicleRowMenu(vinArray);
        }
    });

    it("Validate the event is not displayed  on supportal after deactivation PVP-4439", function () {
        loginPage.loginToSupportalFromPaccar(peoplenetAdmin, password);
        navigation.reportsButton.click();
        navigation.eventsLink.click();
        vinArray.forEach(function (eachVin, index) {
            validationUtil.getlastEventTime(eventLedgerType, emitterType, eachVin, eventType, tomorrowDate)
                .then(function (text) {
                    expect(text).toBe(lastEventDates[index]);
                });
        });
        var randomVin = vinArray[Math.floor(Math.random() * vinArray.length)];
        vehiclesPage.validateOemLicenseStatus(randomVin, false);
    });

    vinArray.forEach(function (eachVin, index) {
        it('Sent vin Discovery to the vehicle ' + eachVin, function () {
            loginPage.get();
            loginPage.login('paccar', paccarAdminEmail, password);
            vehiclesPage.vinDiscoveryEvent(dsnArray[index], eachVin);
        });
    });

    it("Validate the event is displayed on supportal after reactivation", function () {
        loginPage.loginToSupportalFromPaccar(peoplenetAdmin, password);
        navigation.reportsButton.click();
        navigation.eventsLink.click();
        vinArray.forEach(function (eachVin, index) {
            validationUtil.getlastEventTime(eventLedgerType, emitterType, eachVin, eventType, tomorrowDate)
                .then(function (text) {
                    expect(text).not.toBe(lastEventDates[index], `for vin ${eachVin}`);
                });
        })
    });

    var eachMap = [
        {
            categoryType: remoteDiagnosticsPage.invalidVin,
            eachStatus: 'Invalid VIN'
        },
        {
            categoryType: remoteDiagnosticsPage.outOfService,
            eachStatus: 'Out of Service'
        },
        {
            categoryType: remoteDiagnosticsPage.customerRequested,
            eachStatus: 'Customer Requested'
        },
        {
            categoryType: remoteDiagnosticsPage.subscriptionExpired,
            eachStatus: 'Subscription Expired'
        }];

    var randomParam = Math.floor(Math.random() * 4);

    it('TC-1447-1 Deactivate VIN with status ' + eachMap[randomParam].eachStatus, function () {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.clickRemoteDiagLink();
        vehicleUtil.deactivateVehicleWithCategory(vin, eachMap[randomParam].categoryType);
    });

    it('TC-1447-2 Validate deactivated VIN with status ' + eachMap[randomParam].eachStatus, function () {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.clickRemoteDiagLink();
        navigation.typeInSearchFilter(vin);
        tablesUtil.verifyColumn(vin, remoteDiagnosticsPage.columns.vinColumn);
        tablesUtil.verifyColumn(eachMap[randomParam].eachStatus, remoteDiagnosticsPage.columns.removalCategoryColumn);
        tablesUtil.verifyColumn(today, remoteDiagnosticsPage.columns.deactivationDateColumn);
        navigation.clickThisGlobalSearchResult(vin, '', 1);
        vehiclesPage.recommendationValue.getText().then(function (value) {
            validationUtil.validateTextContainArray(value, [
                'Remote Diagnostics Disabled',
                eachMap[randomParam].eachStatus
            ]);
        });
        navigation.vehiclesLink.click();
        navigation.typeInSearchFilter(vin);
        tablesUtil.verifyTableDataIsEmpty();
    });

    it('TC-1447-3 Reactivate VIN with status ' + eachMap[randomParam].eachStatus, function () {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.clickRemoteDiagLink();
        navigation.clearAllFiltersButton.click();
        vehicleUtil.reactivateVehicleRowMenu(vin);
        navigation.vehiclesLink.click();
        navigation.typeInSearchFilter(vin);
        tablesUtil.verifyTableData();
    });
});