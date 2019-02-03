/**
 * Created by Korniiuk on 11/19/2018.
 */
describe("Validation related to User's functionality -----> ", () => {

    var loginPage = require('../../../pages/login.page');
    var navigation = require('../../../pages/navigation.page');
    var usersPage = require('../../../pages/users.page');
    var customersPage = require('../../../pages/customers.page');
    var chipFilterUtil = require('../../../utilities/chipFilterMatrix.utils');
    var tablesUtil = require('../../../utilities/tables.util');
    var userUtility = require('../../../utilities/user.util');
    var toastUtil = require('../../../utilities/toastMessage.util');
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var peopleNetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var divisionUserEmail = browser.params.testuseremails.divisionuser;
    var password = browser.params.adduser.password;
    var addUserRole2 = browser.params.roleslabels.customeruser;
    var testEmail = browser.params.adduser.email;
    var testFirstName = browser.params.adduser.firstname;
    var testLastName = browser.params.adduser.lastname;
    var testPhone = browser.params.adduser.phone;
    var orgType = browser.params.adduser.organizationtype.customer;
    var orgName = browser.params.testcustomer2.name;
    var orgRole = browser.params.roleslabels.vehiclegroupuser;
    var testUserId = browser.params.testuseruids.testUserUid;
    var vin = browser.params.vehicle.vin8;
    var orgNamePeterbilt = browser.params.manufacturer.name1;
    var vehicleGroups;
    var notification;
    var uid;
    var testCustomer = 'CustomEmail' + browser.params.testuseremails.customeruser;
    var toastMessage = `User ${testFirstName} ${testLastName} has been updated.`;

    browser.driver.manage().window().maximize();

    beforeAll(() => {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.clickUsersLink();
        usersPage.clickAddUserButton();
        usersPage.emailField.sendKeys(testEmail);
        usersPage.firstNameField.sendKeys(testFirstName);
        usersPage.lastNameField.sendKeys(testLastName);
        usersPage.phoneNumberField.sendKeys(testPhone);
        usersPage.newPasswordField.sendKeys(password);
        usersPage.cnfPasswordField.sendKeys(password);
        usersPage.selectOrgTypeDropdownItem(orgType);
        usersPage.selectOrgNameDropdownItem(orgName);
        usersPage.selectOrgRoleDropdownItem(orgRole);
        expect(usersPage.vehicleGroupField.isDisplayed()).toBe(true, 'Field do not displayed');
        usersPage.vehicleGroupField.click();
        customersPage.searchResultsList.last().getText()
            .then(text => {
                vehicleGroups = text;
            });
        customersPage.searchResultsList.last().click();
        usersPage.verifiedCheckBox.click();
        usersPage.saveBtn.click();
        browser.sleep(2000);
        browser.executeScript('window.localStorage.clear();');
    });

    afterAll(done => {
        return usersPage.deleteUserEndpoint(paccarAdminEmail, testUserId)
            .then(() => {
                done()
            });
    });

    beforeAll(() => {
        usersPage.addUserEndpoint(peopleNetAdminEmail, addUserRole2, testCustomer);
    });

    afterAll(done => {
        usersPage.deleteUserEndpoint(peopleNetAdminEmail, uid)
            .then(() => {
                done()
            });
    });

    afterEach(() => {
        browser.executeScript('window.localStorage.clear();');
    });

    it('TC-2796-1 Validation vehicle group type', () => {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.clickCustomersLink();
        navigation.applyChipFilter(chipFilterUtil.customers, orgName, 1);
        customersPage.clickCustomerHyperlinkCellSearch(orgName);
        customersPage.vehicleGroupsTab.click();
        customersPage.vehicleGroupsData.getText()
            .then(text => {
                expect(text).toContain(vehicleGroups, 'Wrong value')
            });
    });

    it('TC-2796-2 Validate vehicle', () => {
        loginPage.get();
        loginPage.login('paccar', testEmail, password);
        navigation.clickVehiclesLink();
        navigation.applyChipFilter(chipFilterUtil.vehicles, vin, 1);
        tablesUtil.verifyTableData();
    });

    it('TC-2850 Division user should see org name on user profile', () => {
        loginPage.get();
        loginPage.login('paccar', divisionUserEmail, password);
        navigation.clickUserMenu('paccar');
        navigation.clickUserProfileLink();
        navigation.breadCrumbs.$$('li').get(2).click();
        navigation.cardContent.getText()
            .then(text => {
                expect(text.toString()).toContain(orgNamePeterbilt, 'Wrong value')
            });
    });

    it('TC-2851 Change organization name of users with "Customer" ', () => {
        loginPage.get();
        loginPage.login('paccar', peopleNetAdminEmail, password);
        navigation.clickUsersLink();
        navigation.applyChipFilter(chipFilterUtil.users, testCustomer, 1);
        usersPage.clickUserEmailHyperLinkCellSearch(testCustomer);
        userUtility.getUidNumber()
            .then(result => {
                return uid = result;
            });
        usersPage.userDetailEditButton.click();
        usersPage.selectOrgNameDropdownItem(orgName);
        usersPage.saveBtn.click();
        toastUtil.verifyToastAlert(toastMessage);
        usersPage.userDetailEditButton.click();
        usersPage.notificationsTab.click();
        usersPage.textFromNotificationTab.get(1).getText()
            .then(text => {
                notification = text;
            });
        usersPage.profileTab.click();
        usersPage.orgNameField.getAttribute('value')
            .then(orgNameNew => {
                expect(orgNameNew).toBe(notification, 'Wrong organization name');
            })
    });
});