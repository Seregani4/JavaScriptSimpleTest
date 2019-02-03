/**
 * Created by Cottomoeller on 4/5/2016.
 */
describe("Preferred Dealer Test -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var customersPage = require('../../../pages/customers.page.js');
    var vehiclesPage = require('../../../pages/vehicles.page.js');
    var dealersPage = require('../../../pages/dealers.page.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var dealerAdminEmail = browser.params.testuseremails.dealeradmin;
    var dealerUserEmail = browser.params.testuseremails.dealeruser;
    var customerAdminEmail = browser.params.testuseremails.customeradmin;
    var password = browser.params.adduser.password;
    var vin = browser.params.vehicle.vin;
    var dsn = browser.params.vehicle.dsn;
    var unitNumber = browser.params.vehicle.unitnumber;
    var description = browser.params.vehicle.description;
    var customerName = browser.params.testcustomer.name;
    var dealersCode = browser.params.testdealer.code;

    browser.driver.manage().window().maximize();

    beforeEach(function () {
        // Get a fresh Angular "session" so we can avoid bootstrapping errors
        browser.driver.get("about:blank");
        browser.sleep(1000);
    });

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("Assign vehicle to Test Customer", function () {
        loginPage.get();
        loginPage.login('paccar', peoplenetAdminEmail, password);

        navigation.clickCustomersLink();
        navigation.typeInSearchFilterRecommendation(customerName);
        customersPage.clickCustomerHyperlinkCellSearch(customerName);
        customersPage.clickManageVehiclesTab();
        customersPage.manageVehiclesSearch(vin);
        //customersPage.assignVehicle();
    });

    it("Set Preferred Dealer as Customer Admin", function () {
        loginPage.get();
        loginPage.login('paccar', customerAdminEmail, password);

        navigation.clickDealersLink();
        navigation.typeInSearchFilter(dealersCode);
        dealersPage.clickDealerHyperlinkCellSearch(dealersCode);
        dealersPage.checkPreferredDealerCheckbox();
    });

    it("Verify Dealer Admin can see Customers Vehicles", function () {
        loginPage.get();
        loginPage.login('paccar', dealerAdminEmail, password);

        navigation.clickVehiclesLink();

        navigation.typeInSearchFilter(vin);
        vehiclesPage.verifyVIN(vin);
    });

    it("Verify Dealer User can see Customers Vehicles", function () {
        loginPage.get();
        loginPage.login('paccar', dealerUserEmail, password);

        navigation.clickVehiclesLink();

        navigation.typeInSearchFilter(vin);
        vehiclesPage.verifyVIN(vin);
    });

    it("Unset Preferred Dealer as Customer User", function () {
        loginPage.get();
        loginPage.login('paccar', customerAdminEmail, password);

        navigation.clickDealersLink();

        navigation.typeInSearchFilter(dealersCode);
        dealersPage.clickDealerHyperlinkCellSearch(dealersCode);
        dealersPage.uncheckPreferredDealerCheckbox();
    });

    it("Verify Dealer Admin can't see Customers", function () {
        loginPage.get();
        loginPage.login('paccar', dealerAdminEmail, password);

        navigation.clickCustomersLink();

        navigation.typeInSearchFilterRecommendation(customerName);
        customersPage.checkForDeletedCustomer(customerName);//This Method can also be used to make sure an Object is not in a List
    });

    it("Verify Dealer User can't see Customers", function () {
        loginPage.get();
        loginPage.login('paccar', dealerUserEmail, password);

        navigation.clickCustomersLink();

        navigation.typeInSearchFilterRecommendation(customerName);
        customersPage.checkForDeletedCustomer(customerName);
    });

    it("Un-Assign vehicle from Test Customer", function () {
        loginPage.get();
        loginPage.login('paccar', peoplenetAdminEmail, password);

        navigation.clickCustomersLink();
        navigation.typeInSearchFilterRecommendation(customerName);
        customersPage.clickCustomerHyperlinkCellSearch(customerName);
        customersPage.clickManageVehiclesTab();
        customersPage.manageVehiclesSearch(vin);
        customersPage.unassignVehicle();
    });
});