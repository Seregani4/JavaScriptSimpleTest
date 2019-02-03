/**
 * Created by tbui on 2/26/2016.
 */

describe("Verify Vehicle Edit page has the proper fields -----> ", function () {

    var navigation = require('../../../pages/navigation.page.js');
    var loginPage = require('../../../pages/login.page.js');
    var vehiclesPage = require('../../../pages/vehicles.page.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;

    browser.driver.manage().window().maximize();

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("Verify the cancel button works on Vehicle Edit page", function () {
        loginPage.get();
        loginPage.login('paccar', peoplenetAdminEmail, password);

        navigation.clickVehiclesLink();
        navigation.typeInSearchFilter(browser.params.vehicle.vin);
        vehiclesPage.clickVehicleMoreOptions(browser.params.vehicle.vin);
        vehiclesPage.editMoreOptionsButton.click();
        expect(browser.getCurrentUrl()).toBe(browser.params.environment.url + '/#/nav/vehicle/edit/' + browser.params.vehicle.vin);
        vehiclesPage.cancelBtn.click();
        expect(browser.getCurrentUrl()).toBe(browser.params.environment.url + '/#/nav/vehicle/details/' + browser.params.vehicle.vin);
    });

    it("Verify all correct fields are on the Vehicle Edit page", function () {
        loginPage.get();
        loginPage.login('paccar', peoplenetAdminEmail, password);

        navigation.clickVehiclesLink();
        navigation.typeInSearchFilter(browser.params.vehicle.vin);
        vehiclesPage.clickVehicleMoreOptions(browser.params.vehicle.vin);
        vehiclesPage.editMoreOptionsButton.click();
        expect(browser.getCurrentUrl()).toBe(browser.params.environment.url + '/#/nav/vehicle/edit/' + browser.params.vehicle.vin);
        vehiclesPage.verifyEditVehicleFields();
    });
});