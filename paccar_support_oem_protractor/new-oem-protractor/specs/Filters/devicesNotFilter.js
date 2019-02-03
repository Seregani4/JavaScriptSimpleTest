/**
 * Created by jelliott on 8/17/2016.
 */
/**
 * Edited by Pshrestha on 3/8/2017.
 */
describe("Verifying 'Not' Searches in Device List Page -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var devicesPage = require('../../../pages/devices.page.js');
    var userUtil = require('../../../utilities/user.util');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;

    browser.driver.manage().window().maximize();

    beforeEach(function () {
        loginPage.get();
        loginPage.login('paccar', peoplenetAdminEmail, password);
        navigation.clickDevicesLink();
    });

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("Validate !Type:Standard filter on Device List page.", function () {
        devicesPage.verifyDeviceListTableDataIsVisible();
        userUtil.validateDeviceFilter('!Type:Standard', 'PMG-Standard', 'no');
    });

    it("Validate !Type:OEM filter on Device List page.", function () {
        userUtil.validateDeviceFilter('!Type:OEM', 'PMG-OEM', 'no');
    });


    it("Validate !Type:Cat filter on Device List page.", function () {
        userUtil.validateDeviceFilter('!Type:Cat', 'PMG-Cat', 'no');
    });


    it("Validate !Type:MultiMode filter on Device List page.", function () {
        userUtil.validateDeviceFilter('!Type:MultiMode', 'MultiMode', 'no');
    });


    it("Validate !Type:Standard filter on Device List page.", function () {
        userUtil.validateDeviceFilter('!Type:Standard', 'PMG-Standard', 'no');
    });


    it("Validate !License: OEM(Exclusive) filter on Device List page.", function () {
        userUtil.validateDeviceFilter('!License: OEM(Exclusive)', 'OEM', 'no');
    });


    it("Validate !License: PFM(Exclusive) filter on Device List page.", function () {
        userUtil.validateDeviceFilter('!License: PFM(Exclusive)', 'PFM', 'no');
    });

    it("Validate !9.0.18 filter on Device List page.", function () {
        userUtil.validateDeviceFilter('!9.0.18', '9.0.18', 'no');
    }, 500000);
});