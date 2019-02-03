/**
 * Created by pshrestha on 9/6/2017.
 */

describe("Verify the notifications are Enabled for OEM admin -----> ",function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var notificationPage = require('../../../pages/notifications.page.js');
    var dealersPage = require('../../../pages/dealers.page.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var dealerAdminEmail = browser.params.testuseremails.dealeradmin;
    var password = browser.params.adduser.password;
    var dealerEntity = 'dealers';
    var testExport = 'Exported data';

    browser.driver.manage().window().maximize();

    afterEach(function(){
        browser.executeScript('window.localStorage.clear();');
    });

    it('Dealer Admin does an export to generate a notification', function(){
        loginPage.get();
        loginPage.login('paccar', dealerAdminEmail, password);
        navigation.dataExport(dealerEntity);
        browser.sleep(2000);
        navigation.clickDashboardLink();
    });

    //Change login user to OEM admin after the changes are made in QA.
    it('People net admin verifies the notification', function(){
        loginPage.get();
        loginPage.login('paccar', peoplenetAdminEmail, password);
        navigation.clickNotificationsLink();
        notificationPage.verifyNotificationsData();
        navigation.typeInSearchFilterRecommendation(dealerAdminEmail)
        notificationPage.verifyNotificationHeader(testExport);
        notificationPage.verifyRecipient(dealerAdminEmail);
    });
});