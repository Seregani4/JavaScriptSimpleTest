/**
 * Created by jelliott on 9/7/2016.
 */
describe("Verifying OTAP Button Action for a Device Collection ----- ", function(){

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

    it("As a PeopleNet Admin,Verify OTAP Action Button is Present for a Device Collection", function(){
        loginPage.get();
        loginPage.login('supportal', peoplenetAdminEmail, password);
        navigation.deviceManagementButton.click();
        navigation.clickDeviceCollectionsLink();
        deviceCollectionsPage.verifyDeviceCollectionsTableDataIsVisible();
        navigation.typeInSearchFilter('forceCallAutomation');
        deviceCollectionsPage.clickDeviceCollectionCheckbox('forceCallAutomation');
        expect(navigation.actionBar.isDisplayed()).toBe(true);
        navigation.actionBarMoreOptionsButton.click();
        expect(deviceCollectionsPage.otapButton.isDisplayed()).toBe(true);
        deviceCollectionsPage.otapButton.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/otap/request//request/peoplenet:entitycollection:');


    });
});
