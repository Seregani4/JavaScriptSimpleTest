/**
 * Created by pshrestha on 8/31/2017.
 */

describe("Dealer Permissions on Primary Customer and Vehicles -----> ", function () {
    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var vehiclesUtil = require('../../../utilities/vehicle.util.js');
    var dealerAdminEmail = browser.params.testuseremails.dealeradmin;
    var dealerPowerUserEmail = browser.params.testuseremails.dealeruser;
    var doaEmail = browser.params.testuseremails.dealerowneradmin;
    var douEmail = browser.params.testuseremails.dealerowneruser;
    var draEmail = browser.params.testuseremails.dealerregionadmin;
    var druEmail = browser.params.testuseremails.dealerregionuser;
    var dealerTechEmail = browser.params.testuseremails.dealertech;
    var primaryVin = browser.params.vehicle.primaryVin;
    var loginUserArray = [dealerAdminEmail, dealerPowerUserEmail, doaEmail, douEmail, draEmail, druEmail, dealerTechEmail];
    var adminUserArray = [dealerAdminEmail, doaEmail, draEmail, dealerPowerUserEmail];
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

    /*
    * NOTE: For a Vehicle (that belongs to a customer) to have a primary dealer it MUST
     * have the Dealership as Preferred.
    * */

    //A vehicle with no customer but has a primary dealer W009.
    loginUserArray.forEach(function (eachUser) {
        it(eachUser + ': validates the dealer functionality for Primary Customer Vehicles', function () {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            vehiclesUtil.goToVehicleDetails(primaryVin);
            if (adminUserArray.indexOf(eachUser) >= 0) {
                vehiclesUtil.verifyPrimaryVehicleOptions('Admin', eachUser);
            } else {
                vehiclesUtil.verifyPrimaryVehicleOptions('nonAdmin', eachUser);
            }
        });
    });
});

