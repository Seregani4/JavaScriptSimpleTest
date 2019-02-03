/**
 * Created by pshrestha on 6/15/2017.
 */

describe("Validate users cannot be added with invalid ORG names -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var usersPage = require('../../../pages/users.page.js');
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var testUserEmail = browser.params.adduser.email;
    var password = browser.params.adduser.password;
    var invalidOrgName = 'thisOrgNameDoesNotExist';
    var orgTypeOem = browser.params.adduser.organizationtype.oem;
    var orgTypeDivision = browser.params.adduser.organizationtype.division;
    var orgTypeDealerOwner = browser.params.adduser.organizationtype.dealerOwner;
    var orgTypeDealerRegion = browser.params.adduser.organizationtype.dealerRegion;
    var orgTypeCustomer = browser.params.adduser.organizationtype.customer;
    var oemRole = browser.params.roleslabels.paccaradmin;
    var divisionRole = browser.params.roleslabels.divisionuser;
    var dealerOwnerRole = browser.params.roleslabels.dealerowneruser;
    var dealerRegionRole = browser.params.roleslabels.dealerregionadmin;
    var dealerRole = "Dealer Admin"
    var customerRole = browser.params.roleslabels.customeradmin;

    browser.driver.manage().window().maximize();

    beforeEach(() => {
        // Get a fresh Angular "session" so we can avoid bootstrapping errors
        browser.driver.get("about:blank");
        browser.sleep(1000);
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.clickUsersLink();
        usersPage.addUserButton.click();
        usersPage.fillOutPartialUserForm(password);
        usersPage.emailField.sendKeys(testUserEmail);
    });

    afterEach(() => {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    var orgTypeArray = [orgTypeOem, orgTypeDivision, orgTypeDealerOwner, orgTypeDealerRegion, orgTypeCustomer];

    it('Paccar admin adds a user with invalid org name ', () => {

        //filter through the orgTypes and assign roles tied to the org.
        orgTypeArray.forEach((eachOrgType) => {
            usersPage.selectOrgTypeDropdownItem(eachOrgType);
            if (eachOrgType === orgTypeOem) {
                usersPage.selectOrgTypeDropdownItem(orgTypeDivision);
                usersPage.selectOrgTypeDropdownItem(orgTypeOem);
                usersPage.selectOrgRoleDropdownItem(oemRole);
            } else if (eachOrgType === orgTypeDivision) {
                usersPage.selectOrgRoleDropdownItem(divisionRole);
            } else if (eachOrgType === orgTypeDealerOwner) {
                usersPage.selectOrgRoleDropdownItem(dealerOwnerRole);
            } else if (eachOrgType === orgTypeDealerRegion) {
                usersPage.selectOrgRoleDropdownItem(dealerRegionRole);
            } else if (eachOrgType === orgTypeCustomer) {
                usersPage.selectOrgRoleDropdownItem(customerRole);
            }
            browser.sleep(1000);
            usersPage.orgNameField.click();
            usersPage.orgNameField.sendKeys(invalidOrgName);
            usersPage.saveBtn.click();
            expect(browser.getCurrentUrl()).toBe(browser.params.environment.url + '/#/nav/user/add', 'The user got added with invalid Org Name.');
        });
    });

    //Dealer Org Type is separate due to selection issue
    it('Paccar admin adds a Dealer User with invalid org name', () => {
        usersPage.orgTypeField.click();
        browser.sleep(1000);
        usersPage.dealerOrgType.click();
        usersPage.selectOrgRoleDropdownItem(dealerRole);
        usersPage.orgNameField.click();
        usersPage.orgNameField.sendKeys(invalidOrgName);
        usersPage.saveBtn.click();
        expect(browser.getCurrentUrl()).toBe(browser.params.environment.url + '/#/nav/user/add', 'The user got added with invalid Org Name.');
    });
});