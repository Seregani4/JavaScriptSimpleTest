/**
 * Created by pshrestha on 3/2/2017.
 */

describe("Dealer Owner Group List Page UI Validation -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var dealerOwnerGroupPage = require('../../../pages/dealerOwnerGroup.page.js');
    var password = browser.params.adduser.password;
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var dealerOwnerGroupName = browser.params.testdealerOwnerGroup.name;

    browser.driver.manage().window().maximize();

    beforeEach(function () {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);

        navigation.clickDealerOwnerGroupsLink();
        dealerOwnerGroupPage.verifyDealerOwnerGroupListTableDataIsVisible();
    });

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("Validate All Buttons on Dealer Owner Group List Page is displayed", function () {
        expect(dealerOwnerGroupPage.filterCloseButton.isDisplayed()).toBe(true, 'Search Filter Close Button is Not Displayed');
        expect(dealerOwnerGroupPage.refreshButton.isDisplayed()).toBe(true, 'Refresh Button is Not Displayed');
        expect(dealerOwnerGroupPage.addGroupBtn.isDisplayed()).toBe(true, 'Add Button is Not Displayed');
        expect(dealerOwnerGroupPage.deleteGroupBtn.isDisplayed()).toBe(true, 'Delete Group Button is Not Displayed');
    });

    it("Validate All fields are displayed on Dealer Group Detail Page", function () {
        navigation.typeInSearchFilter(dealerOwnerGroupName);
        dealerOwnerGroupPage.clickDealerGroupHyperlinkCellSearch(dealerOwnerGroupName);
        dealerOwnerGroupPage.verifyHeadingName();
        expect(dealerOwnerGroupPage.editGroupBtn.isPresent()).toBe(true, 'Edit Button is Not Displayed');
        dealerOwnerGroupPage.verifyGroupInfo();
        dealerOwnerGroupPage.locationTab.click();
        expect(dealerOwnerGroupPage.locationsTabHeading.isDisplayed()).toBe(true, 'Locations Heading is Missing.');
        expect(dealerOwnerGroupPage.addLocationBtn.isPresent()).toBe(true, 'Add Location button is missing.');
        dealerOwnerGroupPage.regionsTab.click();
        /*regionsTabHeading  display: contents; Element not displayed for WebDriver. Use isPresent for  validation
         and  innerHTML to validate text*/
        expect(dealerOwnerGroupPage.regionsTabHeading.isPresent()).toBe(true, 'Regions Heading is Missing.');
        expect(dealerOwnerGroupPage.regionsTabHeading.getAttribute('innerHTML')).toBe("Regions", 'Regions Heading is Missing.');
        expect(dealerOwnerGroupPage.editRegionBtn.isDisplayed()).toBe(true, 'Edit Region button is missing.');
        expect(dealerOwnerGroupPage.viewLocationBtn.isDisplayed()).toBe(true, 'View Location button is missing.');
        expect(dealerOwnerGroupPage.addRegionBtn.isDisplayed()).toBe(true, 'Add Region button is missing.');
    });

    it('Validate the BreadCrumbs on the Dealer Details Page', function () {
        navigation.typeInSearchFilterRecommendation(dealerOwnerGroupName);
        dealerOwnerGroupPage.clickDealerGroupHyperlinkCellSearch(dealerOwnerGroupName);
        navigation.validateBreadCrumbs(['Dashboard', 'Dealer Owner Groups', dealerOwnerGroupName]);

        navigation.breadCrumbs.$$('a').get(1).click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/dealerOwnerGroup/list/?dealerowner=peoplenet:dealerowner:');
    });

    it("Validate the (Last Page And First Page)Pagination Dealer Owner Group List Page", function () {
        navigation.lastPageButton.click();
        expect(navigation.lastPageButton.getAttribute('disabled')).toBe('true');
        expect(navigation.nextPageButton.getAttribute('aria-hidden')).toBe('true');
        navigation.firstPageButton.click();
        expect(navigation.firstPageButton.getAttribute('disabled')).toBe('true');
        expect(navigation.previousPageButton.getAttribute('aria-hidden')).toBe('true');
    });

    it("Validate the(Next Page and Previous Page) Pagination on the Dealer Owner Group List Page", function () {
        navigation.nextPageButton.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/dealerOwnerGroup/list/?page=' + 1);
        navigation.previousPageButton.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/dealerOwnerGroup/list/?page=' + 0);
    });

    it("Validate the number of Rows on the Dealer Owner Group List Page", function () {
        navigation.pageSizeButton.click();
        navigation.pageFiftyButton.click();
        dealerOwnerGroupPage.checkForPageCount(50);
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/dealerOwnerGroup/list/?page=0&pageSize=' + 50);

        navigation.pageSizeButton.click();
        navigation.pageTenButton.click();
        dealerOwnerGroupPage.checkForPageCount(10);
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/dealerOwnerGroup/list/?page=0&pageSize=' + 10);

        navigation.pageSizeButton.click();
        navigation.pageTwentyFiveButton.click();
        dealerOwnerGroupPage.checkForPageCount(25);
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/dealerOwnerGroup/list/?page=0&pageSize=' + 25);
    });
});
