/**
 * Created by pshrestha on 7/17/2017.
 */

describe("Verify In Repair Status is set in/out on a vehicle -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var vehiclesPage = require('../../../pages/vehicles.page.js');
    var vehicleUtil = require('../../../utilities/vehicle.util');
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var password = browser.params.adduser.password;
    var vin = '1XKYDP9X2GJ980131';
    var dsn = '7010251';
    var inRepair = vehicleUtil.getInRepairStatus();
    var noAction = vehicleUtil.getNoActionStatus();
    //lat and lon for a dealership to set in repair
    var latitudeInside = '45.8317406';
    var longitudeInside = '-95.385136';
    //lat and lon outside of a dealership to set out of in repair
    var latitudeOutside = '42.407960';
    var longitudeOutside = '-71.058628';

    browser.driver.manage().window().maximize();

    beforeEach(function () {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
    });

    afterEach(function () {
        browser.executeScript('window.localStorage.clear();');
    });

    it('Set in Repair', function () {
        //send OEM_TRIP_END event
        vehiclesPage.oemTripEndEvent(vin, dsn, latitudeInside, longitudeInside);
        browser.sleep(5000);
        vehicleUtil.verifyVehicleStatus(vin, inRepair);
    });

    it('Set out of Repair', function () {
        //send OEM_TRIP_START event (Event can be triggered but not necessary)
        //vehiclesPage.oemTripStartEvent(vin, dsn);

        //send OEM_TRIP_PERIODIC event
        vehiclesPage.oemTripPeriodicEvent(vin, dsn, latitudeOutside, longitudeOutside);
        browser.sleep(5000);
        vehicleUtil.verifyVehicleStatus(vin, noAction);
    });
});