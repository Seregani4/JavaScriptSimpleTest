/**
 * Created by Pshrestha 11/03/2017
 */

describe("Verify Spanish translations on the login page. -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var kenMexUtil = require('../../../utilities/kenMex.util.js');
    var toastUtil = require('../../../utilities/toastMessage.util.js');
    var translation = require('../../../json/kenmex.json');
    var spanishOemAdmin = browser.params.testuseremails.kenmexpaccaradmin;
    var incompleteEmail = spanishOemAdmin.substring(0, spanishOemAdmin.indexOf('@'));
    var invalidEmail = 'qwe@qwe.com';
    var password = browser.params.adduser.password;

    browser.driver.manage().window().maximize();

    beforeEach(function () {
        // Get a fresh Angular "session" so we can avoid bootstrapping errors
        browser.driver.get("about:blank");
        browser.sleep(1000);
        //Need to login and out to change the language
        loginPage.get();
        loginPage.login('paccar', spanishOemAdmin, password);
        navigation.logOut();
    });

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("Validate translations on the Login Page", function () {
        kenMexUtil.validateLoginPage(translation);
        loginPage.submitBtn.click();
        toastUtil.verifyToastAlert(translation.loginPage.wrongCredentialsToast);
        loginPage.fillCredential(spanishOemAdmin, '');
        toastUtil.verifyToastAlert(translation.loginPage.wrongCredentialsToast);
        loginPage.fillCredential(spanishOemAdmin, '123');
        toastUtil.verifyToastAlert(translation.loginPage.wrongCredentialsToast);
        loginPage.failedLogin(incompleteEmail, password)
    });

    it("Validate translations on the Forgot Password Page", function () {
        kenMexUtil.validateForgotPasswordPage(translation);
        loginPage.user.sendKeys(invalidEmail);
        loginPage.submitBtn.click();
        toastUtil.verifyToastAlert(translation.loginPage.anUnexpectedErrorToast);
    });
});