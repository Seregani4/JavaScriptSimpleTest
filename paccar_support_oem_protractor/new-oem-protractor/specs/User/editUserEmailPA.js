/**
 * Created by pshrestha on 9/11/2017.
 */

describe("Paccar Admin edits other users email -----> ", () => {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var usersPage = require('../../../pages/users.page.js');
    var userUtility = require('../../../utilities/user.util.js');
    var toastUtil = require('../../../utilities/toastMessage.util.js');
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var testUserEmail = browser.params.adduser.email;
    var addUserId = browser.params.testuseruids.testUserUid;
    var errorToast = toastUtil.updateEmailErrorMessage();
    var password = browser.params.adduser.password;
    var dealerAdminRole = browser.params.roleslabels.dealeradmin;

    browser.driver.manage().window().maximize();

    beforeEach(() => {
        // Get a fresh Angular "session" so we can avoid bootstrapping errors
        browser.driver.get("about:blank");
        browser.sleep(1000);
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.clickUsersLink();
    });

    afterEach(() => {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("As a Paccar Admin, I complete the add user form for a verified Dealer Admin", () => {
        usersPage.clickAddUserButton();
        usersPage.addNewUser(testUserEmail, dealerAdminRole, 'active', paccarAdminEmail);
        userUtility.verifyAddedUser(testUserEmail);
    });

    it("As a Paccar Admin, Verify email edit option", () => {
        navigation.typeInSearchFilterRecommendation(testUserEmail);
        usersPage.goToUserSecurityDetails(testUserEmail);
        usersPage.verifyChangeEmailElements();
        //Verify Cancel button works
        usersPage.verifyCancelButton();
        //Verify error when email is not changed.
        usersPage.emailChange(testUserEmail, 'no');
        toastUtil.verifyToastAlert(errorToast);
        //Verify error when existing email is used.
        usersPage.changeEmailField.clear();
        usersPage.changeEmailField.sendKeys(paccarAdminEmail);
        usersPage.changeEmailButton.click();
        navigation.waitTillElementToBeVisible(usersPage.editEmailWarning)
        expect(usersPage.editEmailWarning.getText()).toEqual("Email address already in use");
        //TODO update email edit test logic
    });

    it("Delete the test user", () => {
        loginPage.get();
        usersPage.deleteUserEndpoint(paccarAdminEmail, addUserId);
    });
});