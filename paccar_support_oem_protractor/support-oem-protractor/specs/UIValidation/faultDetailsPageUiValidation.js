/**
 * Created by jelliott on 12/22/2016.
 */

describe("Verify Fault Details Page", function(){

    var navigation = require('../../../pages/navigation.page.js');
    var loginPage = require('../../../pages/login.page.js');
    var vehiclesPage = require('../../../pages/vehicles.page.js');
    var faultDetailsPage = require('../../../pages/fault.details.page.js');
    var vehiclesDetailPage = require('../../../pages/vehicledetail.page.js');
    var vin = browser.params.vehicle.vin;
    //Users
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;

    browser.driver.manage().window().maximize();

    afterEach(function() {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it('Validate Map Modal Button on Fault Detail Page', function(){
        loginPage.get();
        loginPage.login('supportal', peoplenetAdminEmail, password);
        vehiclesPage.triggerFault('service now');
        navigation.fleetHealthButton.click();
        navigation.clickVehiclesLink();
        navigation.typeInSearchFilter(vin);
        vehiclesPage.verifyStatusOnVehicle('Service Now');

        // //FOR STAGING USE
        // loginPage.get();
        // loginPage.login('supportal', peoplenetAdminEmail, password);
        // navigation.fleetHealthButton.click();
        // navigation.clickVehiclesLink();
        // navigation.typeInSearchFilter('1XPBDP9X3GD298065');
        // vehiclesPage.verifyStatusOnVehicle('Service Now');
        // vehiclesPage.clickVehicleHyperlinkCellSearch('1XPBDP9X3GD298065');

        //FOR QA-TESTS
        vehiclesPage.clickVehicleHyperlinkCellSearch(vin);

        vehiclesDetailPage.faultDetailsButton.get(0).click();
        //faultDetailsPage.verifyTabsOnFaultDetailPage();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/faults/peoplenet:faultlog');
        expect(faultDetailsPage.mapModalLink.isPresent()).toBe(true,'Map Modal Link is not Present');
        faultDetailsPage.mapModalLink.click();
        expect(faultDetailsPage.mapModal.isPresent()).toBe(true,'Map Modal Did not show up');
        expect(faultDetailsPage.mapModalCloseButton.isPresent()).toBe(true,"The Map Modal Close Button is not Present");
        faultDetailsPage.mapModalCloseButton.click();
    });

    it('Validate SnapShot Data Tab is Present  on Fault Detail Page', function(){
        loginPage.get();
        loginPage.login('supportal', peoplenetAdminEmail, password);
        vehiclesPage.triggerFault('service now');
        navigation.fleetHealthButton.click();
        navigation.clickVehiclesLink();
        navigation.typeInSearchFilter(vin);
        vehiclesPage.verifyStatusOnVehicle('Service Now');

        // //FOR STAGING USE
        // loginPage.get();
        // loginPage.login('supportal', peoplenetAdminEmail, password);
        // navigation.fleetHealthButton.click();
        // navigation.clickVehiclesLink();
        // navigation.typeInSearchFilter('1XPBDP9X3GD298065');
        // vehiclesPage.verifyStatusOnVehicle('Service Now');
        // vehiclesPage.clickVehicleHyperlinkCellSearch('1XPBDP9X3GD298065');

        //FOR QA-TESTS
        vehiclesPage.clickVehicleHyperlinkCellSearch(vin);

        vehiclesDetailPage.faultDetailsButton.get(0).click();
        faultDetailsPage.snapshotDataTab.click();
        expect(faultDetailsPage.snapShotMessage.isPresent()).toBe(true);
    });

    it('Validate Email Data Tab is Present  on Fault Detail Page', function(){
        loginPage.get();
        loginPage.login('supportal', peoplenetAdminEmail, password);
        vehiclesPage.triggerFault('service now');
        navigation.fleetHealthButton.click();
        navigation.clickVehiclesLink();
        navigation.typeInSearchFilter(vin);
        vehiclesPage.verifyStatusOnVehicle('Service Now');

        // //FOR STAGING USE
        // loginPage.get();
        // loginPage.login('supportal', peoplenetAdminEmail, password);
        // navigation.fleetHealthButton.click();
        // navigation.clickVehiclesLink();
        // navigation.typeInSearchFilter('1XPBDP9X3GD298065');
        // vehiclesPage.verifyStatusOnVehicle('Service Now');
        // vehiclesPage.clickVehicleHyperlinkCellSearch('1XPBDP9X3GD298065');

        //FOR QA-TESTS
        vehiclesPage.clickVehicleHyperlinkCellSearch(vin);

        vehiclesDetailPage.faultDetailsButton.get(0).click();
        faultDetailsPage.emailTab.click();
        expect(faultDetailsPage.emailPanel.isPresent()).toBe(true);
    });


    it('Validate Authorized Dealer Tab is Present  on Fault Detail Page', function(){
        loginPage.get();
        loginPage.login('supportal', peoplenetAdminEmail, password);
        vehiclesPage.triggerFault('service now');
        navigation.fleetHealthButton.click();
        navigation.clickVehiclesLink();
        navigation.typeInSearchFilter(vin);
        vehiclesPage.verifyStatusOnVehicle('Service Now');

        // //FOR STAGING USE
        // loginPage.get();
        // loginPage.login('supportal', peoplenetAdminEmail, password);
        // navigation.fleetHealthButton.click();
        // navigation.clickVehiclesLink();
        // navigation.typeInSearchFilter('1XPBDP9X3GD298065');
        // vehiclesPage.verifyStatusOnVehicle('Service Now');
        // vehiclesPage.clickVehicleHyperlinkCellSearch('1XPBDP9X3GD298065');

        //FOR QA-TESTS
        vehiclesPage.clickVehicleHyperlinkCellSearch(vin);

        vehiclesDetailPage.faultDetailsButton.get(0).click();
        faultDetailsPage.authorizedDealer.click();
        expect(faultDetailsPage.authorizedDealerPanel.isPresent()).toBe(true);
    });

    it("Verify fault is cleared and No Status icon is visible", function(){
        loginPage.get();
        loginPage.login('supportal', peoplenetAdminEmail, password);
        vehiclesPage.triggerFault('service now');
        navigation.fleetHealthButton.click();
        navigation.clickVehiclesLink();
        navigation.typeInSearchFilter(vin);
        vehiclesPage.verifyStatusOnVehicle('Service Now');

        // //FOR STAGING USE
        // loginPage.get();
        // loginPage.login('supportal', peoplenetAdminEmail, password);
        // navigation.fleetHealthButton.click();
        // navigation.clickVehiclesLink();
        // navigation.typeInSearchFilter('1XPBDP9X3GD298065');
        // vehiclesPage.verifyStatusOnVehicle('Service Now');
        // vehiclesPage.clickVehicleHyperlinkCellSearch('1XPBDP9X3GD298065');

        //FOR QA-TESTS
        vehiclesPage.clickVehicleHyperlinkCellSearch(vin);

        vehiclesPage.actionMenu.click();
        vehiclesPage.clearActiveFaultsBtn.click();
        vehiclesPage.confirmBtn.click();
        browser.sleep(2000);
        vehiclesDetailPage.verifyStatusOnDetailsPage('no action');
        vehiclesDetailPage.verifyStatusIconOnVehicleDetailsPage('no action');
        navigation.fleetHealthButton.click();
        navigation.clickVehiclesLink();
        navigation.typeInSearchFilter(vin);
        vehiclesPage.verifyStatusOnVehicle('No Action');
    });

});