/**
 * Created by Korniiuk on 01/30/2018.
 */

describe("Verify Spanish translations on the User page -----> ", function () {

    var loginPage = require('../../../pages/login.page');
    var navigation = require('../../../pages/navigation.page');
    var usersPage = require('../../../pages/users.page');
    var kenMexUtil = require('../../../utilities/kenMex.util');
    var toastMessage = require('../../../utilities/toastMessage.util');
    var validationUtil = require('../../../utilities/validation.util');
    var translation = require('../../../json/kenmex');
    var spanishOemAdmin = browser.params.testuseremails.kenmexpaccaradmin;
    var spanishSuperAdmin = browser.params.testuseremails.kenmexsuperadmin;
    var paccarUser = browser.params.testuseremails.paccaruser;
    var password = browser.params.adduser.password;
    var newPassword = browser.params.adduser.newpassword;

    browser.driver.manage().window().maximize();

    beforeEach(() => {
        loginPage.get();
    });

    afterEach(() => {
        browser.executeScript('window.localStorage.clear();');
    });

    it('TC-491 Validate translations on the user page', () => {
        loginPage.login('paccar', spanishOemAdmin, password);
        navigation.usersLink.click();
        kenMexUtil.validateUserPage(translation);
        kenMexUtil.validateUserProfilePage(translation);
    });

    it('Validate translations on the user details page', () => {
        loginPage.login('paccar', spanishOemAdmin, password);
        navigation.usersLink.click();
        navigation.chipFilterSendKeys(spanishOemAdmin);
        expect(usersPage.userEmailSelector.getText()).toBe(spanishOemAdmin, 'Found incorrect user');
        kenMexUtil.validateUserDetails(translation);
    });

    it('TC-520-497 Validate translation on the user notification page', () => {
        loginPage.login('paccar', spanishOemAdmin, password);
        navigation.usersLink.click();
        navigation.chipFilterSendKeys(spanishOemAdmin);
        expect(usersPage.userEmailSelector.getText()).toBe(spanishOemAdmin, 'Found incorrect user');
        kenMexUtil.validateUserNotificationPage(translation);
        usersPage.allNotifications.getAttribute('aria-checked')
            .then(text => {
                if (text === 'true') {
                    usersPage.noEmailNotifications.click();
                    toastMessage.verifyToastAlert(translation.notification.notificationPreferenceUpdatedSuccessfully);
                    usersPage.allNotifications.click();
                } else {
                    usersPage.allNotifications.click();
                    navigation.waitTillElementToBeClickable(usersPage.noEmailNotifications);
                    usersPage.noEmailNotifications.click();
                    toastMessage.verifyToastAlert(translation.notification.notificationPreferenceUpdatedSuccessfully);
                }
            })
    });

    it('TC-905 Validate translation on the user vehicle group page ', () => {
        loginPage.login('paccar', spanishOemAdmin, password);
        navigation.usersLink.click();
        navigation.chipFilterSendKeys(spanishOemAdmin);
        expect(usersPage.userEmailSelector.getText()).toBe(spanishOemAdmin, 'Found incorrect user');
        kenMexUtil.validateUserVehicleGroupPage(translation);
    });

    it('TC-492 Validate translation on the user edit profile page', () => {
        loginPage.login('paccar', spanishOemAdmin, password);
        navigation.usersLink.click();
        navigation.chipFilterSendKeys(paccarUser);
        expect(usersPage.userEmailSelector.getText()).toBe(paccarUser, 'Found incorrect user');
        kenMexUtil.validateUserEditPage(translation);
    });

    it('TC-499-500 Validate translation on the user security page', () => {
        loginPage.login('paccar', spanishOemAdmin, password);
        navigation.usersLink.click();
        navigation.chipFilterSendKeys(spanishOemAdmin);
        expect(usersPage.userEmailSelector.getText()).toBe(spanishOemAdmin, 'Found incorrect user');
        kenMexUtil.validateUserSecurityPage(translation, spanishOemAdmin);
    });

    it('TC-501 Validate warning message on email field, security page', () => {
        loginPage.login('paccar', spanishOemAdmin, password);
        navigation.userMenuButton.click();
        navigation.clickUserProfileLink();
        kenMexUtil.validateWarningMessageSecurityPage(
            translation.userPage.security.incorrectEmail,
            navigation.allTabs.get(1),
            usersPage.emailFieldSecurityPage,
            usersPage.newPasswordField,
            usersPage.warningMessage.last(),
            'test@test.');
        browser.refresh();
        kenMexUtil.validateWarningMessageSecurityPage(
            translation.userPage.security.emailIsRequired,
            navigation.allTabs.get(1),
            usersPage.emailFieldSecurityPage,
            usersPage.newPasswordField,
            usersPage.warningMessage.last(),
            '');
    });

    it('TC-502-1 Validate change password on security page', () => {
        loginPage.login('paccar', spanishOemAdmin, password);
        navigation.userMenuButton.click();
        navigation.clickUserProfileLink();
        navigation.allTabs.get(1).click();
        usersPage.changeUserPassword(password, newPassword);
        toastMessage.verifyToastAlert(translation.userPage.security.yourPasswordHasBeenUpdated);
    });

    it('TC-502-2 Revert password after change', () => {
        loginPage.login('paccar', spanishOemAdmin, newPassword);
        navigation.userMenuButton.click();
        navigation.clickUserProfileLink();
        navigation.allTabs.get(1).click();
        usersPage.changeUserPassword(newPassword, password);
        toastMessage.verifyToastAlert(translation.userPage.security.yourPasswordHasBeenUpdated);
    });

    it('TC-503 Validate warning/error messages on security page', () => {
        loginPage.login('paccar', spanishOemAdmin, password);
        navigation.userMenuButton.click();
        navigation.clickUserProfileLink();
        kenMexUtil.validateWarningMessageSecurityPage(
            translation.userPage.security.passwordIsRequired,
            navigation.allTabs.get(1),
            usersPage.crntPasswordField,
            usersPage.emailFieldSecurityPage,
            usersPage.warningMessageText,
            '');
        browser.refresh();
        kenMexUtil.validateWarningMessageSecurityPage(
            translation.userPage.security.newPasswordCannotBeBlank,
            navigation.allTabs.get(1),
            usersPage.newPasswordField,
            usersPage.emailFieldSecurityPage,
            usersPage.warningMessageText,
            '');
        browser.refresh();
        kenMexUtil.validateWarningMessageSecurityPage(
            translation.userPage.security.passwordAndConfirmFieldsAreNotEqual,
            navigation.allTabs.get(1),
            usersPage.cnfPasswordField,
            usersPage.emailFieldSecurityPage,
            usersPage.warningCnfPasswordMessage,
            'test');
    });

    it('TC-523 Validate toast/error message on security page', () => {
        loginPage.login('paccar', spanishOemAdmin, password);
        navigation.userMenuButton.click();
        navigation.clickUserProfileLink();
        navigation.allTabs.get(1).click();
        usersPage.changeUserPassword(newPassword, password);
        toastMessage.verifyToastAlert(translation.userPage.security.passwordIsIncorrect);
        usersPage.changeUserPassword(password, password);
        usersPage.warningMessage.getText()
            .then(text => {
                validationUtil.validateTextContainArray(text, translation.userPage.security.passwordMustBeDifferent);
            });
        browser.refresh();
        navigation.allTabs.get(1).click();
        usersPage.changeUserPassword(password, '123');
        toastMessage.verifyToastAlert(translation.userPage.security.passwordRequirements);
        usersPage.changeUserPassword(password, 'Pass1');
        toastMessage.verifyToastAlert(translation.userPage.security.passwordMustBeAtLast8Characters);
    });

    it('Validate TAGs tab on user edit page', () => {
        loginPage.login('paccar', spanishSuperAdmin, password);
        navigation.userMenuButton.click();
        navigation.clickUserProfileLink();
        kenMexUtil.validateTagsTab(translation)
    });

    it('TC-524,617-622 Validate warning/error message on add user page PVP-5447 ', () => {
        loginPage.login('paccar', spanishOemAdmin, password);
        navigation.usersLink.click();
        usersPage.addUserButton.click();
        kenMexUtil.validateWarningMessageAddUserPage(translation);
    });

    it('TC-2672 Validate translation from the roles dropdown menu', () => {
        loginPage.login('paccar', spanishOemAdmin, password);
        navigation.usersLink.click();
        navigation.chipFilterDropDownButton.click();
        navigation.waitTillElementToBeClickable(navigation.chipFilterDropDown.get(0));
        navigation.selectChipFilterByText(translation.menu.roles);
        validationUtil.validateAllTextFromSuggestionsDropDown(
            navigation.chipFilterSuggestionDropDown,
            [
                translation.roles.dealerAdministrator,
                translation.roles.dealerPowerUser,
                translation.roles.dealerServiceTechnician,
                translation.roles.factoryWorker,
                translation.roles.oemAdministrator,
                translation.roles.oemPowerUser,
                translation.roles.oemUser,
                translation.roles.customerService,
                translation.roles.customerAdministrator,
                translation.roles.customerUser,
                translation.roles.dealerOwnerAdmin,
                translation.roles.dealerOwnerUser,
                translation.roles.dealerRegionAdmin,
                translation.roles.dealerRegionUser,
                translation.roles.cumminsUser,
                translation.roles.vehicleGroupUser
            ],
            navigation.chipFilter);
    });
});
