describe("Verify Spanish translations on the Google Analytics Reports page -----> ", function () {

    var loginPage = require('../../../pages/login.page');
    var navigation = require('../../../pages/navigation.page');
    var gAnalyticsPage = require('../../../pages/googleAnalytics.page');
    var validationUtil = require('../../../utilities/validation.util');
    var translation = require('../../../json/kenmex');
    var spanishOemAdmin = browser.params.testuseremails.kenmexpaccaradmin;
    var password = browser.params.adduser.password;

    browser.driver.manage().window().maximize();

    beforeEach(() => {
        browser.driver.get("about:blank");
        browser.sleep(1000);
        loginPage.get();
        loginPage.login('paccar', spanishOemAdmin, password);
    });

    afterEach(() => {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it('TC-2234 Validate Spanish translation on the role drop-down', () => {
        navigation.googleAnalyticsLink.click();
        gAnalyticsPage.allRolesDropDown.click();
        navigation.waitTillElementToBeClickable(gAnalyticsPage.allRolesDropDownList.last());
        gAnalyticsPage.allRolesDropDownList.getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                translation.roles.dealerAdministrator,
                translation.roles.dealerPowerUser,
                translation.roles.dealerServiceTechnician,
                translation.roles.factoryWorker,
                translation.roles.oemAdministrator,
                translation.roles.oemPowerUser,
                translation.roles.oemUser,
                translation.roles.customerService,
                translation.roles.customerAdministrator,
                translation.roles.customerUser,
                translation.roles.dealerOwnerAdmin,
                translation.roles.dealerOwnerUser,
                translation.roles.dealerRegionAdmin,
                translation.roles.dealerRegionUser,
            ])
        });
    });
});