/**
 * Created by pshrestha on 2/17/2017.
 */

describe("Ui Validation of Fleet Health Map -----> ", function () {

    const _ = require('lodash');
    var loginPage = require('../../../pages/login.page');
    var navigation = require('../../../pages/navigation.page');
    var dashboard2 = require('../../../pages/dashboard2.page');
    var dealerOwnerGroupPage = require('../../../pages/dealerOwnerGroup.page');
    var vehicleUtil = require('../../../utilities/vehicle.util');
    var validationUtil = require('../../../utilities/validation.util');
    var chipFilterUtil = require('../../../utilities/chipFilterMatrix.utils');
    var dashboardUtil = require('../../../utilities/dashboard.util');
    var stopNowString = vehicleUtil.getStopNowStatus();
    var comingSoonString = vehicleUtil.getInComingSoonStatus();
    var serviceNowString = vehicleUtil.getServiceNowStatus();
    var serviceSoonString = vehicleUtil.getServiceSoonStatus();
    var informationalString = vehicleUtil.getInformationalStatus();
    var noActionString = vehicleUtil.getNoActionStatus();
    var inRepairString = vehicleUtil.getInRepairStatus();
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var dealerOwnerAdminEmail = browser.params.testuseremails.dealerowneradmin;
    var testDealer = browser.params.testdealer3.name;
    var firstCustomer = browser.params.testcustomer.name;
    var secondCustomer = browser.params.testpreferredcustomer.name;
    var firstCustomerVehicleGroup = browser.params.vehiclegroup.name0;
    var secondCustomerVehicleGroup = browser.params.vehiclegroup.name3;
    var firstDealer = browser.params.testdealer.name;
    var secondDealer = browser.params.testdealer2.name;
    var firstFactory = 'Chillicothe';
    var secondFactory = 'Renton';
    var firstVehicleState = 'State: Released';
    var secondVehicleState = 'State: Manufacturing';
    var firstManufacturers = 'Kenworth';
    var secondManufacturers = 'Peterbilt';
    var firstVehicleGroup = browser.params.vehiclegroup.name0;
    var secondVehicleGroup = browser.params.vehiclegroup.name3;
    var firstVehicle = browser.params.vehicle.vin;
    var secondVehicle = browser.params.vehicle.vin2;
    var recommendationTypeInf = 'informational';
    var recommendationTypeSN = 'stop_now';
    var recommendationTypeNA = 'no_action';

    var searchMap = {};
    searchMap[chipFilterUtil.dealers] = [firstDealer, secondDealer];
    searchMap[chipFilterUtil.factories] = [firstFactory, secondFactory];
    searchMap[chipFilterUtil.vehicleStates] = [firstVehicleState, secondVehicleState];
    searchMap[chipFilterUtil.manufacturers] = [firstManufacturers, secondManufacturers];
    searchMap[chipFilterUtil.userVehicleGroups] = [firstVehicleGroup, secondVehicleGroup];
    searchMap[chipFilterUtil.vehicles] = [firstVehicle, secondVehicle];

    var dealerToolTip = 'View Paccar Dealers';
    var cumminsToolTip = 'View Cummins Distributors';
    var satelliteToolTip = 'View Satellite';
    var refreshToolTip = 'Refresh Data';
    var dealerRedButton = 'domain';
    var satelliteRedButton = 'satellite';
    var password = browser.params.adduser.password;

    browser.driver.manage().window().maximize();

    var chipFilterSuggestionArray = ['None', 'Customers', 'Dealers', 'Manufacturers', 'VIN', 'Vehicle Groups',
        'Factories', 'Vehicle States', 'Vehicle Visibility'];

    var loginUserArray = [paccarAdminEmail];
    var recommendationArray = [stopNowString, serviceNowString, serviceSoonString, informationalString, noActionString, comingSoonString, inRepairString];

    afterEach(() => {
        browser.executeScript('window.localStorage.clear();');
    });

    loginUserArray.filter(eachUser => {

        beforeEach(() => {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            expect(dashboard2.fleetHealthMap.isPresent()).toBe(true, "The Fleet Health Map is not Present");
        });

        it("Validate all of the Buttons Filters on Fleet Health drop-down", () => {
            dashboard2.verifyFleetHealthMap();
            dashboard2.verifyRecommendations();
            expect(navigation.clearAllButton.isDisplayed()).toBe(true, 'The clear all button is missing');
            expect(dashboard2.mapFilterHeading.isDisplayed()).toBe(true, 'Map Filter Heading is not Displayed');
            expect(dashboard2.dashboardFilter.isDisplayed()).toBe(true, 'Filter Field is not Displayed');
            expect(dashboard2.zoomControlButtons.isDisplayed()).toBe(true, 'Zoom Control is not Displayed');
            expect(navigation.chipFilterDropDownButton.isDisplayed()).toBe(true, 'Chip Filter Drop Down button is not Displayed');
            validationUtil.validateChipFilterDropDowns();
            validationUtil.validateActionList(navigation.chipFilterDropDownButton, navigation.chipFilterDropDown, navigation.chipFilterDropDown.get(0), chipFilterSuggestionArray);
        });

        recommendationArray.forEach(eachRecommendation => {
            it(`Validate that ${eachRecommendation} Filter Link takes the user to the Vehicles List Page with the recommendation of ${eachRecommendation} BUG PVP-4845`, () => {
                vehicleUtil.verifyEyeIcon(eachRecommendation);
                vehicleUtil.goToRecommendation(eachRecommendation);
            });
        });

        it("Validate the ToolBar buttons on the Fleet Health Map Page", () => {
            browser.sleep(5000);
            expect(dashboard2.refreshMapButton.isDisplayed()).toBe(true, ' Refresh Map Toolbar Button is not present');
            expect(dashboard2.satelliteButton.isDisplayed()).toBe(true, ' Satellite Toolbar Button is not present');
            expect(dashboard2.dealersButton.isDisplayed()).toBe(true, ' Dealers Toolbar Button is not present');
            expect(dashboard2.zoomControlButtons.isDisplayed()).toBe(true, 'Zoom Controls are missing.');
        });

        it("Validate the Cummins distributors button and tooltip text", () => {
            expect(dashboard2.cumminsButton.isDisplayed()).toBe(false, ' Cummins Toolbar Button is present');
            navigation.moveMouseToAndVerifyTooltip(dashboard2.dealersButton, dealerToolTip);
            dashboard2.verifyButtonColor(dealerRedButton);
            dashboard2.verifyButtonColor('');
            expect(dashboard2.cumminsButton.isDisplayed()).toBe(true, ' Cummins Toolbar Button is bot present');
            navigation.moveMouseToAndVerifyTooltip(dashboard2.cumminsButton, cumminsToolTip);
            navigation.moveMouseToAndVerifyTooltip(dashboard2.satelliteButton, satelliteToolTip);
            navigation.moveMouseToAndVerifyTooltip(dashboard2.refreshMapButton, refreshToolTip);
            dashboard2.dealersButton.click();
            expect(dashboard2.cumminsButton.isDisplayed()).toBe(false, ' Cummins Toolbar Button is present');
            dashboard2.verifyButtonColor(satelliteRedButton);
        });

        it("Validate that Add Filter icon is present and has all the right fields present", () => {
            expect(dashboard2.filtersDropdown.isPresent()).toBe(false, 'The add filter button is still present.');
            browser.sleep(1000);
            expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/dashboard');
        });

        it("Validate the Full Screen icon is functional", () => {
            dashboard2.fullScreenButton.click();
            browser.sleep(1000);
            expect(dashboard2.fullScreenExitButton.isPresent()).toBe(true, "The Full Screen Exit button is not Present");
            dashboard2.fullScreenExitButton.click();
            expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/dashboard');
        });
    });

    it('PVP-3555 Pop up stays opened after user closes it and clicks "eye" icon again', () => {
        dashboard2.noActionBtn.click();
        dashboard2.allPointers.last().click();
        expect(dashboard2.popUp.isDisplayed()).toBe(true, "Pop up didn't open");
        dashboard2.noActionBtn.click();
        navigation.waitTillElementToDisappear(dashboard2.popUp);
        dashboard2.noActionBtn.click();
        expect(dashboard2.popUp.isDisplayed()).toBe(true, "Pop up didn't open");
        dashboard2.popUpCloseBtn.click();
        expect(dashboard2.popUp.isPresent()).toBe(false, "Pop up didn't close");
        dashboard2.noActionBtn.click();
        expect(dashboard2.popUp.isPresent()).toBe(false, "Pop up didn't close");
        dashboard2.noActionBtn.click();
        expect(dashboard2.popUp.isPresent()).toBe(false, "Pop up didn't close");
        navigation.waitTillElementToBeVisible(dashboard2.allPointers.last());
        dashboard2.allPointers.last().click();
        expect(dashboard2.popUp.isDisplayed()).toBe(true, "Pop up didn't open");
        dashboard2.popUpCloseBtn.click();
        expect(dashboard2.popUp.isPresent()).toBe(false, "Pop up didn't close");
        dashboard2.noActionBtn.click();
        expect(dashboard2.popUp.isPresent()).toBe(false, "Pop up didn't close");
    });

    it('PVP-3951 Allow Multiple Filters for Customers/Customers Vehicle Group', () => {
        var allNoActionCounter, firstCustomerCounter, secondCustomerCounter, firstCVGCounter, secondCVGCounter;
        dashboard2.noActionBtn.click();
        dashboard2.noActionNoOfVehicle.getText()
            .then(count => {
                allNoActionCounter = parseInt(count);
            });
        navigation.applyChipFilter(chipFilterUtil.customers, firstCustomer, 1);
        dashboard2.noActionNoOfVehicle.getText()
            .then(count => {
                firstCustomerCounter = parseInt(count);
                expect(firstCustomerCounter).toBeLessThan(allNoActionCounter, 'Invalid result while using Customer chip filter')
            });
        navigation.applyChipFilter(chipFilterUtil.customers, secondCustomer, 1);
        dashboard2.noActionNoOfVehicle.getText()
            .then(count => {
                secondCustomerCounter = parseInt(count);
                expect(firstCustomerCounter).toBeLessThan(secondCustomerCounter, 'Invalid result while using Customer chip filter');
                expect(secondCustomerCounter).toBeLessThan(allNoActionCounter, 'Invalid result while using Customer chip filter');
            });
        expect(dashboard2.allChips.count()).toBe(2, 'Invalid chip filters count');
        navigation.applyChipFilter(chipFilterUtil.customerVehicleGroups, firstCustomerVehicleGroup, 1);
        dashboard2.noActionNoOfVehicle.getText()
            .then(count => {
                firstCVGCounter = parseInt(count);
                expect(firstCVGCounter).toBeLessThan(firstCustomerCounter, 'Invalid result while using Customer chip filter');
            });
        expect(dashboard2.allChips.count()).toBe(3, 'Invalid chip filters count');
        navigation.applyChipFilter(chipFilterUtil.customerVehicleGroups, secondCustomerVehicleGroup, 1);
        dashboard2.noActionNoOfVehicle.getText()
            .then(count => {
                secondCVGCounter = parseInt(count);
                expect(firstCVGCounter).not.toBeGreaterThan(secondCVGCounter, 'Invalid result while using Customer chip filter');
            });
        expect(dashboard2.allChips.count()).toBe(4, 'Invalid chip filters count');
        dashboardUtil.clearAllFilter();
        expect(dashboard2.allChips.count()).toBe(0, 'Invalid chip filters count');
        dashboard2.noActionNoOfVehicle.getText()
            .then(count => {
                expect(parseInt(count)).toBe(allNoActionCounter, 'Invalid result while using Customer chip filter');
            });
    });

    _.forEach(searchMap, (searchFor, chipFilter) => {
        it(`PVP-3951 Allow Multiple Filters for ${chipFilter}`, () => {
            var allNoActionCounter, firstFilterCounter, secondFilterCounter;
            dashboard2.noActionBtn.click();
            dashboard2.noActionNoOfVehicle.getText()
                .then(count => {
                    allNoActionCounter = parseInt(count);
                });
            navigation.applyChipFilter(chipFilter, searchFor[0], 1);
            dashboard2.noActionNoOfVehicle.getText()
                .then(count => {
                    firstFilterCounter = parseInt(count);
                    expect(firstFilterCounter).toBeLessThan(allNoActionCounter, `Invalid result while using ${chipFilter} chip filter`);
                });
            navigation.applyChipFilter(chipFilter, searchFor[1], 1);
            dashboard2.noActionNoOfVehicle.getText()
                .then(count => {
                    secondFilterCounter = parseInt(count);
                    expect(firstFilterCounter).not.toBeGreaterThan(secondFilterCounter, `Invalid result while using ${chipFilter} chip filter`)
                });
            expect(dashboard2.allChips.count()).toBe(2, 'Invalid chip filters count');
            dashboardUtil.clearAllFilter();
            expect(dashboard2.allChips.count()).toBe(0, 'Invalid chip filters count');
            dashboard2.noActionNoOfVehicle.getText()
                .then(count => {
                    expect(allNoActionCounter).toBe(parseInt(count), `Invalid result while using ${chipFilter} chip filter`);
                });
        });
    });

    it('TC-2650 Vin popup stays opened after different vehicle was applied in the search field', () => {
        dashboard2.clickRecommendationButton(recommendationTypeSN);
        dashboard2.clickRecommendationButton(recommendationTypeNA);
        dashboard2.allPointers.get(0).click();
        navigation.typeInSearchFilter(firstVehicle);
        expect(dashboard2.popUp.isPresent()).toBe(false, "Pop up didn't close");
    });

    it('TC-2671 Verify count of pins on the map with two chip filters on the dashboard', () => {
        dashboard2.clickRecommendationButton(recommendationTypeNA);
        navigation.chipFilterDropDownButton.click();
        navigation.waitTillElementToBeClickable(navigation.chipFilterDropDown.get(0));
        navigation.selectChipFilterByText(chipFilterUtil.vehicleVisibility);
        navigation.rolesValue.first().click();
        let oneChipCount;
        dashboard2.allPointers.count()
            .then(count => {
                oneChipCount = count;
                navigation.chipFilterDropDownButton.click();
                navigation.waitTillElementToBeClickable(navigation.chipFilterDropDown.get(0));
                navigation.selectChipFilterByText(chipFilterUtil.vehicleVisibility);
                navigation.rolesValue.last().click();
                return dashboard2.allPointers.count()
            })
            .then(count => {
                expect(count).not.toBeGreaterThan(oneChipCount, 'There was no Vehicle data to be found')
            })
    });

    it('TC-2735 Vin popup is shown up again after its filter was applied again', () => {
        navigation.typeInSearchFilter(firstVehicle);
        dashboard2.clickRecommendationButton(recommendationTypeInf);
        dashboard2.allPointers.last().click();
        expect(dashboard2.allPointers.last().isDisplayed()).toBe(true, 'Popup did not show');
        navigation.chipFilterCloseBtn.click();
        dashboard2.popUpCloseBtn.click();
        navigation.typeInSearchFilter(firstVehicle);
        expect(dashboard2.popUp.isPresent()).toBe(false, 'Popup did show');
        dashboard2.allPointers.last().click();
        expect(dashboard2.popUp.isDisplayed()).toBe(true, 'Popup did not show');
    });

    it('TC-2811 Validate dashboard dealer flags', () => {
        dashboard2.offAllRecommendationLink();
        expect(dashboard2.eyeIcon.isDisplayed()).toBe(false, 'I saw pointers');
        dashboard2.dealersButton.click();
        navigation.applyChipFilter(chipFilterUtil.dealers, testDealer, 1, 1);
        dashboard2.allPointers.first().click();
        dashboard2.textFropPopUp.getText()
            .then(text => {
                validationUtil.validateTextContainArray(text, testDealer);
            });
        browser.executeScript('window.localStorage.clear();');
        loginPage.get();
        loginPage.login('paccar', dealerOwnerAdminEmail, password);
        navigation.clickDealerOwnerGroupsLink();
        var dogName;
        dealerOwnerGroupPage.dogName.getText()
            .then(text => {
                dogName = text.toString();
                navigation.clickDashboardLink();
                dashboard2.offAllRecommendationLink();
                expect(dashboard2.eyeIcon.isDisplayed()).toBe(false, 'I saw pointers');
                dashboard2.dealersButton.click();
                navigation.applyChipFilter(chipFilterUtil.dealerOwnerGroups, dogName, 1, 1);
                expect(dashboard2.allPointers.count()).not.toBe(0, `I didn't see pointers`);
            });
    });
});