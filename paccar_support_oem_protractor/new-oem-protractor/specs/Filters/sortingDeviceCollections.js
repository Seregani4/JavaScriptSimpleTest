/**
 * Created by jelliott on 8/23/2016.
 */

describe("Validate all clickable columns in Device Collection List Page can be sorted in ascending and descending order -----> ", function () {
    /*
     Verify by Column Header URL and NOT by actual table data
     */
    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var deviceCollectionsPage = require('../../../pages/device.collections.page.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;

    browser.driver.manage().window().maximize();

    beforeEach(function () {
        loginPage.get();
        loginPage.login('paccar', peoplenetAdminEmail, password);
        navigation.clickDeviceCollectionsLink();
        deviceCollectionsPage.verifyDeviceCollectionsTableDataIsVisible();
    });

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("Verify the Name Column Header Sort", function () {
        deviceCollectionsPage.nameColumnHeader.click();
        expect(browser.getCurrentUrl()).toBe(browser.params.environment.url + '/#/nav/deviceCollection/list/?page=0&pageSize=10&sort=-name.lc');
        deviceCollectionsPage.verifyDeviceCollectionsTableDataIsVisible();
    }, 500000);
});