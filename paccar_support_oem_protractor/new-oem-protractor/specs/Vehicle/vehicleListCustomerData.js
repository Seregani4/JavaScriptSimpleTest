/**
 * Created by pshrestha on 5/5/2017.
 */

describe("E2E Vehicle Validations -----> ", function () {

    var navigation = require('../../../pages/navigation.page.js');
    var loginPage = require('../../../pages/login.page.js');
    var customersPage = require('../../../pages/customers.page.js');
    var vehiclesPage = require('../../../pages/vehicles.page.js');
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var dealerAdminEmail = browser.params.testuseremails.dealeradmin;
    var dealerUserEmail = browser.params.testuseremails.dealeruser;
    var dealerOwnerAdmin = browser.params.testuseremails.dealerowneradmin;
    var dealerRegionAdmin = browser.params.testuseremails.dealerregionadmin;
    var customerAdminEmail = browser.params.testuseremails.customeradmin;
    var dealerTechEmail = browser.params.testuseremails.dealertech;
    var customer = browser.params.testcustomer.name;
    var customerUid = browser.params.testcustomer.uid;
    var password = browser.params.adduser.password;
    var testVIN1 = '1NPXLP9X1GD323239';
    var testVIN2 = '1XKYDP0X5GJ980184';

    browser.driver.manage().window().maximize();

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("Paccar Admin assigns vehicles to a customer", function () {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.clickCustomersLink();
        navigation.typeInSearchFilterRecommendation(customer);
        customersPage.clickCustomerHyperlinkCellSearch(customer, customerUid);
        customersPage.clickManageVehiclesTab();
        customersPage.manageVehiclesSearch(testVIN1);
        customersPage.assignVehicle();
        customersPage.clickManageVehiclesTab();
        customersPage.manageVehiclesSearch(testVIN2);
        customersPage.assignVehicle();
    });

    it("Paccar Admin verifies the change", function () {
        //Paccar admin verifies the change.
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.clickVehiclesLink();
        navigation.typeInSearchFilter(testVIN1);
        vehiclesPage.verifyCustomerName(customer);
        navigation.chipFilterCloseBtn.click();
        navigation.typeInSearchFilter(testVIN2);
        vehiclesPage.verifyCustomerName(customer);
        navigation.logOut();
    });

    var loginUserArray = [paccarAdminEmail, dealerAdminEmail, dealerUserEmail, dealerOwnerAdmin, dealerRegionAdmin, customerAdminEmail, dealerTechEmail];
    //var loginUserArray=[customerAdminEmail];
    loginUserArray.filter(function (eachUser) {

        it("Users with Vehicle list access verify the Customer name", function () {
            //Customer admin logs in and verifies the vehicles.
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            navigation.clickVehiclesLink();
            navigation.typeInSearchFilter(testVIN1);
            vehiclesPage.verifyCustomerName(customer);
            navigation.chipFilterCloseBtn.click();
            navigation.typeInSearchFilter(testVIN2);
            vehiclesPage.verifyCustomerName(customer);
            navigation.clickVehiclesLink();
        });
    });

    it('Clean up: Remove vehicle from customer', function () {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        //Remove first VIN and verify
        navigation.clickCustomersLink();
        navigation.typeInSearchFilterRecommendation(customer);
        customersPage.clickCustomerHyperlinkCellSearch(customer);
        customersPage.clickManageVehiclesTab();
        customersPage.manageVehiclesSearch(testVIN1);
        customersPage.unassignVehicle();
        navigation.clickVehiclesLink();
        navigation.typeInSearchFilter(testVIN1);
        vehiclesPage.verifyCustomerName('');
        //Remove second VIN and verify
        navigation.clickCustomersLink();
        navigation.typeInSearchFilterRecommendation(customer);
        customersPage.clickCustomerHyperlinkCellSearch(customer);
        customersPage.clickManageVehiclesTab();
        customersPage.manageVehiclesSearch(testVIN2);
        customersPage.unassignVehicle();
        navigation.clickVehiclesLink();
        navigation.typeInSearchFilter(testVIN2);
        vehiclesPage.verifyCustomerName('');
    });

    it('Customer logs in to verify the vehicles are no longer visible', function () {
        loginPage.get();
        loginPage.login('paccar', customerAdminEmail, password);
        navigation.clickVehiclesLink();
        navigation.typeInSearchFilter(testVIN1);
        vehiclesPage.verifyVehicleIsNotInList(testVIN1);
        navigation.chipFilterCloseBtn.click();
        navigation.typeInSearchFilter(testVIN2);
        vehiclesPage.verifyVehicleIsNotInList(customer);
        navigation.clickVehiclesLink();
    });
});