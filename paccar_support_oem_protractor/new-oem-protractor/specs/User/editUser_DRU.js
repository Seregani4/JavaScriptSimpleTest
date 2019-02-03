/**
 * Created by pshrestha on 2/22/2017.
 */

describe("PA, DOA and DRA edits Dealer Region User -----> ", () => {

    var moment = require('moment');
    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var usersPage = require('../../../pages/users.page.js');
    var userUtility = require('../../../utilities/user.util.js');
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var dealerOwnerAdmin = browser.params.testuseremails.dealerowneradmin;
    var dealerRegionAdmin = browser.params.testuseremails.dealerregionadmin;
    var addUserEmail = browser.params.adduser.email;
    var addUserId = browser.params.testuseruids.testUserUid;
    var editUserFirstName = browser.params.edituser.firstname;
    var editUserLastName = browser.params.edituser.lastname;
    var editUserPhoneNumber = browser.params.edituser.formattedphone;
    var password = browser.params.adduser.password;
    var dealerRegionUserRole = browser.params.roleslabels.dealerregionuser;
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

    var loginUserArray = [paccarAdminEmail, dealerOwnerAdmin, dealerRegionAdmin];

    loginUserArray.forEach((eachUser) => {
        it("Add test user through end-point as " + eachUser, () => {
            loginPage.get();
            usersPage.addUserEndpoint(eachUser, dealerRegionUserRole);
        });

        it("Edit user through end-point as " + eachUser, () => {
            loginPage.get();
            usersPage.editUserEndpoint(eachUser, addUserId, editUserFirstName, editUserLastName, editUserPhoneNumber);
            loginPage.login('paccar', eachUser, password);
            userUtility.verifyUserDetails(addUserEmail, editUserFirstName, editUserLastName, editUserPhoneNumber);
        });

        it("Edit user's own fields & verify user cannot edit organization fields", () => {
            loginPage.get();
            loginPage.login('paccar', addUserEmail, password);
            userUtility.cannotEditUserInfo(addUserEmail);
        });

        it("Change user status to inactive and verify login fails", () => {
            loginPage.get();
            usersPage.switchUserStatus(eachUser, addUserEmail, inactiveStatus);
            loginPage.failedLogin(addUserEmail, password);
        });

        it("Change user status to active and try logging in", () => {
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