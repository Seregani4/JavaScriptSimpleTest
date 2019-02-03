/**
 * Created by pshrestha on 5/5/2017.
 */


describe("E2E Vehicle Group Validations -----> ", () => {

    var navigation = require('../../../pages/navigation.page.js');
    var loginPage = require('../../../pages/login.page.js');
    var customersPage = require('../../../pages/customers.page.js');
    var vehicleUtil = require('../../../utilities/vehicle.util.js');
    var dashboard2 = require('../../../pages/dashboard2.page');
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var dealerAdminEmail = browser.params.testuseremails.dealeradmin;
    var dealerUserEmail = browser.params.testuseremails.dealeruser;
    var dealerOwnerAdmin = browser.params.testuseremails.dealerowneradmin;
    var dealerRegionAdmin = browser.params.testuseremails.dealerregionadmin;
    var customerAdminEmail = browser.params.testuseremails.customeradmin;
    var dealerTechEmail = browser.params.testuseremails.dealertech;
    var customer = browser.params.testcustomer.name;
    var password = browser.params.adduser.password;
    var vehicleGroup1 = 'DashboardGroup';
    var testVIN1 = browser.params.vehicle.e2evin1;
    var testVIN2 = browser.params.vehicle.e2evin2;
    var testVIN3 = browser.params.vehicle.e2evin3;
    var testVIN4 = browser.params.vehicle.e2evin4;
    var vinArray = [testVIN1, testVIN2, testVIN3, testVIN4];

    browser.driver.manage().window().maximize();

    beforeEach(() => {
        // Get a fresh Angular "session" so we can avoid bootstrapping errors
        browser.driver.get("about:blank");
        browser.sleep(1000);
    });

    afterEach(() => {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("Paccar Admin assigns vehicles to a customer", () => {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.clickCustomersLink();
        navigation.typeInSearchFilterRecommendation(customer);
        customersPage.clickCustomerHyperlinkCellSearch(customer);
        vinArray.forEach(function (eachVin) {
            customersPage.findAndAssignVehicleToCustomer(eachVin)
        });
    });

    it("Paccar Admin verifies the change", () => {
        //Paccar admin verifies the change.
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.clickVehiclesLink();
        vinArray.forEach((eachVin) => {
            vehicleUtil.verifyVehicleCustomer(eachVin, customer)
        });
    });

    it("Customer Admin creates a vehicle group and adds the vehicles PVP-5502 ", () => {
        //Paccar admin verifies the change.
        loginPage.get();
        loginPage.login('paccar', customerAdminEmail, password);
        navigation.clickCustomersLink();
        customersPage.clickCustomerHyperlinkCellSearch(customer);
        customersPage.clickVehicleGroupsTab();
        customersPage.addGroupBtn.click();
        customersPage.addGroupSendKeys(vehicleGroup1);
        customersPage.saveGroupBtn.click();
        browser.sleep(1000);
        customersPage.clickVehicleGroupEditBtn(vehicleGroup1);
        vinArray.forEach(function (eachVin) {
            customersPage.findAndAssignVehicleToCustomer(eachVin)
        });
    });

    var loginUserArray = [paccarAdminEmail, dealerAdminEmail, dealerUserEmail, dealerOwnerAdmin, dealerRegionAdmin, customerAdminEmail, dealerTechEmail];

    loginUserArray.forEach((eachUser) => {

        //Different users log in and verify Customer name and dashboard filter for Vehicle Group.
        it(eachUser + " verify the Customer name on the Vehicles", () => {
            //Different  logs in and verifies the vehicles.
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            navigation.clickVehiclesLink();
            vinArray.forEach((eachVin) => {
                vehicleUtil.verifyVehicleCustomer(eachVin, customer)
            });
        });

        it(`${eachUser} validate the functionality of Add Filter - Vehicle Group PVP-5502 `, () => {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            //Customers cannot filter by their own name. Changes according to PVP-3784.
            if (eachUser !== customerAdminEmail) {
                navigation.chipFilter.sendKeys(customer);
                navigation.chipFilterResults.get(1).click();
                navigation.chipFilter.sendKeys(vehicleGroup1);
                browser.sleep(1000);
                //Select the second option from the search
                navigation.chipFilterResults.get(1).click();
                expect(dashboard2.customerChip.isDisplayed()).toBe(true, 'The Customer chip is not present.');
            }
            else {
                //Only users with customer org type cannot see User Vehicle Groups.
                //Hence select the first option from the search.
                navigation.chipFilter.sendKeys(vehicleGroup1);
                navigation.chipFilterResults.get(1).click();
            }
            expect(element(by.cssContainingText('[class="chipText ng-binding"]', 'DashboardGroup')).isDisplayed())
                .toBe(true, 'The Vehicle Group chip is not present.');
            //Verify the vehicles from the group are filtered and set to the number of vehicles in the filtered group.
            expect(dashboard2.noActionNoOfVehicle.getText()).toContain('2', 'The vehicles group did not filter.');
            expect(dashboard2.serviceNowNoOfVehicle.getText()).toContain('2', 'The vehicle group did not filter.');
            if (eachUser !== customerAdminEmail) {
                dashboard2.chipFilterCloseBtn.get(1).click();
                expect(dashboard2.chipFilterCloseBtn.get(1).isPresent()).toBe(false, 'The Vehicle Group chip did not clear');
            }
            dashboard2.chipFilterCloseBtn.get(0).click();
            expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/dashboard');
            browser.executeScript('window.localStorage.clear();');
        });
    });

    it('Clean up: Remove vehicle from customer', () => {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        //Remove all VINs from customer
        navigation.clickCustomersLink();
        navigation.typeInSearchFilterRecommendation(customer);
        customersPage.clickCustomerHyperlinkCellSearch(customer);
        vinArray.forEach((eachVin) => {
            customersPage.findAndUnassignVehicleFromCustomer(eachVin)
        });
        //Verify the customer name is no longer present on the Vehicle
        navigation.clickVehiclesLink();
        navigation.chipFilterCloseBtn.click();
        vinArray.forEach((eachVin) => {
            vehicleUtil.verifyVehicleCustomer(eachVin, '')
        });
    });

    it('Customer verifies the vehicles are no longer visible and deletes the VG', () => {
        loginPage.get();
        loginPage.login('paccar', customerAdminEmail, password);
        navigation.clickVehiclesLink();
        vinArray.forEach((eachVin) => {
            vehicleUtil.verifyVehicleUnassignedFromCustomer(eachVin)
        });
        //Delete the Vehicle Group
        vehicleUtil.deleteVehicleGroup(customer, vehicleGroup1, customerAdminEmail);
    });
});