/**
 * Created by jelliott on 9/27/2016.
 */
describe("Otap Profile Page - Add/Edit/Delete----- ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var otapPage = require('../../../pages/otap.page.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;
    var otapProfileName = 'TestOtapAutomationProfile';
    var otapProfileEditedName = 'TestOtapAutomationProfileEdited';
    var otapProfileDescription = 'Do not Edit This OTAP Profile';


    browser.driver.manage().window().maximize();

    beforeEach(function () {
        loginPage.get();
        loginPage.login('supportal', peoplenetAdminEmail, password);
        navigation.deviceManagementButton.click();
        navigation.clickOTAPLink();
        otapPage.verifyOTAPRequestData();
        otapPage.OTAPProfiles.click();
        expect(otapPage.otapProfilesTable.isDisplayed()).toBe(true, 'The Profile List is missing');
    });

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });


    it("Verify adding an OTAP profile", function () {
        navigation.moreOptionsButton.click();
        otapPage.newProfileButton.click();
        otapPage.selectDsnOptionByNumber(0);
        otapPage.nameField.sendKeys(otapProfileName);
        otapPage.descriptionField.sendKeys(otapProfileDescription);
        otapPage.triggerTypeField.click();
        navigation.waitTillElementToBeClickable(otapPage.triggerTypeOptionsImmediate);
        otapPage.triggerTypeOptionsImmediate.click();
        expect(otapPage.newProfilePackageField.isDisplayed()).toBe(true, 'Package field is missing');
        otapPage.selectPackageOptionByNumber(0);
        otapPage.selectVersionOptionByNumber(0);
        otapPage.saveNewProfileButton.click();
        navigation.typeInSearchFilter(otapProfileName);
        otapPage.verifyNewOtapProfile(otapProfileName);
    });


    it("Verify Editing an OTAP profile", function () {
        navigation.typeInSearchFilter(otapProfileName);
        otapPage.verifyNewOtapProfile(otapProfileName);
        otapPage.clickOtapProfileCheckbox(otapProfileName);
        navigation.actionBarMoreOptionsButton.click();
        otapPage.editBtn.click();
        otapPage.nameField.clear();
        otapPage.nameField.sendKeys(otapProfileEditedName);
        otapPage.saveNewProfileButton.click();
        otapPage.clickOtapProfileCheckbox(otapProfileEditedName);
        navigation.clearAllFiltersButton.click();
        otapPage.OTAPProfiles.click();
        navigation.typeInSearchFilter(otapProfileEditedName);
        otapPage.verifyNewOtapProfile(otapProfileEditedName);
        browser.sleep(10000);//This sleep is needed because when a profile is Edited, the information is not updated fast enough before the next test
    });

    it("Verify Deleting an OTAP profile", function () {
        navigation.typeInSearchFilter(otapProfileEditedName);
        otapPage.clickOtapProfileCheckbox(otapProfileEditedName);
        navigation.actionBarMoreOptionsButton.click();
        otapPage.deleteBtn.click();
        navigation.deleteDialogButton.click();
        navigation.clearAllFiltersButton.click();
        otapPage.OTAPProfiles.click();
        navigation.typeInSearchFilter(otapProfileEditedName);
        otapPage.verifyDeletedOtapProfile(otapProfileEditedName);
    });


});