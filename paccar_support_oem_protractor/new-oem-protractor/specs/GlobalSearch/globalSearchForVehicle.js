/**
 * Created by tbui on 3/14/2016.
 */

describe("Global Search Bar Functionality - Users searching Vehicles -----> ", function () {

    var navigation = require('../../../pages/navigation.page.js');
    var loginPage = require('../../../pages/login.page.js');
    var customersPage = require('../../../pages/customers.page.js');
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var paccarUserEmail = browser.params.testuseremails.paccaruser;
    var dealerAdminEmail = browser.params.testuseremails.dealeradmin;
    var dealerUserEmail = browser.params.testuseremails.dealeruser;
    var customerAdminEmail = browser.params.testuseremails.customeradmin;
    var customerUserEmail = browser.params.testuseremails.customeruser;
    var password = browser.params.adduser.password;
    var vehicleVin = browser.params.vehicle.vin;
    var customerName = browser.params.testcustomer.name;
    var customerUid = browser.params.testcustomer.uid;

    browser.driver.manage().window().maximize();

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("PA may search for vehicle in-network via global search bar", function () {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        //search for existing vehicle by vehicleVin
        navigation.clickThisGlobalSearchResult(vehicleVin, 'Vehicle');
    });

    it("PU may search for vehicle in-network via global search bar", function () {
        loginPage.get();
        loginPage.login('paccar', paccarUserEmail, password);
        //search for existing vehicle by vehicleVin
        navigation.clickThisGlobalSearchResult(vehicleVin, 'Vehicle');
    });

    it("DA may search for vehicle in-network via global search bar", function () {
        loginPage.get();
        loginPage.login('paccar', dealerAdminEmail, password);
        //search for existing vehicle by vehicleVin
        navigation.clickThisGlobalSearchResult('1XPBDP9X6GD327428', 'Vehicle');//Using the initialized Vin will give a 403 error..failing the test
    });

    it("DU may search for vehicle in-network via global search bar", function () {
        loginPage.get();
        loginPage.login('paccar', dealerUserEmail, password);
        //search for existing vehicle by vehicleVin
        navigation.clickThisGlobalSearchResult('1NPXLP9X6GD323236', 'Vehicle');//Using the initialized Vin will give a 403 error..failing the test
    });

    it("CA may not search for out-of-network vehicle via global search bar", function () { //TODO Another method needs to be made for Invalid searches
        loginPage.get();
        loginPage.login('paccar', customerAdminEmail, password);
        //search for vehicle that should not be visible to CA
        navigation.globalSearchResultNotFound(vehicleVin);
    });

    it("CU may not search for out-of-network vehicle via global search bar", function () {
        loginPage.get();
        loginPage.login('paccar', customerUserEmail, password);
        //search for vehicle that should not be visible to CU
        navigation.globalSearchResultNotFound(vehicleVin);
    });

    it("CA may search for newly acquired vehicle via global search bar", function () {
        //Set up test customer with new vehicle
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.clickCustomersLink();
        navigation.typeInSearchFilterRecommendation(customerName);
        customersPage.clickCustomerHyperlinkCellSearch(customerName);
        customersPage.clickManageVehiclesTab();
        customersPage.manageVehiclesSearch(vehicleVin);
        customersPage.assignVehicle();
        navigation.logOut();
        //Log in as customer role and verify that new vehicle is searchable
        loginPage.get();
        loginPage.login('paccar', customerAdminEmail, password);
        navigation.clickThisGlobalSearchResult(vehicleVin, 'Vehicle');
        navigation.logOut();
        //Clean up: Unassign vehicle from customer
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.clickCustomersLink();
        navigation.typeInSearchFilterRecommendation(customerName);
        customersPage.clickCustomerHyperlinkCellSearch(customerName);
        customersPage.clickManageVehiclesTab();
        customersPage.manageVehiclesSearch(vehicleVin);
        customersPage.unassignVehicle();
    });

    it("CU may search for newly acquired vehicle via global search bar", function () {
        //Set up test customer with new vehicle
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);

        navigation.clickCustomersLink();
        navigation.typeInSearchFilterRecommendation(customerName);
        customersPage.clickCustomerHyperlinkCellSearch(customerName);
        customersPage.clickManageVehiclesTab();
        customersPage.manageVehiclesSearch(vehicleVin);
        customersPage.assignVehicle();
        navigation.logOut();
        //Log in as customer role and verify that new vehicle is searchable
        loginPage.get();
        loginPage.login('paccar', customerUserEmail, password);

        navigation.clickThisGlobalSearchResult(vehicleVin, 'Vehicle');
        navigation.logOut();
        //Clean up: Unassign vehicle from customer
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);

        navigation.clickCustomersLink();
        navigation.typeInSearchFilterRecommendation(customerName);
        customersPage.clickCustomerHyperlinkCellSearch(customerName);
        customersPage.clickManageVehiclesTab();
        customersPage.manageVehiclesSearch(vehicleVin);
        customersPage.unassignVehicle();
    });
});