/**
 * Created by jelliott on 11/30/2016.
 */

describe("Basic navigation of all application pages -----> ", function () {

    var loginPage = require('../../pages/login.page.js');
    var navigation = require('../../pages/navigation.page.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;

    browser.driver.manage().window().maximize();

    beforeEach(function () {
        //log in
        loginPage.get();
        loginPage.login('paccar', peoplenetAdminEmail, password);
    });

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("PeopleNet Admin role has visibility to all proper links", function () {
        expect(navigation.dashboardLink.isDisplayed()).toBe(true);
        expect(navigation.customersLink.isDisplayed()).toBe(true);
        expect(navigation.vehiclesLink.isDisplayed()).toBe(true);
        expect(navigation.dealersLink.isDisplayed()).toBe(true);
        expect(navigation.dealerOwnerGroupsLink.isDisplayed()).toBe(true);
        expect(navigation.analyticsLink.isDisplayed()).toBe(true);
        expect(navigation.exportLink.isDisplayed()).toBe(true);
        expect(navigation.devicesLink.isDisplayed()).toBe(true);
        expect(navigation.deviceCollectionsLink.isDisplayed()).toBe(true);
        expect(navigation.manufacturersLink.isDisplayed()).toBe(true);
        expect(navigation.notificationsLink.isDisplayed()).toBe(true);
        expect(navigation.oemsLink.isDisplayed()).toBe(true);
        expect(navigation.remoteDiagLink.isDisplayed()).toBe(true);
        expect(navigation.permissionsLink.isDisplayed()).toBe(false);
        expect(navigation.rolesLink.isDisplayed()).toBe(true);
        expect(navigation.topTenFaultsLink.isDisplayed()).toBe(true);
        expect(navigation.usersLink.isDisplayed()).toBe(true);
    }, 500000);

    it("All navigation links are functional", function () {
        navigation.clickDealerOwnerGroupsLink();
        navigation.clickDealersLink();
        navigation.clickCustomersLink();
        navigation.clickUsersLink();
        navigation.clickVehiclesLink();
        navigation.clickNotificationsLink();
        navigation.clickAnalyticsLink();
        navigation.clickTopTenFaultsLink();
        navigation.clickDataExportLink();
        navigation.clickDeviceCollectionsLink();
        navigation.clickDevicesLink();
        navigation.clickManufacturersLink();
        navigation.clickOEMsLink();
        navigation.clickRemoteDiagLink();
        navigation.clickRolesLink();
    }, 500000);
});