/**
 * Created by Cottomoeller on 3/23/2016.
 */
describe("Verify Stop Now fault is set on vehicle ----- ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var vehicleUtil = require('../../../utilities/vehicle.util');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;
    var vin = browser.params.vehicle.vin;
    var stopNowStatus =  vehicleUtil.getStopNowStatus();

    browser.driver.manage().window().maximize();

    beforeEach(function () {
        loginPage.get();
        loginPage.login('supportal', peoplenetAdminEmail, password);
    });

    afterEach(function () {
        browser.executeScript('window.localStorage.clear();');
    });

    it("Verify stop Now fault is set", function () {
        vehicleUtil.setVehicleStatus('supportal', vin, stopNowStatus);
    });

    it("Verify Stop Now fault is cleared", function () {
        vehicleUtil.verifyFaultIsCleared('supportal', vin, stopNowStatus);
    });
});