/**
 * Created by jelliott on 9/14/2016.
 */
describe("Verifying PMG Versions ----- ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var devicesPage = require('../../../pages/devices.page.js');
    var pmgVersionsPage = require('../../../pages/pmg.versions.page.js');
    var pmgVerColumn= devicesPage.columns.pmgVerColumn;
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;
    browser.driver.manage().window().maximize();

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("As a PeopleNetAdmin,When clicking on PMG versions, it should bring you to the devices page with the version you click on", function () {
        loginPage.get();
        loginPage.login('supportal', peoplenetAdminEmail, password);
        navigation.clickReportsButton();
        navigation.clickPMGVersionLink();
        pmgVersionsPage.verifyPMGVersionsData();
        pmgVersionsPage.searchOEM("Paccar");

        //Get total count and validate percentage
        pmgVersionsPage.getTotalVersionCountAndValidatePercentage();
        pmgVersionsPage.informationIconButtons.count().then(function (rowCount) {
            expect(rowCount).toBeGreaterThan(0, 'There was no Versions data to be found');
            for (i = 0; i < rowCount; i++) {
                expect(browser.getCurrentUrl()).toBe(browser.params.environment.url + '/#/nav/reports/device-pmg-versions/paccar');
                var count = pmgVersionsPage.softwareVerisonCount.get(i).getText();//Get Text From the PMG Version Screen
                var pmgVersion = pmgVersionsPage.softwareVersion.get(i).getText();
                pmgVersionsPage.informationIconButtons.get(i).click();
                var deviceCount = devicesPage.allDeviceRows.count();//TODO Get Count of Devices from the Device List Screen
                expect(count).toContain(deviceCount);
                devicesPage.verifyVersionFromPmgVersionPage(pmgVersion,pmgVerColumn);
                //devicesPage.verifyColumn(pmgVersion,pmgVerColumn); Need to switch to this method after find out how to edit pmgVersion
                browser.navigate().back();
            }
        });

    });
});