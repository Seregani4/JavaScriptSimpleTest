/**
 * Created by pshrestha on 6/27/2017.
 */

describe("Verify the notifications are not saved for more than 30 days -----> ",function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var notificationPage = require('../../../pages/notifications.page.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;

    browser.driver.manage().window().maximize();

    afterEach(function(){
        browser.executeScript('window.localStorage.clear();');
    });

    it('Peoplenet admin verifies the date range', function(){
        loginPage.get();
        loginPage.login('paccar', peoplenetAdminEmail, password);
        navigation.clickNotificationsLink();
        navigation.typeInSearchFilterRecommendation(browser.params.testuseremails.paccaradmin)
        notificationPage.lastPageButton.click();
        browser.sleep(1000);
        //Method to verify last notification date is exactly 30 days.
        notificationPage.verifyLastTimeStamp(true);
    });
});