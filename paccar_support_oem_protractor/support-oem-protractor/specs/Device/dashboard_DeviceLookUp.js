/**
 * Created by jelliott on 7/20/2016.
 */

describe("Verifying Dashboard - Device lookup----- ", function(){

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var dashboardPage = require('../../../pages/dashboard.page.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var testdsn = browser.params.vehicle.dsn3;
    var password = browser.params.adduser.password;
    var detailVin = browser.params.vehicle.vin;

    browser.driver.manage().window().maximize();

    beforeEach(function() {
        //Do these commands
        loginPage.get();
        loginPage.login('supportal', peoplenetAdminEmail, password);
        navigation.clickDashboardSupportalLink();
        dashboardPage.dsnField.sendKeys(testdsn);
        dashboardPage.dsnField.sendKeys(protractor.Key.ENTER);
        expect(dashboardPage.detailMap.isDisplayed()).toBe(true,"The Dashboard Details Map is not Visible");
        expect(dashboardPage.detaildsn.getText()).toContain(testdsn,"The Dashboard Details dsn does not match");
        expect(dashboardPage.detailVin.getText()).toContain(detailVin,"The Dashboard Details Vin does not match");
    });

    afterEach(function() {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("Verify the details link on the dashboard brings user to the Device Details Page", function() {
        dashboardPage.detailsLink.click();
        expect(browser.getCurrentUrl()).toBe(browser.params.environment.url + '/#/nav/device/details/'+testdsn);
    });

    it("Verify the Vin link on the dashboard brings user to the Device Details Page", function() {
        dashboardPage.detailVin.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/vehicle/details/'+detailVin);
    });

    it("Verify the Dsn link on the dashboard brings user to the Device Details Page", function() {
        dashboardPage.detaildsn.click();
        expect(browser.getCurrentUrl()).toBe(browser.params.environment.url + '/#/nav/device/details/'+testdsn);
    });
});