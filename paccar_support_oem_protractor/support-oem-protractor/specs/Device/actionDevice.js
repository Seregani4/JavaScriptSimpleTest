/**
 * Created by jelliott on 9/14/2016.
 */
describe("Verifying Action Items for a Device ----- ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var devicesPage = require('../../../pages/devices.page.js');
    var tableUtil = require('../../../utilities/tables.util');
    var dsnColumn = devicesPage.columns.dsnColumn;
    var lastCallEndTimeColumn = devicesPage.columns.lastCallEndTimeColumn;
    var deviceDetailPage = require('../../../pages/device.details.page.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;
    var device = '1';
    var dsn = '6035837';
    var moment = require('moment');
    var currentDateTime = moment().format('MM-DD-YYYY');
    var actionsArray = ['Force Call'];
    browser.driver.manage().window().maximize();

    beforeEach(function () {
        loginPage.get();
        loginPage.login('supportal', peoplenetAdminEmail, password);
        navigation.deviceManagementButton.click();
        navigation.clickDevicesLink();
    });

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("As a PeopleNet Admin,Verify Force Call Action Button", function () {
        //paccarNavigation.chipFilterSendKeys(device);
        devicesPage.verifyDeviceListTableDataIsVisible();
        devicesPage.clickDeviceCheckbox(device);
        expect(navigation.actionBar.isDisplayed()).toBe(true);
        navigation.actionBarMoreOptionsButton.click();
        devicesPage.forceCallActionButton.click();
        browser.sleep(60000); //Must wait for the call data to change
        browser.refresh();
        devicesPage.verifyLastCallEndTimeColumnDsnSearch(device, currentDateTime,dsnColumn,lastCallEndTimeColumn);
    },800000);

    actionsArray.forEach(function (eachAction) {
        it("As a PeopleNet Admin,Verify " + eachAction + " Action Button from Device detail", function () {
            navigation.chipFilterSendKeys(dsn);
            devicesPage.clickDsnUrl(dsn);
            var callStartBefore = deviceDetailPage.callStartResult.getText();
            deviceDetailPage.performAction(eachAction);
            browser.sleep(60000); //Must wait for the call data to change
            browser.refresh();
            expect(deviceDetailPage.callStartResult.getText()).not.toEqual(callStartBefore, 'Call start value not changed');
        });
    },800000);

});
