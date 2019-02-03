/**
 * Created by Popazov on 12/11/2017.
 */

describe("Verify Spanish translations on the Dealer Owner Group  pages -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var dealers = require('../../../pages/dealers.page.js');
    var dealerOwnerGroup = require('../../../pages/dealerOwnerGroup.page');
    var kenMexUtil = require('../../../utilities/kenMex.util.js');
    var dOGName = browser.params.testdealerOwnerGroup.name;
    var translation = require('../../../json/kenmex.json');
    var spanishOemAdmin = browser.params.testuseremails.kenmexpaccaradmin;
    var password = browser.params.adduser.password;

    browser.driver.manage().window().maximize();

    beforeEach(() => {
        // Get a fresh Angular "session" so we can avoid bootstrapping errors
        browser.driver.get("about:blank");
        browser.sleep(1000);
        loginPage.get();
        loginPage.login('paccar', spanishOemAdmin, password);
    });

    afterEach(() => {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("Validate translations on the Dealers Owner Group List Page", function () {
        navigation.dealerOwnerGroupsLink.click();
        kenMexUtil.validateDOGListPage(translation);
        dealerOwnerGroup.deleteGroupBtn.click();
        kenMexUtil.dOGListDeletePopUpValidation(translation);
        navigation.cancelDialogButton.click()
    });

    it("Validate translations on the Create Dealers Owner Group Page", function () {
        navigation.dealerOwnerGroupsLink.click();
        dealerOwnerGroup.addGroupBtn.click();
        kenMexUtil.validateCreateDealerOwnerGroupPage(translation);
    });

    it("Validate translations on the  Dealers Owner Group Detail Page", function () {
        navigation.dealerOwnerGroupsLink.click();
        navigation.typeInSearchFilterRecommendation(dOGName);
        dealerOwnerGroup.clickDealerGroupHyperlinkCellSearch(dOGName);
        kenMexUtil.validateDOGDetailPage(translation, dOGName)
    });
});
