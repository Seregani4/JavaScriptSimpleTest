/**
 * Created by pshrestha on 5/2/2017.
 */

describe("Ui Validation of Fleet Health Map ----- ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var fleetHealthMapPage = require('../../../pages/fleethealthmap.page.js');
    var dashboard2 = require('../../../pages/dashboard2.page');
    var vehicleUtil = require('../../../utilities/vehicle.util');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var stopNowString = vehicleUtil.getStopNowStatus();
    var comingSoonString = vehicleUtil.getInComingSoonStatus();
    var serviceNowString = vehicleUtil.getServiceNowStatus();
    var serviceSoonString = vehicleUtil.getServiceSoonStatus();
    var informationalString = vehicleUtil.getInformationalStatus();
    var noActionString = vehicleUtil.getNoActionStatus();
    var inRepairString = vehicleUtil.getInRepairStatus();
    var password = browser.params.adduser.password;
    browser.driver.manage().window().maximize();

    var loginUserArray = [peoplenetAdminEmail];
    var recommendationArray = [stopNowString, serviceNowString, serviceSoonString, informationalString, noActionString, comingSoonString, inRepairString];


    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });
    loginUserArray.forEach(function (eachUser) {

        beforeEach(function () {
            loginPage.get();
            loginPage.login('supportal', eachUser, password);
            fleetHealthMapPage.fleetHealthDropdown.click();
            navigation.fleetHealthMapLink.click();
            expect(dashboard2.fleetHealthMap.isPresent()).toBe(true, "The Fleet Health Map is not Present");

        });

        it("Validate all of the Buttons Filters on Fleet Health drop-down", function () {
            dashboard2.verifyFleetHealthMap();
            dashboard2.verifyRecommendations();
            expect(navigation.clearAllButton.isDisplayed()).toBe(true, 'The clear all button is missing');
            expect(dashboard2.mapFilterHeading.isDisplayed()).toBe(true, 'Map Filter Heading is not Displayed');
            expect(dashboard2.dashboardFilter.isDisplayed()).toBe(true, 'Filter Field is not Displayed');
        });

        recommendationArray.forEach(function (eachRecommendation) {
            it("Validate that " + eachRecommendation + " Filter Link takes the user to the Vehicles List Page with the recommendation of " + eachRecommendation, function () {
                vehicleUtil.verifyEyeIcon(eachRecommendation);
                vehicleUtil.goToRecommendation(eachRecommendation);
            });
        });

        it("Validate the Layer Toolbar  and ToolBar buttons on the Fleet Health Map Page", function () {
            expect(dashboard2.refreshMapButton.isDisplayed()).toBe(true, ' Refresh Map Toolbar Button is not present');
            expect(dashboard2.satelliteButton.isDisplayed()).toBe(true, ' Satellite Toolbar Button is not present');
            expect(dashboard2.dealersButton.isDisplayed()).toBe(true, ' Dealers Toolbar Button is not present');
            expect(dashboard2.zoomControlButtons.isDisplayed()).toBe(true, 'Zoom Controls are missing.');
        });

        it("Validate that Add Filter icon is present and has all the right fields present", function () {
            expect(dashboard2.filtersDropdown.isPresent()).toBe(false, 'The add filter button is still present.');
            browser.sleep(1000);
            expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/dashboard');
        });

        it("Validate the Full Screen icon is functional", function () {
            dashboard2.fullScreenButton.click();
            browser.sleep(1000);
            expect(dashboard2.fullScreenExitButton.isPresent()).toBe(true, "The Full Screen Exit button is not Present");
            dashboard2.fullScreenExitButton.click();
            expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/dashboard');
        });
    });

});