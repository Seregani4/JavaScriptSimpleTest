/**
 * Created by pshrestha on 2/22/2017.
 */

describe("PA and DOA edits Dealer Owner Admin -----> ", function () {

    var moment = require('moment');
    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var usersPage = require('../../../pages/users.page.js');
    var userUtility = require('../../../utilities/user.util.js');
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var dealerOwnerAdmin = browser.params.testuseremails.dealerowneradmin;
    var addUserEmail = browser.params.adduser.email;
    var addUserId = browser.params.testuseruids.testUserUid;
    var addUserFirstName = browser.params.adduser.firstname;
    var addUserLastName = browser.params.adduser.lastname;
    var addUserPhoneNumber = browser.params.adduser.formattedphone;
    var editUserFirstName = browser.params.edituser.firstname;
    var editUserLastName = browser.params.edituser.lastname;
    var editUserPhoneNumber = browser.params.edituser.formattedphone;
    var password = browser.params.adduser.password;
    var dealerOwnerAdminRole = browser.params.roleslabels.dealerowneradmin;
    var activeStatus = userUtility.getActiveStatus();
    var inactiveStatus = userUtility.getInactiveStatus();

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

    var loginUserArray = [paccarAdminEmail, dealerOwnerAdmin];

    loginUserArray.forEach(function (eachUser) {
        it("Add test user through end-point as " + eachUser, function () {
            loginPage.get();
            usersPage.addUserEndpoint(eachUser, dealerOwnerAdminRole);
        });

        it("Edit user through end-point as " + eachUser, function () {
            loginPage.get();
            usersPage.editUserEndpoint(eachUser, addUserId, editUserFirstName, editUserLastName, editUserPhoneNumber);
            loginPage.login('paccar', eachUser, password);
            userUtility.verifyUserDetails(addUserEmail, editUserFirstName, editUserLastName, editUserPhoneNumber);
        });

        it("Edit users own info through end-point", function () {
            loginPage.get();
            usersPage.editUserEndpoint(addUserEmail, addUserId, addUserFirstName, addUserLastName, addUserPhoneNumber);
            loginPage.login('paccar', addUserEmail, password);
            userUtility.verifyUserDetails(addUserEmail, addUserFirstName, addUserLastName, addUserPhoneNumber);
        });

        it("Change user status to inactive and verify login fails", function () {
            loginPage.get();
            usersPage.switchUserStatus(eachUser, addUserEmail, inactiveStatus);
            loginPage.failedLogin(addUserEmail, password);
        });

        it("Change user status to active and try logging in", function () {
            usersPage.switchUserStatus(eachUser, addUserEmail, activeStatus);
            loginPage.get();
            loginPage.login('paccar', addUserEmail, password);
        });

        it("Delete the test user", () => {
            loginPage.get();
            usersPage.deleteUserEndpoint(paccarAdminEmail, addUserId);
        });
    });
});