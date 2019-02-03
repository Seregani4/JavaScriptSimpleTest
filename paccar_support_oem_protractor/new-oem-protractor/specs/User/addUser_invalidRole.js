/**
 * Created by pshrestha on 6/16/2017.
 */

describe("Validate users cannot be added with invalid Role -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var usersPage = require('../../../pages/users.page.js');
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var testUserEmail = browser.params.adduser.email;
    var password = browser.params.adduser.password;
    var invalidRoleName = 'SpiderMan';
    var orgTypeOem = browser.params.adduser.organizationtype.oem;
    var orgTypeDivision = browser.params.adduser.organizationtype.division;
    var orgTypeDealerOwner = browser.params.adduser.organizationtype.dealerOwner;
    var orgTypeDealerRegion = browser.params.adduser.organizationtype.dealerRegion;
    var orgTypeCustomer = browser.params.adduser.organizationtype.customer;
    var orgNameDivision = browser.params.adduser.organizationname.division;
    var orgNameDealerOwner = browser.params.adduser.organizationname.dealerOwnerGroup;
    var orgNameDealerRegion = browser.params.adduser.organizationname.dealerRegion;
    var orgNameDealer = browser.params.adduser.organizationname.dealer;
    var orgNameCustomer = browser.params.adduser.organizationname.customer;

    browser.driver.manage().window().maximize();

    beforeEach(  ()  => {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.clickUsersLink();
        usersPage.addUserButton.click();
        usersPage.fillOutPartialUserForm(password);
        usersPage.emailField.sendKeys(testUserEmail);
    });

    afterEach(  () => {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    var orgNameArray = [orgTypeOem, orgTypeDivision, orgTypeDealerOwner, orgTypeDealerRegion, orgTypeCustomer];
    //var orgNameArray = [orgTypeDivision];

    it('Paccar admin adds a user with invalid org name ',   ()  =>{

        //filter through the orgTypes and assign roles tied to the org.
        orgNameArray.forEach(  (eachOrgType)  => {
            usersPage.selectOrgTypeDropdownItem(eachOrgType);

            if (eachOrgType === orgTypeDivision) {
                usersPage.selectOrgNameDropdownItem(orgNameDivision);
            } else if (eachOrgType === orgTypeDealerOwner) {
                usersPage.selectOrgNameDropdownItem(orgNameDealerOwner);
            } else if (eachOrgType === orgTypeDealerRegion) {
                usersPage.selectOrgNameDropdownItem(orgNameDealerRegion);
            } else if (eachOrgType === orgTypeCustomer) {
                usersPage.selectOrgNameDropdownItem(orgNameCustomer);
            }
            browser.sleep(1000);
            usersPage.orgRoleField.click();
            usersPage.orgRoleField.sendKeys(invalidRoleName);
            usersPage.saveBtn.click();
            expect(browser.getCurrentUrl()).toBe(browser.params.environment.url + '/#/nav/user/add', 'The user got added with invalid Org Name.');
        });
    });

    //Dealer Org Type is separate due to selection issue
    it('Paccar admin adds a Dealer User with invalid org name',   () => {
        usersPage.orgTypeField.click();
        browser.sleep(1000);
        usersPage.dealerOrgType.click();
        usersPage.selectOrgNameDropdownItem(orgNameDealer);
        usersPage.orgRoleField.click();
        usersPage.orgRoleField.sendKeys(invalidRoleName);
        usersPage.saveBtn.click();
        expect(browser.getCurrentUrl()).toBe(browser.params.environment.url + '/#/nav/user/add', 'The user got added with invalid Org Name.');
    });
});