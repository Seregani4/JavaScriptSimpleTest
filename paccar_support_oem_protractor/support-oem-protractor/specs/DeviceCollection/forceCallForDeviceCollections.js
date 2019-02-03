/**
 * Created by jelliott on 8/26/2016.
 */
describe("Verifying Action Items for a Devices Collection ----- ", function(){
    var moment = require('moment');
    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var deviceCollectionsPage = require('../../../pages/device.collections.page.js');
    var devicesPage = require('../../../pages/devices.page.js');
    var toastUtil = require('../../../utilities/toastMessage.util.js');
    var tableUtil = require('../../../utilities/tables.util');
    var lastCallEndTimeColumn= devicesPage.columns.lastCallEndTimeColumn;
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var newDateTime = moment().format('MM-DD-YYYY');
    var password = browser.params.adduser.password;

    //var newDateTime = moment().add(5, 'H').format('YYYY-M-D HH:mm:ss');
    browser.driver.manage().window().maximize();

    afterEach(function() {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("As a PeopleNet Admin,Verify Force Call Action Button NEED UPDATE AFTER PVP-2892", function(){
        loginPage.get();
        loginPage.login('supportal', peoplenetAdminEmail, password);
        navigation.deviceManagementButton.click();
        navigation.clickDeviceCollectionsLink();
        deviceCollectionsPage.verifyDeviceCollectionsTableDataIsVisible();
        navigation.typeInSearchFilter('forceCallAutomation');
        deviceCollectionsPage.clickDeviceCollectionCheckbox('forceCallAutomation');
        expect(navigation.actionBar.isDisplayed()).toBe(true);
        navigation.actionBarMoreOptionsButton.click();
        deviceCollectionsPage.forceCallButton.click();
        toastUtil.verifyToastAlert('Force Call request submitted successfully');
        browser.sleep(60000); //Must wait for the call data to change
        deviceCollectionsPage.clickDeviceCollectionHyperlinkCellSearch('forceCallAutomation');
        devicesPage.verifyDeviceCollectionHeader('Devices');
        navigation.verifyChipFilter('forceCallAutomation');
        tableUtil.verifyColumn(newDateTime,lastCallEndTimeColumn);
    });
});