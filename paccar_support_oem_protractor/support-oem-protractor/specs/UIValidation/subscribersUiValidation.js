/**
 * Created by Popazov on 7/4/2017.
 */



describe("Ui validation of subscribers page -----", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var subscribersPage = require('../../../pages/subscribers.page.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;
    browser.driver.manage().window().maximize();

    beforeEach(function () {
        loginPage.get();
        loginPage.login('supportal', peoplenetAdminEmail, password);
        navigation.dataSubscriptionsButton.click();
        navigation.clickSubscribersLink();
        subscribersPage.verifySubscribersData();

    });

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("Validate Subscribers list table  is display correct data ", function () {
        subscribersPage.verifySubscribersListTableDataIsVisible();
    });

    it("Validate the Action Bar and Action Buttons is Displayed on Subscribers List Page", function () {
        expect(navigation.clearAllFiltersButton.isDisplayed()).toBe(true, 'Clear all filter Button is Not Displayed');
        expect(navigation.addActionButton.isDisplayed()).toBe(true, 'Add New subscribers button is missing');
        navigation.addActionButton.click();
        subscribersPage.verifyNewSubscribersPopupFields();
    });

    it("Validate the Pagination Subscribers List Page", function () {
        navigation.lastPageButton.click();
        expect(navigation.lastPageButton.getAttribute('disabled')).toBe('true');
        expect(navigation.nextPageButton.getAttribute('aria-hidden')).toBe('true');
        navigation.firstPageButton.click();
        expect(navigation.firstPageButton.getAttribute('disabled')).toBe('true');
        expect(navigation.previousPageButton.getAttribute('aria-hidden')).toBe('true');
        navigation.nextPageButton.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/dataSubscriber/list/?page=' + 1);
        navigation.previousPageButton.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/dataSubscriber/list/?page=' + 0);
    });

    it("Validate the Rows on the Subscribers List Page", function () {
        navigation.pageSizeButton.click();
        navigation.pageTwentyFiveButton.click();
        navigation.checkForPageCount(25);
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/dataSubscriber/list/?page=0&pageSize=' + 25);
        navigation.pageSizeButton.click();
        navigation.pageFiftyButton.click();
        navigation.checkForPageCount(50);
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/dataSubscriber/list/?page=0&pageSize=' + 50);
        navigation.pageSizeButton.click();
        navigation.pageTenButton.click();
        navigation.checkForPageCount(10);
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/dataSubscriber/list/?page=0&pageSize=' + 10);
    });

});