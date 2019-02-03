/**
 * Created by pshrestha on 6/19/2017.
 */

describe("Validate editing Users with special characters in Last/First Name fields when creating user -----> ", () => {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var usersPage = require('../../../pages/users.page.js');
    var environmentURL = browser.params.environment.url;
    var userUtility = require('../../../utilities/user.util.js');
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var testUserEmail = browser.params.adduser.email;
    var password = browser.params.adduser.password;
    var paccarUserRole = browser.params.roleslabels.paccaruser;
    var firstName = 'Sebastián';
    var lastName = 'ÑickCäsar';
    var longValidEmail = 'davep@cannonburgwoodproducts.com';
    var uid
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

    it('Paccar admin adds and edits a User with special character in first and last name', () => {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.clickUsersLink();
        usersPage.clickAddUserButton();
        //test with adding a PU with special character on name fields
        usersPage.addUserSpecialName(testUserEmail, firstName, lastName, password);
        expect(browser.getCurrentUrl()).toContain(environmentURL + '/#/nav/user/details/', 'The user did not get saved.');
        userUtility.getUidNumber()
            .then(result => {
                return uid = result;
            });
        usersPage.verifyUserName(firstName, lastName);
        navigation.clickUsersLink();
        navigation.typeInSearchFilter(testUserEmail);
        usersPage.verifyUserID(testUserEmail);
    });

    it('New user verifies log in is successful', () => {
        loginPage.get();
        loginPage.login('paccar', testUserEmail, password);
        //validate all the correct menu items are visible - PU
        userUtility.verifyLinkVisibility(paccarUserRole);
        //validate adding user is not available
        navigation.clickUsersLink();
        expect(usersPage.addUserButton.isPresent()).toBe(false);
    });

    it('Paccar admin deletes the test user', () => {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        usersPage.deleteUserEndpoint(paccarAdminEmail,uid);
    });

    it('TC-2558 User can type long valid email during Add user process ', () => {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.clickUsersLink();
        usersPage.clickAddUserButton();
        usersPage.emailField.sendKeys(longValidEmail);
        usersPage.firstNameField.click();
        expect(usersPage.emailWarning.isDisplayed()).toBe(false, 'Error message displayed');
    });
});