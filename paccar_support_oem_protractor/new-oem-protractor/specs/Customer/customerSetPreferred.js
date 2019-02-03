/**
 * Created by pshrestha on 4/7/2017.
 */
/**
 * Edited by pshrestha on 7/26/2017.
 */

describe("Set Preferred Dealer Functionality -----> ", () => {

    var navigation = require('../../../pages/navigation.page.js');
    var loginPage = require('../../../pages/login.page.js');
    var customersPage = require('../../../pages/customers.page.js');
    var usersPage = require('../../../pages/users.page.js');
    var customerUtility = require('../../../utilities/customer.util.js');
    var userUtility = require('../../../utilities/user.util.js');
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var dealerAdminEmail = browser.params.testuseremails.dealeradmin;
    var dealerUserEmail = browser.params.testuseremails.dealeruser;
    var dealerOwnerAdmin = browser.params.testuseremails.dealerowneradmin;
    var dealerRegionAdmin = browser.params.testuseremails.dealerregionadmin;
    var testUserEmail = "CusSetPref" + browser.params.adduser.email;
    var testUserOrg = browser.params.adduser.organizationtype.customer;
    var testUserRole = browser.params.roleslabels.customeradmin;
    var password = browser.params.adduser.password;
    var randomInt = Math.floor(Math.random() * 999999 + 1000000);
    var editTestCustomerName = browser.params.editcustomer.name + randomInt;
    var editTestCustomerAddress1 = browser.params.editcustomer.address1;
    var editTestCustomerAddress2 = browser.params.editcustomer.address2;
    var editTestCustomerCityStateZip = browser.params.editcustomer.city + ', ' + browser.params.editcustomer.state + ' ' + browser.params.editcustomer.zip;
    var editTestCustomerFormattedTelephone = browser.params.editcustomer.formattedphone;
    var editTestCustomerFormattedFax = browser.params.editcustomer.formattedfax;
    var editTestCustomerEmail = browser.params.editcustomer.email;

    var testUserId;
    var testCustomerName = browser.params.addcustomer.name + randomInt;
    var testCustomerAddress1 = browser.params.addcustomer.address1;
    var testCustomerAddress2 = browser.params.addcustomer.address2;
    var testCustomerCityStateZip = browser.params.addcustomer.city + ', ' + browser.params.addcustomer.state + ' ' + browser.params.addcustomer.zip;
    var testCustomerFormattedTelephone = browser.params.addcustomer.formattedphone;
    var testCustomerFormattedFax = browser.params.addcustomer.formattedfax;
    var testCustomerEmail = browser.params.addcustomer.email;
    var dealership = 'W009';

    browser.driver.manage().window().maximize();

    afterEach(() => {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    beforeAll(() => {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        customerUtility.addCustomer(testCustomerName, "test customer");
        userUtility.addSpecificUser(testUserEmail, testUserOrg, testUserRole, testCustomerName)
            .then((id) => {
                testUserId = id
                browser.executeScript('window.localStorage.clear();');
            })
    });

    afterAll((done) => {
        return usersPage.deleteUserEndpoint(paccarAdminEmail, testUserId)
            .then(() => {
                return customersPage.deleteCustomerEndpoint(paccarAdminEmail, testCustomerName)
            })
            .then(() => {
                done()
            })
    });

    it("Dealer Admin cannot see the test Customer", () => {
        loginPage.get();
        loginPage.login('paccar', dealerAdminEmail, password);
        navigation.clickCustomersLink();
        navigation.typeInSearchFilter(testCustomerName);
        customersPage.verifyCustomerIsNotInList(testCustomerName);
    });

    it("Customer admin sets the dealership as Preferred", () => {
        loginPage.get();
        loginPage.login('paccar', testUserEmail, password);
        customerUtility.preferredDealerEdit(dealership, "prefer");
    });

    it("Dealer Admin can see test Customer after the Dealership is Preferred", () => {
        loginPage.get();
        loginPage.login('paccar', dealerAdminEmail, password);
        navigation.clickCustomersLink();
        navigation.typeInSearchFilter(testCustomerName);
        customersPage.verifyCustomerList(testCustomerName);
    });

    var loginUsers = [dealerAdminEmail, dealerUserEmail, dealerOwnerAdmin, dealerRegionAdmin];

    loginUsers.forEach((eachUser) => {

        it("Verify Dealer users can edit a preferred customers", () => {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            navigation.clickCustomersLink();
            navigation.typeInSearchFilter(testCustomerName);
            customersPage.clickCustomerCheckbox(testCustomerName);
            navigation.editActionButton.click();
            customersPage.editCustomer(editTestCustomerName);
            //Check to ensure proper phone #, addresses
            expect(customersPage.addressLine1.getText()).toContain(editTestCustomerAddress1);
            expect(customersPage.addressLine2.getText()).toContain(editTestCustomerAddress2);
            expect(customersPage.addressLine3.getText()).toContain(editTestCustomerCityStateZip);
            expect(customersPage.primaryPhoneNumber.getText()).toContain(editTestCustomerFormattedTelephone);
            expect(customersPage.primaryFaxNumber.getText()).toContain(editTestCustomerFormattedFax);
            expect(customersPage.primaryEmail.getText()).toContain(editTestCustomerEmail);
            navigation.clickCustomersLink();
            navigation.typeInSearchFilter(editTestCustomerName);
            customersPage.clickCustomerCheckbox(editTestCustomerName);
            navigation.editActionButton.click();
            //Change customer info back
            customersPage.resetCustomerInfo('', testCustomerName);
            expect(customersPage.addressLine1.getText()).toContain(testCustomerAddress1);
            expect(customersPage.addressLine2.getText()).toContain(testCustomerAddress2);
            expect(customersPage.addressLine3.getText()).toContain(testCustomerCityStateZip);
            expect(customersPage.primaryPhoneNumber.getText()).toContain(testCustomerFormattedTelephone);
            expect(customersPage.primaryFaxNumber.getText()).toContain(testCustomerFormattedFax);
            expect(customersPage.primaryEmail.getText()).toContain(testCustomerEmail);
        });
    });

    it("Customer admin removes the dealership from Preferred", () => {
        loginPage.get();
        loginPage.login('paccar', testUserEmail, password);
        customerUtility.preferredDealerEdit(dealership, "removePrefer");
    });

    loginUsers.forEach((users) => {
        it("Dealer Users cannot see the test Customer after removing Preferred", () => {
            loginPage.get();
            loginPage.login('paccar', users, password);
            navigation.clickCustomersLink();
            navigation.typeInSearchFilter(testCustomerName);
            customersPage.verifyCustomerIsNotInList(testCustomerName);
        });
    });

});
