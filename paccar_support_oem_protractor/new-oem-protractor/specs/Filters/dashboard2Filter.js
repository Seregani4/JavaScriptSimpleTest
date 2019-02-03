/**
 * Created by pshrestha on 3/8/2017.
 */

describe('Filtering validation from Fleet Health Map -----> ', function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var dashboard2 = require('../../../pages/dashboard2.page');
    var dashboardUtil = require('../../../utilities/dashboard.util.js');
    var validationUtil = require('../../../utilities/validation.util.js');
    var chipFilterUtil = require('../../../utilities/chipFilterMatrix.utils.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var dealerAdminEmail = browser.params.testuseremails.dealeradmin;
    var customerAdmin = browser.params.testuseremails.customeradmin;
    var vin = browser.params.vehicle.vin;
    var dealer = browser.params.testdealer.name;
    var customer = browser.params.testcustomer.name;
    var vehicleGroup = browser.params.vehiclegroup.name0;
    var password = browser.params.adduser.password;
    var make = browser.params.manufacturer.name;
    var factoryChip = chipFilterUtil.factories;
    var vehicleStatesChip = chipFilterUtil.vehicleStates;
    var factory = 'Chillicothe';
    var status = 'Manufacturing';

    browser.driver.manage().window().maximize();

    //Customer Role cannot filter by VG (BUG)!
    var loginUserArray = [peoplenetAdminEmail, paccarAdminEmail];

    beforeEach(() => {
        // Get a fresh Angular 'session' so we can avoid bootstrapping errors
        browser.driver.get('about:blank');
        browser.sleep(1000);
    });

    afterEach(() => {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    loginUserArray.filter(function (eachUser) {
        it(`Validate the functionality of filtering by a VIN as ${eachUser}`, () => {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            dashboard2.verifyFleetHealthMap();
            dashboardUtil.filterInDashboard('paccar', vin);
            navigation.chipFilterCloseBtn.click();
            expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/dashboard');
        });

        it(`Validate the functionality of filtering by a Dealer as  ${eachUser}`, () => {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            if (eachUser !== dealerAdminEmail) {
                dashboardUtil.filterInDashboard('paccar', dealer);
                navigation.chipFilterCloseBtn.click();
            }
        });

        it(`Validate the functionality of filtering by a Customer as ${eachUser}`, () => {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            dashboardUtil.filterInDashboard('paccar', customer);
            navigation.chipFilterCloseBtn.click();
        });

        it(`Validate the functionality of Add Filter - Vehicle Group as  ${eachUser}`, () => {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            dashboardUtil.filterInDashboard('paccar', customer);
            dashboard2.valueFromNoAction.getText()
                .then(vgSecondFilterResult => {
                    navigation.applyChipFilter(chipFilterUtil.customerVehicleGroups, vehicleGroup, 1);
                    dashboard2.valueFromNoAction.getText()
                        .then(vgFirstFilterResult => {
                            expect(dashboard2.noActionNoOfVehicle.getText())
                                .toContain(vgFirstFilterResult, 'The number of Vehicles in the group is not showing.');
                            dashboardUtil.closeChipFilter(vehicleGroup);
                            expect(dashboard2.noActionNoOfVehicle.getText())
                                .toContain(vgSecondFilterResult, 'The number of Vehicles did not change after the VG was removed.');
                            dashboardUtil.closeChipFilter(customer);
                        });
                });
        });

        it(`Validate the functionality of Clear all - Vehicle Group as ${eachUser}`, () => {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            dashboardUtil.filterInDashboard('paccar', customer);
            dashboardUtil.filterInDashboard('paccar', vehicleGroup);
            dashboardUtil.clearAllFilter();
            dashboard2.verifyNoOfVehicle();

        });

        it(`Validate the functionality of Filtering by - Manufacturer, Factory and Release Status as  ${eachUser}`, () => {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            //Search for Manufacturer, Factory and Status
            dashboardUtil.filterInDashboard('paccar', make);
            dashboardUtil.filterInDashboard('paccar', factory);
            dashboardUtil.filterInDashboard('paccar', status);
            expect(dashboard2.locationIcon.isDisplayed()).toBe(true, 'The location icon is not present.');
            //Clear the chips from Map Filter
            dashboardUtil.closeChipFilter(factory);
            dashboardUtil.closeChipFilter(make);
            dashboardUtil.closeChipFilter(status);
            dashboard2.validateClearAllFilter();
        });

        it(`Validate the functionality of Clear All Button as  ${eachUser}`, () => {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            dashboardUtil.filterInDashboard('paccar', customer);
            dashboardUtil.filterInDashboard('paccar', vehicleGroup);
            dashboardUtil.filterInDashboard('paccar', make);
            dashboardUtil.filterInDashboard('paccar', factory);
            dashboardUtil.filterInDashboard('paccar', status);
            dashboardUtil.clearAllFilter();
            expect(dashboard2.locationIcon.isPresent()).toBe(false, 'The location icon is still present.');
        });

        it(`TC-2261 Validate save filter option ${eachUser}`, () => {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            dashboard2.verifyFleetHealthMap();
            dashboardUtil.filterInDashboard('paccar', vin);
            dashboardUtil.filterInDashboard('paccar', customer);
            dashboardUtil.filterInDashboard('paccar', vehicleGroup);
            navigation.manageSearchFilterButton.click();
            navigation.saveNewFilter.click();
            navigation.saveDialogButton.click();
            expect(navigation.saveFilterForm.getText()).toContain('A filter name is required', "Error message not displayed");
            navigation.inputFilterName.sendKeys('Automation Test Filter');
            navigation.saveDialogButton.click();
            dashboardUtil.clearAllFilter();
            navigation.manageSearchFilterButton.click();
            navigation.savedFiltersList.first().click();
            expect(dashboard2.allChips.count()).toBe(3, 'Wrong Chips number after saved filter was applied');
            navigation.manageSearchFilterButton.click();
            expect(navigation.textFromManageSearchFilterDropDown.getText()).toContain('Automation Test Filter', "User see created filter from other user");
        });
    });

    it('TC-2554 Static results are not restricted accordingly to the logged in role', function () {
        loginPage.get();
        loginPage.login('paccar', customerAdmin, password);
        navigation.chipFilterDropDownButton.click();
        navigation.chipFilterDropDown.getText()
            .then(listOfChips => {
                validationUtil.validateTextNotContain(listOfChips, [
                    factoryChip,
                    vehicleStatesChip
                ])
            });
        navigation.chipFilter.sendKeys('fa');
        navigation.chipFilterSuggestionDropDown.getText()
            .then(listOfChips => {
                validationUtil.validateTextNotContain(listOfChips, factoryChip)
            });
        navigation.chipFilter.clear();
        navigation.chipFilter.sendKeys('state');
        navigation.chipFilterSuggestionDropDown.getText()
            .then(listOfChips => {
                validationUtil.validateTextNotContain(listOfChips, vehicleStatesChip)
            });
    });
});
