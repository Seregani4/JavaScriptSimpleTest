/**
 * Created by jelliott on 9/7/2016.
 */
describe("UI Validation for Device Collection Page----- ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var deviceCollectionsPage = require('../../../pages/device.collections.page.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;
    var deviceCollectionName = 'testAutomationNotFilter';

    browser.driver.manage().window().maximize();

    beforeEach(function () {
        loginPage.get();
        loginPage.login('supportal', peoplenetAdminEmail, password);
        navigation.deviceManagementButton.click();
        navigation.clickDeviceCollectionsLink();
        deviceCollectionsPage.verifyDeviceCollectionsTableDataIsVisible();

    });
    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("Validate the All Buttons are Displayed  on Device Collection Page", function () {
        expect(navigation.clearAllFiltersButton.isDisplayed()).toBe(true, 'Clear all filters Button is Not Displayed');
        expect(navigation.moreOptionsButton.isDisplayed()).toBe(true, 'More Options Button is Not Displayed');
        navigation.moreOptionsButton.click();
        expect(deviceCollectionsPage.createNewCollectionButton.isDisplayed()).toBe(true, 'Create New Collection is Not Present');

    });

    it("Validate the Action Bar is Present on Device Collection Page", function () {
        navigation.typeInSearchFilter(deviceCollectionName);
        deviceCollectionsPage.clickDeviceCollectionCheckbox(deviceCollectionName);
        expect(navigation.actionBar.isDisplayed()).toBe(true, 'Action Bar is Not Present');
    });

    it("Validate the Action Bar Buttons is Present on Device Collection Page", function () {
        navigation.typeInSearchFilter(deviceCollectionName);
        deviceCollectionsPage.clickDeviceCollectionCheckbox(deviceCollectionName);
        expect(navigation.actionBar.isDisplayed()).toBe(true, 'Action Bar is Not Present');
        navigation.actionBarMoreOptionsButton.click();
        expect(deviceCollectionsPage.editButton.isDisplayed()).toBe(true, 'Edit Action Button is Not Present');
        expect(deviceCollectionsPage.deleteButton.isDisplayed()).toBe(true, 'Delete Action Button is Not Present');
        expect(deviceCollectionsPage.otapButton.isDisplayed()).toBe(true, 'Otap Action Button is Not Present');
        expect(deviceCollectionsPage.vinDiscoveryButton.isDisplayed()).toBe(true, 'Vin Discovery Action Button is Not Present');
        expect(deviceCollectionsPage.pmgVersionRequestButton.isDisplayed()).toBe(true, 'PMG Version Request Action Button is Not Present');
        expect(deviceCollectionsPage.forceCallButton.isDisplayed()).toBe(true, 'Force Call Action Button  is Not Present');
    });

    it("Validate the Cancel Button for Adding a New Device Collection on Device Collection Page", function () {
        navigation.moreOptionsButton.click();
        deviceCollectionsPage.createNewCollectionButton.click();
        deviceCollectionsPage.cancelNewCollectionButton.click();
        expect(browser.getCurrentUrl()).toBe(browser.params.environment.url + '/#/nav/deviceCollection/list/');
    });

    it("Validate the (Last Page And First Page)Pagination Device Collection Page", function () {
        navigation.lastPageButton.click();
        //expect(deviceCollectionsPage.lastPageButton.isEnabled()).toBe(false);
        //expect(deviceCollectionsPage.nextPageButton.isEnabled()).toBe(false);
        expect(navigation.lastPageButton.getAttribute('disabled')).toBe('true');
        expect(navigation.nextPageButton.getAttribute('aria-hidden')).toBe('true');
        navigation.firstPageButton.click();
        expect(navigation.firstPageButton.getAttribute('disabled')).toBe('true');
        expect(navigation.previousPageButton.getAttribute('aria-hidden')).toBe('true');
        //expect(deviceCollectionsPage.firstPageButton.isEnabled()).toBe(false);
        //expect(deviceCollectionsPage.previousPageButton.isEnabled()).toBe(false);
    });

    it("Validate the(Next Page and Previous Page) Pagination on the Device Collection Page", function () {
        navigation.nextPageButton.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/deviceCollection/list/?page=' + 1);
        navigation.previousPageButton.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/deviceCollection/list/?page=' + 0);

    });

    it("Validate the Rows on the Device Collection Page", function () {
        navigation.pageSizeButton.click();
        navigation.pageFiftyButton.click();
        expect(deviceCollectionsPage.allDeviceCollectionsRows.count()).toBeLessThanOrEqual(50);
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/deviceCollection/list/?page=0&pageSize=' + 50);
        //expect(deviceCollectionsPage.allDeviceCollectionsRows.count()).toBe(element(by.className('md-select-value').getText()));
        //expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/deviceCollection/list/?page=0&pageSize='+numberFifty);

        navigation.pageSizeButton.click();
        navigation.pageTenButton.click();
        expect(deviceCollectionsPage.allDeviceCollectionsRows.count()).toBe(10);
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/deviceCollection/list/?page=0&pageSize=' + 10);

        navigation.pageSizeButton.click();
        navigation.pageTwentyFiveButton.click();
        expect(deviceCollectionsPage.allDeviceCollectionsRows.count()).toBe(25);
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/deviceCollection/list/?page=0&pageSize=' + 25);

    });

});