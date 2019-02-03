/**
 * Created by jelliott on 1/24/2017.
 */

describe("Validate Error Message when a password does not meet requirement -----> ", () => {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var usersPage = require('../../../pages/users.page.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var dealerAdminEmail = browser.params.testuseremails.dealeradmin;
    var dealerUserEmail = browser.params.testuseremails.dealeruser;
    var customerAdminEmail = browser.params.testuseremails.customeradmin;
    var testUserEmail = 'passwordErrorMessageUser@test.com';
    var password = browser.params.adduser.password;
    var loginUserArray = [peoplenetAdminEmail, paccarAdminEmail, customerAdminEmail];
    var wrongPasswordArray = ['aaaa', '1111', 'FFFFF', '#$%^&*', 'sdfd2343'];

    browser.driver.manage().window().maximize();

    beforeEach(() => {
        // Get a fresh Angular "session" so we can avoid bootstrapping errors
        browser.driver.get("about:blank");
        browser.sleep(1000);
    });

    afterEach(() => {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("As Users, Create a New User with the wrong password format", () => {
        loginUserArray.forEach((eachUser) => {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            navigation.clickUsersLink();
            usersPage.clickAddUserButton();
            usersPage.emailField.sendKeys(testUserEmail);
            usersPage.firstNameField.sendKeys(browser.params.adduser.firstname);
            usersPage.lastNameField.sendKeys(browser.params.adduser.lastname);
            usersPage.phoneNumberField.sendKeys(browser.params.adduser.phone);
            usersPage.selectOrgTypeDropdownItem(browser.params.adduser.organizationtype.customer);
            if (eachUser === customerAdminEmail) {
                usersPage.validateDisabledFields('paccar');
            }
            else {
                usersPage.selectOrgNameDropdownItem(browser.params.adduser.organizationname.customer);
            }
            usersPage.selectOrgRoleDropdownItem(browser.params.roleslabels.customeradmin);
            usersPage.verifiedCheckBox.click();
            browser.sleep(2000);
            wrongPasswordArray.filter((wrongPassword) => {
                usersPage.newPasswordField.sendKeys(wrongPassword);
                usersPage.cnfPasswordField.sendKeys(wrongPassword);
                browser.sleep(5000);
                usersPage.saveBtn.click();
                expect(browser.getCurrentUrl()).toBe(browser.params.environment.url + '/#/nav/user/add', 'passwordErrorMessage Test Failed for this User:' + eachUser);
                usersPage.newPasswordField.clear();
                usersPage.cnfPasswordField.clear();
            });

            browser.executeScript('window.localStorage.clear();');
        });
    });

    var loginDealerArray = [dealerAdminEmail, dealerUserEmail];

    it("As Dealer Admin/User, Create a New User with the wrong password format", () => {
        loginDealerArray.forEach((eachUser) => {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            navigation.clickUsersLink();
            usersPage.clickAddUserButton();
            usersPage.emailField.sendKeys(testUserEmail);
            usersPage.firstNameField.sendKeys(browser.params.adduser.firstname);
            usersPage.lastNameField.sendKeys(browser.params.adduser.lastname);
            usersPage.phoneNumberField.sendKeys(browser.params.adduser.phone);
            usersPage.selectOrgTypeDropdownItem(browser.params.adduser.organizationtype.customer);
            usersPage.selectOrgNameDropdownItem(browser.params.adduser.organizationname.customer);
            usersPage.selectOrgRoleDropdownItem(browser.params.roleslabels.customeradmin);
            usersPage.verifiedCheckBox.click();
            wrongPasswordArray.filter((wrongPassword) => {
                usersPage.newPasswordField.sendKeys(wrongPassword);
                usersPage.cnfPasswordField.sendKeys(wrongPassword);
                browser.sleep(5000);
                usersPage.saveBtn.click();
                expect(browser.getCurrentUrl()).toBe(browser.params.environment.url + '/#/nav/user/add', 'passwordErrorMessage Test Failed for this User:' + eachUser);
                usersPage.newPasswordField.clear();
                usersPage.cnfPasswordField.clear();
            });
            browser.executeScript('window.localStorage.clear();');
        });
    });
});
