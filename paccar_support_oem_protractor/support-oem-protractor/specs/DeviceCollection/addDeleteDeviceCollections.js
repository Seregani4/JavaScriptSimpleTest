/**
 * Created by jelliott on 9/7/2016.
 */
describe("Add a Device Collection Validation----- ", function(){

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var deviceCollectionsPage = require('../../../pages/device.collections.page.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;
    var deviceCollectionName='aaaaabAutomationDeleteTest';
    var deviceCollectionDescriptions='aaaaabAutomationDeleteTest is Marked for Deletion.DO NOT TOUCH';

    browser.driver.manage().window().maximize();

    afterEach(function() {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("As a PeopleNet Admin,Add and then Delete Device Collection", function(){
        loginPage.get();
        loginPage.login('supportal', peoplenetAdminEmail, password);
        navigation.deviceManagementButton.click();
        navigation.clickDeviceCollectionsLink();
        deviceCollectionsPage.verifyDeviceCollectionsTableDataIsVisible();
        navigation.moreOptionsButton.click();
        deviceCollectionsPage.createNewCollectionButton.click();
        deviceCollectionsPage.fillOutNewCollectionFields(deviceCollectionName,deviceCollectionDescriptions);
        navigation.typeInSearchFilter(deviceCollectionName);
        deviceCollectionsPage.clickDeviceCollectionCheckbox(deviceCollectionName);
        navigation.actionBarMoreOptionsButton.click();
        deviceCollectionsPage.deleteButton.click();
        deviceCollectionsPage.deleteDeviceCollectionDialog.click();
        navigation.clearAllFiltersButton.click();
        navigation.typeInSearchFilter(deviceCollectionName);
        deviceCollectionsPage.verifyRemovedDeviceCollectionSearch(deviceCollectionName);

    });
});
