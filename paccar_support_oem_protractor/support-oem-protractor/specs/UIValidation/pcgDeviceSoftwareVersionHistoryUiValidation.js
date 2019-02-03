/**
 * Created by Popazov on 7/10/2017.
 */


describe("Ui validation of PCG Device Software Version History page -----", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var pcgDeviceSoftvareVersionPage = require('../../../pages/pcg.device.software.version.history.page.js');
    var dsn = browser.params.vehicle.dsn;
    //TODO add the valid dsn or remove table validation
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;
    browser.driver.manage().window().maximize();

    beforeEach(function () {
        loginPage.get();
        loginPage.login('supportal', peoplenetAdminEmail, password);
        navigation.reportsButton.click();
        navigation.clickPcgDeviceSoftwareVersionHistoryLink();
    });


    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("Validate PCG Device Software Page is display correct data ", function () {
        pcgDeviceSoftvareVersionPage.verifyPcgSoftwareVersionPageData();
        pcgDeviceSoftvareVersionPage.typeInDsnFilter(dsn);
        pcgDeviceSoftvareVersionPage.verifyPcgDeviceSoftwareVersionHeader();
        //TODO: Data not available until https://jira.trimble.tools/browse/PDNP-256 is DONE.
        //pcgDeviceSoftvareVersionPage.verifyIsDataInTablePresent();
    });

});