/**
 * Created by Popazov on 3/7/2018.
 */


describe('Validate Persistent Chip Filters -----> ', function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var dashboardPage = require('../../../pages/dashboard2.page.js');
    var vehiclePage = require('../../../pages/vehicles.page.js');
    var topTenFaultsPage = require('../../../pages/top.ten.faults.page.js');
    var chipFilterUtil = require('../../../utilities/chipFilterMatrix.utils');
    var validationUtil = require('../../../utilities/validation.util');
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var chipsTypesIconArray = ['local_shipping', 'people', 'domain'];
    var password = browser.params.adduser.password;
    var notAllPersistentChipsAppliedMessage = 'One or more universal filters are currently inactive, but will be active on the next applicable page.';

    browser.driver.manage().window().maximize();

    beforeEach(function () {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
    });

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it('Validate Persistent Chip Filters logic', function () {
        navigation.applyChipFilter(chipFilterUtil.unitNumber, '', 1);
        navigation.applyChipFilter(chipFilterUtil.customers, '', 1);
        navigation.applyChipFilter(chipFilterUtil.dealers, '', 1);
        expect(navigation.activeChips.count()).toBe(3, 'Wrong Chip Filters Count');
        navigation.clickDealerOwnerGroupsLink();
        expect(navigation.activeChips.count()).toBe(0, 'Wrong Chip Filters Count');
        expect(navigation.notAllPersistentChipsAppliedMessage.getText())
            .toContain(notAllPersistentChipsAppliedMessage, 'Wrong message displayed');
        navigation.applyChipFilter(chipFilterUtil.dealerOwnerGroups, '', 1);
        expect(navigation.activeChips.count()).toBe(1, 'Wrong Chip Filters Count');
        navigation.clickDealersLink();
        expect(navigation.activeChips.count()).toBe(2, 'Wrong Chip Filters Count');
        expect(navigation.notAllPersistentChipsAppliedMessage.getText())
            .toContain(notAllPersistentChipsAppliedMessage, 'Wrong message displayed');
        navigation.clickCustomersLink();
        expect(navigation.activeChips.count()).toBe(3, 'Wrong Chip Filters Count');
        expect(navigation.notAllPersistentChipsAppliedMessage.last().getText())
            .toBe('', 'Message displayed');
        navigation.clickUsersLink();
        expect(navigation.activeChips.count()).toBe(3, 'Wrong Chip Filters Count');
        expect(navigation.notAllPersistentChipsAppliedMessage.isPresent())
            .toBe(true, 'Not all chips applied message displayed');
        navigation.applyChipFilter(chipFilterUtil.roles, '', 1);
        expect(navigation.activeChips.count()).toBe(4, 'Wrong Chip Filters Count');
        navigation.clickVehiclesLink();
        expect(navigation.activeChips.count()).toBe(3, 'Wrong Chip Filters Count');
        expect(navigation.notAllPersistentChipsAppliedMessage.getText())
            .toContain(notAllPersistentChipsAppliedMessage, 'Wrong message displayed');
        navigation.clickRemoteDiagLink();
        expect(navigation.activeChips.count()).toBe(2, 'Wrong Chip Filters Count');
        expect(navigation.notAllPersistentChipsAppliedMessage.getText())
            .toContain(notAllPersistentChipsAppliedMessage, 'Wrong message displayed');
        navigation.clickDashboardLink();
        expect(navigation.activeChips.count()).toBe(3, 'Wrong Chip Filters Count');
        expect(navigation.notAllPersistentChipsAppliedMessage.getText())
            .toContain(notAllPersistentChipsAppliedMessage, 'Wrong message displayed');
        navigation.clearAllButton.click();
        expect(navigation.activeChips.count()).toBe(0, 'Wrong Chip Filters Count');
        expect(navigation.notAllPersistentChipsAppliedMessage.last().getText())
            .toBe('', 'Message displayed');
        navigation.clickVehiclesLink();
        expect(navigation.activeChips.count()).toBe(0, 'Wrong Chip Filters Count');
        expect(navigation.notAllPersistentChipsAppliedMessage.last().getText())
            .toBe('', 'Message displayed');
    });

    it('Validate Persistent chip filter ordering', function () {
        navigation.applyChipFilter(chipFilterUtil.customers, '', 1);
        navigation.applyChipFilter(chipFilterUtil.customers, '', 2);
        navigation.applyChipFilter(chipFilterUtil.customers, '', 3);
        validationUtil.validateChipFiltersIsSortedByAsc();
        navigation.clickVehiclesLink();
        validationUtil.validateChipFiltersIsSortedByAsc();
        navigation.clickDashboardLink();
        navigation.clearAllButton.click();
        navigation.applyChipFilter(chipFilterUtil.vehicles, '', 1);
        navigation.applyChipFilter(chipFilterUtil.dealers, '', 1);
        navigation.applyChipFilter(chipFilterUtil.customers, '', 1);
        validationUtil.validateChipFilterTypesIconsOrdering(chipsTypesIconArray);
        navigation.clickVehiclesLink();
        validationUtil.validateChipFilterTypesIconsOrdering(chipsTypesIconArray);
    });

    it('TC-2080 Validate that Unnecessary chip filter not inherited from the certain recommendation', function () {
        dashboardPage.serviceNowRecommendationLink.click();
        vehiclePage.actionBarMoreOptionsButton.click();
        vehiclePage.addToVehicleGroupMoreOptionsButton.click();
        expect(vehiclePage.addToVehicleGroupChipFilterList.isPresent()).toBe(false, 'Chip Filter Present');
        vehiclePage.cancelBtn.click();
        navigation.clickTopTenFaultsLink();
        topTenFaultsPage.showErrorButtons.first().click();
        vehiclePage.actionBarMoreOptionsButton.click();
        vehiclePage.addToVehicleGroupMoreOptionsButton.click();
        expect(vehiclePage.addToVehicleGroupChipFilterList.isPresent()).toBe(false, 'Chip Filter Present');
    });
});