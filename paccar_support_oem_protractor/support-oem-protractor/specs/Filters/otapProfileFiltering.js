/**
 * Created by jelliott on 8/30/2016.
 */
describe("Verifying data and functionality for the OTAP Page-Profiles ----- ", function(){

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var otapPage = require('../../../pages/otap.page.js');

    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;

    var password = browser.params.adduser.password;

    browser.driver.manage().window().maximize();

    afterEach(function() {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("Verify chip filter give correct results", function() {
        loginPage.get();
        loginPage.login('supportal', peoplenetAdminEmail, password);
        navigation.deviceManagementButton.click();
        navigation.clickOTAPLink();
        otapPage.clickOTAPProfilesTab();

        navigation.typeInSearchFilter('demo');
        otapPage.verifyOTAPProfilesData();
        otapPage.verifyOtapProfileTabData('demo');
        navigation.clearAllFiltersButton.click();

    });
});