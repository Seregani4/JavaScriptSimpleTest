/**
 * Created by pshrestha on 1/9/2018.
 */

describe("Validate permissions for Cummins Users -----> ", () => {

    var loginPage = require('../../../pages/login.page.js');
    var vehicleUtil = require('../../../utilities/vehicle.util.js');
    var vehiclesPage = require('../../../pages/vehicles.page.js');
    var vehiclesDetailsPage = require('../../../pages/vehicledetail.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var userPage = require('../../../pages/users.page.js');
    var cumminsUserEmail = browser.params.testuseremails.cumminsuser;
    var password = browser.params.adduser.password;
    var vin = browser.params.vehicle.cumminsrealvin;
    var nonCumminsCustomer = browser.params.testregularcustomer.name;
    var cumminsDealer = browser.params.testCumminsDealer.name;

    browser.driver.manage().window().maximize();

    beforeEach(() => {
        // Get a fresh Angular "session" so we can avoid bootstrapping errors
        browser.driver.get("about:blank");
        browser.sleep(1000);
        loginPage.get();
        loginPage.login('paccar', cumminsUserEmail, password);
    });

    afterEach(() => {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it('Verify cummins users see Cummins Vehicles only', () => {
        browser.sleep(2000);
        vehicleUtil.validateVehicleViewPermission(cumminsUserEmail);
        //vehicleUtil.cumminsVehiclesEdit();
    });

    it('Verify cummins user cannot click on Customers name on Vehicle Details page', () => {
        vehicleUtil.goToVehicleDetails(vin);
        vehiclesPage.cannotClickOnCustomerName();
    });

    it('Verify cummins user can view Dealer Details but no breadcrumbs', () => {
        vehicleUtil.goToVehicleDetails(vin);
        navigation.moreOptionsButton.click();
        vehiclesPage.viewDealerBtn.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/dealer/details/');
        navigation.validateBreadCrumbs(['Dashboard', cumminsDealer]);
    });

    it('Verify cummins user cannot search for Customers and Users', () => {
        //Global search for customers has a bug
        navigation.verifyGlobalSearchResult('people ' + nonCumminsCustomer, false);
        browser.refresh();
        navigation.verifyGlobalSearchResult('person ' + cumminsUserEmail, false);
    });

    it('Verify cummins user cannot export and only configure columns', () => {
        navigation.clickVehiclesLink();
        navigation.moreOptionsButton.click();
        vehicleUtil.verifyVehicleListMoreOptions(cumminsUserEmail);
        vehicleUtil.goToVehicleDetails(vin);
        vehiclesDetailsPage.faultLogActionsMenu.click();
        vehicleUtil.verifyVehicleListMoreOptions(cumminsUserEmail);
    });

    it('Verify cummins user cannot see set-in-repair and trip-audit', () => {
        vehicleUtil.goToVehicleDetails(vin);
        vehicleUtil.cumminsUserVehicleOption();
    });

    it('Verify cummins user cannot see breadcrumb and notifications tab on User Profile Page', () => {
        navigation.clickUserMenu('paccar');
        navigation.clickUserProfileLink();
        navigation.validateBreadCrumbs(['Dashboard', 'Edit User Details']);
        expect(userPage.notificationsTab.isPresent()).toBe(false, 'Notifications tab is still displayed.');
        userPage.saveBtn.click();
        expect(userPage.notificationsTab.isPresent()).toBe(false, 'Notifications tab is still displayed.');
    });
});