/**
 * Created by Popazov on 11/13/2017.
 */

describe("Verify Spanish translations on the Vehicle page -----> ", function () {

    var loginPage = require('../../../pages/login.page');
    var navigation = require('../../../pages/navigation.page');
    var vehicles = require('../../../pages/vehicles.page');
    var vehicleDetail = require('../../../pages/vehicledetail.page');
    var vehicleUtil = require('../../../utilities/vehicle.util');
    var kenMexUtil = require('../../../utilities/kenMex.util');
    var translation = require('../../../json/kenmex');
    var vin = browser.params.vehicle.vin;
    var cumminsrealvin = browser.params.vehicle.cumminsrealvin;
    var spanishOemAdmin = browser.params.testuseremails.kenmexpaccaradmin;
    var spanishSuperAdmin = browser.params.testuseremails.kenmexsuperadmin;
    var password = browser.params.adduser.password;
    var stopNowStatus = vehicleUtil.getStopNowStatus();

    browser.driver.manage().window().maximize();

    beforeEach(() => {
        browser.driver.get("about:blank");
        browser.sleep(1000);
        loginPage.get();
    });

    afterEach(() => {
        browser.executeScript('window.localStorage.clear();');
    });

    it("Validate translations on the Vehicle and Child Pages", () => {
        loginPage.login('paccar', spanishOemAdmin, password);
        navigation.vehiclesLink.click();
        kenMexUtil.validateVehiclePage(translation);
        navigation.typeInSearchFilter(vin);
        navigation.waitTillElementToBeClickable(vehicles.actionBarMoreOptionsButton);
        vehicles.actionBarMoreOptionsButton.click();
        vehicles.editVehicleMoreOptionsButton.click();
        kenMexUtil.validateEditVehiclePage(translation);
        navigation.vehiclesLink.click();
        navigation.typeInSearchFilter(vin);
        vehicles.actionBarMoreOptionsButton.click();
        vehicles.addToVehicleGroupMoreOptionsButton.click();
        kenMexUtil.validateAddToVehicleGroupPopup(translation);
        vehicles.actionBarMoreOptionsButton.click();
        vehicles.viewTripAuditMoreOptionsButton.click();
        kenMexUtil.validateTripAuditPage(translation);
        navigation.vehiclesLink.click();
        navigation.typeInSearchFilter(vin);
        vehicles.actionBarMoreOptionsButton.click();
        vehicles.ownershipHistoryMoreOptionsButton.click();
        kenMexUtil.validateOwnershipHistoryPage(translation, vin);
        navigation.vehiclesLink.click();
        navigation.typeInSearchFilter(vin);
        vehicles.actionBarMoreOptionsButton.click();
        vehicles.transferOwnershipActionButton.click();
        kenMexUtil.validateTransferOwnershipPage(translation, vin)
    });

    it("Validate translations on the Vehicle Detail Page", () => {
        loginPage.login('paccar', spanishOemAdmin, password);
        navigation.vehiclesLink.click();
        navigation.typeInSearchFilter(vin);
        vehicles.clickVehicleHyperlinkCellSearch(vin);
        kenMexUtil.validateVehicleDetailPage(translation);
    });

    it("Validate translations on the Fault Detail Page", () => {
        loginPage.login('paccar', spanishOemAdmin, password);
        vehicles.triggerFault(stopNowStatus);
        navigation.vehiclesLink.click();
        navigation.typeInSearchFilter(vin);
        vehicles.clickVehicleHyperlinkCellSearch(vin);
        vehicleDetail.faultDetailsButton.click();
        kenMexUtil.validateFaultDetailPage(translation);
    });

    it("Clean up fault for vehicle", () => {
        loginPage.login('paccar', spanishOemAdmin, password);
        navigation.vehiclesLink.click();
        navigation.typeInSearchFilter(vin);
        vehicles.clickVehicleHyperlinkCellSearch(vin);
        vehicleDetail.cleanupFault();
    });

    it('TC-1635 Validate translation on Device Details page', () => {
        loginPage.login('paccar', spanishSuperAdmin, password);
        navigation.vehiclesLink.click();
        navigation.typeInSearchFilter(cumminsrealvin);
        vehicles.clickVehicleHyperlinkCellSearch(cumminsrealvin);
        vehicles.dsnHyperlink.click();
        kenMexUtil.validateDeviceDetailspage(translation);
    });

    it('TC-683 Validate Device Details - Run Diagnostic', () => {
        loginPage.login('paccar', spanishSuperAdmin, password);
        navigation.vehiclesLink.click();
        kenMexUtil.validateRunDiagnostic(translation);
    });

    it('TC-677 Validate Device Details - VIN Discovery', () => {
        loginPage.login('paccar', spanishSuperAdmin, password);
        navigation.vehiclesLink.click();
        kenMexUtil.validateVinDiscovery(translation);
    });

    it('TC-681 Validate Device Details - Hard Reboot', () => {
        loginPage.login('paccar', spanishOemAdmin, password);
        navigation.vehiclesLink.click();
        kenMexUtil.validateHardReboot(translation);
    });
});