/**
 * Created by tbui on 3/15/2016.
 */

describe("E2E Vehicle Validations Supportal: ", function () {


    var navigation = require('../../../pages/navigation.page.js');
    var loginPage = require('../../../pages/login.page.js');
    var customersPage = require('../../../pages/customers.page.js');
    var vehiclesPage = require('../../../pages/vehicles.page.js');
    var vehiclesDetailPage = require('../../../pages/vehicledetail.page.js');
    var faultDetailsPage = require('../../../pages/fault.details.page.js');
    var customerUtil = require('../../../utilities/customer.util.js');
    var vehicleUtil = require('../../../utilities/vehicle.util.js');
    var peopleNetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;
    var vehicleVin = browser.params.vehicle.vin2;
    var vin = browser.params.vehicle.vin; //To throw faults on.
    var unitNumber = browser.params.vehicle.unitnumber;
    var description = browser.params.vehicle.description;
    var testUnitNumber = 'TESTUNITNUMBER123';
    var testDescription = 'Out for maintenance.';
    var customerName = browser.params.testcustomer.name;
    var customerUid = browser.params.testcustomer.uid;
    var dealerCode = browser.params.testdealer.code;
    var serviceNowStatus = vehicleUtil.getServiceNowStatus();

    browser.driver.manage().window().maximize();

    beforeEach(function () {
        loginPage.get();
        loginPage.login('supportal', peopleNetAdminEmail, password);
    });

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("Appropriate vehicle fields can be edited", function () {
        navigation.clickThisGlobalSearchResult(vehicleVin, 'Vehicle');
        vehiclesPage.editVehicleFields(testUnitNumber, testDescription, vehicleVin);
        //clean up - set fields back to default
        vehiclesPage.editVehicleFields(unitNumber, description, vehicleVin);
    });

    it('Fault Details: Verify fault details page', function () {
        vehiclesPage.triggerFault(serviceNowStatus);
        navigation.fleetHealthButton.click();
        navigation.clickVehiclesLink();
        navigation.typeInSearchFilter(vin);
        vehiclesPage.verifyStatusOnVehicle(serviceNowStatus);
        vehiclesPage.clickVehicleHyperlinkCellSearch(vin);
        vehiclesDetailPage.faultDetailsButton.get(0).click();
        //Functions to verify the fields for Occurrence count, SPN and FMI are not BLANK.
        faultDetailsPage.verifyOccurenceCount();
        faultDetailsPage.verifySPNLength();
        faultDetailsPage.verifyFMILength();
        //Verify the Map modal is present.
        faultDetailsPage.mapModalLink.click();
        //Verify the close button is present and functional.
        faultDetailsPage.mapModalCloseButton.click();
        //Remove the fault from the vehicle
        vehicleUtil.removeFaultFromTheVehicle(vin);


    });

    it("Admin can assign vehicle to a customer", function () {
        //Set up customer w/ new vehicle as PA
        navigation.fleetHealthButton.click();
        navigation.clickCustomersLink();
        navigation.typeInSearchFilterRecommendation(customerName);
        customersPage.clickCustomerHyperlinkCellSearch(customerName, customerUid);
        customersPage.findAndAssignVehicleToCustomer(vehicleVin);
        navigation.logOut();

    });

    it('Clean up: Remove vehicle from customer', function () {
        customerUtil.unassignVehicleFromCustomer('supportal', customerName, customerUid, vehicleVin);
        //Clean up: Remove primary dealer from vehicle
        navigation.clickThisGlobalSearchResult(vehicleVin, 'Vehicle');
        vehiclesPage.validateDealerInfo(dealerCode, 'no');
        vehiclesPage.validateCustomerInfo(customerName, 'no');
    });

});