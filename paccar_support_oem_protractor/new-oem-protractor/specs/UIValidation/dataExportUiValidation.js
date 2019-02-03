/**
 * Created by Cottomoeller on 5/9/2016.
 */

describe("Verifying data Data Export Page -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var dataExportPage = require('../../../pages/data.export.page.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;

    browser.driver.manage().window().maximize();

    beforeEach(function () {
        loginPage.get();
        loginPage.login('paccar', peoplenetAdminEmail, password);
        navigation.clickDataExportLink();
        dataExportPage.verifyDataExportData();
        dataExportPage.clickEntityDropdown();
        dataExportPage.verifyEntityList();
    });
    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("Verify the Entity Count in Entity List is the same as the last time this script ran", function () {
        expect(dataExportPage.entityList.count()).toBe(4, 'There are more or less Entities in this List than this test accounted for');

    });

    it("Click and Verify Text of all Entities", function () {
        var string = dataExportPage.entityList.get(0).getText();
        var stringA = dataExportPage.entityList.get(1).getText();
        var stringB = dataExportPage.entityList.get(2).getText();
        var stringC = dataExportPage.entityList.get(3).getText();

        dataExportPage.entityList.get(0).click();
        expect(dataExportPage.entityField.getText()).toBe(string);

        dataExportPage.clickEntityDropdown();
        dataExportPage.entityList.get(1).click();
        expect(dataExportPage.entityField.getText()).toBe(stringA);

        dataExportPage.clickEntityDropdown();
        dataExportPage.entityList.get(2).click();
        expect(dataExportPage.entityField.getText()).toBe(stringB);

        dataExportPage.clickEntityDropdown();
        dataExportPage.entityList.get(3).click();
        expect(dataExportPage.entityField.getText()).toBe(stringC);
    });
});