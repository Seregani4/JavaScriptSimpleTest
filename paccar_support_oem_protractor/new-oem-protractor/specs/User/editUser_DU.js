/**
 * Created by jelliott on 1/25/2017.
 */

describe("PA, DA, DOA and DRA edits Dealer User -----> ", () => {

    var moment = require('moment');
    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var usersPage = require('../../../pages/users.page.js');
    var userUtility = require('../../../utilities/user.util.js');
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var dealerAdminEmail = browser.params.testuseremails.dealeradmin;
    var dealerOwnerAdmin = browser.params.testuseremails.dealerowneradmin;
    var dealerRegionAdmin = browser.params.testuseremails.dealerregionadmin;
    var addUserEmail = browser.params.adduser.email;
    var addUserId = browser.params.testuseruids.testUserUid;
    var addUserFirstName = browser.params.adduser.firstname;
    var addUserLastName = browser.params.adduser.lastname;
    var addUserPhoneNumber = browser.params.adduser.formattedphone;
    var editUserFirstName = browser.params.edituser.firstname;
    var editUserLastName = browser.params.edituser.lastname;
    var editUserPhoneNumber = browser.params.edituser.formattedphone;
    var password = browser.params.adduser.password;
    var dealerUserRole = browser.params.roleslabels.dealeruser;
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

    var loginUserArray = [paccarAdminEmail, dealerAdminEmail, dealerOwnerAdmin, dealerRegionAdmin];

    loginUserArray.forEach((eachUser) => {

        it("Add test user through end-point as " + eachUser, () => {
            loginPage.get();
            usersPage.addUserEndpoint(eachUser, dealerUserRole);
        });

        it("Edit user through end-point as " + eachUser, () => {
            loginPage.get();
            usersPage.editUserEndpoint(eachUser, addUserId, editUserFirstName, editUserLastName, editUserPhoneNumber);
            loginPage.login('paccar', eachUser, password);
            userUtility.verifyUserDetails(addUserEmail, editUserFirstName, editUserLastName, editUserPhoneNumber);
        });

        it("Edit users own info through end-point", () => {
            loginPage.get();
            //DU can edit users since they are Power Users.
            usersPage.editUserEndpoint(addUserEmail, addUserId, addUserFirstName, addUserLastName, addUserPhoneNumber);
            loginPage.login('paccar', addUserEmail, password);
            userUtility.verifyUserDetails(addUserEmail, addUserFirstName, addUserLastName, addUserPhoneNumber);
        });

        it("Change user status to inactive and verify login fails", () => {
            loginPage.get();
            usersPage.switchUserStatus(eachUser, addUserEmail, inactiveStatus);
            browser.sleep(2000) //need to wait till request finished
        });

        it("Verify login fails after disabling user", () => {
            loginPage.get();
            loginPage.failedLogin(addUserEmail, password);
        });

        it("Change user status to active and try logging in", () => {
            loginPage.get();
            usersPage.switchUserStatus(eachUser, addUserEmail, activeStatus);
            browser.sleep(2000) //need to wait till request finished
        });

        it("Try logging in after activating user", () => {
            loginPage.get();
            loginPage.login('paccar', addUserEmail, password);
        });

        it("Delete the test user as PA and verify as " + eachUser, () => {
            loginPage.get();
            usersPage.deleteUserEndpoint(paccarAdminEmail, addUserId);
            loginPage.login('paccar', eachUser, password);
            navigation.getUrl('user', addUserEmail);
            usersPage.verifyUserIsNotInUserList(addUserEmail);
        });
    });
});
