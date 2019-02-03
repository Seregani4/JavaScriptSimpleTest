/**
 * Created by Cottomoeller on 3/23/2016.
 */

describe("Verify Stop Now fault is set on vehicle -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var vehicleUtil = require('../../../utilities/vehicle.util');
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var password = browser.params.adduser.password;
    var vin = browser.params.vehicle.vin;
    var stopNowStatus = vehicleUtil.getStopNowStatus();

    browser.driver.manage().window().maximize();

    beforeEach(function () {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
    });

    afterEach(function () {
        browser.executeScript('window.localStorage.clear();');
    });

    it("Verify stop Now fault is set", function () {
        vehicleUtil.setVehicleStatus('paccar', vin, stopNowStatus);
    });

    it("Verify stop Now fault is cleared", function () {
        vehicleUtil.verifyFaultIsCleared('paccar', vin, stopNowStatus);
    });
});