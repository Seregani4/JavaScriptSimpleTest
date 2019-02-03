/**
 * Created by Cottomoeller on 3/22/2016.
 */

describe("Verify No Action fault on vehicle -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var vehiclesPage = require('../../../pages/vehicles.page.js');
    var vehiclesDetailPage = require('../../../pages/vehicledetail.page.js');
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var password = browser.params.adduser.password;
    var vin = browser.params.vehicle.vin;

    browser.driver.manage().window().maximize();

    beforeEach(function () {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
    });

    afterEach(function () {
        browser.executeScript('window.localStorage.clear();');
    });

    it("Validate there is no recommendation message", function () {
        navigation.clickVehiclesLink();
        navigation.typeInSearchFilter(vin);
        vehiclesPage.verifyStatusOnVehicle('No Action');
        vehiclesPage.clickVehicleHyperlinkCellSearch(vin);
        vehiclesPage.verifyCorrectVehicleDetailPage(vin);
        vehiclesDetailPage.verifyStatusOnDetailsPage('no action');
        vehiclesDetailPage.verifyStatusIconOnVehicleDetailsPage('no action');
    });
});