/**
 * Created by Cottomoeller on 5/10/2016.
 */
/**
 * Updated by Pshrestha on 4/5/2017.
 */

describe("Verifying data on Digital Call History Page ----- ", function(){

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var digitalCallHistoryPage = require('../../../pages/digital.call.history.page.js');

    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;

    var password = browser.params.adduser.password;
    var dsn ='6035837';
    var numOfDays = '30';

    browser.driver.manage().window().maximize();

    afterEach(function() {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("Verify all fields are visible on page", function() {
        loginPage.get();
        loginPage.login('supportal', peoplenetAdminEmail, password);
        navigation.reportsButton.click();
        navigation.clickDigitalCallHistoryLink();
        expect(digitalCallHistoryPage.digitalCallHistoryForm.isDisplayed()).toBe(true, 'Digital Call History Data is missing');
        digitalCallHistoryPage.verifyAllFieldsArePresent();
        digitalCallHistoryPage.verifySourceDropdownValues();
        digitalCallHistoryPage.verifyMWIDropdownValues();
    });

    it("Verify all fields on the DCH data table", function() {
        loginPage.get();
        loginPage.login('supportal', peoplenetAdminEmail, password);
        navigation.reportsButton.click();
        navigation.clickDigitalCallHistoryLink();
        expect(digitalCallHistoryPage.digitalCallHistoryForm.isDisplayed()).toBe(true, 'Digital Call History Form is missing');
        digitalCallHistoryPage.enterDSN(dsn);
        digitalCallHistoryPage.enterNoOfDays(numOfDays);
        digitalCallHistoryPage.searchBtn.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/digitalSession/list/' + dsn,'The page did not load.');
        expect(digitalCallHistoryPage.dataTableHeading.isDisplayed()).toBe(true, 'Digital Call History Data Table is missing');
        digitalCallHistoryPage.verifyDchTableDataIsVisible();
        digitalCallHistoryPage.clickFirstViewButtonInTable();
    },800000);


});