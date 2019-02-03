/**
 * Created by Popazov on 9/27/2017.
 */


describe("Global Search Result Page Functionality", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var customerUtil = require('../../../utilities/customer.util.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;
    var input = 'Automation Customer (Do Not Edit)';
    var rows = {
        pfmCustomerRow: {value: 0, name: 'PFM Customer'},
        customerRow: {value: 5, name: 'Customer'}
    };
    var pfmCustomerRow = rows.pfmCustomerRow;
    var customerRow = rows.customerRow;

    browser.driver.manage().window().maximize();

    beforeEach(function () {
        loginPage.get();
        loginPage.login('supportal', peoplenetAdminEmail, password);
    });

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    //PVP-2703
    it("Clicking  PFM customer results directs user to Device list page", function () {
        navigation.globalSearchSendKeys(input);
        customerUtil.validateLinksOnGlobalSearchResultPage(pfmCustomerRow, 'Devices', '/#/nav/device/list/');
        browser.navigate().back();
        customerUtil.validateLinksOnGlobalSearchResultPage(customerRow, 'Customers', '/#/nav/customer/list/');
    });



});
