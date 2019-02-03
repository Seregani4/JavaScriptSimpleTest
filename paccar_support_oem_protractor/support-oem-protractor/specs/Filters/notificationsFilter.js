/**
 * Created by jelliott on 8/25/2016.
 */

describe("Verifying Filtering for Notification Page ----- ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var notificationPage = require('../../../pages/notifications.page.js');
    var tsr2Email = browser.params.testuseremails.tsr2;
    var tsr1Email = browser.params.testuseremails.tsr1;
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;
    var loginUserArray = [peoplenetAdminEmail, tsr1Email, tsr2Email];
    browser.driver.manage().window().maximize();

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    loginUserArray.forEach(function (eachUser) {
        it("Verify Filter as a " + eachUser + "  on Notifications Page", function () {
            loginPage.get();
            loginPage.login('supportal', eachUser, password);
            navigation.deviceManagementButton.click();
            navigation.clickNotificationsLink();
            notificationPage.verifyNotificationsData();
            navigation.chipFilter.sendKeys(eachUser);
            navigation.chipFilter.sendKeys(protractor.Key.ENTER);
            notificationPage.verifyRecipient(eachUser);
            notificationPage.verifyNotificationsData();
        });
    });
}, 500000);