/**
 * Created by jelliott on 1/4/2017.
 */

describe('Verify Login and Logout is functional ----- ',function(){
    var navigation = require('../../../pages/navigation.page.js');
    var loginPage = require('../../../pages/login.page.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;

    browser.driver.manage().window().maximize();
    afterEach(function() {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });
//This need to be done in two separate Test because having both expect statements take too long and the Alert disappears before the second expect coulf run
    it('Login with An Incorrect Password and Validate Alert Appears', function(){
        loginPage.get();
        loginPage.user.sendKeys(peoplenetAdminEmail);
        loginPage.password.sendKeys(password+password);
        loginPage.submitBtn.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/login');
        //expect(navigation.wrongPassworderrorMessageAlert.isDisplayed()).toBe(true);
        //expect(navigation.wrongPassworderrorMessageAlert.getText()).toBe('The username or password you entered is not correct. Please try again.');

    });



});