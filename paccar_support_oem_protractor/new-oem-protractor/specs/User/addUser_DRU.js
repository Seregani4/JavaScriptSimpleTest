/**
 * Created by pshrestha on 2/22/2017.
 */

describe("PA, DOA and DRA adds a Dealer Region User -----> ", function () {

    var moment = require('moment');
    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var usersPage = require('../../../pages/users.page.js');
    var userUtility = require('../../../utilities/user.util.js');
    var validationUtils = require('../../../utilities/validation.util.js');
    var subscribedTagsArray = userUtility.dealerSubscribedTagsArray;
    var userRole = browser.params.roleslabels.dealerregionuser;
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var dealerOwnerAdmin = browser.params.testuseremails.dealerowneradmin;
    var dealerRegionAdmin = browser.params.testuseremails.dealerregionadmin;
    var testUserEmail = browser.params.adduser.email;
    var testUserId
    var password = browser.params.adduser.password;
    var firstName = browser.params.adduser.firstname;
    var lastName = browser.params.adduser.lastname;

    browser.driver.manage().window().maximize();

    beforeEach(() => {
        // Get a fresh Angular "session" so we can avoid bootstrapping errors
        browser.driver.get("about:blank");
    });

    afterEach(() => {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    var loginUserArray = [paccarAdminEmail, dealerOwnerAdmin, dealerRegionAdmin];
    loginUserArray.forEach((eachUser) => {
        it("As a" + eachUser + ", I complete the add user form for a verified test user Dealer Region User", () => {
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

        it("Check to see that the new test user has all the correct navigation links for a Dealer Region User", () => {
            loginPage.get();
            loginPage.login('paccar', testUserEmail, password);
            userUtility.verifyLinkVisibility(userRole);
        });

        it("The Test User can not add users", () => {
            loginPage.get();
            loginPage.login('paccar', testUserEmail, password);
            navigation.clickUsersLink();
            expect(usersPage.addUserButton.isPresent()).toBe(false);
            navigation.clickDashboardLink();
        });

        it("Delete the test user and verify that they are no longer in the User List", () => {
            loginPage.get();
            usersPage.deleteUserEndpoint(paccarAdminEmail, testUserId);
            loginPage.login('paccar', eachUser, password);
            userUtility.verifyUserDeletion(testUserEmail);
        });
    });
});