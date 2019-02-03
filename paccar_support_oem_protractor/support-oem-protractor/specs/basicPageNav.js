/**
 * Created by tbui on 2/25/2016.
 */
describe("Basic navigation of all application pages", function(){

    var loginPage = require('../../pages/login.page.js');
    var navigation = require('../../pages/navigation.page.js');

    var usersPage = require('../../pages/users.page.js');
    var customersPage = require('../../pages/customers.page.js');
    var dealersPage = require('../../pages/dealers.page.js');
    var vehiclesPage = require('../../pages/vehicles.page.js');
    var manufacturersPage = require('../../pages/manufacturers.page.js');
    var rolesPage = require('../../pages/roles.page.js');
    var oemsPage = require('../../pages/oems.page.js');

    var permissionsPage = require('../../pages/permissions.page.js');
    var dashboardPage = require('../../pages/dashboard.page.js');
    var kafkaConsumersPage = require('../../pages/kafka.consumers.page.js');
    var devicesPage = require('../../pages/devices.page.js');
    var deviceCollectionsPage = require('../../pages/device.collections.page.js');
    var notificationsPage = require('../../pages/notifications.page.js');
    var otapPage = require('../../pages/otap.page.js');
    var wifiPage = require('../../pages/wifi.page.js');
    var applicationsPage = require('../../pages/applications.page.js');
    var dataExportPage = require('../../pages/data.export.page.js');
    var dataImportPage = require('../../pages/data.import.page.js');
    var digitalCallHistoryPage = require('../../pages/digital.call.history.page.js');
    var eventsPage = require('../../pages/events.page.js');
    var outboundMidsPage = require('../../pages/outbound.mids.page.js');
    var pmgVersionsPage = require('../../pages/pmg.versions.page.js');
    var organizationsPage = require('../../pages/organizations.page.js');
    var subscribersPage = require('../../pages/subscribers.page.js');
    var endpointsPage = require('../../pages/endpoints.page.js');


    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;

    var password = browser.params.adduser.password;

    browser.driver.manage().window().maximize();

    afterEach(function() {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("PeopleNet Admin role has visibility to all proper links", function() {
        //log in
        loginPage.get();
        loginPage.login('supportal', peoplenetAdminEmail, password);

        expect(navigation.dashboardLink.isDisplayed()).toBe(true);
        expect(navigation.kafkaConsumersLink.isDisplayed()).toBe(true);

        //Device Management child links present
        navigation.deviceManagementButton.click();
        expect(navigation.devicesLink.isDisplayed()).toBe(true);
        expect(navigation.deviceCollectionsLink.isDisplayed()).toBe(true);
        expect(navigation.notificationsLink.isDisplayed()).toBe(true);
        expect(navigation.otapLink.isDisplayed()).toBe(true);
        expect(navigation.wifiLink.isDisplayed()).toBe(true);

        //Client Data child links present
        navigation.clientDataButton.click();
        expect(navigation.applicationsLink.isDisplayed()).toBe(true);
        expect(navigation.dataExportLink.isDisplayed()).toBe(true);
        expect(navigation.dataimportLink.isDisplayed()).toBe(true);

        //Reports child links present
        navigation.reportsButton.click();
        expect(navigation.digitalCallHistoryLink.isDisplayed()).toBe(true);
        expect(navigation.eventsLink.isDisplayed()).toBe(true);
        expect(navigation.outboundMidsLink.isDisplayed()).toBe(true);
        expect(navigation.pcgDeviceSoftwareVersionHistoryLink.isDisplayed()).toBe(true);
        expect(navigation.connectionHistoryReportLink.isDisplayed()).toBe(true);
        expect(navigation.pmgVersionsLink.isDisplayed()).toBe(true);

        //fleet health child links present
        navigation.fleetHealthButton.click();
        expect(navigation.analyticsLink.isDisplayed()).toBe(true);
        expect(navigation.customersLink.isDisplayed()).toBe(true);
        expect(navigation.dealersLink.isDisplayed()).toBe(true);
        expect(navigation.fleetHealthMapLink.isDisplayed()).toBe(true);
        expect(navigation.manufacturersLink.isDisplayed()).toBe(true);
        expect(navigation.oemsLink.isDisplayed()).toBe(true);
        expect(navigation.permissionsLink.isDisplayed()).toBe(false);
        expect(navigation.rolesLink.isDisplayed()).toBe(true);
        expect(navigation.usersLink.isDisplayed()).toBe(true);
        expect(navigation.vehiclesLink.isDisplayed()).toBe(true);

        //Data Subscriptions child links present
        navigation.dataSubscriptionsButton.click();
        expect(navigation.organizationsLink.isDisplayed()).toBe(true);
        expect(navigation.subscribersLink.isDisplayed()).toBe(true);
        expect(navigation.endpointsLink.isDisplayed()).toBe(true);
    },500000);

    it("All navigation links are functional", function(){
        //log in
        loginPage.get();
        loginPage.login('supportal', peoplenetAdminEmail , password);

        navigation.clickDashboardSupportalLink();
        expect(dashboardPage.pieChart.isDisplayed()).toBe(true, 'Dashboard data is missing');
        navigation.clickKafkaConsumbersLink();
        //expect(kafkaConsumersPage.kafkaConsumerList.isDisplayed()).toBe(true, 'Kafka Consumers data is missing');

        //Device Management Links
        navigation.deviceManagementButton.click();
        navigation.clickDevicesLink();
        //expect(devicesPage.allDeviceRows.count()).toBeGreaterThan(0, 'Devices Data is missing');
        //devicesPage.checkForPageCount(10);
        navigation.clickDeviceCollectionsLink();
        //expect(deviceCollectionsPage.allDeviceCollectionsRows.count()).toBeGreaterThan(0, 'Devices Collections Data is missing');
        navigation.clickNotificationsLink();
        //expect(notificationsPage.allNotificationRows.count()).toBeGreaterThan(0, 'Notifications Data is missing');
        navigation.clickOTAPLink();
        otapPage.verifyOTAPRequestData();
        navigation.clickWiFiLink();
        wifiPage.verifyWiFiData();


        //Client Data Links
        navigation.clientDataButton.click();
        navigation.clickApplicationsLink();
        //applicationsPage.verifyApplicationsData('high');
        navigation.clickDataExportLink();
        dataExportPage.verifyDataExportData();
        navigation.clickDataImportLink();
        //expect(dataImportPage.allDataImportJobs.count()).toBeGreaterThan(0, 'Data Import Data is missing');

        //Reports Links
        navigation.reportsButton.click();
        navigation.clickDigitalCallHistoryLink();
        expect(digitalCallHistoryPage.digitalCallHistoryForm.isDisplayed()).toBe(true, 'Digital Call History Data is missing');
        navigation.clickEventsLink();
        //expect(eventsPage.eventsForm.count()).toBeGreaterThan(0, 'Events Data is missing');
        navigation.clickOutboundMidsLink();
        outboundMidsPage.verifyOutboundMidsData();
        navigation.clickConnectionHistoryReportLink();
        navigation.clickPcgDeviceSoftwareVersionHistoryLink();
        navigation.clickPMGVersionLink();
        pmgVersionsPage.verifyPMGVersionsData();


        //Fleet Health Links
        navigation.fleetHealthButton.click();
        navigation.clickAnalyticsLink();
        navigation.clickCustomersLink();
        //customersPage.checkForData();
        //customersPage.clickAddBtn('high'); //ToDo This should eventually be able to use one button call for both High and low density
        navigation.clickDealersLink();
        //dealersPage.checkForUserData();
        navigation.clickDashboardSupportalLink();
        navigation.clickManufacturersLink();
        //navigation.togglePageDensity('Low');
        //manufacturersPage.checkForManufacturersData();
        navigation.clickOEMsLink();
        //navigation.togglePageDensity('Low');
        //oemsPage.checkForOemData();
        //permissionsPage.checkForPermissionData('high');
        navigation.clickRolesLink();
        //rolesPage.checkForRolesData('high');
        navigation.clickUsersLink();
        //usersPage.checkForData('high');
        //usersPage.clickAddBtn();
        navigation.clickVehiclesLink();
        //vehiclesPage.checkForUserData();

        //Data Subscriptions Links
        navigation.dataSubscriptionsButton.click();
        navigation.clickOrganizationsLink();
        navigation.clickSubscribersLink();
        navigation.clickEndpointsLink();

    }, 500000);
});