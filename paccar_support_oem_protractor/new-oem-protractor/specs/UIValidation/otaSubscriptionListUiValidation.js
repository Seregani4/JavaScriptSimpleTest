//Created by jstaffon on 6/26/18///

describe('UI validation for OTA Subscription list page', function () {
    var otaSubPage = require('../../../pages/otaSupscription.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var loginPage = require('../../../pages/login.page.js');
    var otaUtilities = require('../../../utilities/otaSubscription.util.js');
    var validationUtil = require('../../../utilities/validation.util');
    var toastMessage = require('../../../utilities/toastMessage.util.js');
    var fileToUpload = browser.params.csvFilePath.otaImport;
    var fileToUpload1 = browser.params.csvFilePath.otaMissingVinColumn;
    var fileToUpload2 = browser.params.csvFilePath.otaMissingStatusColumn;
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;
    var vin = browser.params.vehicle.otavin2;
    var customer = browser.params.testcustomer.name;
    var maxRowNumber = 10000;
    browser.driver.manage().window().maximize();

    beforeEach(function () {
        // Get a fresh Angular "session" so we can avoid bootstrapping errors
        browser.driver.get("about:blank");
        browser.sleep(1000);
        loginPage.get();
        loginPage.login('paccar', peoplenetAdminEmail, password);
        navigation.clickOtaSubscriptionLink();
    });

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it('TC-2342 Validate navigation from breadcrumb to Dashboard', function () {
        navigation.breadCrumbs.$$('a').get(0).click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/dashboard');
    });

    it('TC-2343 Validate Export feature is present and functioning', function () {
        navigation.moreOptionsButton.click();
        navigation.exportButton.click();
        toastMessage.verifyToastAlert('Export of OTA Subscription succeeded.');
    });

    it('TC-4825 Validate Import button is present', function () {
        navigation.moreOptionsButton.click();
        expect(navigation.importButton.isDisplayed()).toBe(true);
    });

    it('TC-2345 Validate Configure Columns feature is present', function () {
        navigation.moreOptionsButton.click();
        navigation.configureColumnsButton.click();
        navigation.cancelCreationButton.click();
    });

    it("TC-2344 Validate the (Last Page And First Page)Pagination OTA Subscription List Page", function () {
        navigation.getRowsPerPageNumber().then(function (number) {
            if (number !== maxRowNumber) {
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

    it("TC-2344 Validate the Rows on the OTA Subscription List Page", function () {
        //High (Default) Density
        navigation.pageSizeButton.click();
        navigation.pageFiftyButton.click();
        otaSubPage.checkForPageCount(50);
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/otaSubscription/list/?page=0&pageSize=' + 50);

        navigation.pageSizeButton.click();
        navigation.pageTenButton.click();
        otaSubPage.checkForPageCount(10);
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/otaSubscription/list/?page=0&pageSize=' + 10);

        navigation.pageSizeButton.click();
        navigation.pageTwentyFiveButton.click();
        otaSubPage.checkForPageCount(25);
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/otaSubscription/list/?page=0&pageSize=' + 25);
    });

    it('TC-2508 Validates VIN hyperlink', function () {
        navigation.typeInSearchFilter(vin);
        otaSubPage.clickVehicleHyperlinkCellSearch(vin);
    });

    it('TC-2532 Validates Customer hyperlink', function () {
        navigation.typeInSearchFilter(vin);
        otaSubPage.clickCustomerHyperlinkCellSearch(customer);
    });

    it('TC-2581 and TC 2505 Import OTA file', function () {
        otaUtilities.importOtaFile(fileToUpload);
        toastMessage.verifyToastAlert('5 VINs out of 10 will be loaded into the system.');
    });

    it('TC-2568 Validates error toast for missing VIN header in csv file during Import', function () {
        otaUtilities.importOtaFile(fileToUpload1);
        toastMessage.verifyToastAlert('The imported file does not have required columns - VIN and OTA Subscription Status.');
    });

    it('TC-2568 Validates error toast for missing OTA Subscription Status header in csv file during Import', function () {
        otaUtilities.importOtaFile(fileToUpload2);
        toastMessage.verifyToastAlert('The imported file does not have required columns - VIN and OTA Subscription Status.');
    });
});
