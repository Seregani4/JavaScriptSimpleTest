/**
 * Created by jelliott on 1/11/2017.
 */
describe("Validate Filtering on the Fault Log Page -----> ", function () {

    var loginPage = require('../../../pages/login.page');
    var vehiclesPage = require('../../../pages/vehicles.page');
    var navigation = require('../../../pages/navigation.page');
    var vehicleUtil = require('../../../utilities/vehicle.util');
    var tableUtil = require('../../../utilities/tables.util');
    var validationUtil = require('../../../utilities/validation.util');
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var vin = browser.params.vehicle.vin;
    var password = browser.params.adduser.password;
    var stopNowStatus = vehicleUtil.getStopNowStatus();

    browser.driver.manage().window().maximize();
    /*
    * Note: 3 seems to the max num of faults that can be posted. Posting Informational separately.
    */
    beforeAll(() => {
        loginPage.get();
        //Trigger Faults on Vehicle to have something to Filter By
        vehiclesPage.triggerFault('stop now');
        vehiclesPage.triggerFault('service now');
        vehiclesPage.triggerFault('service soon');
    });

    beforeEach(() => {
        loginPage.get();
        vehiclesPage.triggerFault('informational');
        loginPage.login('paccar', paccarAdminEmail, password);
        vehicleUtil.goToVehicleDetails(vin);
    });

    afterEach(() => {
        browser.executeScript('window.localStorage.clear();');
    });

    var filterRecommendation = ['Stop Now', 'Service Soon', 'Service Now', 'Informational'];

    it("Verify Recommendation Column  of the Fault Log Table", () => {
        filterRecommendation.filter(recommendation => {
            tableUtil.verifyTableData();
            vehicleUtil.verifyFaultFilter(recommendation, 0);
        });
    });

    /* Note: COMMENTED OUT since QA does not have any INACTIVE faults stored can be used if it changes in the future.
    var filterStatus=['Inactive','Active'];
    filterStatus.filter(function(recommendation){
        it("Verify Status Column  of the Fault Log Table", function() {
            navigation.chipFilterCloseBtn.click();
            expect(vehicleDetailsPage.allfaultLogRows.count()).toBeGreaterThan(0, 'No faults to filter.');
            navigation.typeInSearchFilterRecommendation(recommendation);
            browser.sleep(3000);
            vehicleDetailsPage.verifyColumn(recommendation,2);
        });
    });
    */

    var filterSystem = ['EAS', 'Vehicle', 'Engine'];

    it("Verify System Column  of the Fault Log Table", () => {
        filterSystem.filter(recommendation => {
            tableUtil.verifyTableData();
            vehicleUtil.verifyFaultFilter(recommendation, 2);
        });
    });

    it("Clear All faults from the Vehicle", () => {
        //According to priority the vehicle will have STOP NOW recommendation.
        vehicleUtil.verifyFaultIsCleared('paccar', vin, stopNowStatus);
    });

    it('TC-1663 Fault Log - Drop Down Search/Filter', () => {
        navigation.clearAllFiltersButton.click();
        navigation.chipFilterDropDownButton.click();
        navigation.chipFilterDropDown.getText()
            .then(text => {
                validationUtil.validateTextContainArray(text, [
                    'None',
                    'Recommendations',
                    'Systems',
                    'Statuses'
                ])
            });
        navigation.chipFilterRecommendationsButton.click();
        navigation.chipFilterSuggestionDropDown.getText()
            .then(text => {
                validationUtil.validateTextContainArray(text, [
                    'Stop Now',
                    'Service Now',
                    'Service Soon',
                    'Informational'
                ])
            });
        navigation.chipFilterFirstFromDropDown.click();
        navigation.clearAllFiltersButton.click();
        expect(navigation.iconNone.isDisplayed()).toBe(true, 'Wrong default icon');
    });
});