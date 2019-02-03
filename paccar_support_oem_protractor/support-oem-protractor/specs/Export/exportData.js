/**
 * Created by jelliott on 9/20/2016.
 */
/**
 * Edited by Pshrestha on 4/6/2016.
 */
describe("Verifying Data Export Page ----- ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var dataExportPage = require('../../../pages/data.export.page.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var tsr1 = browser.params.testuseremails.tsr1;
    var tsr2 = browser.params.testuseremails.tsr2;
    var password = browser.params.adduser.password;

    browser.driver.manage().window().maximize();

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("Verify Export Functionality", function () {
        loginPage.get();
        loginPage.login('supportal', peoplenetAdminEmail, password);
        navigation.clientDataButton.click();
        navigation.clickDataExportLink();
        dataExportPage.verifyDataExportData();
        dataExportPage.clickEntityDropdown();
        dataExportPage.verifyEntityList();
    });

    var loginUserArray = [peoplenetAdminEmail, tsr1, tsr2];
    var entityOptionArray = ['customers', 'dealers', 'users', 'vehicles'];

    loginUserArray.forEach(function (eachUser) {
        entityOptionArray.forEach(function (eachOption) {
            it("Verify  " + eachOption + " Export Functionality for " + eachUser, function () {
                loginPage.get();
                loginPage.login('supportal', eachUser, password);
                navigation.clientDataButton.click();
                navigation.clickDataExportLink();
                dataExportPage.selectEntityOption(eachOption);
                dataExportPage.exportButton.click();
                expect(dataExportPage.checkForToastAlert()).toBe(true);
            });
        })
    });

});