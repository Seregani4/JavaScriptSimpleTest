/**
 * Created by jelliott on 9/7/2016.
 */

describe("UI Validation for Device Collection Page -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var deviceCollectionsPage = require('../../../pages/device.collections.page.js');
    var deviceListPage = require('../../../pages/devices.page.js');
    var validationUtils = require('../../../utilities/validation.util.js');

    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;
    var deviceCollectionName = '00000test';
    var actionListArray = ["VIN DISCOVERY", "PMG VERSION REQUEST", "REMOVE", "FORCE CALL", "EXPORT"];

    browser.driver.manage().window().maximize();

    beforeEach(() => {
        loginPage.get();
        loginPage.login('paccar', peoplenetAdminEmail, password);
        navigation.clickDeviceCollectionsLink();
        deviceCollectionsPage.verifyDeviceCollectionsTableDataIsVisible();

    });
    afterEach(() => {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("Validate the All Buttons are Displayed  on Device Collection Page", () => {
        expect(navigation.clearAllFiltersButton.isDisplayed()).toBe(true, 'Clear all filters Button is Not Displayed');
        expect(navigation.moreOptionsButton.isDisplayed()).toBe(true, 'More Options Button is Not Displayed');
        navigation.moreOptionsButton.click();
        expect(deviceCollectionsPage.createNewCollectionButton.isDisplayed()).toBe(true, 'Create New Collection is Not Present');

    });

    it("Validate the Action Bar is Present on Device Collection Page", () => {
        navigation.typeInSearchFilter(deviceCollectionName);
        deviceCollectionsPage.clickDeviceCollectionCheckbox(deviceCollectionName);
        expect(navigation.actionBar.isDisplayed()).toBe(true, 'Action Bar is Not Present');
    });

    it('TC-2364 Validate BreadCrumbs, Action menu items  on the Device Collection Details Page', () => {
        navigation.typeInSearchFilter(deviceCollectionName);
        deviceCollectionsPage.clickDeviceCollectionHyperlinkCellSearch(deviceCollectionName);
        navigation.validateBreadCrumbs(['Dashboard', 'Device Collections', 'Collection Details']);
        deviceListPage.clickFirstDeviceCheckbox();
        navigation.actionBarMoreOptionsButton.click();
        navigation.waitTillElementToBeVisible(deviceCollectionsPage.actionsList.last())
        deviceCollectionsPage.actionsList.getText()
            .then(text => {
                validationUtils.validateTextContainArray(text, actionListArray);
                deviceCollectionsPage.actionsList.sendKeys(protractor.Key.ESCAPE);
            })
            .then(() => {
                navigation.breadCrumbs.$$('a').get(1).click();
                expect(browser.getCurrentUrl()).toBe(`${browser.params.environment.url}/#/nav/deviceCollection/list/`);
            })
    });

    it("Validate the Action Bar Buttons is Present on Device Collection Page", () => {
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

    it("Validate the Cancel Button for Adding a New Device Collection on Device Collection Page", () => {
        navigation.moreOptionsButton.click();
        deviceCollectionsPage.createNewCollectionButton.click();
        deviceCollectionsPage.cancelNewCollectionButton.click();
        expect(browser.getCurrentUrl()).toBe(`${browser.params.environment.url}/#/nav/deviceCollection/list/`);
    });

    it("Validate the (Last Page And First Page)Pagination Device Collection Page", () => {
        navigation.lastPageButton.click();
        expect(navigation.lastPageButton.getAttribute('disabled')).toBe('true');
        expect(navigation.nextPageButton.getAttribute('aria-hidden')).toBe('true');
        navigation.firstPageButton.click();
        expect(navigation.firstPageButton.getAttribute('disabled')).toBe('true');
        expect(navigation.previousPageButton.getAttribute('aria-hidden')).toBe('true');
    });

    it("Validate the(Next Page and Previous Page) Pagination on the Device Collection Page", () => {
        navigation.nextPageButton.click();
        expect(browser.getCurrentUrl()).toContain(`${browser.params.environment.url}/#/nav/deviceCollection/list/?page=1`);
        navigation.previousPageButton.click();
        expect(browser.getCurrentUrl()).toContain(`${browser.params.environment.url}/#/nav/deviceCollection/list/?page=0`);
    });

    it("Validate the Rows on the Device Collection Page", () => {
        navigation.pageSizeButton.click();
        navigation.pageFiftyButton.click();
        expect(deviceCollectionsPage.allDeviceCollectionsRows.count()).toBe(50);
        expect(browser.getCurrentUrl()).toContain(`${browser.params.environment.url}/#/nav/deviceCollection/list/?page=0&pageSize=50`);

        navigation.pageSizeButton.click();
        navigation.pageTenButton.click();
        expect(deviceCollectionsPage.allDeviceCollectionsRows.count()).toBe(10);
        expect(browser.getCurrentUrl()).toContain(`${browser.params.environment.url}/#/nav/deviceCollection/list/?page=0&pageSize=10`);

        navigation.pageSizeButton.click();
        navigation.pageTwentyFiveButton.click();
        expect(deviceCollectionsPage.allDeviceCollectionsRows.count()).toBe(25);
        expect(browser.getCurrentUrl()).toContain(`${browser.params.environment.url}/#/nav/deviceCollection/list/?page=0&pageSize=25`);
    });
});