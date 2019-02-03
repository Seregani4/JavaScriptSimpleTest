/**
 * Created by pshrestha on 8/31/2017.
 */

describe("Dealer Permissions on Preferred Customer and Vehicles -----> ", function () {
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
    var preferredCustomerName = browser.params.testpreferredcustomer.name;
    var preferredVin = browser.params.vehicle.preferredVin;
    var loginUserArray = [dealerAdminEmail, dealerPowerUserEmail, doaEmail, douEmail, draEmail, druEmail, dealerTechEmail];
    var adminUserArray = [dealerAdminEmail, doaEmail, draEmail, dealerPowerUserEmail];
    //For these two users the DOM elements are different.
    var nonAdminUsers = [dealerTechEmail, douEmail, druEmail];
    var preferredCustomer = vehiclesUtil.getPreferredCustomer();
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

    //Test dealer rules for Preferred Customer and Vehicles
    loginUserArray.forEach(function (eachUser) {
        it(eachUser + ': validates the dealer functionality for Preferred Customer Vehicles', function () {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            if (nonAdminUsers.indexOf(eachUser) >= 0) {
                customerUtil.nonAdminCannotEdit(preferredCustomerName);
            } else {
                customerUtil.editCustomerHelper(preferredCustomerName);
            }
            vehiclesUtil.vehicleListCustomerSearch(preferredCustomerName);
            vehiclesPage.clickVehicleHyperlinkCellSearch(preferredVin);
            if (adminUserArray.indexOf(eachUser) >= 0) {
                vehiclesUtil.verifyVehicleOptions(preferredCustomer, 'Admin', eachUser);
            } else {
                vehiclesUtil.verifyVehicleOptions(preferredCustomer);
            }
        });
    });
});
