/**
 * Created by pshrestha on 6/19/2017.
 */

describe("Validate adding Users with special characters in Last/First Name fields when creating user -----> ", () => {

    var moment = require('moment');
    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var usersPage = require('../../../pages/users.page.js');
    var userUtility = require('../../../utilities/user.util.js');
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var testUserEmail = browser.params.adduser.email;
    var testUserId = browser.params.testuseruids.testUserUid;
    var password = browser.params.adduser.password;
    var customerAdminRole = browser.params.roleslabels.customeradmin;
    var firstName = 'Catlhöyük úni';
    var lastName = 'ÑikCäsar éloi';

    browser.driver.manage().window().maximize();

    beforeEach(() => {
        // Get a fresh Angular "session" so we can avoid bootstrapping errors
        browser.driver.get("about:blank");
        browser.sleep(1000);
    });

    afterEach(() => {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it('Paccar admin adds a User with special character in first and last name', () => {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.clickUsersLink();
        usersPage.clickAddUserButton();
        usersPage.addNewUser(testUserEmail, customerAdminRole, 'active', paccarAdminEmail);
        userUtility.verifyAddedUser(testUserEmail);
        //Edit the user with special character Name
        usersPage.clickUserCheckbox(testUserEmail);
        navigation.editActionButton.click();
        usersPage.editFirstName(firstName);
        usersPage.editLastName(lastName);
        usersPage.saveBtn.click();
        browser.sleep(3000);
        expect(browser.getCurrentUrl())
            .toBe(browser.params.environment.url + '/#/nav/user/details/' + testUserId, 'User did not save.');
        usersPage.verifyUserName(firstName, lastName);
        userUtility.verifyAddedUser(testUserEmail);
    });

    it('New user verifies log in is successful', () => {
        loginPage.get();
        loginPage.login('paccar', testUserEmail, password);
        userUtility.verifyLinkVisibility(customerAdminRole);
        //validate right roles are displayed
        navigation.clickUsersLink();
        usersPage.clickAddUserButton();
        usersPage.verifyUserRoleFieldsFor(customerAdminRole);
    });

    it('Paccar admin deletes the test user', () => {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        userUtility.deleteUserPP(testUserEmail);
    });
});
