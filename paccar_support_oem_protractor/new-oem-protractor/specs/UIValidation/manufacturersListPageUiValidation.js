/**
 * Created by jelliott on 12/1/2016.
 */

describe("Manufacturer List Page UI Validation -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var manufacturersPage = require('../../../pages/manufacturers.page.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;
    var manufacturersName = 'Kenworth';

    browser.driver.manage().window().maximize();

    beforeEach(function () {
        loginPage.get();
        loginPage.login('paccar', peoplenetAdminEmail, password);
        navigation.clickManufacturersLink();
        manufacturersPage.verifyManufacturerListTableDataIsVisible();
    });

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("Validate the All Buttons on Manufacturer List Page for both High and Low Density", function () {
        //High (Default) Density
        expect(navigation.clearAllFiltersButton.isDisplayed()).toBe(true, 'Clear all filters Button is Not Displayed');
        //expect(navigation.densityToggleBtn.isDisplayed()).toBe(true,'Density Toggle Button is Not Displayed');
        //expect(navigation.refreshActionButton.isDisplayed()).toBe(true,'Refresh Button is Not Displayed');
        //browser.sleep(500);
    });

    it("Validate the Action Bar and Action Buttons is Displayed on Manufacturer List Page", function () {
        navigation.typeInSearchFilter(manufacturersName);
        manufacturersPage.clickManufacturerCheckbox(manufacturersName);
        expect(navigation.actionBar.isDisplayed()).toBe(true, 'Action Bar is Not Displayed');
        expect(navigation.editActionButton.isDisplayed()).toBe(true, 'Edit Action Button is Not Displayed');
    });

    it("Validate the (Last Page And First Page)Pagination Manufacturer List Page for High Page Density", function () {
        //High (Default) Density
        navigation.lastPageButton.click();
        //expect(manufacturersPage.lastPageButton.isEnabled()).toBe(false);
        //expect(manufacturersPage.nextPageButton.isEnabled()).toBe(false);
        expect(navigation.lastPageButton.getAttribute('disabled')).toBe('true');
        expect(navigation.nextPageButton.getAttribute('aria-hidden')).toBe('true');
        navigation.firstPageButton.click();
        expect(navigation.firstPageButton.getAttribute('disabled')).toBe('true');
        expect(navigation.previousPageButton.getAttribute('aria-hidden')).toBe('true');
        //expect(manufacturersPage.firstPageButton.isEnabled()).toBe(false);
        //expect(manufacturersPage.previousPageButton.isEnabled()).toBe(false);
    });

    it("Validate the Rows on the Manufacturer List Page for High Page Density", function () {
        //High (Default) Density
        navigation.pageSizeButton.click();
        navigation.pageFiftyButton.click();
        manufacturersPage.checkForPageCount(50);
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/manufacturer/list/?page=0&pageSize=' + 50);

        navigation.pageSizeButton.click();
        navigation.pageTenButton.click();
        manufacturersPage.checkForPageCount(10);
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/manufacturer/list/?page=0&pageSize=' + 10);

        navigation.pageSizeButton.click();
        navigation.pageTwentyFiveButton.click();
        manufacturersPage.checkForPageCount(25);
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/manufacturer/list/?page=0&pageSize=' + 25);
    });
});