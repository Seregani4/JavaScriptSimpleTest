/**
 Created by pn-skorniiuk on 1/10/2018.
 */

describe('Validation repairs icon -----> ', function () {

    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var password = browser.params.adduser.password;
    var loginPage = require('../../../pages/login.page');
    var navigation = require('../../../pages/navigation.page');
    var vehicles = require('../../../pages/vehicles.page');
    var transferOwnershipPage = require('../../../pages/TransferOwnership.page');
    var vehicleUtil = require('../../../utilities/vehicle.util');
    var toastUtil = require('../../../utilities/toastMessage.util');
    var validationUtil = require('../../../utilities/validation.util');
    var vin = browser.params.vehicle.vin;
    var iconRepairCssValue = 'background-image';
    var inRepair = vehicleUtil.getInRepairStatus();
    browser.driver.manage().window().maximize();

    beforeEach(() => {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.globalSearchSendKeys(vin);
    });

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it('Validate that repair icon is correct ', () => {
        navigation.moreOptionsButton.click();
        vehicles.setInRepairBtn.click();
        navigation.submitDialogButton.click();
        vehicles.iconRepair.getCssValue(iconRepairCssValue).then((text) => {
            expect(text).toMatch(/\/images\/disposition-in-repair\.[0-9a-fA-F]{7}\.png/, "Repair's icon missing");
        });
        vehicleUtil.cleanupVehicleStatus(inRepair);
    });


    it('TC-2474  - Validate "Error retrieving fault log" toast not displayed', () => {
        navigation.clearAllFiltersButton.click();
        navigation.nextPageButton.click();
        navigation.globalSearchSendKeys(vin);
        toastUtil.checkToastDoesNotAppear();
        navigation.allChips.getText()
            .then(text => {
                validationUtil.validateTextContain(text, "Active");
            });
    });

    it('TC-2644 "Active" chip filter disappears after navigating from "Transfer Ownership" page', () => {
        vehicles.verifyChipFilter('Active');
        vehicles.verifyChipFilter('Enhanced Vehicle Guidance');
        navigation.moreOptionsButton.click();
        vehicles.transferOwnershipBtn.click();
        transferOwnershipPage.cancelBtn.click();
        vehicles.verifyChipFilter('Active');
        vehicles.verifyChipFilter('Enhanced Vehicle Guidance');
    });
});