describe(`Other email's validation`, function () {

    var loginPage = require('../../../pages/login.page');
    var navigation = require('../../../pages/navigation.page');
    var usersPage = require('../../../pages/users.page');
    var emailUtil = require('../../../utilities/email.util');
    var validationUtil = require('../../../utilities/validation.util');
    var userUtil = require('../../../utilities/user.util');
    var toastMessageUtil = require('../../../utilities/toastMessage.util');
    var resetPasswordLink = browser.params.environment.url + '/#/resetPassword/';
    var undoEmailChangeLink = browser.params.environment.url + '/#/undoEmailChange/';
    var verifyEmailLink = browser.params.environment.url + '/#/verifyEmail/';
    var thisPortal = 'paccar';
    var peopleNetAdmin = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;
    var newPassword = browser.params.adduser.newpassword;
    var emailVerifyLink1;
    var emailVerifyLink2;
    var emailUndoLink;
    var emailResetLink;
    var randomInt = Math.floor(Math.random() * 100 + 1);
    var additionalEmailPart = `test${randomInt}`;
    const _ = require('lodash');

        beforeEach(done => {
            browser.driver.manage().window().maximize();
            emailUtil.deleteAllEmails()
                .then(loginPage.get())
                .then(() => done());
        });

        afterEach(done => {
            browser.executeScript('window.localStorage.clear();')
                .then(() => {
                    done()
                })
        });

    _.forEach(emailUtil.emailMap, param => {

        it('TC-1899-1 Delete test user', () => {
            loginPage.login('paccar', peopleNetAdmin, password);
            navigation.usersLink.click();
            navigation.typeInSearchFilter(param.mailosaurUser);
            usersPage.clickUserCheckbox(param.mailosaurUser);
            navigation.deleteActionButton.click();
            navigation.deleteDialogButton.click();
            navigation.clearAllFiltersButton.click();
            userUtil.verifyUserDeletion(param.mailosaurUser);
        });

        it('TC-1899-2 Validate email after registration new user', done => {
            loginPage.login('paccar', peopleNetAdmin, password);
            navigation.usersLink.click();
            usersPage.addUserButton.click()
                .then(() => usersPage.addNewUser2(
                    param.mailosaurUser,
                    'active',
                    browser.params.adduser.organizationtype.oem,
                    'PACCA',
                    browser.params.roleslabels.paccaradmin,
                    param.language
                ))
                .then(() => emailUtil.validateRegistrationEmail(param.registrationSbj, emailUtil.logoPaccar, param.mailosaurUser))
                .then(() => done());
        });

        it(`TC-444-1 Change Email - Email Notification Link ${param.mailosaurUser}`, done => {
            loginPage.login('paccar', param.mailosaurUser, password);
            navigation.clickUserMenu(thisPortal);
            navigation.clickUserProfileLink();
            navigation.waitTillElementToBeClickable(element(by.cssContainingText('md-tab-item', param.security)));
            usersPage.selectUserTab(param.security);
            usersPage.changeEmailField.clear();
            usersPage.changeEmailField.sendKeys(additionalEmailPart + param.mailosaurUser);
            usersPage.changeEmailBtn.click();
            navigation.waitTillElementToBeClickable(usersPage.saveDialogBtn);
            usersPage.saveDialogBtn.click()
                .then(() => emailUtil.validateEmail(param.verifyYourEmail, emailUtil.logoPaccar, additionalEmailPart + param.mailosaurUser, verifyEmailLink))
                .then(linkFromEmail => {
                    emailVerifyLink1 = linkFromEmail;
                    return emailUtil.validateEmail(param.emailHasBeenChanged, emailUtil.logoPaccar, param.mailosaurUser, undoEmailChangeLink)
                })
                .then(linkFromEmail => emailUndoLink = linkFromEmail);
            navigation.waitTillElementToBeClickable(element(by.cssContainingText('md-tab-item', param.profile)));
            usersPage.selectUserTab(param.profile);
            browser.refresh();
            navigation.waitTillElementToBeClickable(usersPage.verifiedCheckBox);
            usersPage.verifiedCheckBox.getAttribute('aria-checked').then(checkBoxStatus => {
                if (checkBoxStatus === 'false')
                    usersPage.verifiedCheckBox.click();
            });
            usersPage.saveBtn.click()
                .then(() => done());
        });

        it(`TC-613 Verify link from email ${additionalEmailPart}${param.mailosaurUser}`, () => {
            emailVerifyLink1.toString();
            browser.get(emailVerifyLink1);
            toastMessageUtil.verifyToastAlert(param.verifyToastMessage);
        });

        it(`TC-444-2 Change test email to ${additionalEmailPart}${param.mailosaurUser}`, () => {
            loginPage.login('paccar', additionalEmailPart + param.mailosaurUser, password);
            navigation.clickUserMenu(thisPortal);
            navigation.clickUserProfileLink();
            navigation.waitTillElementToBeClickable(element(by.cssContainingText('md-tab-item', param.security)));
            usersPage.selectUserTab(param.security);
            usersPage.changeEmailField.clear();
            usersPage.changeEmailField.sendKeys(param.mailosaurUser);
            usersPage.changeEmailBtn.click();
            navigation.waitTillElementToBeClickable(usersPage.saveDialogBtn);
            usersPage.saveDialogBtn.click();
            navigation.waitTillElementToBeClickable(element(by.cssContainingText('md-tab-item', param.profile)));
            usersPage.selectUserTab(param.profile);
            browser.refresh();
            navigation.waitTillElementToBeClickable(usersPage.verifiedCheckBox);
            usersPage.verifiedCheckBox.getAttribute('aria-checked').then(checkBoxStatus => {
                if (checkBoxStatus === 'false') {
                    usersPage.verifiedCheckBox.click();
                }
            });
            usersPage.saveBtn.click()
        });

        it(`TC-1290-1 Verify undo link from email ${param.mailosaurUser}`, done => {
            loginPage.login('paccar', param.mailosaurUser, password);
            navigation.clickUserMenu(thisPortal);
            navigation.clickUserProfileLink();
            navigation.waitTillElementToBeClickable(element(by.cssContainingText('md-tab-item', param.security)));
            usersPage.selectUserTab(param.security);
            usersPage.changeEmailField.clear();
            usersPage.changeEmailField.sendKeys(additionalEmailPart + param.mailosaurUser);
            usersPage.changeEmailBtn.click();
            navigation.waitTillElementToBeClickable(usersPage.saveDialogBtn);
            usersPage.saveDialogBtn.click()
                .then(() => {
                    return emailUtil.validateEmail(param.emailHasBeenChanged, emailUtil.logoPaccar, param.mailosaurUser, undoEmailChangeLink)
                })
                .then(linkFromEmail => emailUndoLink = linkFromEmail);
            navigation.waitTillElementToBeClickable(element(by.cssContainingText('md-tab-item', param.profile)));
            usersPage.selectUserTab(param.profile);
            browser.refresh();
            navigation.waitTillElementToBeClickable(usersPage.verifiedCheckBox);
            usersPage.verifiedCheckBox.getAttribute('aria-checked').then(checkBoxStatus => {
                if (checkBoxStatus === 'false')
                    usersPage.verifiedCheckBox.click();
            });
            usersPage.saveBtn.click();
            emailUndoLink.toString();
            browser.get(emailUndoLink);
            toastMessageUtil.verifyToastAlert(param.emailHasBeenChangedToast);
            browser.sleep(1)
                .then(() => {
                    return emailUtil.validateEmail(param.verifyYourEmail, emailUtil.logoPaccar, param.mailosaurUser, verifyEmailLink)
                })
                .then(linkFromEmail => {
                    emailVerifyLink2 = linkFromEmail;
                    emailVerifyLink2.toString();
                    browser.get(emailVerifyLink2);
                    toastMessageUtil.verifyToastAlert(param.verifyToastMessage)
                })
                .then(() => done());
        });

        it(`TC-1290-2 Verify undo link from email ${param.mailosaurUser}`, () => {
            loginPage.login('paccar', param.mailosaurUser, password);
            navigation.clickUserMenu(thisPortal);
            navigation.clickUserProfileLink();
            usersPage.verifiedCheckBox.getAttribute('aria-checked').then(checkBoxStatus => {
                if (checkBoxStatus === 'false')
                    usersPage.verifiedCheckBox.click();
            });
            usersPage.saveBtn.click();
        });

        it(`TC-1580 Forgot password ${param.mailosaurUser}`, done => {
            loginPage.changePasswordButton.click();
            loginPage.emailField.sendKeys(param.mailosaurUser);
            loginPage.emailButton.click()
                .then(() => {
                    return emailUtil.validateEmail(param.resetPasswordSbj, emailUtil.logoPaccar, param.mailosaurUser, resetPasswordLink)
                })
                .then(linkFromEmail => emailResetLink = linkFromEmail)
                .then(() => done());
        });

        it(`TC-973 Validate reset password page ${param.mailosaurUser}`, () => {
            emailResetLink.toString();
            browser.get(emailResetLink);
            navigation.cardContent.getText()
                .then(text => {
                    validationUtil.validateTextContainArray(text, [
                        param.requireResetPage1,
                        param.requireResetPage2,
                        param.requireResetPage3,
                        param.requireResetPage4,
                        param.requireResetPage5
                    ])
                });
            loginPage.password.sendKeys('1');
            loginPage.confirmPassword.sendKeys('1');
            loginPage.resetBtn.click();
            toastMessageUtil.verifyToastAlert(param.resetPasswordToast);
        });

        it(`TC-1581-1 Change user's password ${param.mailosaurUser} from ${password} to ${newPassword}`, done => {
            loginPage.login('paccar', param.mailosaurUser, password);
            navigation.clickUserMenu(thisPortal);
            navigation.clickUserProfileLink();
            navigation.waitTillElementToBeClickable(element(by.cssContainingText('md-tab-item', param.security)));
            usersPage.selectUserTab(param.security);
            usersPage.changeUserPassword(password, newPassword);
            browser.sleep(1)
                .then(() => emailUtil.validateChangePasswordEmail(param.changePasswordSbj, emailUtil.logoPaccar, param.mailosaurUser))
                .then(() => done());
        });

        it(`TC-1581-2 Return additional password = ${password} for user = ${param.mailosaurUser}`, () => {
            loginPage.login('paccar', param.mailosaurUser, newPassword);
            navigation.clickUserMenu(thisPortal);
            navigation.clickUserProfileLink();
            navigation.waitTillElementToBeClickable(element(by.cssContainingText('md-tab-item', param.security)));
            usersPage.selectUserTab(param.security);
            usersPage.changeUserPassword(newPassword, password);
        });
    });
});