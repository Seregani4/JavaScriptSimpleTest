/**
 * Created by jelliott on 10/17/2016.
 */

describe("UI Validation for Device List Page -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var devicesPage = require('../../../pages/devices.page.js');
    var deviceDetailsPage = require('../../../pages/device.details.page');
    var validationUtil = require('../../../utilities/validation.util.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;
    var deviceName = '414';
    var maxRowNumber = 10000;

    browser.driver.manage().window().maximize();

    beforeEach(function () {
        loginPage.get();
        loginPage.login('paccar', peoplenetAdminEmail, password);
        navigation.clickDevicesLink();
        //devicesPage.verifyDeviceListTableDataIsVisible(); //Only needs to be validated once.

    });
    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("Validate the All Buttons on Device List Page for both High and Low Density", function () {
        devicesPage.verifyDeviceListTableDataIsVisible();
        //High (Default) Density
        expect(navigation.clearAllFiltersButton.isDisplayed()).toBe(true, 'Clear all filters Button is Not Displayed');
        //expect(navigation.refreshActionButton.isDisplayed()).toBe(true,'Refresh Button is Not Displayed');
        expect(devicesPage.exportButton.isDisplayed()).toBe(true, 'Export Button is Not Displayed');
        expect(navigation.moreOptionsButton.isDisplayed()).toBe(true, ' More Options Button is Missing');
        navigation.moreOptionsButton.click();
        expect(devicesPage.addAllToCollection.isDisplayed()).toBe(true, 'Add all to Collection Button is Not Displayed');
        expect(devicesPage.addAllToAnExistingCollection.isDisplayed()).toBe(true, 'Add all TO an Existing Collection is not Displayed');
    });

    it("Validate the Action Bar and Action Buttons is Displayed on Device List Page", function () {
        navigation.typeInSearchFilter(deviceName);
        devicesPage.clickDeviceCheckbox(deviceName);
        expect(navigation.actionBar.isDisplayed()).toBe(true, 'Action Bar is Not Displayed');
        navigation.actionBarMoreOptionsButton.click();
        expect(devicesPage.addAllToAnExistingCollectionActionBar.isDisplayed()).toBe(true, 'Add all TO an Existing Collection is not Displayed');
        expect(devicesPage.addAllToCollectionActionBar.isDisplayed()).toBe(true, 'Add all to Collection Button is Not Displayed');
        expect(devicesPage.vinDiscoveryBtn.isDisplayed()).toBe(true, 'Vin Discovery Action Button is Not Displayed');
        expect(devicesPage.forceCallActionButton.isDisplayed()).toBe(true, 'Force Call Action Button is Not Displayed');
        expect(devicesPage.pmgVersionRequestBtn.isDisplayed()).toBe(true, 'PMG Version Request Action Button is Not Displayed');
        expect(devicesPage.exportButtonActionBar.isDisplayed()).toBe(true, 'Export Button is Not Displayed');
    });

    it('Validate the BreadCrumbs on the Device Details Page', function () {
        navigation.typeInSearchFilter(deviceName);
        devicesPage.clickDeviceHyperlinkCellSearch(deviceName);
        navigation.validateBreadCrumbs(['Dashboard', 'Devices', 'Device Details']);

        navigation.breadCrumbs.$$('a').get(1).click();
        expect(browser.getCurrentUrl()).toBe(browser.params.environment.url + '/#/nav/device/list/');
    });

    it("Validate the (Last Page And First Page)Pagination Device ist Page for High Page Density", function () {
        navigation.getRowsPerPageNumber().then(function (number) {
            if (number < maxRowNumber) {
                navigation.lastPageButton.click();
                expect(navigation.lastPageButton.getAttribute('disabled')).toBe('true');
                expect(navigation.nextPageButton.getAttribute('aria-hidden')).toBe('true');
                navigation.firstPageButton.click();
                expect(navigation.firstPageButton.getAttribute('disabled')).toBe('true');
                expect(navigation.previousPageButton.getAttribute('aria-hidden')).toBe('true');
            } else {
                validationUtil.validateMaxResultReachedMessage();
            }
        });
    });

    it("Validate the(Next Page and Previous Page) Pagination on the Device List Page for High Page Density", function () {
        //High (Default) Density
        navigation.nextPageButton.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/device/list/?page=' + 1);
        navigation.previousPageButton.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/device/list/?page=' + 0);
    });

    it("Validate the Rows on the Device List Page for High Page Density", function () {
        //High (Default) Density
        navigation.pageSizeButton.click();
        navigation.pageSizeOneFiftyButton.click();
        devicesPage.checkForPageCount(150);
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/device/list/?page=0&pageSize=' + 150);

        navigation.pageSizeButton.click();
        navigation.pageSizeFiftyButton.click();
        devicesPage.checkForPageCount(50);
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/device/list/?page=0&pageSize=' + 50);

        navigation.pageSizeButton.click();
        navigation.pageSizeHundredButton.click();
        devicesPage.checkForPageCount(100);
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/device/list/?page=0&pageSize=' + 100);
    });

    //PVP-1066 -> Last call info on device details page.
    it("Validate the Last Call Information is Displayed on Device List Page", function () {
        navigation.typeInSearchFilter('6035837');
        devicesPage.clickDeviceHyperlinkCellSearch('6035837');
        deviceDetailsPage.verifyLastCallCardInfo();
        browser.sleep(1000);
        deviceDetailsPage.verifyCallStartData();
        deviceDetailsPage.verifyCallEndData();
        deviceDetailsPage.verifyCallReasonData();
        deviceDetailsPage.verifyCallResultData();
    });
});