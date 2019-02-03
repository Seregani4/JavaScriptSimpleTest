/**
 * Created by jelliott on 08/12/2016.
 */
describe("Verifying data and functionality for Devices Page -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var deviceCollectionsPage = require('../../../pages/device.collections.page.js');
    var tableUtil = require('../../../utilities/tables.util.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var collectionNameColumn = deviceCollectionsPage.columns.nameColumn;
    var password = browser.params.adduser.password;

    browser.driver.manage().window().maximize();

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("Verify Device Collections table has all correct fields visible", function () {
        loginPage.get();
        loginPage.login('paccar', peoplenetAdminEmail, password);
        navigation.clickDeviceCollectionsLink();
        deviceCollectionsPage.verifyDeviceCollectionsTableDataIsVisible();
        navigation.typeInSearchFilter('00000test');
        tableUtil.verifyColumn('00000test', collectionNameColumn);
        navigation.clearAllFiltersButton.click();
    });
});

// describe("Verifying data and functionality for Devices Page ----- ", function(){
//
//     var loginPage = require('../../../pages/login.page.js');
//     var navigation = require('../../../pages/navigation.page.js');
//     var deviceCollectionsPage = require('../../../pages/device.collections.page.js');
//     var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
//     var password = browser.params.adduser.password;
//
//
//     var vehiclesPage = require('../../../pages/vehicles.page.js');
//     var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
//     var password = browser.params.adduser.password;
//     var vehicleVin = browser.params.vehicle.vin;
//     var unitNumber = browser.params.vehicle.unitnumber;
//     var description = browser.params.vehicle.description;
//     var testUnitNumber = 'TESTUNITNUMBER123';
//     var testDescription = 'Test Out for maintenance.';
//     var devicesPage = require('../../../pages/devices.page.js');
//
//     browser.driver.manage().window().maximize();
//
//     afterEach(function() {
//         //clear browser storage to simulate logout!
//         browser.executeScript('window.localStorage.clear();');
//     });
//
//     it("Verify Device Collections table has all correct fields visible", function(){
//         loginPage.get();
//         loginPage.login('paccar', peoplenetAdminEmail, password);
//         navigation.clickDeviceCollectionsLink();
//         deviceCollectionsPage.verifyDeviceCollectionsTableDataIsVisible();
//         //navigation.searchFilterButton.click();
//         navigation.typeInSearchFilter('00000test');
//         deviceCollectionsPage.verifyNameColumn('00000test');
//         navigation.clearAllFiltersButton.click();
//         navigation.devicesLink.click();
//         navigation.typeInSearchFilter('I know the search filter was NOT open by default');
//         browser.sleep(10000);
//     });
//
//
//     it("Appropriate vehicle fields can be edited", function() {
//         loginPage.get();
//         loginPage.login('paccar', peoplenetAdminEmail, password);
//
//         navigation.clickVehiclesLink();
//         browser.sleep(3000);
//         navigation.typeInSearchFilter(browser.params.vehicle.vin);
//         vehiclesPage.clickVehicleMoreOptions(browser.params.vehicle.vin);
//         vehiclesPage.editMoreOptionsButton.click();
//         vehiclesPage.editUnitNumber(testUnitNumber);
//         vehiclesPage.editDescription(testDescription);
//         vehiclesPage.clickSaveBtn(vehicleVin);
//         vehiclesPage.validateEditedFields(testDescription, testUnitNumber);
//
//         navigation.customersLink.click();
//         navigation.typeInSearchFilter('I know the search filter IS open by default');
//         browser.sleep(10000);
//     });
//
//     it("Reset the vehicle fields that were edited", function() {
//         loginPage.get();
//         loginPage.login('paccar', peoplenetAdminEmail, password);
//
//         navigation.clickVehiclesLink();
//         navigation.typeInSearchFilter(browser.params.vehicle.vin, vehiclesPage);
//         vehiclesPage.clickVehicleMoreOptions(browser.params.vehicle.vin);
//         vehiclesPage.editMoreOptionsButton.click();
//         vehiclesPage.editUnitNumber(unitNumber);
//         vehiclesPage.editDescription(description);
//         vehiclesPage.clickSaveBtn(vehicleVin);
//         vehiclesPage.validateEditedFields(description, unitNumber);
//     });
// });