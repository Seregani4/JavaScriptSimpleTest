/**
 * Created by pshrestha on 3/3/2017.
 */

describe("Adding a new Dealer Owner Group -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var dealerOwnerGroupPage = require('../../../pages/dealerOwnerGroup.page.js');
    var DOAEmail = browser.params.testuseremails.dealerowneradmin;
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var testDOGName = '000testDOG';
    var password = browser.params.adduser.password;

    browser.driver.manage().window().maximize();

    beforeEach(function () {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.clickDealerOwnerGroupsLink();
    });

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("test the cancel button functionality", function () {

        dealerOwnerGroupPage.verifyDealerOwnerGroupListTableDataIsVisible();
        dealerOwnerGroupPage.addGroupBtn.click();
        dealerOwnerGroupPage.deleteBtn.click();
        expect(browser.getCurrentUrl()).toBe(browser.params.environment.url + '/#/nav/dealerOwnerGroup/list/', 'The CANCEL button didnt work');
    });

    it("Paccar admin adds a new DOG", function () {

        dealerOwnerGroupPage.addGroupBtn.click();
        //add a test DOG
        dealerOwnerGroupPage.nameField.sendKeys(testDOGName);
        dealerOwnerGroupPage.descriptionField.sendKeys('testDescription');
        dealerOwnerGroupPage.saveBtn.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/dealerOwnerGroup/details/peoplenet:dealerowner:', 'The SAVE button didnt work');
        navigation.clickDealerOwnerGroupsLink();
        navigation.typeInSearchFilter(testDOGName);
        dealerOwnerGroupPage.verifyAddedDog(testDOGName);
    });

    it("Paccar admin validate the search field and add/cancel buttons on location and region tabs", function () {
        navigation.typeInSearchFilter('000testDOG');
        //location tab
        dealerOwnerGroupPage.clickDealerGroupHyperlinkCellSearch(testDOGName);
        dealerOwnerGroupPage.locationTab.click();
        dealerOwnerGroupPage.verifyAddLocButtons();
        //region tab
        dealerOwnerGroupPage.regionsTab.click();
        dealerOwnerGroupPage.verifyAddRegionButtons();
    });

    it("Paccar Admin checks and deletes test DOG", function () {
        navigation.typeInSearchFilter(testDOGName);
        //Test cancel button
        dealerOwnerGroupPage.deleteGroupBtn.click();
        dealerOwnerGroupPage.cancelActionButton.click();
        //test delete testDOG functionality
        dealerOwnerGroupPage.deleteGroupBtn.click();
        dealerOwnerGroupPage.deleteActionButton.click();
        navigation.clickDashboardLink();
        navigation.clickDealerOwnerGroupsLink();
        navigation.typeInSearchFilter(testDOGName);
        browser.sleep(1000); //this sleep is needed for the DB to update the delete
        dealerOwnerGroupPage.checkForDeletedDOG(testDOGName);
    });
});
