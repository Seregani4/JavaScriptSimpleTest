
describe('UI validation for OTA Subscription list page', function () {
    var navigation = require('../../../pages/navigation.page.js');
    var loginPage = require('../../../pages/login.page.js');
    var otaUtilities = require('../../../utilities/otaSubscription.util.js');
    var translation = require('../../../json/otaSubscription.json');
    var spanishUser = browser.params.testuseremails.spanishUser;
    var password = browser.params.adduser.password;
    var envURL = browser.params.environment.url;
    browser.driver.manage().window().maximize();

    beforeEach(function () {
        // Get a fresh Angular "session" so we can avoid bootstrapping errors
        browser.driver.get("about:blank");
        browser.sleep(1000);
        loginPage.get();
        loginPage.login('paccar', spanishUser, password);
        navigation.otaSubscriptionLink.click();
        expect(browser.getCurrentUrl())
            .toContain(envURL + '/#/nav/otaSubscription/list/', 'Error: Got kicked out to dashboard page.');
    });

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it('TC-2520 Validate Spanish translations on the OTA Subscription list page', function () {
        otaUtilities.validateOTAListPage(translation)
    });
});
