/**
 * Edited by jelliott on 8/15/2016.
 */
/**
 * Created by Cottomoeller on 4/22/2016.
 */

describe("Verifying data and functionality for Devices Page ----- ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var devicesPage = require('../../../pages/devices.page.js');
    var tableUtil = require('../../../utilities/tables.util');
    var userUtil = require('../../../utilities/user.util.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;
    var cid = '5179';
    var customerName = "00P,rashant,Customer's,Test";
    var userProfileColumn = devicesPage.columns.userProfileColumn;
    var cidColumn = devicesPage.columns.cidColumn;
    var licenceColumn = devicesPage.columns.licenseColumn;
    var pmgVersionColumn = devicesPage.columns.pmgVerColumn;
    var pfmCustomerColumn = devicesPage.columns.pfmCustomerColumn;
    browser.driver.manage().window().maximize();

    beforeEach(function () {
        loginPage.get();
        loginPage.login('supportal', peoplenetAdminEmail, password);
        navigation.deviceManagementButton.click();
        navigation.clickDevicesLink();
        devicesPage.verifyDeviceListTableDataIsVisible();
    });

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("Verify chip filter give correct results", function() {
        navigation.clickDevicesLink();
        //Filter by Type Standard
        userUtil.validateDeviceFilter('Type:Standard', 'PMG-Standard', 'yes');
        //Filter by Type OEM
        userUtil.validateDeviceFilter('Type:OEM', 'PMG-OEM', 'yes');
        //Filter by Type Cat
        userUtil.validateDeviceFilter('Type:Cat', 'PMG-Cat', 'yes');
        //Filter by Type MultiMode
        userUtil.validateDeviceFilter('Type:MultiMode', 'MultiMode', 'yes');
        //Filter by License OEM exclusive
        userUtil.validateDeviceFilter('License: OEM(Exclusive)', 'OEM', 'yes');
        //Filter by License PFM exclusive
        userUtil.validateDeviceFilter('License: PFM(Exclusive)', 'PFM', 'yes');
        //Filter by PMG version 1.1.1
        userUtil.validateDeviceFilter('9.0.18', '9.0.18', 'yes');

    },500000);


    //PVP - 2683
    it("Verify user can search by numeric CID", function () {
        navigation.searchFilterButton.click();
        navigation.chipFilter.sendKeys('cid=' + cid);
        navigation.chipFilterSelectResultFromSuggestionsByContainText(customerName);
        tableUtil.verifyColumn(cid,cidColumn);
        tableUtil.verifyColumn(customerName,pfmCustomerColumn);
    });
});