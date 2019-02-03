/**
 * Created by Cottomoeller on 3/4/2016.
 */

describe("Paccar Admin edits Paccar User -----> ", () => {

    var moment = require('moment');
    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var usersPage = require('../../../pages/users.page.js');
    var userUtility = require('../../../utilities/user.util.js');
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var addUserRole = browser.params.roleslabels.paccaruser;
    var addUserId = browser.params.testuseruids.testUserUid;
    var addUserEmail = browser.params.adduser.email;
    var addUserFirstName = browser.params.adduser.firstname;
    var addUserLastName = browser.params.adduser.lastname;
    var addUserPhoneNumber = browser.params.adduser.formattedphone;
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


    it("Add test user through end-point as PA", () => {
        loginPage.get();
        usersPage.addUserEndpoint(paccarAdminEmail, addUserRole);
    });

    it("Edit user through end-point as PA", () => {
        loginPage.get();
        usersPage.editUserEndpoint(paccarAdminEmail, addUserId, editUserFirstName, editUserLastName, editUserPhoneNumber);
        loginPage.login('paccar', paccarAdminEmail, password);
        userUtility.verifyUserDetails(addUserEmail, editUserFirstName, editUserLastName, editUserPhoneNumber);
    });

    it("Edit users own info through end-point", () => {
        loginPage.get();
        usersPage.editUserEndpoint(addUserEmail, addUserId, addUserFirstName, addUserLastName, addUserPhoneNumber);
        loginPage.login('paccar', addUserEmail, password);
        userUtility.verifyUserDetails(addUserEmail, addUserFirstName, addUserLastName, addUserPhoneNumber);
    });

    it("Change user status to inactive and verify login fails", () => {
        loginPage.get();
        usersPage.switchUserStatus(paccarAdminEmail, addUserEmail, inactiveStatus);
        loginPage.failedLogin(addUserEmail, password);
    });

    it("Change user status to active and try logging in", () => {
        usersPage.switchUserStatus(paccarAdminEmail, addUserEmail, activeStatus);
        loginPage.get();
        loginPage.login('paccar', addUserEmail, password);
    });

    it("Delete the test user", () => {
        loginPage.get();
        usersPage.deleteUserEndpoint(paccarAdminEmail, addUserId);
    });
});