/**
 * Created by pshrestha on 3/3/2017.
 */

describe("Adding a new Dealer Owner Group Negative -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var dealerOwnerGroupPage = require('../../../pages/dealerOwnerGroup.page.js');
    var dealerOwnerAdmin = browser.params.testuseremails.dealerowneradmin;
    var dealerOwnerUser = browser.params.testuseremails.dealerowneruser;
    var dealerRegionAdmin = browser.params.testuseremails.dealerregionadmin;
    var dealerRegionUser = browser.params.testuseremails.dealerregionuser;
    var dealerOwnerGroupName = browser.params.testdealerOwnerGroup.name;
    var password = browser.params.adduser.password;

    browser.driver.manage().window().maximize();

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    var loginUserArray = [dealerOwnerAdmin, dealerRegionAdmin];

    loginUserArray.filter(function (eachUser) {
        it("Verify DOA cannot add DOG and locations to a DOG ", function () {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            navigation.clickDealerOwnerGroupsLink();
            expect(dealerOwnerGroupPage.addGroupBtn.isPresent()).toBe(false, 'Add Group button present for ' + eachUser);
            dealerOwnerGroupPage.verifyDealerOwnerGroupListTableDataIsVisible();
            navigation.typeInSearchFilter(dealerOwnerGroupName);
            expect(dealerOwnerGroupPage.deleteGroupBtn.isPresent()).toBe(false, 'Delete Group button present for ' + eachUser);
            dealerOwnerGroupPage.clickDealerGroupHyperlinkCellSearch(dealerOwnerGroupName);
            expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/dealerOwnerGroup/details/peoplenet:dealerowner:', 'Clicking on the DOG name did not work');
            dealerOwnerGroupPage.verifyHeadingName();
            expect(dealerOwnerGroupPage.editGroupBtn.isDisplayed()).toBe(false, 'Edit group button is present for ' + eachUser);
            dealerOwnerGroupPage.verifyGroupInfo();
            dealerOwnerGroupPage.locationTab.click();
            expect(dealerOwnerGroupPage.locationsTabHeading.isDisplayed()).toBe(true, 'Locations Heading is missing.');
            expect(dealerOwnerGroupPage.addLocationBtn.isPresent()).toBe(false, 'Add Location button is present.');
            dealerOwnerGroupPage.regionsTab.click();
            //regionsTabHeading  display: contents; Element not displayed for WebDriver. Use isPresent() for  validation
            expect(dealerOwnerGroupPage.regionsTabHeading.isPresent()).toBe(true, 'Regions Heading is missing.');
            if (eachUser === dealerOwnerAdmin) {
                expect(dealerOwnerGroupPage.editRegionBtn.isDisplayed()).toBe(true, 'Edit Region button is missing.');
                expect(dealerOwnerGroupPage.viewLocationBtn.isDisplayed()).toBe(true, 'View Location button is missing.');
                expect(dealerOwnerGroupPage.addRegionBtn.isDisplayed()).toBe(true, 'Add Region button is missing.');
            }
            else if (eachUser === dealerRegionAdmin) {
                expect(dealerOwnerGroupPage.viewLocationBtn.isDisplayed()).toBe(true, 'View Location button is missing.');
            }
        });
    });

    var loginUserArrayOne = [dealerOwnerUser, dealerRegionUser];

    loginUserArrayOne.filter(function (eachUser) {
        it("Verify DOA cannot add DOG and locations to a DOG ", function () {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            navigation.clickDealerOwnerGroupsLink();
            expect(dealerOwnerGroupPage.addGroupBtn.isPresent()).toBe(false, 'Add Group button present for ' + eachUser);
            dealerOwnerGroupPage.verifyDealerOwnerGroupListTableDataIsVisible();
            navigation.typeInSearchFilter(dealerOwnerGroupName);
            expect(dealerOwnerGroupPage.deleteGroupBtn.isPresent()).toBe(false, 'Delete Group button present for ' + eachUser);
            dealerOwnerGroupPage.clickDealerGroupHyperlinkCellSearch(dealerOwnerGroupName);
            expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/dealerOwnerGroup/details/peoplenet:dealerowner:', 'Clicking on the DOG name did not work');
            dealerOwnerGroupPage.verifyHeadingName();
            expect(dealerOwnerGroupPage.editGroupBtn.isDisplayed()).toBe(false, 'Edit group button is present for ' + eachUser);
            dealerOwnerGroupPage.verifyGroupInfo();
            dealerOwnerGroupPage.locationTab.click();
            expect(dealerOwnerGroupPage.locationsTabHeading.isDisplayed()).toBe(true, 'Locations Heading is Missing.');
            dealerOwnerGroupPage.regionsTab.click();
            expect(dealerOwnerGroupPage.regionsTabHeading.isPresent()).toBe(true, 'Regions Heading is Missing.');
            expect(dealerOwnerGroupPage.editRegionBtn.isPresent()).toBe(false, 'Edit Region button is present.');
            expect(dealerOwnerGroupPage.viewLocationBtn.isPresent()).toBe(true, 'View Location button is present.');
        });
    });
});
