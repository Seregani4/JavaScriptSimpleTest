/**
 * Created by Popazov on 7/11/2017.
 */



describe("Ui Validation for Data Logger Page ----- ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var dataLoggerPage = require('../../../pages/data.logger.page.js');
    var superAdmin = 'superadmin-automation@test.com';
    var password = 'Password$2';

    browser.driver.manage().window().maximize();

    beforeEach(function () {
        loginPage.get();
        loginPage.login('supportal', superAdmin, password);
        navigation.deviceManagementButton.click();
        navigation.clickDataloggerLink();
    });
    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });


    it("Validate Data Logger Page display correct data ", function () {
        dataLoggerPage.verifyAllElementsPresentOnPage();
        dataLoggerPage.deactivateTabButton.click();
        expect(dataLoggerPage.deactivateButton.isDisplayed()).toBe(true, 'Deactivate button is missing');
        dataLoggerPage.verifyActiveDeviceListTableDataIsVisible();
        expect(navigation.clearAllFiltersButton.isDisplayed()).toBe(true, 'Clear all chip filters button is missing');
        navigation.clearAllFiltersButton.click();
    });

});