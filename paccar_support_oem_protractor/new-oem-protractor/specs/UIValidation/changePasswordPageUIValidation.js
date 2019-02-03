/**
 * Created by jelliott on 1/9/2017.
 */

describe('Verify Forgot Password Page UI -----> ', function () {

    var loginPage = require('../../../pages/login.page.js');
    var errorUtil = require('../../../utilities/toastMessage.util.js');
    var dealerAdminEmail = browser.params.testuseremails.dealeradmin;
    var message = errorUtil.incorrectPasswordMessage();
    var password = 'password';

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it('Login with wrong password as a Dealer Admin', function () {
        loginPage.get();
        // loginPage.login('paccar',dealerAdminEmail,password);

        loginPage.user.sendKeys(dealerAdminEmail);
        loginPage.password.sendKeys(password);
        loginPage.submitBtn.click();
        errorUtil.verifyToastAlert(message);
        expect(loginPage.changePasswordButton.isDisplayed()).toBe(true);
        loginPage.changePasswordButton.click();
        expect(browser.getCurrentUrl()).toBe(browser.params.environment.url + '/#/forgotpassword');
        expect(loginPage.emailButton.isDisplayed()).toBe(true);
        expect(loginPage.cancelBtn.isDisplayed()).toBe(true);
    });
});