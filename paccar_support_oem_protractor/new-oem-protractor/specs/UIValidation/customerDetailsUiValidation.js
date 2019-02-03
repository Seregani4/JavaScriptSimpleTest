/**
 * Created by jelliott on 12/07/2016.
 * updated by Surya on 3/21/2018.
 */

describe("Verify Customer Details Page Data -----> ", function () {

    var loginPage = require('../../../pages/login.page');
    var navigation = require('../../../pages/navigation.page');
    var customersPage = require('../../../pages/customers.page');
    var customerUtil = require('../../../utilities/customer.util');
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var dealerAdminEmail = browser.params.testuseremails.dealeradmin;
    var password = browser.params.adduser.password;
    var address1 = browser.params.testcustomer.address1;
    var address2 = browser.params.testcustomer.address2;
    var address3 = browser.params.testcustomer.city + ', ' + browser.params.testcustomer.state + ' ' + browser.params.testcustomer.zip;
    var phone = browser.params.testcustomer.formattedphone;
    var fax = browser.params.testcustomer.formattedfax;
    var email = browser.params.testcustomer.email;
    var customerName = browser.params.testcustomer.name;

    browser.driver.manage().window().maximize();

    beforeEach(() => {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
    });

    afterEach(() => {
        browser.executeScript('window.localStorage.clear();');
    });

    it("As a Paccar Admin, Verify the Customer Details Page has the appropriate data", () => {
        customerUtil.goToCustomerDetails(customerName, paccarAdminEmail);
        customerUtil.verifyCustomerInfo(address1, address2, address3, phone, fax, email);
        customersPage.manageVehiclesTab.click();
        expect(customersPage.allVehicleRows.count()).toBeGreaterThan(0);
        customersPage.vehicleGroupsTab.click();
        expect(customersPage.vehicleGroupsData.count()).toBeGreaterThan(0);
        customersPage.subscribedUsersTab.click();
        expect(customersPage.subscribedUsersData.count()).toBeGreaterThan(0);
    });

    it('TC-2798 Customer name should shown not as hyperlink when user has no access to the edit customer page PVP-5500', () => {
        navigation.customersLink.click();
        navigation.pageSizeButton.click();
        navigation.pageFiftyButton.click();
        let testCustomer = customerUtil.findCustomerWithoutPreferredJoinAll();
        browser.executeScript('window.localStorage.clear();');
        loginPage.get();
        loginPage.login('paccar', dealerAdminEmail, password);
        navigation.customersLink.click();
        customersPage.addCustomerButton.click();
        customersPage.nameField.sendKeys(testCustomer);
        customersPage.emailField.click();
        browser.getCurrentUrl()
            .then(first => {
                element(by.xpath('//span/a[@ng-href]')).click();
                expect(browser.getCurrentUrl()).toBe(first, 'Wrong Url')
            });
    });

});

