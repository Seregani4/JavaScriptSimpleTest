/**
 * Created by jelliott on 9/13/2016.
 */
describe("Verifying Adding blank collection name results in error ----- ", function(){

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var deviceCollectionsPage = require('../../../pages/device.collections.page.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;

    browser.driver.manage().window().maximize();

    afterEach(function() {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("As a PeopleNet Admin,Create a Collection with a Blank Name", function(){
        loginPage.get();
        loginPage.login('supportal', peoplenetAdminEmail, password);
        navigation.deviceManagementButton.click();
        navigation.clickDeviceCollectionsLink();
        deviceCollectionsPage.verifyDeviceCollectionsTableDataIsVisible();
        navigation.moreOptionsButton.click();
        deviceCollectionsPage.createNewCollectionButton.click();
        deviceCollectionsPage.saveNewCollectionButton.click();
        expect(deviceCollectionsPage.nameIsRequiredErrorMessage.isPresent()).toBe(true);
      });
});