/**
 * Created by jelliott on 12/7/2016.
 */
/**
 * Edited by Pshrestha on 8/21/2017.
 */

describe("Verify Customer Details Page Data DA -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var customersPage = require('../../../pages/customers.page.js');
    var customerUtil = require('../../../utilities/customer.util.js');
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var dealerAdminEmail = browser.params.testuseremails.dealeradmin;
    var password = browser.params.adduser.password;
    var addCustomerName = browser.params.addcustomer.name+"DA";
    var addCustomerAddress1 = browser.params.addcustomer.address1;
    var addCustomerAddress2 = browser.params.addcustomer.address2;
    var addCustomerCityStateZip = browser.params.addcustomer.city + ', ' + browser.params.addcustomer.state + ' ' + browser.params.addcustomer.zip;
    var addCustomerFormattedTelephone = browser.params.addcustomer.formattedphone;
    var addCustomerFormattedFax = browser.params.addcustomer.formattedfax;
    var addCustomerEmail = browser.params.addcustomer.email;

    browser.driver.manage().window().maximize();

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("As a Dealer Admin, Verify the Customer Details Page has the appropriate data", function () {
        loginPage.get();
        loginPage.login('paccar', dealerAdminEmail, password);
        navigation.clickCustomersLink();
        customersPage.addCustomerButton.click();

        //add new customer
        customersPage.addNewCustomer("test customer",addCustomerName);

        //Check to ensure proper phone #, addresses
        customerUtil.verifyCustomerInfo(addCustomerAddress1, addCustomerAddress2, addCustomerCityStateZip,
            addCustomerFormattedTelephone, addCustomerFormattedFax, addCustomerEmail);

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