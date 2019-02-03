/**
 * Created by Cottomoeller on 5/10/2016.
 */
describe("Ui Validation for PMG Versions Page ----- ", function(){

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var pmgVersionsPage = require('../../../pages/pmg.versions.page.js');

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
        navigation.reportsButton.click();
        navigation.clickPMGVersionLink();
        pmgVersionsPage.verifyPMGVersionsData();
        pmgVersionsPage.searchOEM('Paccar');
    });
});