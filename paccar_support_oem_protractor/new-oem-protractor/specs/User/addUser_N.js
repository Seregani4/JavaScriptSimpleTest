const _ = require('lodash');

describe("Notifications Section of the Add User Page -----> ", () => {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var usersPage = require('../../../pages/users.page.js');
    var userUtil = require('../../../utilities/user.util.js');
    var peopleNetAdmin = browser.params.testuseremails.peoplenetadmin;
    var testCustomer = browser.params.testcustomer2.name;
    var password = browser.params.adduser.password;
    var userPswd = browser.params.adduser.password;
    var testEmail = 'testUser1@test.com';
    let orgTypes=  browser.params.adduser.organizationtype;
    let orgRoles=  browser.params.roleslabels;

    browser.driver.manage().window().maximize();

    beforeEach(() => {
        browser.driver.get("about:blank");
    });

    afterEach(() => {
        browser.executeScript('window.localStorage.clear();');
    });


    var validationMap = [
        {//customerAdmin
            orgType: orgTypes.customer,
            orgName: testCustomer,
            orgRole: orgRoles.customeradmin,
        },
        {//dealerAdmin
            orgType: orgTypes.dealer,
            orgName: 'Peterbilt Pacific - Abbotsfor',
            orgRole: "Dealer Admin",
        },
        {//dealerOwnerAdmin
            orgType: orgTypes.dealerOwner,
            orgName: 'Auto DOG (DO NOT EDIT)',
            orgRole: orgRoles.dealerowneradmin,
        },
        {//dealerRegionAdmin
            orgType: orgTypes.dealerRegion,
            orgName: 'Auto Region (Do not edit)',
            orgRole: orgRoles.dealerregionadmin,
        },
        {//paccarAdmin
            orgType: orgTypes.oem,
            orgName: 'PACCA',
            orgRole: orgRoles.paccaradmin,
        },
    ];

    _.forEach(validationMap, param => {

        it(`TC1865-1 Create testUser for test, organization type = ${param.orgType}`, () => {
            loginPage.get();
            loginPage.login('paccar', peopleNetAdmin, password);
            navigation.usersLink.click();
            usersPage.addUserButton.click();
            usersPage.emailField.sendKeys(testEmail);
            usersPage.firstNameField.sendKeys(browser.params.adduser.firstname);
            usersPage.lastNameField.sendKeys(browser.params.adduser.lastname);
            usersPage.phoneNumberField.sendKeys(browser.params.adduser.phone);
            usersPage.newPasswordField.sendKeys(userPswd);
            usersPage.cnfPasswordField.sendKeys(userPswd);
            if (param['orgType'] !== orgTypes.dealer) {
                usersPage.selectOrgTypeDropdownItem(param['orgType']);
            } else {
                usersPage.orgTypeField.click();
                browser.sleep(2000);
                usersPage.dealerOrgType.click();
            }
            usersPage.selectOrgNameDropdownItem(param['orgName']);
            usersPage.selectOrgRoleDropdownItem(param['orgRole']);
            expect(usersPage.activeCheckBox.isPresent()).toBe(true);
            usersPage.verifiedCheckBox.click();
            navigation.waitTillElementToBeClickable(usersPage.saveBtn);
            usersPage.saveBtn.click();
            if (param['orgType'] === orgTypes.customer) {
                expect(usersPage.allUserRows.get(0).getText()).toBe(param['orgName'], 'Wrong subscribe name');
                expect(usersPage.allNotifications.getAttribute('aria-checked')).toBe('true', 'Radio button all did not check');
                expect(usersPage.subscriptionListBox.getText()).toBe(usersPage.mapDropDownsValues.subscribedValue.name, 'Wrong value into dropdown');
                usersPage.subscribeUserToFirstInRow();
            } else if (param['orgType'] === orgTypes.oem) {
                expect(usersPage.allNotifications.getAttribute('aria-checked')).toBe('true', 'Radio button all did not check');
                expect(usersPage.subscriptionListBox.getText()).toBe(usersPage.mapDropDownsValues.defaultValue.name, 'Wrong value into dropdown');
            } else if (param['orgType'] === orgTypes.dealer || orgTypes.dealerOwner || orgTypes.dealerRegion) {
                expect(usersPage.allUserRows.getText()).toContain('abc Trucking (Do not edit)', 'Wrong subscribe name');
                expect(usersPage.allNotifications.getAttribute('aria-checked')).toBe('true', 'Radio button all did not check');
                expect(usersPage.subscriptionListBox.getText()).toBe(usersPage.mapDropDownsValues.subscribedValue.name, 'Wrong value into dropdown');
                usersPage.subscribeUserToFirstInRow();
            }
            usersPage.verifyNotificationOptions();
            usersPage.finishButton.click();
        });

        it(`TC1865-2 Delete user ${testEmail} and verify user deletion`, () => {
            loginPage.get();
            loginPage.login('paccar', peopleNetAdmin, password);
            userUtil.deleteUser(testEmail);
        });
    });
});