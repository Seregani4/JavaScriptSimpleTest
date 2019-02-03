/**
 * Created by tbui on 2/25/2016.
 */
describe("Basic navigation of all application pages -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var paccarUserEmail = browser.params.testuseremails.paccaruser;
    var divisionUserEmail = browser.params.testuseremails.divisionuser;
    var dealerowneradmin = browser.params.testuseremails.dealerowneradmin;
    var dealerowneruser = browser.params.testuseremails.dealerowneruser;
    var dealerregionadmin = browser.params.testuseremails.dealerregionadmin;
    var dealerregionuser = browser.params.testuseremails.dealerregionuser;
    var factoryWorkerEmail = browser.params.testuseremails.factoryworker;
    var dealerAdminEmail = browser.params.testuseremails.dealeradmin;
    var dealerUserEmail = browser.params.testuseremails.dealeruser;
    var customerAdminEmail = browser.params.testuseremails.customeradmin;
    var customerUserEmail = browser.params.testuseremails.customeruser;
    var dealerTechEmail = browser.params.testuseremails.dealertech;
    var password = browser.params.adduser.password;

    browser.driver.manage().window().maximize();

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("PeopleNet Admin role has visibility to all correct left hand nav links", function () {
        //log in
        loginPage.get();
        loginPage.login('paccar', peoplenetAdminEmail, password);
        //base links present
        expect(navigation.fleetHealthMapLink.isDisplayed()).toBe(true);
        expect(navigation.customersLink.isDisplayed()).toBe(true);
        expect(navigation.dealersLink.isDisplayed()).toBe(true);
        expect(navigation.vehiclesLink.isDisplayed()).toBe(true);
        expect(navigation.analyticsLink.isDisplayed()).toBe(true);
        expect(navigation.exportLink.isDisplayed()).toBe(true);
        expect(navigation.devicesLink.isDisplayed()).toBe(true);
        expect(navigation.deviceCollectionsLink.isDisplayed()).toBe(true);
        expect(navigation.manufacturersLink.isDisplayed()).toBe(true);
        expect(navigation.notificationsLink.isDisplayed()).toBe(true);
        expect(navigation.oemsLink.isDisplayed()).toBe(true);
        expect(navigation.rolesLink.isDisplayed()).toBe(true);
        expect(navigation.topTenFaultsLink.isDisplayed()).toBe(true);
        expect(navigation.usersLink.isDisplayed()).toBe(true);
        expect(navigation.dealerOwnerGroupsLink.isDisplayed()).toBe(true);
        expect(navigation.remoteDiagLink.isDisplayed()).toBe(true);
    });

    it("Paccar Admin role role has visibility to all correct left hand nav links", function () {
        //log in
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        //base links present
        expect(navigation.fleetHealthMapLink.isDisplayed()).toBe(true);
        expect(navigation.dealersLink.isDisplayed()).toBe(true);
        expect(navigation.customersLink.isDisplayed()).toBe(true);
        expect(navigation.usersLink.isDisplayed()).toBe(true);
        expect(navigation.vehiclesLink.isDisplayed()).toBe(true);
        expect(navigation.notificationsLink.isDisplayed()).toBe(true);
        expect(navigation.analyticsLink.isDisplayed()).toBe(true);
        expect(navigation.topTenFaultsLink.isDisplayed()).toBe(true);
        expect(navigation.exportLink.isDisplayed()).toBe(false);
        expect(navigation.devicesLink.isDisplayed()).toBe(false);
        expect(navigation.deviceCollectionsLink.isDisplayed()).toBe(false);
        expect(navigation.manufacturersLink.isDisplayed()).toBe(false);
        expect(navigation.oemsLink.isDisplayed()).toBe(false);
        expect(navigation.rolesLink.isDisplayed()).toBe(false);
        expect(navigation.dealerOwnerGroupsLink.isDisplayed()).toBe(true);
        expect(navigation.remoteDiagLink.isDisplayed()).toBe(true);
        expect(navigation.googleAnalyticsLink.isDisplayed()).toBe(true);

    });

    it("Paccar User role role has visibility to all correct left hand nav links", function () {
        //log in
        loginPage.get();
        loginPage.login('paccar', paccarUserEmail, password);
        //base links present
        expect(navigation.fleetHealthMapLink.isDisplayed()).toBe(true);
        expect(navigation.customersLink.isDisplayed()).toBe(true);
        expect(navigation.dealersLink.isDisplayed()).toBe(true);
        expect(navigation.vehiclesLink.isDisplayed()).toBe(true);
        expect(navigation.analyticsLink.isDisplayed()).toBe(true);
        expect(navigation.exportLink.isDisplayed()).toBe(false);
        expect(navigation.devicesLink.isDisplayed()).toBe(false);
        expect(navigation.deviceCollectionsLink.isDisplayed()).toBe(false);
        expect(navigation.manufacturersLink.isDisplayed()).toBe(false);
        expect(navigation.notificationsLink.isDisplayed()).toBe(true);
        expect(navigation.oemsLink.isDisplayed()).toBe(false);
        expect(navigation.rolesLink.isDisplayed()).toBe(false);
        expect(navigation.topTenFaultsLink.isDisplayed()).toBe(true);
        expect(navigation.usersLink.isDisplayed()).toBe(true);
        expect(navigation.dealerOwnerGroupsLink.isDisplayed()).toBe(true);
        expect(navigation.remoteDiagLink.isDisplayed()).toBe(false);
    });

    it("Dealer Admin role has visibility to all correct left hand nav links", function () {
        //log in
        loginPage.get();
        loginPage.login('paccar', dealerAdminEmail, password);
        //base links present
        expect(navigation.fleetHealthMapLink.isDisplayed()).toBe(true);
        expect(navigation.customersLink.isDisplayed()).toBe(true);
        expect(navigation.dealersLink.isDisplayed()).toBe(true);
        expect(navigation.vehiclesLink.isDisplayed()).toBe(true);
        expect(navigation.analyticsLink.isDisplayed()).toBe(false);
        expect(navigation.exportLink.isDisplayed()).toBe(false);
        expect(navigation.devicesLink.isDisplayed()).toBe(false);
        expect(navigation.deviceCollectionsLink.isDisplayed()).toBe(false);
        expect(navigation.manufacturersLink.isDisplayed()).toBe(false);
        expect(navigation.notificationsLink.isDisplayed()).toBe(true);
        expect(navigation.oemsLink.isDisplayed()).toBe(false);
        expect(navigation.rolesLink.isDisplayed()).toBe(false);
        expect(navigation.topTenFaultsLink.isDisplayed()).toBe(false);
        expect(navigation.usersLink.isDisplayed()).toBe(true);
        expect(navigation.dealerOwnerGroupsLink.isDisplayed()).toBe(true);
        expect(navigation.remoteDiagLink.isDisplayed()).toBe(false);
    });

    it("Dealer User role has visibility to all correct left hand nav links", function () {
        //log in
        loginPage.get();
        loginPage.login('paccar', dealerUserEmail, password);
        //base links present
        expect(navigation.fleetHealthMapLink.isDisplayed()).toBe(true);
        expect(navigation.customersLink.isDisplayed()).toBe(true);
        expect(navigation.dealersLink.isDisplayed()).toBe(true);
        expect(navigation.vehiclesLink.isDisplayed()).toBe(true);
        expect(navigation.analyticsLink.isDisplayed()).toBe(false);
        expect(navigation.exportLink.isDisplayed()).toBe(false);
        expect(navigation.devicesLink.isDisplayed()).toBe(false);
        expect(navigation.deviceCollectionsLink.isDisplayed()).toBe(false);
        expect(navigation.manufacturersLink.isDisplayed()).toBe(false);
        expect(navigation.notificationsLink.isDisplayed()).toBe(true);
        expect(navigation.oemsLink.isDisplayed()).toBe(false);
        expect(navigation.rolesLink.isDisplayed()).toBe(false);
        expect(navigation.topTenFaultsLink.isDisplayed()).toBe(false);
        expect(navigation.usersLink.isDisplayed()).toBe(true);
        expect(navigation.dealerOwnerGroupsLink.isDisplayed()).toBe(true);
        expect(navigation.remoteDiagLink.isDisplayed()).toBe(false);
    });

    it("Customer Admin role role has visibility to all correct left hand nav links", function () {
        //log in
        loginPage.get();
        loginPage.login('paccar', customerAdminEmail, password);
        //base links present
        expect(navigation.fleetHealthMapLink.isDisplayed()).toBe(true);
        expect(navigation.customersLink.isDisplayed()).toBe(true);
        expect(navigation.dealersLink.isDisplayed()).toBe(true);
        expect(navigation.vehiclesLink.isDisplayed()).toBe(true);
        expect(navigation.analyticsLink.isDisplayed()).toBe(false);
        expect(navigation.exportLink.isDisplayed()).toBe(false);
        expect(navigation.devicesLink.isDisplayed()).toBe(false);
        expect(navigation.deviceCollectionsLink.isDisplayed()).toBe(false);
        expect(navigation.manufacturersLink.isDisplayed()).toBe(false);
        expect(navigation.notificationsLink.isDisplayed()).toBe(true);
        expect(navigation.oemsLink.isDisplayed()).toBe(false);
        expect(navigation.rolesLink.isDisplayed()).toBe(false);
        expect(navigation.topTenFaultsLink.isDisplayed()).toBe(false);
        expect(navigation.usersLink.isDisplayed()).toBe(true);
        expect(navigation.dealerOwnerGroupsLink.isDisplayed()).toBe(false);
        expect(navigation.remoteDiagLink.isDisplayed()).toBe(false);
    });

    it("Customer User role role has visibility to all correct left hand nav links", function () {
        //log in
        loginPage.get();
        loginPage.login('paccar', customerUserEmail, password);
        //base links present
        expect(navigation.fleetHealthMapLink.isDisplayed()).toBe(true);
        expect(navigation.customersLink.isDisplayed()).toBe(true);
        expect(navigation.dealersLink.isDisplayed()).toBe(true);
        expect(navigation.vehiclesLink.isDisplayed()).toBe(true);
        expect(navigation.analyticsLink.isDisplayed()).toBe(false);
        expect(navigation.exportLink.isDisplayed()).toBe(false);
        expect(navigation.devicesLink.isDisplayed()).toBe(false);
        expect(navigation.deviceCollectionsLink.isDisplayed()).toBe(false);
        expect(navigation.manufacturersLink.isDisplayed()).toBe(false);
        expect(navigation.notificationsLink.isDisplayed()).toBe(true);
        expect(navigation.oemsLink.isDisplayed()).toBe(false);
        expect(navigation.rolesLink.isDisplayed()).toBe(false);
        expect(navigation.topTenFaultsLink.isDisplayed()).toBe(false);
        expect(navigation.usersLink.isDisplayed()).toBe(true);
        expect(navigation.dealerOwnerGroupsLink.isDisplayed()).toBe(false);
        expect(navigation.remoteDiagLink.isDisplayed()).toBe(false);
    });

    it("Division User role role has visibility to all correct left hand nav links", function () {
        //log in
        loginPage.get();
        loginPage.login('paccar', divisionUserEmail, password);
        //base links present
        expect(navigation.fleetHealthMapLink.isDisplayed()).toBe(true);
        expect(navigation.customersLink.isDisplayed()).toBe(true);
        expect(navigation.dealersLink.isDisplayed()).toBe(true);
        expect(navigation.vehiclesLink.isDisplayed()).toBe(true);
        expect(navigation.analyticsLink.isDisplayed()).toBe(false);
        expect(navigation.exportLink.isDisplayed()).toBe(false);
        expect(navigation.devicesLink.isDisplayed()).toBe(false);
        expect(navigation.deviceCollectionsLink.isDisplayed()).toBe(false);
        expect(navigation.manufacturersLink.isDisplayed()).toBe(false);
        expect(navigation.notificationsLink.isDisplayed()).toBe(true);
        expect(navigation.oemsLink.isDisplayed()).toBe(false);
        expect(navigation.rolesLink.isDisplayed()).toBe(false);
        expect(navigation.topTenFaultsLink.isDisplayed()).toBe(true);
        expect(navigation.usersLink.isDisplayed()).toBe(true);
        expect(navigation.dealerOwnerGroupsLink.isDisplayed()).toBe(true);
        expect(navigation.remoteDiagLink.isDisplayed()).toBe(false);
    });

    it("Dealer Technician role has visibility to all correct left hand nav links", function () {
        //log in
        loginPage.get();
        loginPage.login('paccar', dealerTechEmail, password);
        //base links present
        expect(navigation.fleetHealthMapLink.isDisplayed()).toBe(true);
        expect(navigation.customersLink.isDisplayed()).toBe(true);
        expect(navigation.dealersLink.isDisplayed()).toBe(true);
        expect(navigation.vehiclesLink.isDisplayed()).toBe(true);
        expect(navigation.analyticsLink.isDisplayed()).toBe(false);
        expect(navigation.exportLink.isDisplayed()).toBe(false);
        expect(navigation.devicesLink.isDisplayed()).toBe(false);
        expect(navigation.deviceCollectionsLink.isDisplayed()).toBe(false);
        expect(navigation.manufacturersLink.isDisplayed()).toBe(false);
        expect(navigation.notificationsLink.isDisplayed()).toBe(true);
        expect(navigation.oemsLink.isDisplayed()).toBe(false);
        expect(navigation.rolesLink.isDisplayed()).toBe(false);
        expect(navigation.topTenFaultsLink.isDisplayed()).toBe(false);
        expect(navigation.usersLink.isDisplayed()).toBe(true);
        expect(navigation.dealerOwnerGroupsLink.isDisplayed()).toBe(true);
        expect(navigation.remoteDiagLink.isDisplayed()).toBe(false);
    });

    it("Factory Worker role has visibility to all correct left hand nav links", function () {
        //log in
        loginPage.get();
        loginPage.login('paccar', factoryWorkerEmail, password);
        //base links present
        expect(navigation.fleetHealthMapLink.isDisplayed()).toBe(true);
        expect(navigation.customersLink.isDisplayed()).toBe(false);
        expect(navigation.dealersLink.isDisplayed()).toBe(false);
        expect(navigation.vehiclesLink.isDisplayed()).toBe(true);
        expect(navigation.analyticsLink.isDisplayed()).toBe(false);
        expect(navigation.exportLink.isDisplayed()).toBe(false);
        expect(navigation.devicesLink.isDisplayed()).toBe(false);
        expect(navigation.deviceCollectionsLink.isDisplayed()).toBe(false);
        expect(navigation.manufacturersLink.isDisplayed()).toBe(false);
        expect(navigation.notificationsLink.isDisplayed()).toBe(true);
        expect(navigation.oemsLink.isDisplayed()).toBe(false);
        expect(navigation.rolesLink.isDisplayed()).toBe(false);
        expect(navigation.topTenFaultsLink.isDisplayed()).toBe(true);
        expect(navigation.usersLink.isDisplayed()).toBe(false);
        expect(navigation.dealerOwnerGroupsLink.isDisplayed()).toBe(false);
        expect(navigation.remoteDiagLink.isDisplayed()).toBe(false);
    });

    var loginUserArray = [dealerowneradmin, dealerowneruser, dealerregionadmin, dealerregionuser];

    it('All DOG roles have visibility to all correct left hand nav links', function () {
        loginUserArray.filter(function (eachUser) {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            //base links present
            expect(navigation.fleetHealthMapLink.isDisplayed()).toBe(true);
            expect(navigation.customersLink.isDisplayed()).toBe(true);
            expect(navigation.dealersLink.isDisplayed()).toBe(true);
            expect(navigation.vehiclesLink.isDisplayed()).toBe(true);
            expect(navigation.analyticsLink.isDisplayed()).toBe(false);
            expect(navigation.exportLink.isDisplayed()).toBe(false);
            expect(navigation.devicesLink.isDisplayed()).toBe(false, +eachUser + ' can see the device link.');
            expect(navigation.deviceCollectionsLink.isDisplayed()).toBe(false);
            expect(navigation.manufacturersLink.isDisplayed()).toBe(false);
            expect(navigation.notificationsLink.isDisplayed()).toBe(true);
            expect(navigation.oemsLink.isDisplayed()).toBe(false);
            expect(navigation.rolesLink.isDisplayed()).toBe(false);
            expect(navigation.topTenFaultsLink.isDisplayed()).toBe(false);
            expect(navigation.usersLink.isDisplayed()).toBe(true);
            expect(navigation.dealerOwnerGroupsLink.isDisplayed()).toBe(true);
            expect(navigation.remoteDiagLink.isDisplayed()).toBe(false);
            browser.executeScript('window.localStorage.clear();');
        });
    });
});