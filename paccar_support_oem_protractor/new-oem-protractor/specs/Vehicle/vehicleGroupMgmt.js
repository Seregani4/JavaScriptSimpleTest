/**
 * Created by tbui on 3/17/2016.
 */

describe("E2E Vehicle Groups Validations -----> ", function () {

    var navigation = require('../../../pages/navigation.page.js');
    var loginPage = require('../../../pages/login.page.js');
    var customersPage = require('../../../pages/customers.page.js');
    var vehicleUtil = require('../../../utilities/vehicle.util.js');
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var customerAdminEmail = browser.params.testuseremails.customeradmin;
    var password = browser.params.adduser.password;
    var vin = browser.params.vehicle.vin;
    var vin2 = browser.params.vehicle.vin2;
    var customerName = browser.params.testcustomer.name;
    var customerUid = browser.params.testcustomer.uid;
    var vehicleGroup = browser.params.vehicle.groupname+'VG';

    browser.driver.manage().window().maximize();

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("Add vehicle to customer", function () {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);

        navigation.clickCustomersLink();
        navigation.typeInSearchFilterRecommendation(customerName);
        customersPage.clickCustomerHyperlinkCellSearch(customerName, customerUid);
        customersPage.findAndAssignVehicleToCustomer(vin);
        customersPage.findAndAssignVehicleToCustomer(vin2);
    });

    it("Validate new vehicles were added", function () {
        //Log in as customer admin, validate new vehicles were added
        loginPage.get();
        loginPage.login('paccar', customerAdminEmail, password);

        navigation.clickVehiclesLink();
        vehicleUtil.verifyVehicleExist(vin);
        vehicleUtil.verifyVehicleExist(vin2);
    });

    it("Add new vehicle group to customer and assign vehicle to that group", function () {
        loginPage.get();
        loginPage.login('paccar', customerAdminEmail, password);

        navigation.clickCustomersLink();
        customersPage.clickCustomerHyperlinkCellSearch(customerName, customerUid);
        customersPage.clickVehicleGroupsTab();
        customersPage.addGroupBtn.click();
        customersPage.addGroupSendKeys(vehicleGroup);
        customersPage.clickVehicleGroupSaveBtn(vehicleGroup);
        customersPage.clickVehicleGroupEditBtn(vehicleGroup);
        customersPage.findAndAssignVehicleToCustomer(vin);
        customersPage.findAndAssignVehicleToCustomer(vin2);
    });

    it("Clean up vehicles for customer", function () {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);

        navigation.clickCustomersLink();
        navigation.typeInSearchFilterRecommendation(customerName);
        customersPage.clickCustomerHyperlinkCellSearch(customerName, customerUid);
        customersPage.findAndUnassignVehicleFromCustomer(vin);
        customersPage.findAndUnassignVehicleFromCustomer(vin2);
    });

    it("Customer admin deletes the Vehicle group", function () {
        loginPage.get();
        loginPage.login('paccar', customerAdminEmail, password);
        vehicleUtil.deleteVehicleGroup(customerName, vehicleGroup, customerAdminEmail);
    });
});