/**
 * Created by jelliott on 12/22/2016.
 */

describe("Verify Fault Details Page -----> ", function () {

    var navigation = require('../../../pages/navigation.page.js');
    var loginPage = require('../../../pages/login.page.js');
    var vehiclesPage = require('../../../pages/vehicles.page.js');
    var faultDetailsPage = require('../../../pages/fault.details.page.js');
    var vehicleDetailPage = require('../../../pages/vehicledetail.page.js');
    var vehicleUtil = require('../../../utilities/vehicle.util');
    var faultDetailsUrl = browser.params.environment.url + '/#/nav/faults/peoplenet:faultlog';
    var stopNowStatus = vehicleUtil.getStopNowStatus();
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var password = browser.params.adduser.password;
    var vin = browser.params.vehicle.vin;

    browser.driver.manage().window().maximize();

    beforeEach(function () {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.clickVehiclesLink();
    });

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it('Throw a STOP NOW fault and verify the fault is set', function () {

        vehiclesPage.triggerFault(stopNowStatus);
        browser.sleep(3000); //Sleep required for the fault to process.
        vehicleUtil.verifyVehicleStatus(vin, stopNowStatus);
    });

    it('Validate Map Modal Button on Fault Detail Page', function () {
        navigation.typeInSearchFilter(vin);
        vehiclesPage.clickVehicleHyperlinkCellSearch(vin);
        vehicleDetailPage.faultDetailsButton.get(0).click();
        expect(browser.getCurrentUrl()).toContain(faultDetailsUrl);
        faultDetailsPage.verifyTabsOnFaultDetailPage();
        faultDetailsPage.verifyMapModal();
    });

    it('Validate the BreadCrumbs on the Fault Details Page', function () {
        navigation.typeInSearchFilterRecommendation(vin);
        vehiclesPage.clickVehicleHyperlinkCellSearch(vin);
        vehicleDetailPage.faultDetailsButton.get(0).click();
        expect(browser.getCurrentUrl()).toContain(faultDetailsUrl);
        navigation.validateBreadCrumbs(['Dashboard', 'Vehicles', 'Vehicle Details', 'Fault Details']);

        navigation.breadCrumbs.$$('li').get(2).click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/vehicle/details/');

        navigation.breadCrumbs.$$('li').get(1).click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/vehicle/list/?vehicle=');
    });

    it('Validate SnapShot Data Tab is Present  on Fault Detail Page', function () {
        navigation.typeInSearchFilter(vin);
        vehiclesPage.clickVehicleHyperlinkCellSearch(vin);
        vehicleDetailPage.faultDetailsButton.get(0).click();
        expect(browser.getCurrentUrl()).toContain(faultDetailsUrl);
        faultDetailsPage.verifySnapshotData();

    });

    it('Validate Email Data Tab is Present  on Fault Detail Page', function () {
        navigation.typeInSearchFilter(vin);
        vehiclesPage.clickVehicleHyperlinkCellSearch(vin);
        vehicleDetailPage.faultDetailsButton.get(0).click();
        expect(browser.getCurrentUrl()).toContain(faultDetailsUrl);
        faultDetailsPage.emailTab.click();
        expect(faultDetailsPage.emailPanel.isPresent()).toBe(true);
    });

    it('Validate Authorized Dealer Tab is Present  on Fault Detail Page', function () {
        navigation.typeInSearchFilter(vin);
        vehiclesPage.clickVehicleHyperlinkCellSearch(vin);
        vehicleDetailPage.faultDetailsButton.get(0).click();
        expect(browser.getCurrentUrl()).toContain(faultDetailsUrl);
        faultDetailsPage.authorizedDealer.click();
        expect(faultDetailsPage.authorizedDealerPanel.isPresent()).toBe(true);

        //clear the fault from the VIN
        vehicleUtil.verifyFaultIsCleared('paccar', vin, stopNowStatus);
    });
});