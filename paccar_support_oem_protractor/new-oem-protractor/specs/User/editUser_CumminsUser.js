/**
 * Created by pShrestha on 1/4/2018
 */

describe("Validate editing a Cummins User -----> ", () => {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var usersPage = require('../../../pages/users.page.js');
    var userUtility = require('../../../utilities/user.util.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var addUserRole = browser.params.roleslabels.cumminsuser;
    var addUserId = browser.params.testuseruids.testUserUid;
    var addUserEmail = browser.params.adduser.email;
    var editUserFirstName = browser.params.edituser.firstname;
    var editUserLastName = browser.params.edituser.lastname;
    var editUserPhoneNumber = browser.params.edituser.formattedphone;
    var password = browser.params.adduser.password;
    var activeStatus = userUtility.getActiveStatus();
    var inactiveStatus = userUtility.getInactiveStatus();

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

    /*
   * Note: Since Cummins User do not have access to users menu link some of the regular tests
   * are not applicable for this particular test.
   */

    var loginUserArray = [peoplenetAdminEmail, paccarAdminEmail];

    loginUserArray.forEach((eachUser) => {
        it("Add test user through end-point as " + eachUser, () => {
            loginPage.get();
            usersPage.addUserEndpoint(eachUser, addUserRole);
        });

        it("Edit user through end-point as " + eachUser, () => {
            loginPage.get();
            usersPage.editUserEndpoint(eachUser, addUserId, editUserFirstName, editUserLastName, editUserPhoneNumber);
            loginPage.login('paccar', eachUser, password);
            userUtility.verifyUserDetails(addUserEmail, editUserFirstName, editUserLastName, editUserPhoneNumber);
        });

        it("Change cummins user status to inactive and verify login fails", () => {
            loginPage.get();
            usersPage.switchUserStatus(eachUser, addUserEmail, inactiveStatus);
            loginPage.failedLogin(addUserEmail, password);
        });

        it("Change user status to active and try logging in", () => {
            usersPage.switchUserStatus(eachUser, addUserEmail, activeStatus);
            loginPage.get();
            loginPage.login('paccar', addUserEmail, password);
        });

        it("Delete the test cummins user", () => {
            loginPage.get();
            usersPage.deleteUserEndpoint(paccarAdminEmail, addUserId);

        });
    });
});