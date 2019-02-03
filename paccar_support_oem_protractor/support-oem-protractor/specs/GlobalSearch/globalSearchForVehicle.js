/**
 * Created by tbui on 3/14/2016.
 */

describe("Global Search Bar Functionality - Users searching Vehicles: ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var customersPage = require('../../../pages/customers.page.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;
    var vehicleVin = browser.params.vehicle.vin;
    var customerName = browser.params.testcustomer.name;

    browser.driver.manage().window().maximize();

    beforeEach(function () {
        loginPage.get();
        loginPage.login('supportal', peoplenetAdminEmail, password);
    });

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });


    it("PA may search for vehicle in-network via global search bar", function () {
        //search for existing vehicle by vehicleVin
        navigation.clickThisGlobalSearchResult(vehicleVin, 'Vehicle');
    });

    it("PA may search for newly acquired vehicle ", function () {
        navigation.fleetHealthButton.click();
        navigation.clickCustomersLink();
        navigation.typeInSearchFilterRecommendation(customerName);
        customersPage.assignVehicleToCustomer(vehicleVin, customerName);
        navigation.clickCustomersLink();
        navigation.typeInSearchFilterRecommendation(customerName);
        customersPage.unassignVehicleFromCustomer(vehicleVin, customerName);
    });

});