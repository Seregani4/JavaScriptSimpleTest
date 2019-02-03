/**
 * Created by Cottomoeller on 5/9/2016.
 */
describe("Verifying data on Data Import Page ----- ", function(){

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var dataImportPage = require('../../../pages/data.import.page.js');

    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;

    var password = browser.params.adduser.password;

    browser.driver.manage().window().maximize();

    afterEach(function() {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("Verify all fields are visible on page", function() {
        loginPage.get();
        loginPage.login('supportal', peoplenetAdminEmail, password);
        navigation.clientDataButton.click();
        navigation.clickDataImportLink();
        dataImportPage.verifyDataImportData();
        dataImportPage.dataImportDropdown.click();
        browser.sleep(1000);
        dataImportPage.verifyJobsDropdown();
    },500000);
});