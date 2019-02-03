/**
 * Created by Cottomoeller on 3/22/2016.
 */
describe("Verify Informational fault is set on vehicle ----- ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var vehiclesPage = require('../../../pages/vehicles.page.js');
    var vehiclesDetailPage = require('../../../pages/vehicledetail.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var vehicleUtil = require('../../../utilities/vehicle.util');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;
    var vin = browser.params.vehicle.vin;
    var noActionStatus = vehicleUtil.getNoActionStatus();
    var informationalStatus = vehicleUtil.getInformationalStatus();

    browser.driver.manage().window().maximize();

    beforeEach(function () {
        loginPage.get();
        loginPage.login('supportal', peoplenetAdminEmail, password);
    });

    afterEach(function () {
        browser.executeScript('window.localStorage.clear();');
    });

    it("Remove current status if the Vehicle has In Repair status", function () {
        navigation.fleetHealthButton.click();
        navigation.clickVehiclesLink();
        navigation.typeInSearchFilter(vin);
        vehiclesPage.clickVehicleHyperlinkCellSearch(vin);
        vehiclesPage.recommendation.getText().then(function (status) {
            vehicleUtil.cleanupVehicleStatus(status)
        });
        vehiclesDetailPage.verifyStatusOnDetailsPage(noActionStatus);

    });

    it("Verify Informational fault is set", function () {
        vehicleUtil.setVehicleStatus('supportal', vin, informationalStatus);

    });

    it("Verify Information fault is cleared and No Status icon is visible", function () {
        vehicleUtil.verifyFaultIsCleared('supportal', vin, informationalStatus)

    });
});