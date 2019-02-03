/**
 * Created by jelliott on 9/15/2016.
 */
describe("Verifying Software Version History Page ----- ", function(){

    var loginPage = require('../../../pages/login.page.js');
    var devicesPage = require('../../../pages/devices.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var deviceDetailsPage = require('../../../pages/device.details.page.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;
    var deviceName='25';
    var stringType ='Device(s)';
    browser.driver.manage().window().maximize();

    afterEach(function() {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("As a PeopleNetAdmin,Global Search Dsn and go to Software Version History Page", function(){
        loginPage.get();
        loginPage.login('supportal', peoplenetAdminEmail, password);
        navigation.clickThisGlobalSearchResult(deviceName,stringType);
        devicesPage.clickDeviceHyperlinkCellSearch(deviceName);
        deviceDetailsPage.softwareVersionHistoryButton.click();
        expect(browser.getCurrentUrl()).toBe(browser.params.environment.url + '/#/nav/event/deviceSoftware/'+deviceName);
         });
});