/**
 * Created by jelliott on 1/25/2017.
 */

describe("Validate editing a Customer Admin -----> ", () => {

    var loginPage = require('../../../pages/login.page');
    var navigation = require('../../../pages/navigation.page');
    var usersPage = require('../../../pages/users.page');
    var userUtility = require('../../../utilities/user.util');
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var prefCustomerAdminEmail = browser.params.testuseremails.preferredcustomeradmin;
    var dealerAdminEmail = browser.params.testuseremails.dealeradmin;
    var dealerOwnerAdmin = browser.params.testuseremails.dealerowneradmin;
    var dealerRegionAdmin = browser.params.testuseremails.dealerregionadmin;
    var addUserRole = browser.params.roleslabels.customeradmin;
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
        browser.driver.get("about:blank");
        browser.sleep(1000);
    });

    afterEach(() => {
        browser.executeScript('window.localStorage.clear();');
    });

    var loginUserArray = [paccarAdminEmail, prefCustomerAdminEmail, dealerAdminEmail, dealerOwnerAdmin, dealerRegionAdmin];
    //var loginUserArray=[paccarAdminEmail];

    loginUserArray.forEach(eachUser => {
        it(`Add test user through end-point as ${eachUser}`, () => {
            loginPage.get();
            usersPage.addUserEndpoint(eachUser, addUserRole);
        });

        it(`Edit user through end-point as ${eachUser}`, () => {
            loginPage.get();
            usersPage.editUserEndpoint(eachUser, addUserId, editUserFirstName, editUserLastName, editUserPhoneNumber);
            loginPage.login('paccar', eachUser, password);
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
            usersPage.switchUserStatus(eachUser, addUserEmail, inactiveStatus);
            loginPage.failedLogin(addUserEmail, password);
        });

        it("Change user status to active and try logging in", () => {
            usersPage.switchUserStatus(eachUser, addUserEmail, activeStatus);
            loginPage.get();
            loginPage.login('paccar', addUserEmail, password);
        });

        it(`Delete the test user`, () => {
            loginPage.get();
            usersPage.deleteUserEndpoint(paccarAdminEmail, addUserId);

        });
    });
});