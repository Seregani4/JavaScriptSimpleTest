/**
 * Created by pshrestha on 2/21/2017.
 */

describe("Paccar Admin adds Dealer Owner Admin -----> ", () => {

    var moment = require('moment');
    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var usersPage = require('../../../pages/users.page.js');
    var userUtility = require('../../../utilities/user.util.js');
    var validationUtils = require('../../../utilities/validation.util.js');
    var subscribedTagsArray = userUtility.dealerOwnerSubscribedTagsArray;
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var dealerOwnerAdmin = browser.params.testuseremails.dealerowneradmin;
    var userRole = browser.params.roleslabels.dealerowneradmin; // 'Dealer Owner Admin';
    var testUserEmail = browser.params.adduser.email;
    var testUserId
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

    var loginUserArray = [paccarAdminEmail, dealerOwnerAdmin];

    loginUserArray.forEach((eachUser) => {
        it("As a " + eachUser + ", I complete the add user form for a verified test user Dealer Owner Admin", () => {
            loginPage.get()
                .then(() => {
                    return  usersPage.addUserEndpoint(eachUser, userRole)
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

        it("Check user subscribed data", () => {
            loginPage.get();
            validationUtils.validateUserSubscribedDataEndPoint(paccarAdminEmail, testUserId, subscribedTagsArray);
        });

        it("Check to see that the new test user has all the correct navigation links for a Dealer Owner Admin", () => {
            loginPage.get();
            loginPage.login('paccar', testUserEmail, password);
            userUtility.verifyLinkVisibility(userRole);
        });

        it("The Test User can add users of all other user types visible to a Dealer Owner Admin", () => {
            loginPage.get();
            loginPage.login('paccar', testUserEmail, password);
            navigation.clickUsersLink();
            usersPage.clickAddUserButton();
            usersPage.verifyUserRoleFieldsFor(userRole);
        });

        it("Delete the test user and verify that they are no longer in the User List", () => {
            loginPage.get();
            usersPage.deleteUserEndpoint(paccarAdminEmail, testUserId);

        });
    });
});
