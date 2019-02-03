/**
 * Created by jelliott on 9/13/2016.
 */
/**
 * Updated by pshrestha on 2/16/2017.
 */
describe('Forgot Password ------ ', function(){

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var notificationPage =require('../../../pages/notifications.page.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;

    browser.driver.manage().window().maximize();

    afterEach(function() {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it('Peoplenet Admin submits and verifies forgot password notification', function(){
        loginPage.get();
        loginPage.user.sendKeys(peoplenetAdminEmail);
        loginPage.forgotPassWordButton.click();
        expect(browser.getCurrentUrl()).toBe(browser.params.environment.url + '/#/forgotpassword');
        loginPage.user.sendKeys(peoplenetAdminEmail);
        loginPage.sendEmailButton.click();
        browser.sleep(3000);
        loginPage.get();
        loginPage.login('supportal', peoplenetAdminEmail, password);
        navigation.deviceManagementButton.click();
        navigation.clickNotificationsLink();
        notificationPage.verifyNotificationsData();
        navigation.chipFilter.sendKeys(peoplenetAdminEmail);
        navigation.chipFilter.sendKeys(protractor.Key.ENTER);
        notificationPage.verifyTimeStamp();
        notificationPage.verifyRecipient(peoplenetAdminEmail);
        notificationPage.verifyNotificationHeader('Reset your password');
    });

    // it('Error message shows up when there is no Email in the Forgot Password Screen', function(){
    //     loginPage.get();
    //     loginPage.user.sendKeys(peoplenetAdminEmail);
    //     loginPage.forgotPassWordButton.click();
    //     expect(browser.getCurrentUrl()).toBe(browser.params.environment.url + '/#/forgotpassword');
    //     loginPage.user.sendKeys('peoplenetAdminEmail@tts');
    //     loginPage.sendEmailButton.click();
    //     var displayed = loginPage.invalidEmailErrorMessageAlert;
    //     //displayed.click();
    //     expect(displayed.getText()).toBe('OK');
    //     expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/forgotpassword');
    // });

});