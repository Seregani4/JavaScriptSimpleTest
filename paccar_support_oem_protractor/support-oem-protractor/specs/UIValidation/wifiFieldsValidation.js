/**
 * Created by Cottomoeller on 5/9/2016.
 */
describe("Verifying Notifications ----- ", function(){

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var wifiPage = require('../../../pages/wifi.page.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.edituser.password;
    var changePassword = browser.params.edituser.changePassword;

    browser.driver.manage().window().maximize();

    afterEach(function() {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("Change Password and verify Notification", function() {
        loginPage.get();
        loginPage.login('supportal', peoplenetAdminEmail, password);
        navigation.deviceManagementButton.click();
        navigation.clickWiFiLink();
        wifiPage.verifyWiFiData();
    });
});