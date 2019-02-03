const _ = require('lodash');

describe("Validation user's preference -----> ", () => {

    var loginPage = require('../../../pages/login.page');
    var navigation = require('../../../pages/navigation.page');
    var usersPage = require('../../../pages/users.page');
    var dropDownMatrix = require('../../../utilities/dropDownMatrix.util');
    var validationUtil = require('../../../utilities/validation.util');
    var preferenceUtil = require('../../../utilities/preference.util');
    var userUtil = require('../../../utilities/user.util');
    var unsubscribeEmail = "unsubscribeEmail@test.com";
    var peopleNetAdmin = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;

    browser.driver.manage().window().maximize();

    beforeEach(() => {
        browser.driver.get("about:blank");
        browser.sleep(1000);
        loginPage.get();
        loginPage.login('paccar', peopleNetAdmin, password);
        navigation.usersLink.click();
    });

    afterEach(() => {
        browser.executeScript('window.localStorage.clear();');
    });

    it(`TC-2476-1 Validate measurement functionality`, () => {
        usersPage.addUserButton.click();
        usersPage.measureClickable.click();
        navigation.waitTillElementToBeClickable(usersPage.textFromMeasure.first());
        usersPage.textFromMeasure.getText()
            .then(text => {
                navigation.waitTillElementToBeClickable(usersPage.usCustomaryValue);
                validationUtil.validateTextContainArray(text, [
                    dropDownMatrix.usCustomary,
                    dropDownMatrix.internationalSystem
                ]);
            });
        usersPage.textFromMeasure.first().click();
        _.forEach(preferenceUtil.dropDownMap, param => {
            navigation.waitTillElementToBeClickable(param.dropDownClickable);
            param.dropDownClickable.getText()
                .then(text => {
                    validationUtil.validateTextContainArray(text,
                        param.usCustomaryText
                    );
                })
        });
        usersPage.measureClickable.click();
        usersPage.textFromMeasure.last().click();
        _.forEach(preferenceUtil.dropDownMap, param => {
            navigation.waitTillElementToBeClickable(param.dropDownClickable);
            param.dropDownClickable.getText()
                .then(text => {
                    validationUtil.validateTextContainArray(text,
                        param.internationalText
                    );
                })
        });
        usersPage.measureClickable.click();
        usersPage.textFromMeasure.first().click();
        _.forEach(preferenceUtil.dropDownMap, param => {
            param.dropDownClickable.click();
            navigation.waitTillElementToBeClickable(param.internationalValue);
            param.internationalValue.click();
            usersPage.measureClickable.getText()
                .then(text => {
                    validationUtil.validateTextContainArray(text,
                        dropDownMatrix.custom
                    );
                    param.dropDownClickable.click();
                    navigation.waitTillElementToBeClickable(param.usCustomaryValue);
                    param.usCustomaryValue.click();
                    usersPage.measureClickable.getText()
                        .then(text => {
                            validationUtil.validateTextContainArray(text,
                                dropDownMatrix.usCustomary
                            );
                        });
                });
        });
    });

    _.forEach(preferenceUtil.createUserMap, param => {
        it(`TC-2476-2 Validate measurement system - ${param.preferredUnit}`, () => {
            usersPage.addUserButton.click();
            usersPage.addNewUser2(param.email,
                'active',
                browser.params.adduser.organizationtype.oem,
                'PACCA',
                browser.params.roleslabels.paccaradmin,
                dropDownMatrix.english,
                param.preferredUnit
            );
            usersPage.userDetailEditButton.click();
            userUtil.validatePreference(param.preferredUnit);
        })
    });

    _.forEach(preferenceUtil.createUserMap, param => {
        it(`TC-2476-3 Delete ${param.email}`, () => {
            userUtil.deleteUser(param.email);
        })
    });

    it(`TC-2476-4 Validate preferred unit according to customer's country`, () => {
        usersPage.addUserButton.click();
        _.forEach(preferenceUtil.customerMap, param => {
            usersPage.selectOrgTypeDropdownItem(param.orgType);
            usersPage.selectOrgNameDropdownItem(param.orgName);
            userUtil.validatePreference(param.preferredUnit);
        });
    });

    it('TC-2556-1 Validate unsubscribe button', () => {
        usersPage.addUserButton.click();
        usersPage.emailField.sendKeys(unsubscribeEmail);
        usersPage.firstNameField.sendKeys(browser.params.adduser.firstname);
        usersPage.lastNameField.sendKeys(browser.params.adduser.lastname);
        usersPage.phoneNumberField.sendKeys(browser.params.adduser.phone);
        usersPage.newPasswordField.sendKeys(password);
        usersPage.cnfPasswordField.sendKeys(password);
        usersPage.selectOrgTypeDropdownItem(browser.params.adduser.organizationtype.oem);
        usersPage.selectOrgNameDropdownItem('PACCA');
        usersPage.selectOrgRoleDropdownItem(browser.params.roleslabels.paccaradmin);
        usersPage.verifiedCheckBox.click();
        navigation.waitTillElementToBeClickable(usersPage.saveBtn);
        usersPage.saveBtn.click();
        usersPage.checkBoxes.get(4).click();
        expect(usersPage.checkBoxes.get(4).getAttribute('aria-checked')).toBe('true', `Checkbox wasn't check`);
        usersPage.unsubscribeFromAllBtn.click();
        expect(usersPage.checkBoxes.get(4).getAttribute('aria-checked')).toBe('false', `Checkbox wasn't uncheck`);
        usersPage.finishButton.click();
    });

    it(`TC-2556-2 Delete ${unsubscribeEmail}`, () => {
        userUtil.deleteUser(unsubscribeEmail);
    })
});