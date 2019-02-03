/**
 * Created by Popazov on 1/29/2018.
 */

describe('Verify Remote Diagnostics functionality -----> ', function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigationPage = require('../../../pages/navigation.page');
    var remoteDiagnosticPage = require('../../../pages/remoteDiagnostics.page.js');
    var vehiclesPage = require('../../../pages/vehicles.page');
    var vehiclesDetailsPage = require('../../../pages/vehicledetail.page');
    var tableUtil = require('../../../utilities/tables.util.js');
    var validationUtil = require('../../../utilities/validation.util.js');
    var vehiclesUtil = require('../../../utilities/vehicle.util.js');
    var moment = require('moment');
    var tomorrowDate = moment(new Date()).add(1, 'days').format('MM/DD/YYYY');
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var peoplenetAdmin = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;
    var vin = browser.params.vehicle.vin;
    var dsn = browser.params.vehicle.dsn3;
    var eventLedgerType = 'OEM';
    var emitterType = 'VEHICLE';
    var eventType = 'VIN_DISCOVERY';
    var lastEventDate = '';

    browser.driver.manage().window().maximize();

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    beforeEach(function () {
        browser.driver.get("about:blank");
        browser.sleep(1000);
    });

    it('Deactivate single vehicle ', function () {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigationPage.clickRemoteDiagLink();
        vehiclesUtil.deactivateVehicle(vin);
    });

    it(' TC-1714 Validate Search logic of deactivated  vehicle ', function () {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigationPage.clickVehiclesLink();
        navigationPage.typeInSearchFilter(vin);
        tableUtil.verifyTableDataIsEmpty();
        navigationPage.globalSearchSendKeys(vin);
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/vehicle/details/' + vin);
        expect(vehiclesDetailsPage.remoteDiagnosticsDisabledMsg.isDisplayed()).toBe(true, "Remote diagnostic Disabled message not displayed");
        expect(vehiclesDetailsPage.remoteDiagnosticsDisabledMsg.getText()).toContain('Remote Diagnostics Disabled', "invalid Recommendation message");
        expect(vehiclesDetailsPage.remoteDiagnosticsDisabledMsg.getText()).toContain('Customer Requested', "invalid Recommendation message");
    });

    it("Get the last event time on supportal", function () {
        loginPage.loginToSupportalFromPaccar(peoplenetAdmin, password);
        navigationPage.reportsButton.click();
        navigationPage.eventsLink.click();
        validationUtil.getlastEventTime(eventLedgerType, emitterType, vin, eventType, tomorrowDate)
            .then(function (text) {
                lastEventDate = text;
                vehiclesPage.validateOemLicenseStatus(vin, true);
            })
    });

    it('Sent vin Discovery to the vehicle ', function () {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        vehiclesPage.vinDiscoveryEvent(dsn, vin);
    });

    it('Reactivate single vehicle ', function () {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigationPage.clickRemoteDiagLink();
        var random_boolean = Math.random() >= 0.5;
        if (random_boolean) {
            vehiclesUtil.reactivateVehicleTextField(vin);
        }
        else {
            vehiclesUtil.reactivateVehicleRowMenu(vin);
        }
    });

    it("Validate the event is not displayed  on supportal after deactivation PVP-4439 ", function () {
        loginPage.loginToSupportalFromPaccar(peoplenetAdmin, password);
        navigationPage.reportsButton.click();
        navigationPage.eventsLink.click();
        validationUtil.getlastEventTime(eventLedgerType, emitterType, vin, eventType, tomorrowDate)
            .then(function (text) {
                expect(text).toBe(lastEventDate);
            });
        vehiclesPage.validateOemLicenseStatus(vin, false);
    });

    it("Validate the event is displayed on supportal after reactivation", function () {
        loginPage.loginToSupportalFromPaccar(peoplenetAdmin, password);
        navigationPage.reportsButton.click();
        navigationPage.eventsLink.click();
        vehiclesPage.vinDiscoveryEvent(dsn, vin);
        validationUtil.getlastEventTime(eventLedgerType, emitterType, vin, eventType, tomorrowDate)
            .then(function (text) {
                expect(text).not.toBe(lastEventDate);
            });
    });

    it("Validate duplicate Text Entry", function () {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigationPage.clickRemoteDiagLink();
        vehiclesUtil.deactivateVehicle([vin, vin, vin].toString());
        navigationPage.typeInSearchFilter(vin);
        tableUtil.verifyColumn(vin, remoteDiagnosticPage.columns.vinColumn);
        vehiclesUtil.reactivateVehicleTextField([vin, vin, vin].toString());
        tableUtil.verifyTableDataIsEmpty();
    });

    it("Validate error message displayed after entering more then 50 vins", function () {
        var maxVinNumber = 51;
        var errorMessageText = "Enter up to 50 VINs.";
        var vinArray = [];
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigationPage.clickRemoteDiagLink();
        for (var i = 1; i <= maxVinNumber; i++) {
            vinArray.push(i);
        }
        remoteDiagnosticPage.deactivateVinInput.sendKeys(vinArray.toString());
        remoteDiagnosticPage.deactivateVinInput.sendKeys(protractor.Key.TAB);
        expect(remoteDiagnosticPage.vinsLimitMessage.first().isDisplayed()).toBe(true, "Error message not displayed");
        expect(remoteDiagnosticPage.vinsLimitMessage.first().getText()).toBe(errorMessageText, "Invalid error message");
        remoteDiagnosticPage.reactivateTab.click();
        remoteDiagnosticPage.reactivateVinInput.sendKeys(vinArray.toString());
        remoteDiagnosticPage.reactivateVinInput.sendKeys(protractor.Key.TAB);
        expect(remoteDiagnosticPage.vinsLimitMessage.last().isDisplayed()).toBe(true, "Error message not displayed");
        expect(remoteDiagnosticPage.vinsLimitMessage.last().getText()).toBe(errorMessageText, "Invalid error message");
    });
});