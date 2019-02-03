describe("Paccar Admin adds Paccar User -----> ", () => {

    var moment = require('moment');
    var dateTime = moment().format('MMMM D, YYYY h:mm:ss a');
    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var usersPage = require('../../../pages/users.page.js');
    var userUtility = require('../../../utilities/user.util.js');
    var userRole = browser.params.roleslabels.paccaruser;
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
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

    it("As a Paccar Admin, I complete the add user form for a verified test user Paccar User", () => {
        loginPage.get()
            .then(() => {
                return  usersPage.addUserEndpoint(paccarAdminEmail, userRole)
            })
            .then((userid) => {
                return testUserId = userid
            })
            .then(() => {
                loginPage.login('paccar', paccarAdminEmail, password)
                return navigation.waitTillElementToBeVisible(navigation.usersLink)
            })
            .then(() => {
                userUtility.navigateToUserDetailPageById(testUserId);
                usersPage.verifySelectedUserRole(userRole);
                usersPage.verifyUserName(firstName, lastName);
            })
    });

    it("Check to see that the new test user has all the correct navigation links for a Paccar User", () => {
        loginPage.get();
        loginPage.login('paccar', testUserEmail, password);
        userUtility.verifyLinkVisibility(userRole);
    });

    it("The Test User can not add users", () => {
        loginPage.get();
        loginPage.login('paccar', testUserEmail, password);
        navigation.clickUsersLink();
        expect(usersPage.addUserButton.isPresent()).toBe(false);
    });

    it("Delete the test user and verify that they are no longer in the User List", () => {
        loginPage.get();
        usersPage.deleteUserEndpoint(paccarAdminEmail, testUserId);
        loginPage.login('paccar', paccarAdminEmail, password);
        userUtility.verifyUserDeletion(testUserEmail);
    });
});