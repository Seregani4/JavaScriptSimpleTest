/**
 * Created by pshrestha on 9/1/2017.
 */

describe("Dealer Permissions on Regular Customer and Vehicles -----> ", function () {
    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var customerPage = require('../../../pages/customers.page.js');
    var vehiclesPage = require('../../../pages/vehicles.page.js');
    var vehiclesUtil = require('../../../utilities/vehicle.util.js');
    var dealerAdminEmail = browser.params.testuseremails.dealeradmin;
    var dealerPowerUserEmail = browser.params.testuseremails.dealeruser;
    var doaEmail = browser.params.testuseremails.dealerowneradmin;
    var douEmail = browser.params.testuseremails.dealerowneruser;
    var draEmail = browser.params.testuseremails.dealerregionadmin;
    var druEmail = browser.params.testuseremails.dealerregionuser;
    var dealerTechEmail = browser.params.testuseremails.dealertech;
    var regularCustomerName = browser.params.testregularcustomer.name;
    var vin = browser.params.vehicle.regularVin;
    var loginUserArray = [dealerAdminEmail, dealerPowerUserEmail, doaEmail, douEmail, draEmail, druEmail, dealerTechEmail];
    var adminUserArray = [dealerAdminEmail, doaEmail, draEmail, dealerPowerUserEmail];
    //For these two users the DOM elements are different.
    var regularCustomer = vehiclesUtil.getRegularCustomer();
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

    //Test dealer rules for Regular Customer and Vehicles
    loginUserArray.forEach(function (eachUser) {
        it(eachUser + ': validates Customer and Vehicle is not visible', function () {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            navigation.clickCustomersLink();
            navigation.typeInSearchFilter(regularCustomerName);
            //Not visible to any dealer role users.
            customerPage.verifyCustomerIsNotInList(regularCustomerName);

            navigation.clickVehiclesLink();
            navigation.typeInSearchFilter(vin);
            //Not visible to any dealer role users.
            vehiclesPage.verifyVehicleIsNotInList(vin);

            navigation.clickThisGlobalSearchResult(vin, 'Vehicle');
            if (adminUserArray.indexOf(eachUser) >= 0) {
                vehiclesUtil.verifyVehicleOptions(regularCustomer, 'Admin', eachUser);
            } else {
                vehiclesUtil.verifyVehicleOptions(regularCustomer, 'nonAdmin', eachUser);
            }
        });
    });
});
