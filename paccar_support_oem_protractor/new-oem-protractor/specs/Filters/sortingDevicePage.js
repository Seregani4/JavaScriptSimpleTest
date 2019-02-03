/**
 * Created by jelliott on 8/16/2016.
 */

describe("Validate all clickable columns in Device List Page can be sorted in ascending and descending order -----> ", function () {
    /*
        Verify by Column Header URL and NOT by actual table data
     */
    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var devicesPage = require('../../../pages/devices.page.js');
    var tableUtil = require('../../../utilities/tables.util.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;

    browser.driver.manage().window().maximize();

    beforeEach(function () {
        loginPage.get();
        loginPage.login('paccar', peoplenetAdminEmail, password);
        navigation.clickDevicesLink();
    });

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    var deviceListPageSortArray = ['provisioningInfo.hardwareType', 'provisioningInfo.deviceType', 'licenseInfo.licenses.licenseType',
        'vin', 'versionInfo.pmg', 'deviceVinRollCallData.engineMake', 'deviceVinRollCallData.engineModel',
        'pfmCustomerInfo.customerId', 'pfmCustomerInfo.customerName', 'customerInfo.customerName', 'deviceHeadInfo.icapId',
        'deviceHeadInfo.icapDeviceType', 'deviceSettings.wifiEnabled',
        'versionInfo.vidfirm', 'versionInfo.vidmcf', 'locationInfo.lastUpdated', 'timestamp', 'state'];

    it("Verify the Dsn Column Header Sort", function () {//This only needs to be done for the very first column because it behaves a little different from the other columns
        element(by.css('[md-order-by="' + 'dsn' + '"]')).click();
        expect(browser.getCurrentUrl()).toBe(browser.params.environment.url + '/#/nav/device/list/?page=0&pageSize=50&sort=-' + 'dsn', 'It failed on this array Item: ' + 'dsn');
        devicesPage.verifyDeviceListTableDataIsVisible();
        element(by.css('[md-order-by="' + 'dsn' + '"]')).click();
        expect(browser.getCurrentUrl()).toBe(browser.params.environment.url + '/#/nav/device/list/?page=0&pageSize=50&sort=' + 'dsn', 'It failed on this array Item: ' + 'dsn');
        devicesPage.verifyDeviceListTableDataIsVisible();
    }, 900000);

    it("Verify the Column Header Sort", function () {
        var randomElements = tableUtil.getRandomArrayElements(deviceListPageSortArray, 3);
        devicesPage.verifySorting(randomElements);
    }, 800000);
});