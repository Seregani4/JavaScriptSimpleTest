/**
 * Created by Popazov on 12/22/2017.
 */

const _ = require('lodash');

describe("Users Chip Filter validation for Users by ROLE -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var usersPage = require('../../../pages/users.page.js');
    var validationUtil = require('../../../utilities/validation.util');
    var chipFilterMatrix = require('../../../utilities/chipFilterMatrix.utils.js');
    var peopleNetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var rolesWithPermission = chipFilterMatrix.rolesWithPermissionUsers;
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
            navigation.clickUsersLink();
            validationUtil.validateActionListEqual(navigation.chipFilterDropDownButton, navigation.chipFilterDropDown, navigation.chipFilterDropDown.get(0), chipFilters);
            validationUtil.validateChipFilterDropDowns(eachUser);
        });
    });

    it('User - Drop Down Search/Filter TC-1654', function () {
        loginPage.get();
        loginPage.login('paccar', peopleNetAdminEmail, password);
        navigation.usersLink.click();
        validationUtil.validateDropDownSearchAndFilters(navigation.chipFilterUsersButton, peopleNetAdminEmail, 0, usersPage.columns.tableUserNameColumn, true);
    });
});

