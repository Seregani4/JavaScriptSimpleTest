/**
 * Created by jelliott on 8/25/2016.
 */

describe("Verifying Filtering for Notification Page -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var validationUtil = require('../../../utilities/validation.util.js');
    var notificationPage = require('../../../pages/notifications.page.js');
    var usersPage = require('../../../pages/users.page.js');
    var tsr1Email = browser.params.testuseremails.tsr1;
    var tsr2Email = browser.params.testuseremails.tsr2;
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var dealerUserEmail = browser.params.testuseremails.dealeruser;
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var password = browser.params.adduser.password;
    var logInArray = [peoplenetAdminEmail, tsr1Email, tsr2Email];
    var emailAddress = browser.params.environment.mailosaurEmailAdress;

    var textAdminCustomer;
    var textDealerCustomer;
    var textAmountDealerEditCustomers;

    browser.driver.manage().window().maximize();

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    logInArray.forEach(function (eachUser) {

        it("Verify Filter as a " + eachUser + " Notifications Page", function () {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            navigation.clickNotificationsLink();
            notificationPage.verifyNotificationsData();
            navigation.chipFilter.sendKeys(emailAddress);
            navigation.chipFilter.sendKeys(protractor.Key.ENTER);
            notificationPage.verifyRecipient(emailAddress);
            notificationPage.verifyNotificationsData();
        });

    });

    it("TC 1706-1, get value from Admin account", function () {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.clickUserMenu('paccar');
        navigation.clickUserProfileLink();
        usersPage.notificationsTab.click();
        navigation.globalRowsCount.getText().then(function (text1) {
            textAdminCustomer = text1.substring(10);
        });
        navigation.usersLink.click();
        navigation.typeInSearchFilter(dealerUserEmail);
        usersPage.clickUserEmailHyperLinkCellSearch(dealerUserEmail);
        usersPage.userDetailEditButton.click();
        usersPage.notificationsTab.click();
        navigation.globalRowsCount.getText().then(function (text2) {
            textDealerCustomer = text2.substring(10);
        });
    });
    it("TC-1706-2, validate amount notification customers list", function () {
        loginPage.get();
        loginPage.login('paccar', dealerUserEmail, password);
        navigation.customersLink.click();
        navigation.globalRowsCount.getText().then(function (text3) {
            textAmountDealerEditCustomers = text3.substring(10);
            expect(textDealerCustomer).toEqual(textAmountDealerEditCustomers, "Error: incorrect value");
            expect(textDealerCustomer).not.toEqual(textAdminCustomer, "Error: incorrect value");
        });
    });
});