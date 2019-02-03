/**
 * Created by Cottomoeller on 3/22/2016.
 */

describe("Verify No Action fault on vehicle ----- ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var vehiclesPage = require('../../../pages/vehicles.page.js');
    var vehiclesDetailPage = require('../../../pages/vehicledetail.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var vehicleUtil = require('../../../utilities/vehicle.util');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;
    var vin = browser.params.vehicle.vin;
    var noActionStatus = vehicleUtil.getNoActionStatus();

    browser.driver.manage().window().maximize();

    beforeEach(function () {
        loginPage.get();
        loginPage.login('supportal', peoplenetAdminEmail, password);
    });

    afterEach(function () {
        browser.executeScript('window.localStorage.clear();');
    });

    it("Validate there is no recommendation message", function () {
        navigation.fleetHealthButton.click();
        navigation.clickVehiclesLink();
        navigation.typeInSearchFilter(vin);
        vehiclesPage.verifyStatusOnVehicle(noActionStatus);
        vehiclesPage.clickVehicleHyperlinkCellSearch(vin);
        vehiclesPage.verifyCorrectVehicleDetailPage(vin);
        vehiclesDetailPage.verifyStatusOnDetailsPage(noActionStatus);
        vehiclesDetailPage.verifyStatusIconOnVehicleDetailsPage(noActionStatus);
    });
});