/**
 * Created by Popazov on 4/25/2018.
 */

var loginPage = require('../../../pages/login.page.js');
var navigation = require('../../../pages/navigation.page.js');
var vehiclesPage = require('../../../pages/vehicles.page.js');
var vehicleDetailPage = require('../../../pages/vehicledetail.page.js');
var devicesPage = require('../../../pages/devices.page.js');
var googleAnalyticsPage = require('../../../pages/googleAnalytics.page.js');
var remoteDiagnosticsPage = require('../../../pages/remoteDiagnostics.page.js');
var emailUtil = require('../../../utilities/email.util.js');
var password = browser.params.adduser.password;
var vin = browser.params.vehicle.vin;
var daveTest = 'Dave';
var justinTest = 'Justin Test';
var automationTest = 'Automation';
const _ = require('lodash');

describe('Email\'s export validation', function () {

    beforeEach(done => {
        browser.driver.manage().window().maximize();
        emailUtil.deleteAllEmails()
            .then(loginPage.get())
            .then(() => done());
    });

    afterEach(() => browser.executeScript('window.localStorage.clear();'));

    _.forEach(emailUtil.emailMap, function (param) {
        it(`TC-1085 Create Dealers / Service Centers Export email and validate ${param.mailosaurUser}`, done => {
            loginPage.login('paccar', param.mailosaurUser, password);
            navigation.dealersLink.click();
            navigation.moreOptionsButton.click();
            navigation.exportButton.click()
                .then(() => emailUtil.waitForEmail(param.subject, param.mailosaurUser))
                .then(result => emailUtil.validateExportEmail(param.dealersExport, result, emailUtil.logoPaccar, param.mailosaurUser, param.subject, param.exportEmailText))
                .then(() => done())
        });

        it(`TC-1083 Create Customers Export email and validate ${param.mailosaurUser}`, done => {
            loginPage.login('paccar', param.mailosaurUser, password);
            navigation.customersLink.click();
            navigation.moreOptionsButton.click();
            navigation.exportButton.click()
                .then(() => emailUtil.waitForEmail(param.subject, param.mailosaurUser))
                .then(result => emailUtil.validateExportEmail(param.customersExport, result, emailUtil.logoPaccar, param.mailosaurUser, param.subject, param.exportEmailText))
                .then(() => done())
        });

        it(`TC-858 Create Users Export email and validate ${param.mailosaurUser}`, done => {
            loginPage.login('paccar', param.mailosaurUser, password);
            navigation.usersLink.click();
            navigation.moreOptionsButton.click();
            navigation.exportButton.click()
                .then(() => emailUtil.waitForEmail(param.subject, param.mailosaurUser))
                .then(result => emailUtil.validateExportEmail(param.userExport, result, emailUtil.logoPaccar, param.mailosaurUser, param.subject, param.exportEmailText))
                .then(() => done())
        });

        it(`TC-1084 Create Vehicle Export email and validate ${param.mailosaurUser}`, done => {
            loginPage.login('paccar', param.mailosaurUser, password);
            navigation.vehiclesLink.click();
            navigation.moreOptionsButton.click();
            navigation.exportButton.click()
                .then(() => emailUtil.waitForEmail(param.subject, param.mailosaurUser))
                .then(result => emailUtil.validateExportEmail(param.vehicleExport, result, emailUtil.logoPaccar, param.mailosaurUser, param.subject, param.exportEmailText))
                .then(() => done())
        });

        it(`TC-1005 Create Fault Logs Export email and validate ${param.mailosaurUser}`, done => {
            loginPage.login('paccar', param.mailosaurUser, password);
            navigation.vehiclesLink.click();
            navigation.typeInSearchFilter(vin);
            vehiclesPage.clickVehicleHyperlinkCellSearch(vin);
            navigation.clearAllFiltersButton.click();
            vehicleDetailPage.faultLogActionsMenu.click();
            vehiclesPage.exportBtn.click()
                .then(() => emailUtil.waitForEmail(param.subject, param.mailosaurUser))
                .then(result => emailUtil.validateExportEmail(param.faultLogsExport, result, emailUtil.logoPaccar, param.mailosaurUser, param.subject, param.exportEmailText))
                .then(() => done())
        });

        it(`TC-2372 Create Devices Export email and validate ${param.mailosaurUser} Bug PVP-4460`, done => {
            loginPage.login('paccar', param.mailosaurPeopepleAdmin, password);
            navigation.devicesLink.click();
            navigation.typeInSearchFilter(automationTest);
            devicesPage.exportButton.click()
                .then(() => emailUtil.waitForEmail(param.subject, param.mailosaurPeopepleAdmin))
                .then(result => emailUtil.validateExportEmail(param.devicesExport, result, emailUtil.logoPaccar2, param.mailosaurPeopepleAdmin, param.subject, param.exportEmailText))
                .then(() => done())
        });

        it(`TC-2371 Create Google Analytics Export email and validate ${param.mailosaurUser}`, done => {
            loginPage.login('paccar', param.mailosaurUser, password);
            navigation.googleAnalyticsLink.click();
            googleAnalyticsPage.exportBtn.click()
                .then(() => emailUtil.waitForEmail(param.subject, param.mailosaurUser))
                .then(result => emailUtil.validateExportEmail(param.googleAnalyticsExport, result, emailUtil.logoPaccar, param.mailosaurUser, param.subject, param.exportEmailText))
                .then(() => done())
        });

        it(`TC-2370 Create Remote Diagnostics Export email and validate ${param.mailosaurUser}`, done => {
            loginPage.login('paccar', param.mailosaurUser, password);
            navigation.remoteDiagLink.click();
            remoteDiagnosticsPage.exportButton.click()
                .then(() => emailUtil.waitForEmail(param.subject, param.mailosaurUser))
                .then(result => emailUtil.validateExportEmail(param.remoteDiagnosticsExport, result, emailUtil.logoPaccar, param.mailosaurUser, param.subject, param.exportEmailText))
                .then(() => done())
        });

        it(`TC-2404-1 Validate email export with one chipfilter ${param.mailosaurUser}`, done => {
            loginPage.login('paccar', param.mailosaurUser, password);
            navigation.usersLink.click();
            navigation.applyChipFilter(param.chipFilterUser, '', 1);
            navigation.moreOptionsButton.click();
            navigation.exportButton.click()
                .then(() => emailUtil.waitForEmail(param.subject, param.mailosaurUser))
                .then(result => emailUtil.validateExportEmail(param.userExport, result, emailUtil.logoPaccar, param.mailosaurUser, param.subject, param.exportEmailText))
                .then(() => done())
        });

        it(`TC-2404-2 Validate email export with two chipfilters ${param.mailosaurUser}`, done => {
            loginPage.login('paccar', param.mailosaurUser, password);
            navigation.usersLink.click();
            navigation.applyChipFilter(param.chipFilterUser, daveTest, 1);
            navigation.applyChipFilter(param.chipFilterCustomer, justinTest, 1);
            navigation.moreOptionsButton.click();
            navigation.exportButton.click()
                .then(() => emailUtil.waitForEmail(param.subject, param.mailosaurUser))
                .then(result => emailUtil.validateExportEmail(param.userExport, result, emailUtil.logoPaccar, param.mailosaurUser, param.subject, param.exportEmailText))
                .then(() => done())
        });
    });
});