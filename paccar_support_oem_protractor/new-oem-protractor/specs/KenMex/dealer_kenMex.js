/**
 * Created by Popazov on 11/30/2017.
 */
describe("Verify Spanish translations on the Dealer page -----> ", function () {
    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var dealers = require('../../../pages/dealers.page.js');
    var kenMexUtil = require('../../../utilities/kenMex.util.js');
    var translation = require('../../../json/kenmex.json');
    var spanishOemAdmin = browser.params.testuseremails.kenmexpaccaradmin;
    var password = browser.params.adduser.password;
    var dealersCode = browser.params.testdealer.code;
    var dealersName = browser.params.testdealer.name;

    browser.driver.manage().window().maximize();

    beforeEach(function () {
        // Get a fresh Angular "session" so we can avoid bootstrapping errors
        browser.driver.get("about:blank");
        browser.sleep(1000);
        loginPage.get();
        loginPage.login('paccar', spanishOemAdmin, password);
    });

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("Validate translations on the Dealers / Service Centers List Page", function () {
        navigation.dealersLink.click();
        kenMexUtil.validateDealersListPage(translation);
    });

    it("Validate translations on the Dealers detail/Edit Page", function () {
        navigation.dealersLink.click();
        navigation.typeInSearchFilter(dealersCode);
        dealers.clickDealerHyperlinkCellSearch(dealersCode);
        kenMexUtil.validateDealerDetailPage(translation, dealersCode, dealersName);
        browser.navigate().back();
        navigation.checkRowInTable(1);
        navigation.editActionButton.click();
        kenMexUtil.validateDealerEditPage(translation);
    });
});

