/**
 * Created by Popazov on 1/11/2018.
 */

const _ = require('lodash');

describe("Users notification Chip Filter validation for Users by ROLE -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var validationUtil = require('../../../utilities/validation.util');
    var usersPage = require('../../../pages/users.page');
    var chipFilterMatrix = require('../../../utilities/chipFilterMatrix.utils.js');
    var rolesWithPermission = chipFilterMatrix.rolesWithPermissionUserNotifications;
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
        it("Validate the functionality of Chip filtering by role as " + eachUser + "PVP-4837", function () {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            navigation.userMenuButton.click();
            navigation.clickUserProfileLink();
            usersPage.notificationsTab.click();
            validationUtil.validateActionListEqual(navigation.chipFilterDropDownButton, navigation.chipFilterDropDown, navigation.chipFilterDropDown.get(0), chipFilters);
            validationUtil.validateChipFilterDropDowns(eachUser);
            navigation.clickUsersLink();
            navigation.typeInSearchFilter(eachUser);
            usersPage.clickUserEmailHyperLinkCellSearch(eachUser);
            usersPage.notificationsTab.click();
            validationUtil.validateActionListEqual(navigation.chipFilterDropDownButton, navigation.chipFilterDropDown, navigation.chipFilterDropDown.get(0), chipFilters);
            validationUtil.validateChipFilterDropDowns(eachUser);
        });
    });
});

