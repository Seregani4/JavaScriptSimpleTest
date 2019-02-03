/**
 * Created by jelliott on 9/8/2016.
 */
describe("Add all Devices to a Device Collection Validation----- ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var deviceCollectionsPage = require('../../../pages/device.collections.page.js');
    var devicesPage = require('../../../pages/devices.page.js');
    var tableUtil = require('../../../utilities/tables.util');
    var licenseColumn = devicesPage.columns.licenseColumn;
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;
    var deviceCollectionName = 'aaaaabAutomationDeleteTest';
    var deviceCollectionDescriptions = 'aaaaabAutomationDeleteTest is Marked for Deletion.DO NOT TOUCH';
    var devicesCount = 0;

    browser.driver.manage().window().maximize();

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("As a PeopleNet Admin,Add all Devices to Device Collection", function () {
        loginPage.get();
        loginPage.login('supportal', peoplenetAdminEmail, password);
        navigation.deviceManagementButton.click();
        navigation.clickDevicesLink();
        devicesPage.verifyDeviceListTableDataIsVisible();
        navigation.typeInSearchFilter('License: PFM(Exclusive)');
        tableUtil.verifyColumn('PFM', licenseColumn);
        devicesPage.allDevicesCheckBox.click();
        expect(navigation.actionBar.isDisplayed()).toBe(true);
        expect(devicesPage.devicesCheckboxSelected.count()).toBe(51); //Since the default rows per page was changed to 50.
        navigation.actionBarMoreOptionsButton.click();
        devicesPage.addSelectedToCollectionButton.click();
        devicesPage.fillOutNewCollectionFields(deviceCollectionName, deviceCollectionDescriptions);
        navigation.clickDeviceCollectionsLink();
        deviceCollectionsPage.verifyDeviceCollectionsTableDataIsVisible();
        navigation.typeInSearchFilter(deviceCollectionName);
        devicesCount = deviceCollectionsPage.allDeviceCollectionsRows.get(0).$$('td').get(4).getText();
        expect(devicesCount).toBe('50', "The Number of Devices on Device Collection Page Does not Match the Devices added to this Collection");
    }, 800000);

    it("Clean up  Device Collection", function () {
        loginPage.get();
        loginPage.login('supportal', peoplenetAdminEmail, password);
        navigation.deviceManagementButton.click();
        navigation.clickDeviceCollectionsLink();
        navigation.typeInSearchFilter(deviceCollectionName);
        deviceCollectionsPage.clickDeviceCollectionCheckbox(deviceCollectionName);
        navigation.actionBarMoreOptionsButton.click();
        deviceCollectionsPage.deleteButton.click();
        deviceCollectionsPage.deleteDeviceCollectionDialog.click();
        navigation.chipFilterCloseBtn.click();
        navigation.typeInSearchFilter(deviceCollectionName);
        deviceCollectionsPage.verifyRemovedDeviceCollectionSearch(deviceCollectionName);
    });
});
