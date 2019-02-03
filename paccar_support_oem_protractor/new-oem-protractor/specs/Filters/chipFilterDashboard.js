/**
 * Created by Popazov on 12/20/2017.
 */


const _ = require('lodash');
describe('Dashboard Chip Filter validation for Users by ROLE -----> ', function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var usersPage = require('../../../pages/users.page.js');
    var dashboard2 = require('../../../pages/dashboard2.page.js');
    var vehicleDetail = require('../../../pages/vehicledetail.page');
    var validationUtil = require('../../../utilities/validation.util');
    var chipFilterMatrix = require('../../../utilities/chipFilterMatrix.utils.js');
    var peopleNetAdmin = browser.params.testuseremails.peoplenetadmin;
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var rolesWithPermission = chipFilterMatrix.rolesWithPermissionDashboard;
    var password = browser.params.adduser.password;

    browser.driver.manage().window().maximize();

    beforeEach(function () {
        // Get a fresh Angular "session" so we can avoid bootstrapping errors
        browser.driver.get("about:blank");
        browser.sleep(1000);
    });

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    _.forEach(rolesWithPermission, function (chipFilters, eachUser) {
        it('Validate the functionality of Chip filtering by role as ' + eachUser, function () {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            validationUtil.validateActionListEqual(navigation.chipFilterDropDownButton, navigation.chipFilterDropDown, navigation.chipFilterDropDown.get(0), chipFilters);
            validationUtil.validateCustomerVehicleGroupFilterAppears(eachUser);
            validationUtil.validateChipFilterDropDowns(eachUser);
        });
    });

    it('Dashboard - Drop Down Search/Filter TC-1637', function () {
        loginPage.get();
        loginPage.login('paccar', peopleNetAdmin, password);
        navigation.chipFilterDropDownButton.click();
        navigation.chipFilterDropDown.getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                chipFilterMatrix.none,
                chipFilterMatrix.customers,
                chipFilterMatrix.dealers,
                chipFilterMatrix.manufacturers,
                chipFilterMatrix.vehicles,
                chipFilterMatrix.userVehicleGroups,
                chipFilterMatrix.factories,
                chipFilterMatrix.vehicleStates
            ])
        });
        navigation.chipFilterCustomersButton.click();
        validationUtil.validateAllCountFromSuggestionsDropDown(navigation.chipFilterSuggestionDropDown, 10);
        navigation.chipFilter.sendKeys(protractor.Key.ENTER);
        navigation.clearAllButton.click();
        expect(dashboard2.allChips.count()).toBe(0, 'Invalid chip filters count');
        navigation.chipFilterDropDownButton.click();
        navigation.chipFilterDealerButton.click();
        validationUtil.validateAllCountFromSuggestionsDropDown(navigation.chipFilterSuggestionDropDown, 10);
        navigation.chipFilter.sendKeys(protractor.Key.ENTER);
        expect(dashboard2.allChips.count()).toBe(1, "Previous chip didn't select");
    });

    it('TC-2186  Validate Filter by Unit Number ', function () {
        var allNoActionCounter, filteredNoActionCount;
        var suggestionText = "AUTO";
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        dashboard2.noActionBtn.click();
        dashboard2.noActionNoOfVehicle.getText()
            .then(function (count) {
                return allNoActionCounter = parseInt(count);
            })
            .then(function () {
                navigation.applyChipFilter(chipFilterMatrix.unitNumber, suggestionText, 1);
                return dashboard2.noActionNoOfVehicle.getText()
            })
            .then(function (count) {
                filteredNoActionCount = parseInt(count);
                return expect(filteredNoActionCount).toBeLessThan(allNoActionCounter, 'Invalid result while using Unit Number chip filter')
            })
            .then(function () {
                dashboard2.allPointers.last().click();
                dashboard2.linkToVehicles.first().click();
                expect(vehicleDetail.unitNumber.getText()).toContain(suggestionText, 'Wrong Unit number on filtered Vehicle detail page');
            })
    });
//TODO move this two tests to separate file. and use another user for check
//     xit('TC-2264-1 A few same chip filters can be applied when switching the languages', function () {
//         loginPage.get();
//         loginPage.login('paccar', paccarAdminEmail, password);
//         navigation.applyChipFilter(chipFilterMatrix.dealerVisibility, 'Join All Customers', 1);
//         navigation.applyChipFilter(chipFilterMatrix.vehicleStates, 'Released State', 1);
//         usersPage.changeLanguage('paccar');
//         navigation.dashboardLink.click();
//         navigation.verifyChipFilter('Unirse a todos los Concesionarios');
//         navigation.verifyChipFilter('Estado de liberação');
//         expect(navigation.allChips.count()).toBe(2, "Incorrect chip filter count ");
//     });
//
//     xit('TC-2264-2 Return English language for ' + paccarAdminEmail, function () {
//         loginPage.get();
//         loginPage.login('paccar', paccarAdminEmail, password);
//         usersPage.changeLanguage('paccar');
//     });
});
