/**
 * Created by pshrestha on 9/12/2017.
 */

describe("Users other than Paccar Admin cannot edits other users email -----> ", () => {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var usersPage = require('../../../pages/users.page.js');
    var userUtility = require('../../../utilities/user.util.js');
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var customerAdminEmail = browser.params.testuseremails.preferredcustomeradmin;
    var dealerAdminEmail = browser.params.testuseremails.dealeradmin;
    var dealerOwnerAdmin = browser.params.testuseremails.dealerowneradmin;
    var dealerRegionAdmin = browser.params.testuseremails.dealerregionadmin;
    var testUserEmail = browser.params.adduser.email;
    var password = browser.params.adduser.password;
    var customerUserRole = browser.params.roleslabels.customeruser;
    //Users with edit permission.
    var userArray = [customerAdminEmail, dealerAdminEmail, dealerOwnerAdmin, dealerRegionAdmin];

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

    it("As a DOA, I complete the add user form for a verified Dealer Admin", () => {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.clickUsersLink();
        usersPage.clickAddUserButton();
        usersPage.addNewUser(testUserEmail, customerUserRole, 'active', dealerOwnerAdmin);
        userUtility.verifyAddedUser(testUserEmail);
    });

    userArray.forEach((eachUser) => {

        it("Verify" + eachUser + "do not see the email change form ", () => {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            navigation.clickUsersLink();
            navigation.typeInSearchFilterRecommendation(testUserEmail);
            usersPage.goToUserSecurityDetails(testUserEmail);
            usersPage.verifyCannotEditEmail(eachUser);
        });
    });

    it("Delete the test user and verify that they are no longer in the User List", () => {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.clickUsersLink();
        /*This also validates that the email should not change
         Before verifying the new email.*/
        userUtility.deleteUserPP(testUserEmail);
    });
});