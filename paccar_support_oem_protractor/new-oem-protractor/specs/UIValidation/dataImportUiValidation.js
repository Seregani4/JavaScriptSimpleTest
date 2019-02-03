/**
 * Created by Popazov on 8/1/2018.
 */


describe("Verify data import page -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var dataImportPage = require('../../../pages/data.import.page.js');
    var tableUtil = require('../../../utilities/tables.util.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;

    browser.driver.manage().window().maximize();

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });


    it("TC-1977 Data Import Jobs UI Validation", () => {
        loginPage.get();
        loginPage.login('paccar', peoplenetAdminEmail, password);
        navigation.clickDataImportLink();
        expect(dataImportPage.dataImportDropdown.isDisplayed()).toBe(true, "Data import dropdown not displayed");
        tableUtil.verifyColumnsNames(dataImportPage.tableHeader,dataImportPage.columns);
        dataImportPage.verifyDataImportData();
        dataImportPage.clickJobDetailLink(0);
        dataImportPage.verifyCardContent();
    });
});
