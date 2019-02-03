/**
 * Created by Popazov on 7/4/2017.
 */


describe("Ui validation of enpoints page -----", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var endpointsPage = require('../../../pages/endpoints.page.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;
    browser.driver.manage().window().maximize();

    beforeEach(function () {
        loginPage.get();
        loginPage.login('supportal', peoplenetAdminEmail, password);
        navigation.dataSubscriptionsButton.click();
        navigation.clickEndpointsLink();
        endpointsPage.verifyEndpointData();

    });

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("Validate Endpoints list table  is display correct data ", function () {
        endpointsPage.verifyEndpointsListTableDataIsVisible();
    });

    it("Validate the Action Bar and Action Buttons is Displayed on Endpoints List Page", function () {
        expect(endpointsPage.eventTypesInput.isDisplayed()).toBe(true, 'Event Types input is missing');
        expect(endpointsPage.searchInput.isDisplayed()).toBe(true, 'Search input is missing');

    });

    it("Validate the Pagination Endpoints List Page", function () {
        navigation.lastPageButton.click();
        expect(navigation.lastPageButton.getAttribute('disabled')).toBe('true');
        expect(navigation.nextPageButton.getAttribute('aria-hidden')).toBe('true');
        navigation.firstPageButton.click();
        expect(navigation.firstPageButton.getAttribute('disabled')).toBe('true');
        expect(navigation.previousPageButton.getAttribute('aria-hidden')).toBe('true');
        navigation.nextPageButton.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/endpoint/list/?page=' + 1);
        navigation.previousPageButton.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/endpoint/list/?page=' + 0);
    });

    it("Validate the Rows on the Endpoints List Page", function () {
        navigation.pageSizeButton.click();
        navigation.pageTwentyFiveButton.click();
        navigation.checkForPageCount(25);
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/endpoint/list/?page=0&pageSize=' + 25);
        navigation.pageSizeButton.click();
        navigation.pageFiftyButton.click();
        navigation.checkForPageCount(50);
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/endpoint/list/?page=0&pageSize=' + 50);
        navigation.pageSizeButton.click();
        navigation.pageTenButton.click();
        navigation.checkForPageCount(10);
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/endpoint/list/?page=0&pageSize=' + 10);
    });

});