/**
 * Created by Cottomoeller on 3/22/2016.
 */
describe("Verify Service Soon fault is set on vehicle ----- ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var vehicleUtil = require('../../../utilities/vehicle.util');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;
    var vin = browser.params.vehicle.vin;
    var serviceSoonStatus = vehicleUtil.getServiceSoonStatus();

    browser.driver.manage().window().maximize();

    beforeEach(function () {
        loginPage.get();
        loginPage.login('supportal', peoplenetAdminEmail, password);
    });

    afterEach(function () {
        browser.executeScript('window.localStorage.clear();');
    });

    it("Verify Service Soon fault is set", function () {
        vehicleUtil.setVehicleStatus('supportal', vin, serviceSoonStatus);
    });

    it("Verify Information fault is cleared", function () {
        vehicleUtil.verifyFaultIsCleared('supportal', vin, serviceSoonStatus);

    });
});