/**
 * Created by Popazov on 9/28/2017.
 */

describe("Global Search Result Page Functionality -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var customerUtil = require('../../../utilities/customer.util.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var customerAdminEmail = browser.params.testuseremails.customeradmin;
    var customerUserEmail = browser.params.testuseremails.customeruser;
    var password = browser.params.adduser.password;
    var input = browser.params.testcustomer.name;
    var customerUserVehicleGroup = 'doNotDelete';
    var rows = {
        pfmCustomerRow: {value: 0, name: 'PFM Customer'},
        customerRow: {value: 7, name: 'Customer'}
    };
    var pfmCustomerRow = rows.pfmCustomerRow;
    var customerRow = rows.customerRow;
    var customersUserArray = [customerAdminEmail, customerUserEmail];

    browser.driver.manage().window().maximize();
    
    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    //PVP-2703
    it("Clicking  PFM customer results directs user to Device list page", function () {
        loginPage.get();
        loginPage.login('paccar', peoplenetAdminEmail, password);
        navigation.globalSearchSendKeys(input);
        customerUtil.validateLinksOnGlobalSearchResultPage(pfmCustomerRow, 'Devices', '/#/nav/device/list/');
        browser.navigate().back();
        customerUtil.validateLinksOnGlobalSearchResultPage(customerRow, 'Customers', '/#/nav/customer/list/');
    });

    customersUserArray.forEach(function (eachUser) {
        it("Validate " + eachUser + " roles are NOT able to find their vehicle groups in Global Search", function () {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            navigation.globalSearchBar.sendKeys(customerUserVehicleGroup);
            navigation.waitTillElementToBeClickable(navigation.chipFilterResults.first());
            expect(navigation.chipFilterResults.count()).toEqual(1, 'Vehicle group suggestion displayed');

        })
    });
});
