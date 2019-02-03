/**
 * Created by jelliott on 10/20/2016.
 */

describe("Dealer List Page UI Validation -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var dealerPage = require('../../../pages/dealers.page.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;
    var dealerName = browser.params.testdealer.name;
    var dealerCode = browser.params.testdealer.code;
    var validationUtil = require('../../../utilities/validation.util');
    var chipFilterSuggestionArray = ['None', 'Dealers', 'Dealer Owner Groups'];

    browser.driver.manage().window().maximize();

    beforeEach(function () {
        loginPage.get();
        loginPage.login('paccar', peoplenetAdminEmail, password);

        navigation.clickDealersLink();
        dealerPage.verifyDealerListTableDataIsVisible();
    });

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("Validate the All Buttons on Dealer List Page", function () {
        //High (Default) Density
        //expect(navigation.searchFilterButton.isDisplayed()).toBe(true,'Search Filter Button is Not Displayed');
        //expect(navigation.densityToggleBtn.isDisplayed()).toBe(true,'Density Toggle Button is Not Displayed');
        expect(navigation.moreOptionsButton.isDisplayed()).toBe(true, 'More Options Button is Not Displayed');
        validationUtil.validateChipFilterDropDowns();
        validationUtil.validateActionList(navigation.chipFilterDropDownButton, navigation.chipFilterDropDown, navigation.chipFilterDropDown.get(0), chipFilterSuggestionArray);
    });

    it("Validate the Action Bar and Action Buttons is Displayed on Dealer List Page", function () {
        navigation.typeInSearchFilter(dealerCode);
        dealerPage.clickDealerCheckbox(dealerCode);
        expect(navigation.actionBar.isDisplayed()).toBe(true, 'Action Bar is Not Displayed');
        expect(navigation.editActionButton.isDisplayed()).toBe(true, 'Edit Action Button is Not Displayed');
        expect(dealerPage.viewDetailsActionButton.isDisplayed()).toBe(true, 'View Details Action Button is Not Displayed');
        expect(dealerPage.deleteActionButton.isPresent()).toBe(false, 'Delete Action Button  Displayed');
    });

    it('Validate the BreadCrumbs on the Dealer Details Page', function () {
        navigation.typeInSearchFilterRecommendation(dealerCode);
        dealerPage.clickDealerHyperlinkCellSearch(dealerCode);
        navigation.validateBreadCrumbs(['Dashboard', 'Dealers', dealerName + ' ' + dealerCode]);

        navigation.breadCrumbs.$$('a').get(1).click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/dealer/list/?dealer=peoplenet:dealer:');
    });

    it("Validate the (Last Page And First Page)Pagination Dealer List Page", function () {
        //High (Default) Density
        navigation.lastPageButton.click();
        //expect(dealerPage.lastPageButton.isEnabled()).toBe(false);
        //expect(dealerPage.nextPageButton.isEnabled()).toBe(false);
        expect(navigation.lastPageButton.getAttribute('disabled')).toBe('true');
        expect(navigation.nextPageButton.getAttribute('aria-hidden')).toBe('true');
        navigation.firstPageButton.click();
        expect(navigation.firstPageButton.getAttribute('disabled')).toBe('true');
        expect(navigation.previousPageButton.getAttribute('aria-hidden')).toBe('true');
        //expect(dealerPage.firstPageButton.isEnabled()).toBe(false);
        //expect(dealerPage.previousPageButton.isEnabled()).toBe(false);
    });

    it("Validate the(Next Page and Previous Page) Pagination on the Dealer List Page", function () {
        //High (Default) Density
        navigation.nextPageButton.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/dealer/list/?page=' + 1);
        navigation.previousPageButton.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/dealer/list/?page=' + 0);
    });

    it("Validate the Rows on the Dealer List Page", function () {
        //High (Default) Density
        navigation.pageSizeButton.click();
        navigation.pageFiftyButton.click();
        dealerPage.checkForPageCount(50);
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/dealer/list/?page=0&pageSize=' + 50);

        navigation.pageSizeButton.click();
        navigation.pageTenButton.click();
        dealerPage.checkForPageCount(10);
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/dealer/list/?page=0&pageSize=' + 10);

        navigation.pageSizeButton.click();
        navigation.pageTwentyFiveButton.click();
        dealerPage.checkForPageCount(25);
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/dealer/list/?page=0&pageSize=' + 25);
    });
});