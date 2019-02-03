/**
 * Created by jelliott on 9/20/2016.
 */
/**
 * Modified by Pshrestha on 03/30/2017.
 */
describe("Export Data from Device List Page ----- ", function(){

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var devicesPage = require('../../../pages/devices.page.js');
    var deviceCollectionPage = require('../../../pages/device.collections.page.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var tsr1 = browser.params.testuseremails.tsr1;
    var tsr2 = browser.params.testuseremails.tsr2;
    var password = browser.params.adduser.password;
    var deviceCollectionName = browser.params.testCollection.name;
    var moment = require('moment');
    var currentDateTime = moment().add(5, 'H').format('YYYY-MM-DD HH');
    browser.driver.manage().window().maximize();

    afterEach(function() {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });
    var loginUserArray = [peoplenetAdminEmail, tsr1, tsr2];

    loginUserArray.filter(function (eachUser) {

        it("As a "+eachUser+", Verify Export CSV Button on Device List Page", function(){
            loginPage.get();
            loginPage.login('supportal', eachUser, password);
            navigation.deviceManagementButton.click();
            navigation.clickDevicesLink();
            expect(devicesPage.exportButton.isPresent()).toBe(true, 'Export button is missing.');
            devicesPage.exportButton.click();
            expect(devicesPage.checkForToastAlert()).toBe(true);

        });

        it("As a "+eachUser+", Verify Export CSV Button from a Device Collection NEED UPDATE AFTER PVP-2892", function(){
            loginPage.get();
            loginPage.login('supportal', eachUser, password);
            navigation.deviceManagementButton.click();
            navigation.clickDeviceCollectionsLink();
            navigation.typeInSearchFilter(deviceCollectionName);
            deviceCollectionPage.clickDeviceCollectionHyperlinkCellSearch(deviceCollectionName);
            expect(devicesPage.exportButton.isPresent()).toBe(true, 'Export button is missing.');
            devicesPage.exportButton.click();
            expect(devicesPage.checkForToastAlert()).toBe(true);

        });

    });

});