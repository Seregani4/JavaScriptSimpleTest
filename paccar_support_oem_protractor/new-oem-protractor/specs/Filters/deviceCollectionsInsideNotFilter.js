/**
 * Created by jelliott on 8/24/2016.
 */
describe("Validate NOT filter in a Device Collections -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var deviceCollectionsPage = require('../../../pages/device.collections.page.js');
    var devicesPage = require('../../../pages/devices.page.js');
    var tableUtil = require('../../../utilities/tables.util.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;
    var collectionNameColumn = deviceCollectionsPage.columns.nameColumn;
    var dsnColumn = devicesPage.columns.dsnColumn;
    var licenceColumn = devicesPage.columns.licenseColumn;
    var searchDeviceCollection = 'testAutomationNotFilter';

    browser.driver.manage().window().maximize();

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("Not Filter Within a Device Collection", function () {
        loginPage.get();
        loginPage.login('paccar', peoplenetAdminEmail, password);
        navigation.clickDeviceCollectionsLink();
        deviceCollectionsPage.verifyDeviceCollectionsTableDataIsVisible();
        navigation.typeInSearchFilter(searchDeviceCollection);
        tableUtil.verifyNotColumn('Filter', collectionNameColumn);
        deviceCollectionsPage.clickDeviceCollectionHyperlinkCellSearch(searchDeviceCollection);
        navigation.typeInSearchFilter('!1');
        tableUtil.verifyNotColumn('1', dsnColumn);
        navigation.chipFilterCloseBtn.click();
        navigation.typeInSearchFilterRecommendation('!License: PFM(Exclusive)');
        tableUtil.verifyNotColumn('PFM', licenceColumn);
        navigation.clearAllFiltersButton.click();
    }, 500000);
});