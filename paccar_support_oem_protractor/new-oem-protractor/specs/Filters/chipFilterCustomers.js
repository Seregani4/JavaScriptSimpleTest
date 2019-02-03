/**
 * Created by Popazov on 12/22/2017.
 */

const _ = require('lodash');
describe("Customers Chip Filter validation for Users by ROLE -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var customersPage = require('../../../pages/customers.page.js');
    var validationUtil = require('../../../utilities/validation.util');
    var chipFilterMatrix = require('../../../utilities/chipFilterMatrix.utils.js');
    var rolesWithPermission = chipFilterMatrix.rolesWithPermissionCustomers;
    var peopleNetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var testCustomer = browser.params.testcustomer.name;
    var password = browser.params.adduser.password;

    browser.driver.manage().window().maximize();

    beforeEach(function () {
        // Get a fresh Angular "session" so we can avoid bootstrapping errors
        browser.driver.get("about:blank");
        browser.sleep(1000);
    });

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    _.forEach(rolesWithPermission, function (chipFilters, eachUser) {
        it("Validate the functionality of Chip filtering by role as " + eachUser, function () {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            navigation.clickCustomersLink();
            validationUtil.validateActionListEqual(navigation.chipFilterDropDownButton, navigation.chipFilterDropDown, navigation.chipFilterDropDown.get(0), chipFilters);
            validationUtil.validateChipFilterDropDowns(eachUser);
        });
    });

    it('Customer - Drop Down Search/Filter TC-1653', function () {
        loginPage.get();
        loginPage.login('paccar', peopleNetAdminEmail, password);
        navigation.customersLink.click();
        validationUtil.validateDropDownSearchAndFilters(navigation.chipFilterCustomersButton, testCustomer, 0, customersPage.columns.nameColumn);
    });
});

