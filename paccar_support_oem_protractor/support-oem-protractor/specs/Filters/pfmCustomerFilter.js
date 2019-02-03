/**
 * Created by Popazov on 6/23/2017.
 */



describe("Verifying filtering  for the  PFM customer  ----- ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var devicesPage = require('../../../pages/devices.page.js');
    var tableUtil = require('../../../utilities/tables.util');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var dsnCode = browser.params.vehicle.dsn3;
    var stringType = 'Customer';
    var cid = '5166';
    var customerName = "Stratmeyer Farm's";
    var dsnColumn = devicesPage.columns.dsnColumn;
    var cidColumn = devicesPage.columns.cidColumn;
    var pfmCustomerColumn = devicesPage.columns.pfmCustomerColumn;
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


    it("Verify filter by DSN give correct result", function () {
        navigation.clickThisGlobalSearchResult(dsnCode, stringType);
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/device/list/', 'Not in the device list page');
        tableUtil.verifyColumn(cid,cidColumn);
        tableUtil.verifyColumn(customerName,pfmCustomerColumn);
        navigation.clickDeviceManagementButton();
        navigation.clickDevicesLink();
        navigation.typeInSearchFilter('dsn = ' + dsnCode);
        tableUtil.verifyColumn(dsnCode,dsnColumn);
        tableUtil.verifyColumn(cid,cidColumn);
        tableUtil.verifyColumn(customerName,pfmCustomerColumn);
    });


});