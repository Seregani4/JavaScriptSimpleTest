/**
 * Created by jelliott on 9/2/2016.
 */
describe("Verifying Edit Action for a Device Collection ----- ", function(){

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var deviceCollectionsPage = require('../../../pages/device.collections.page.js');
    var devicesPage = require('../../../pages/devices.page.js');
    var searchDsn='7010374';
    var searchDeviceCollection = browser.params.testCollection.name;
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;

    browser.driver.manage().window().maximize();

    beforeEach(function () {
        loginPage.get();
        loginPage.login('supportal', peoplenetAdminEmail, password);
        navigation.deviceManagementButton.click();
    });

    afterEach(function() {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });
    //Need to Remove the Device from Device Collection to make sure adding it back to a collection works properly
    it("As a PeopleNet Admin, Remove a Device from an Existing Device Collection NEED UPDATE AFTER PVP-2892", function(){
        navigation.clickDeviceCollectionsLink();
        navigation.typeInSearchFilter(searchDeviceCollection);
        deviceCollectionsPage.clickDeviceCollectionHyperlinkCellSearch(searchDeviceCollection);
        navigation.typeInSearchFilter(searchDsn);
        devicesPage.clickDeviceCheckbox(searchDsn);
        expect(navigation.actionBar.isDisplayed()).toBe(true);
        //More Options Button
        navigation.actionBarMoreOptionsButton.click();
        devicesPage.deviceDeleteAction.click();
        navigation.submitDialogButton.click();
        devicesPage.verifyRemovedDeviceSearch(searchDsn);
        navigation.clearAllFiltersButton.click();
    },500000);

    it("As a PeopleNet Admin,Add a Device to an Existing Device Collection NEED UPDATE AFTER PVP-2892", function(){
        navigation.clickDevicesLink();
        //Add Device to a Collection
        navigation.typeInSearchFilter(searchDsn);
        devicesPage.clickDeviceCheckbox(searchDsn);
        expect(navigation.actionBar.isDisplayed()).toBe(true);
        expect(devicesPage.addAllToAnExistingCollection.isPresent()).toBe(true, 'The AddALLToAnExistingCollection menu option is not present.');
        navigation.actionBarMoreOptionsButton.click();
        devicesPage.addAllToAnExistingCollectionActionBar.click();
        devicesPage.typeInPopUpSearchFilter(searchDeviceCollection);
        devicesPage.clickCollectionCheckbox(searchDeviceCollection);
        devicesPage.addToCollecitonOkBtn.click();
        //Verify the added Device
        navigation.clickDeviceCollectionsLink();
        deviceCollectionsPage.verifyDeviceCollectionsTableDataIsVisible();
        navigation.typeInSearchFilter(searchDeviceCollection);
        deviceCollectionsPage.clickDeviceCollectionHyperlinkCellSearch(searchDeviceCollection);
        navigation.typeInSearchFilter(searchDsn);
        devicesPage.verifyDeviceSearch(searchDsn);
    },500000);
});