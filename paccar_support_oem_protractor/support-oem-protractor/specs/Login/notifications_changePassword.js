/**
 * Created by Cottomoeller on 5/4/2016.
 */
describe("Verifying Notifications ----- ", function(){

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var usersPage = require('../../../pages/users.page.js');
    var notificationsPage = require('../../../pages/notifications.page.js');
    var changePasswordUserEmail = browser.params.testuseremails.changeuser;
    var password = browser.params.edituser.password;
    var changePassword = browser.params.edituser.changePassword;

    browser.driver.manage().window().maximize();

    afterEach(function() {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("Change Password and verify Notification", function() {
        loginPage.get();
        loginPage.login('supportal', changePasswordUserEmail, password);
        navigation.clickUserMenu('paccar');
        navigation.clickUserProfileLink('peoplenet admin');
        usersPage.securityTab.click();
        usersPage.changeUserPassword(password, changePassword);
        browser.sleep(5000);
    });

    it("Verify Change Password notification was sent", function(){
        loginPage.get();
        loginPage.login('supportal', changePasswordUserEmail, changePassword);
        navigation.deviceManagementButton.click();
        navigation.clickNotificationsLink();
        notificationsPage.verifyNotificationHeader('Your password has been changed');
        notificationsPage.verifyRecipient(changePasswordUserEmail);
        notificationsPage.verifyTimeStamp();
        navigation.clickUserMenu('paccar');
        navigation.clickUserProfileLink('peoplenet admin');
        usersPage.securityTab.click();
        usersPage.changeUserPassword(changePassword, password);
        browser.sleep(5000);
    });
});