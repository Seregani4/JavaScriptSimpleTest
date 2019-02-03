/**
 * Created by tbui on 4/25/2016.
 */

describe("Paccar Portal - Security Gateway Smoke Tests -----> ", () => {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var usersPage = require('../../../pages/users.page.js');
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var addUserEmail = browser.params.adduser.email;
    var editUserFirstName = browser.params.edituser.firstname;
    var editUserLastName = browser.params.edituser.lastname;
    var editUserPhoneNumber = browser.params.edituser.formattedphone;
    var password = browser.params.adduser.password;
    var dealerAdminRole = browser.params.roleslabels.dealeradmin;// 'Dealer Admin';

    browser.driver.manage().window().maximize();

    afterEach(() => {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    // it("Cleanup Edit User data", () =>{
    //     loginPage.get();
    //     usersPage.delete('edit user');
    // });

    it("Paccar role has visibility to all proper links", () => {
        //log in
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        expect(navigation.customersLink.isDisplayed()).toBe(true);
        expect(navigation.dealersLink.isDisplayed()).toBe(true);
        expect(navigation.vehiclesLink.isDisplayed()).toBe(true);
        //admin child links present
        expect(navigation.analyticsLink.isDisplayed()).toBe(true);
        expect(navigation.devicesLink.isDisplayed()).toBe(false);
        expect(navigation.manufacturersLink.isDisplayed()).toBe(false);
        expect(navigation.notificationsLink.isDisplayed()).toBe(true);
        expect(navigation.oemsLink.isDisplayed()).toBe(false);
        expect(navigation.rolesLink.isDisplayed()).toBe(false);
        expect(navigation.topTenFaultsLink.isDisplayed()).toBe(true);
        expect(navigation.usersLink.isDisplayed()).toBe(true);
    });

    it("As a Paccar Admin, I add a verified Dealer Admin", () => {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.clickUsersLink();
        usersPage.clickAddUserButton();
        usersPage.addNewUser(addUserEmail, dealerAdminRole, 'active');
        navigation.clickUsersLink();
        navigation.typeInSearchFilter(addUserEmail);
        usersPage.verifyUserID(addUserEmail);
    });

    it("As a Paccar Admin, I edit a Dealer Admin", () => {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.clickUsersLink();
        navigation.typeInSearchFilter(addUserEmail);
        usersPage.clickUserCheckbox(addUserEmail);
        navigation.editActionButton.click();
        usersPage.editFirstName(editUserFirstName);
        usersPage.editLastName(editUserLastName);
        usersPage.editPhoneNumber(editUserPhoneNumber);
        usersPage.clickSaveBtn();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/user/details/');
        navigation.clickUsersLink();
        navigation.typeInSearchFilter(addUserEmail);
        usersPage.verifyFullName(addUserEmail, editUserFirstName, editUserLastName);
        usersPage.verifyPhoneNumber(addUserEmail, editUserPhoneNumber);
        usersPage.verifyActiveStatus(addUserEmail, 'Active');
        navigation.clickDashboardLink();
    });

    it("Change user status from active to inactive", () => {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.clickUsersLink();
        navigation.typeInSearchFilter(addUserEmail);
        usersPage.clickUserCheckbox(addUserEmail);
        navigation.editActionButton.click();
        usersPage.uncheckStatusCheckbox();
        usersPage.clickSaveBtn();
        navigation.clickUsersLink();
        navigation.typeInSearchFilter(addUserEmail);
        usersPage.verifyActiveStatus(addUserEmail, 'Inactive');
        navigation.logOut();
    });

    it("Verify inactive test user is unable to login", () => {
        loginPage.get();
        loginPage.failedLogin(addUserEmail, password);
    });

    it("Change user status from inactive to active", () => {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.clickUsersLink();
        navigation.typeInSearchFilter(addUserEmail);
        usersPage.clickUserCheckbox(addUserEmail);
        navigation.editActionButton.click();
        usersPage.checkStatusCheckbox();
        usersPage.clickSaveBtn();
        navigation.clickUsersLink();
        navigation.typeInSearchFilter(addUserEmail);
        usersPage.verifyActiveStatus(addUserEmail, 'Active');
        navigation.logOut();
    });

    it("Delete the test user and verify that they are no longer in the User List", () => {
        //usersPage.delete("edit user");
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.clickUsersLink();
        navigation.typeInSearchFilter(addUserEmail);
        usersPage.clickUserCheckbox(browser.params.adduser.email);
        navigation.deleteActionButton.click();
        navigation.deleteDialogButton.click();
        navigation.clickUsersLink();
        navigation.typeInSearchFilter(addUserEmail);
        usersPage.verifyUserIsNotInUserList(addUserEmail);
        navigation.clickDashboardLink();
    });
});