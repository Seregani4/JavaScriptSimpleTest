/**
 * Created by Popazov on 12/28/2017.
 */

describe("Verify Spanish translations on the Top 10 Faults page -----> ", function () {

    var loginPage = require('../../../pages/login.page');
    var navigation = require('../../../pages/navigation.page');
    var dealers = require('../../../pages/dealers.page');
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

    it('TC-493 Validate translations on the Top 10 Faults list Page', () => {
        navigation.topTenFaultsLink.click();
        kenMexUtil.validateTopTenFaultsListPage(translation);
        kenMexUtil.validateFiltersManagement(translation)
    });
});
