/**
 * Created by Popazov on 12/25/2017.
 */

const _ = require('lodash');

describe("Chip Filter validation for Users by ROLE -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var validationUtil = require('../../../utilities/validation.util');
    var chipFilterMatrix = require('../../../utilities/chipFilterMatrix.utils.js');
    var rolesWithPermission = chipFilterMatrix.UserToUserRolesMapping;
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


    _.forEach(rolesWithPermission, function (roles, eachUser) {
        it("Validate the functionality of Chip filtering by role as " + eachUser, function () {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            navigation.clickUsersLink();
            navigation.chipFilterDropDownButton.click();
            navigation.chipFilterRolesButton.click().then(function () {
                validationUtil.validateAllTextFromSuggestionsDropDown(navigation.chipFilterSuggestionDropDown, roles, navigation.chipFilter);
            });
        });
    });
});
