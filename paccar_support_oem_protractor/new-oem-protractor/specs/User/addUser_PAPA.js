describe("Paccar Admin adds Paccar Admin -----> ", () => {

    var moment = require('moment');
    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var usersPage = require('../../../pages/users.page.js');
    var userUtility = require('../../../utilities/user.util.js');
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var userRole = browser.params.roleslabels.paccaradmin;
    var testUserEmail = browser.params.adduser.email;
    var testUserId = browser.params.testuseruids.testUserUid;
    var password = browser.params.adduser.password;
    var firstName = browser.params.adduser.firstname;
    var lastName = browser.params.adduser.lastname;

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

    it("As a Paccar Admin, I complete the add user form for a verified test user Paccar Admin", () => {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        usersPage.addUserEndpoint(paccarAdminEmail, userRole)
            .then((userid) => {
                testUserId = userid
            })
        userUtility.navigateToUserDetailPageById(testUserId);
        usersPage.verifySelectedUserRole(userRole);
        usersPage.verifyUserName(firstName, lastName);
    });

    it("Check to see that the new test user has all the correct navigation links for a Paccar Admin", () => {
        loginPage.get();
        loginPage.login('paccar', testUserEmail, password);
        userUtility.verifyLinkVisibility(userRole);
    });

    it("The Test User can add users of all other user types visible to a Paccar Admin", () => {
        loginPage.get();
        loginPage.login('paccar', testUserEmail, password);
        navigation.clickUsersLink();
        usersPage.clickAddUserButton();
        usersPage.verifyUserRoleFieldsFor(userRole);
    });

    it("Delete the test user and verify that they are no longer in the User List", () => {
        loginPage.get();
        usersPage.deleteUserEndpoint(paccarAdminEmail, testUserId);
        loginPage.login('paccar', paccarAdminEmail, password);
        userUtility.verifyUserDeletion(testUserEmail);
    });
});