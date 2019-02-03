/**
 * Created by jelliott on 11/9/2016.
 */

describe("Vehicle List Page UI Validation -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var vehiclePage = require('../../../pages/vehicles.page.js');
    var validationUtil = require('../../../utilities/validation.util');
    var chipFilterSuggestionArray = ['None', 'Customers', 'Dealers', 'Manufacturers', 'Vehicle Groups', 'Recommendations', 'Factories', 'Vehicle States'];
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;
    var vehicleVin = browser.params.vehicle.vin;

    browser.driver.manage().window().maximize();

    beforeEach(function () {
        loginPage.get();
        loginPage.login('paccar', peoplenetAdminEmail, password);

        navigation.clickVehiclesLink();
        vehiclePage.verifyVehicleListTableDataIsVisible();
    });

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("Validate the All Buttons on Vehicle List Page", function () {
        expect(navigation.clearAllFiltersButton.isDisplayed()).toBe(true, 'Clear all filters Button is Not Displayed');
        expect(navigation.moreOptionsButton.isDisplayed()).toBe(true, 'More Options Button is Not Displayed');
        validationUtil.validateChipFilterDropDowns();
        validationUtil.validateActionList(navigation.chipFilterDropDownButton, navigation.chipFilterDropDown, navigation.chipFilterDropDown.get(0), chipFilterSuggestionArray);
    });

    it("Validate the Action Bar and Action Buttons is Displayed on Vehicle List Page", function () {
        navigation.typeInSearchFilter(vehicleVin);
        vehiclePage.clickVehicleMoreOptions(vehicleVin);
        //expect(navigation.actionBar.isDisplayed()).toBe(true,'Action Bar is Not Displayed');
        expect(vehiclePage.editMoreOptionsButton.isDisplayed()).toBe(true, 'Edit Action Button is Not Displayed');
        //expect(vehiclePage.deleteActionButton.isDisplayed()).toBe(true,'Delete Action Button is Not Displayed');
        //expect(navigation.actionBarMoreOptionsButton.isDisplayed()).toBe(true,'More Options Button on Action Bar  is Not Displayed');
        //navigation.actionBarMoreOptionsButton.click();
        expect(vehiclePage.viewTripAuditMoreOptionsButton.isDisplayed()).toBe(true, 'View Trip Audit Action Bar Button is Not Displayed');
        expect(vehiclePage.ownershipHistoryMoreOptionsButton.isDisplayed()).toBe(true, 'Ownership History Action Bar Button is Not Displayed');
        expect(vehiclePage.transferOwnershipActionButton.isDisplayed()).toBe(true, 'Transfer Ownership Action Bar Button is Not Displayed');
    });

    it("Validate the (Last Page And First Page)Pagination Vehicle List Page", function () {
        //High (Default) Density
        navigation.lastPageButton.click();
        //expect(vehiclePage.lastPageButton.isEnabled()).toBe(false);
        //expect(vehiclePage.nextPageButton.isEnabled()).toBe(false);
        expect(navigation.lastPageButton.getAttribute('disabled')).toBe('true');
        expect(navigation.nextPageButton.getAttribute('aria-hidden')).toBe('true');
        navigation.firstPageButton.click();
        expect(navigation.firstPageButton.getAttribute('disabled')).toBe('true');
        expect(navigation.previousPageButton.getAttribute('aria-hidden')).toBe('true');
        //expect(vehiclePage.firstPageButton.isEnabled()).toBe(false);
        //expect(vehiclePage.previousPageButton.isEnabled()).toBe(false);
    });

    it("Validate the(Next Page and Previous Page) Pagination on the Vehicle List Page", function () {
        //High (Default) Density
        navigation.nextPageButton.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/vehicle/list/?page=' + 1);
        navigation.previousPageButton.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/vehicle/list/?page=' + 0);
    });

    it("Validate the Rows on the Vehicle List Page", function () {
        //High (Default) Density
        navigation.pageSizeButton.click();
        navigation.pageFiftyButton.click();
        vehiclePage.checkForPageCount(50);
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/vehicle/list/?page=0&pageSize=' + 50);

        navigation.pageSizeButton.click();
        navigation.pageTenButton.click();
        vehiclePage.checkForPageCount(10);
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/vehicle/list/?page=0&pageSize=' + 10);

        navigation.pageSizeButton.click();
        navigation.pageTwentyFiveButton.click();
        vehiclePage.checkForPageCount(25);
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/vehicle/list/?page=0&pageSize=' + 25);
    });
});