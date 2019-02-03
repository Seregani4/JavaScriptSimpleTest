/**
 * Created by jelliott on 08/12/2016.
 */
describe("Verifying data and functionality for Devices Page ----- ", function(){

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var tableUtil = require('../../../utilities/tables.util.js');
    var deviceCollectionsPage = require('../../../pages/device.collections.page.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;
    var connectionNameColumn = deviceCollectionsPage.columns.nameColumn;
    browser.driver.manage().window().maximize();

    afterEach(function() {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("Verify Device Collections table has all correct fields visible", function(){
        loginPage.get();
        loginPage.login('supportal', peoplenetAdminEmail, password);
        navigation.deviceManagementButton.click();
        navigation.clickDeviceCollectionsLink();
        deviceCollectionsPage.verifyDeviceCollectionsTableDataIsVisible();
        navigation.typeInSearchFilter('00000test');
        tableUtil.verifyColumn('00000test',connectionNameColumn);
        navigation.clearAllFiltersButton.click();
    });
});