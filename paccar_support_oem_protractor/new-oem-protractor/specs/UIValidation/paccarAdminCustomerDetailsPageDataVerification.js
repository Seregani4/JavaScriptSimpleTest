/**
 * Created by jelliott on 12/7/2016.
 */

describe("Verify Customer Details Page Data PA -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var customersPage = require('../../../pages/customers.page.js');
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var password = browser.params.adduser.password;
    var addCustomerName = browser.params.addcustomer.name+'PA';

    browser.driver.manage().window().maximize();

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("As a Paccar Admin, Verify the Customer Details Page has the appropriate data", function () {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);

        //fleet health child links present

        navigation.clickCustomersLink();
        customersPage.addCustomerButton.click();

        //add new customer
        customersPage.addNewCustomer("test customer",addCustomerName);
        //customersPage.contactInfoTab.click();

        //Check to ensure proper phone #, addresses
        expect(customersPage.addressLine1.getText()).toContain(browser.params.addcustomer.address1);
        expect(customersPage.addressLine2.getText()).toContain(browser.params.addcustomer.address2);
        expect(customersPage.addressLine3.getText()).toContain(
            browser.params.addcustomer.city + ', ' + browser.params.addcustomer.state + ' ' + browser.params.addcustomer.zip);
        expect(customersPage.primaryPhoneNumber.getText()).toContain(browser.params.addcustomer.formattedphone);
        expect(customersPage.primaryFaxNumber.getText()).toContain(browser.params.addcustomer.formattedfax);
        expect(customersPage.primaryEmail.getText()).toContain(browser.params.addcustomer.email);

        customersPage.manageVehiclesTab.click();
        expect(customersPage.allVehicleRows.count()).toBeGreaterThan(0);
        customersPage.vehicleGroupsTab.click();
        expect(customersPage.vehicleGroupsData.count()).toBeGreaterThan(0);
        customersPage.subscribedUsersTab.click();
        expect(customersPage.subscribedUsersData.count()).toBeGreaterThan(0);
    });

    it("Delete New Customer", function (done) {
        customersPage.deleteCustomerEndpoint(paccarAdminEmail,addCustomerName)
            .then(()=>{
                done();
            })
    });
});