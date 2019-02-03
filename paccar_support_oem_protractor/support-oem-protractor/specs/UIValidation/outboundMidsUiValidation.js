/**
 * Created by Cottomoeller on 5/10/2016.
 */
describe("Verifying page data for Outbound Mids Page ----- ", function(){

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var outboundMidsPage = require('../../../pages/outbound.mids.page.js');

    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;

    var password = browser.params.adduser.password;
    var dsn = browser.params.vehicle.dsn;

    browser.driver.manage().window().maximize();

    afterEach(function() {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("Verify all fields are visible on page", function() {
        loginPage.get();
        loginPage.login('supportal', peoplenetAdminEmail, password);
        navigation.reportsButton.click();
        navigation.clickOutboundMidsLink();
        expect(outboundMidsPage.dsnField.isDisplayed()).toBe(true, 'Outbound Mids Data is missing');
        expect(outboundMidsPage.midsTable.isDisplayed()).toBe(false, 'The MIDs table is visible when it should not');
        outboundMidsPage.searchDSN(dsn);
    });
});