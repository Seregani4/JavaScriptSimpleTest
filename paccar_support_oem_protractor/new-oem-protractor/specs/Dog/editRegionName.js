/**
 * Created by pshrestha on 6/28/2017.
 */

describe("Edit Region name in a Dealer Owner Group -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page');
    var dealerOwnerGroupPage = require('../../../pages/dealerOwnerGroup.page');
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var dogName = browser.params.testdealerOwnerGroup.name;
    var password = browser.params.adduser.password;
    var regionName = 'EditNameRegion';
    var editRegionName = 'NewEditedNameRegion';
    browser.driver.manage().window().maximize();

    afterEach(function () {
        browser.executeScript('window.localStorage.clear();');
    });

    var loginUserArray = [paccarAdminEmail];
    loginUserArray.filter(eachUser => {

        beforeEach(() => {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            navigation.clickDealerOwnerGroupsLink();
            navigation.typeInSearchFilterRecommendation(dogName);
            dealerOwnerGroupPage.clickDealerGroupHyperlinkCellSearch(dogName);
            dealerOwnerGroupPage.regionsTab.click();
        });

        it(eachUser + " edits the region name", () => {
            dealerOwnerGroupPage.editRegionName(regionName, editRegionName);

            browser.sleep(2000); //This sleep is needed for the page to update with the changes.
            dealerOwnerGroupPage.verifyRegionName(editRegionName);
        });

        it(eachUser + " replaces the region name", () => {
            dealerOwnerGroupPage.editRegionName(editRegionName, regionName);

            browser.sleep(2000); //This sleep is needed for the page to update with the changes.
            dealerOwnerGroupPage.verifyRegionName(regionName);
        });
    });
});