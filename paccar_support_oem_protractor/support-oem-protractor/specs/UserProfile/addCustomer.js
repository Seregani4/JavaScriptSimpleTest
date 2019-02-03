/**
 * Created by tbui on 2/26/2016.
 */
describe("Adding a new Customer", function(){

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var customersPage = require('../../../pages/customers.page.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var testCustomerName = browser.params.addcustomer.name;
    var password = browser.params.adduser.password;

    browser.driver.manage().window().maximize();

    afterEach(function() {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    beforeEach(function () {
        loginPage.get();
        loginPage.login('supportal', peoplenetAdminEmail, password);
        navigation.fleetHealthButton.click();
        navigation.clickCustomersLink();
    });

    // it("Add customer end-point", function () {
    //     loginPage.get();
    //     customersPage.addNewCustomerEndpoint(peoplenetAdminEmail, 'testCustomer');
    //     //You can add a seperate edit customer test as in Paccar Project.
    //     //customersPage.editCustomerEndpoint(peoplenetAdminEmail, testCustomerName);
    // });

    it("Peoplenet Admin can add new customer entity", function() {
        navigation.addActionButton.click();
        customersPage.addNewCustomer("test customer");
        customersPage.clickContactInfoTab();
        customersPage.clickManageVehiclesTab();
        customersPage.clickVehicleGroupsTab();
        customersPage.clickSubscribedUsersTab();
        navigation.clickCustomersLink();
        navigation.typeInSearchFilter(browser.params.addcustomer.name);
        customersPage.verifyCustomerInList(browser.params.addcustomer.name);

    });

    it("Remove new customer entity",function () {
        navigation.typeInSearchFilter(browser.params.addcustomer.name);
        customersPage.clickCustomerCheckbox(browser.params.addcustomer.name);
        navigation.deleteActionButton.click();
        browser.sleep(1000);
        navigation.submitDialogButton.click();
        browser.sleep(10000);
        browser.refresh();
        customersPage.checkForDeletedCustomer(browser.params.addcustomer.name);

    })
});