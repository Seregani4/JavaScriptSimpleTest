/**
 * Created by Popazov on 7/10/2017.
 */

describe("Ui validation of Connection History Report page -----", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var connectionHistoryReportPage = require('../../../pages/connection.history.report.page.js');
    var dsn = browser.params.vehicle.dsn;
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;
    browser.driver.manage().window().maximize();

    beforeEach(function () {
        loginPage.get();
        loginPage.login('supportal', peoplenetAdminEmail, password);
        navigation.clickReportsButton();
        navigation.clickConnectionHistoryReportLink();
    });

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("Validate Connection History Report page is display correct data ", function () {
        connectionHistoryReportPage.verifyConnectionHistoryReportData();
        connectionHistoryReportPage.dsnInput.sendKeys((dsn));
        connectionHistoryReportPage.searchButton.click();
        expect(connectionHistoryReportPage.connectionHistoryReportTableTitle.isDisplayed()).toBe(true, 'Table header is missing');
        connectionHistoryReportPage.veifyConnectionHistoryTableHeaderData();
    });

});