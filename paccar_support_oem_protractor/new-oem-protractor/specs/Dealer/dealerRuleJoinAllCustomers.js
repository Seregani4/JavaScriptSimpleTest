/**
 * Created by pshrestha on 8/30/2017.
 */

describe("Dealer Permissions on Join All Customer and Vehicles -----> ", function () {
    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var customerUtil = require('../../../utilities/customer.util.js');
    var vehiclesPage = require('../../../pages/vehicles.page.js');
    var vehiclesUtil = require('../../../utilities/vehicle.util.js');
    var dealerAdminEmail = browser.params.testuseremails.dealeradmin;
    var dealerPowerUserEmail = browser.params.testuseremails.dealeruser;
    var doaEmail = browser.params.testuseremails.dealerowneradmin;
    var douEmail = browser.params.testuseremails.dealerowneruser;
    var draEmail = browser.params.testuseremails.dealerregionadmin;
    var druEmail = browser.params.testuseremails.dealerregionuser;
    var dealerTechEmail = browser.params.testuseremails.dealertech;
    var joinAllCustomerName = browser.params.testcustomer.name;
    var joinAllVin = browser.params.vehicle.joinAllVin;
    var loginUserArray = [dealerAdminEmail, dealerPowerUserEmail, doaEmail, douEmail, draEmail, druEmail, dealerTechEmail];
    var adminUserArray = [dealerAdminEmail, doaEmail, draEmail, dealerPowerUserEmail];
    //For these two users the DOM elements are different.
    var nonAdminUsers = [dealerTechEmail, douEmail, druEmail];
    var joinAllCustomer = vehiclesUtil.getJoinAllCustomer();
    var password = browser.params.adduser.password;

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

    //Test dealer rules for JOIN ALL
    loginUserArray.forEach(function (eachUser) {
        it(eachUser + ': validates the dealer functionality for Join All only Customer Vehicles', function () {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            if (nonAdminUsers.indexOf(eachUser) >= 0) {
                customerUtil.nonAdminCannotEdit(joinAllCustomerName);
            } else {
                customerUtil.cannotEdit(joinAllCustomerName);
            }
            vehiclesUtil.vehicleListCustomerSearch(joinAllCustomerName);
            vehiclesPage.clickVehicleHyperlinkCellSearch(joinAllVin);
            if (adminUserArray.indexOf(eachUser) >= 0) {
                vehiclesUtil.verifyVehicleOptions(joinAllCustomer, 'Admin');
            } else {
                vehiclesUtil.verifyVehicleOptions(joinAllCustomer);
            }
        });
    });
});
