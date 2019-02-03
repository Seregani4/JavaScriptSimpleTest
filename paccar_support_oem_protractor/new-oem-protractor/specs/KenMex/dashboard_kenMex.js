/**
 * Created by Popazov on 11/8/2017.
 */

describe("Verify Spanish translations on the dashboard -----> ", function () {

    var loginPage = require('../../../pages/login.page');
    var navigation = require('../../../pages/navigation.page');
    var kenMexUtil = require('../../../utilities/kenMex.util');
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
        browser.executeScript('window.localStorage.clear();');
    });

    it("Validate translations on the Dashboard Page", () => {
        kenMexUtil.validateDashboardPage(translation);
    });

    it("Validate translations on User Menu Pages", () => {
        kenMexUtil.validateUserActionMenu(translation);
        navigation.clickUserMenu('paccar');
        navigation.clickPrivacyAndTermsLink();
        kenMexUtil.validatePrivacyAndTermsPage(translation);
        navigation.clickUserMenu('paccar');
        navigation.clickHelpLink();
        kenMexUtil.validateHelpPage(translation)
    });

    it("Validate translations on Left Menu PVP-5515 ", () => {
        kenMexUtil.validateLeftMenu(translation);
    });
});