/**
 * Created by Popazov on 12/25/2017.
 */

const _ = require('lodash');

describe("Vehicle Chip Filter validation for Users by ROLE -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var vehiclePage = require('../../../pages/vehicles.page.js');
    var vehicleDetail = require('../../../pages/vehicledetail.page.js');
    var validationUtil = require('../../../utilities/validation.util');
    var tableUtil = require('../../../utilities/tables.util');
    var chipFilterMatrix = require('../../../utilities/chipFilterMatrix.utils.js');
    var rolesWithPermission = chipFilterMatrix.rolesWithPermissionVehicles;
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
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
        it("Validate the functionality of Chip filtering by role as " + eachUser, function () {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            navigation.clickVehiclesLink();
            validationUtil.validateActionListEqual(navigation.chipFilterDropDownButton, navigation.chipFilterDropDown, navigation.chipFilterDropDown.get(0), chipFilters);
            validationUtil.validateChipFilterDropDowns(eachUser);
        });
    });

    it("TC-2186  Validate Filter by Unit Number ", function () {
        var suggestionText;
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.clickVehiclesLink();
        navigation.getTextFromSuggestionDropDown(chipFilterMatrix.unitNumber, '', 1)
            .then(function (text) {
                suggestionText = text.substring(text.indexOf(" ") + 1);
                navigation.applyChipFilter(chipFilterMatrix.unitNumber, suggestionText, 1);
                tableUtil.verifyColumn(suggestionText, vehiclePage.columns.tableUnitNumberColumn);
                tableUtil.clickTableCell(0, vehiclePage.columns.tableVinColumn);
                expect(vehicleDetail.unitNumber.getText()).toBe(suggestionText, 'Wrong Unit number on filtered Vehicle detail page');
            });
    });

    it("TC-2215  Validate chip filter not duplicates with Unit number ", function () {
        var suggestionText;
        var additionalUnitNumberPart = "//TestUnitNumber";
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.clickVehiclesLink();
        navigation.getTextFromSuggestionDropDown(chipFilterMatrix.unitNumber, '', 1)
            .then(function (text) {
                suggestionText = text.substring(text.indexOf(" ") + 1);
                navigation.applyChipFilter(chipFilterMatrix.unitNumber, suggestionText, 1);
                tableUtil.clickTableCell(0, vehiclePage.columns.tableVinColumn);
                vehiclePage.editVehicleActionBarButton.click();
                vehiclePage.unitNumberField.sendKeys(additionalUnitNumberPart);
                vehiclePage.vehicleSaveBtn.click();
                navigation.clickVehiclesLink();
                navigation.clearAllFiltersButton.click();
                navigation.applyChipFilter(chipFilterMatrix.unitNumber, suggestionText + additionalUnitNumberPart, 1);
                tableUtil.verifyColumn(suggestionText + additionalUnitNumberPart, vehiclePage.columns.tableUnitNumberColumn);
                expect(navigation.allChips.count()).toBe(1, "Wrong Chip Filters Count");
                tableUtil.verifyColumn(suggestionText + additionalUnitNumberPart, vehiclePage.columns.tableUnitNumberColumn);
                expect(navigation.allChips.count()).toBe(1, "Wrong Chip Filters Count");
                tableUtil.clickTableCell(0, vehiclePage.columns.tableVinColumn);
                vehiclePage.editVehicleActionBarButton.click();
                vehiclePage.editUnitNumber(suggestionText);
                vehiclePage.vehicleSaveBtn.click();
                expect(vehicleDetail.unitNumber.getText()).toBe(suggestionText, 'Unit number not changed back');
            })
    });

});
