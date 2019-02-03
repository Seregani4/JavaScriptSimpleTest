/**
 * Created by Popazov on 10/23/2017.
 */


describe("User Add Page UI Validation -----> ", function () {

    var loginPage = require('../../../pages/login.page');
    var navigation = require('../../../pages/navigation.page');
    var userPage = require('../../../pages/users.page');
    var validationUtil = require('../../../utilities/validation.util');
    var tableUtil = require('../../../utilities/tables.util');
    var paccarAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;
    var perPageCustomer;
    var perPageNotification;
    var preferredUnits = ['English', 'Miles', 'Gallons', 'Degrees Fahrenheit', 'Pounds Per Square Inch', 'Pounds'];

    browser.driver.manage().window().maximize();

    beforeEach(() => {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
    });

    afterEach(() => {
        browser.executeScript('window.localStorage.clear();');
    });

    it('Validate the All fields and buttons on User Add page', () => {
        navigation.clickUsersLink();
        userPage.verifyUserListTableDataIsVisible();
        userPage.addUserButton.click();
        userPage.validatePreferredUnits(preferredUnits);
        userPage.validateAddUserUi();
    });

    it('TC-1014 Validate edit subscriptions', () => {
        navigation.customersLink.click();
        navigation.rowsPerPage.getText()
            .then(text => {
                perPageCustomer = text.substring(10);
            });
        navigation.userMenuButton.click();
        navigation.clickUserProfileLink();
        userPage.notificationsTab.click();
        userPage.notificationsPerPage.get(1).getText()
            .then(text1 => {
                perPageNotification = text1.substring(10);
                expect(perPageCustomer).toEqual(perPageNotification);
            });
        tableUtil.clickCheckBox(1);
        userPage.subscriptionListBox.click();
        userPage.subscribedList.click();
        tableUtil.verifyTableData(userPage.userNotificationsAllTableRows);
        tableUtil.clickCheckBox(1);
        tableUtil.verifyTableDataIsEmpty(userPage.userNotificationsAllTableRows);
        navigation.waitTillElementToBeClickable(userPage.subscriptionListBox);
        userPage.subscriptionListBox.click();
        userPage.textFromSubscriptionListBox.getText()
            .then(text => {
                validationUtil.validateTextContainArray(text, [
                    userPage.mapDropDownsValues.defaultValue.name,
                    userPage.mapDropDownsValues.subscribedValue.name,
                    userPage.mapDropDownsValues.unsubscribedValue.name
                ]);
            });
    });
});
