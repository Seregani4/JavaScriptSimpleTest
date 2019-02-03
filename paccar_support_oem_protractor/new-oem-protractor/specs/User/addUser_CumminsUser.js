/**
 * Created by pShrestha on 1/4/2018.
 */

describe("Validate adding a Cummins User -----> ", () => {

    var loginPage = require('../../../pages/login.page.js');
    var usersPage = require('../../../pages/users.page.js');
    var userUtility = require('../../../utilities/user.util.js');
    var navigation = require('../../../pages/navigation.page.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var userRole = browser.params.roleslabels.cumminsuser;
    var firstName = browser.params.adduser.firstname;
    var lastName = browser.params.adduser.lastname;
    var testUserEmail = browser.params.adduser.email;
    var testUserId
    var password = browser.params.adduser.password;

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
        it("I complete the add user form for a verified test user Cummins User as: " + eachUser, () => {
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

        it("Check to see that the new test user has all the correct navigation links for a Cummins User", () => {
            loginPage.get();
            loginPage.login('paccar', testUserEmail, password);
            userUtility.verifyMenuAccessCummins(userRole);
        });

        it("Delete the test user", () => {
            loginPage.get();
            usersPage.deleteUserEndpoint(paccarAdminEmail, testUserId);
        });
    });
});
