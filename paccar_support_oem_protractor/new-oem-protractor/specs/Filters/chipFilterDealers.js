/**
 * Created by Popazov on 12/25/2017.
 */

const _ = require('lodash');

describe("Dealers Chip Filter validation for Users by ROLE -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var validationUtil = require('../../../utilities/validation.util');
    var chipFilterMatrix = require('../../../utilities/chipFilterMatrix.utils.js');
    var rolesWithPermission = chipFilterMatrix.rolesWithPermissionDealers;
    var dealerOwnerAdminEmail = browser.params.testuseremails.dealerowneradmin;
    var dealerOwnerUserEmail = browser.params.testuseremails.dealerowneruser;
    var dealerRegionAdminEmail = browser.params.testuseremails.dealerregionadmin;
    var dealerRegionUserEmail = browser.params.testuseremails.dealerregionuser;
    var dealerAdminEmail = browser.params.testuseremails.dealeradmin;
    var dealerPowerUserEmail = browser.params.testuseremails.dealeruser;
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
            navigation.clickDealersLink();
            validationUtil.validateActionListEqual(navigation.chipFilterDropDownButton, navigation.chipFilterDropDown, navigation.chipFilterDropDown.get(0), chipFilters);
            validationUtil.validateChipFilterDropDowns(eachUser);
        });
    });

    it('Validation chip filtering by ' + dealerOwnerUserEmail, function () {
        loginPage.get();
        loginPage.login('paccar', dealerOwnerUserEmail, password);
        navigation.dealersLink.click();
        navigation.applyChipFilter(chipFilterMatrix.dealers, '', 1);
        expect(navigation.activeChips.isPresent()).toBe(true, "Dealer chip filter didn't create");
        navigation.dealerOwnerGroupsLink.click();
        expect(navigation.persistentMessage.isPresent()).toBe(true, "Persistent message didn't present");
        navigation.clearAllFiltersButton.click();
        expect(navigation.persistentMessage.isPresent()).toBe(false, "Persistent message was present");
    });
});