/**
 * Created by jelliott on 11/14/2016.
 */

describe("User List Page UI Validation -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var userPage = require('../../../pages/users.page.js');
    var validationUtil = require('../../../utilities/validation.util');
    var chipFilterSuggestionArray = ['None', 'Customers', 'Dealers', 'Users', 'Dealer Owner Groups', 'Dealer Regions'];
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var password = browser.params.adduser.password;
    var userEmail = browser.params.testuseremails.paccaruser;
    var maxRowNumber = 10000;

    browser.driver.manage().window().maximize();

    beforeEach(function () {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.clickUsersLink();
        userPage.verifyUserListTableDataIsVisible();
    });

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("Validate the All Buttons on User List Page", function () {
        //High (Default) Density
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/user/list/');
        expect(navigation.clearAllFiltersButton.isDisplayed()).toBe(true, 'Clear all filters Button is Not Displayed');
        expect(userPage.addUserButton.isDisplayed()).toBe(true, 'Add User Button is Not Displayed');
        userPage.verifySortingColumns();
        validationUtil.validateChipFilterDropDowns();
        validationUtil.validateActionList(navigation.chipFilterDropDownButton, navigation.chipFilterDropDown, navigation.chipFilterDropDown.get(0), chipFilterSuggestionArray);
    });

    it("Validate the Action Bar and Action Buttons is Displayed on User List Page", function () {
        navigation.typeInSearchFilter(userEmail);
        userPage.clickUserCheckbox(userEmail);
        expect(navigation.actionBar.isDisplayed()).toBe(true, 'Action Bar is Not Displayed');
        expect(navigation.editActionButton.isDisplayed()).toBe(true, 'Edit Action Button is Not Displayed');
        expect(userPage.viewDetailsActionButton.isDisplayed()).toBe(true, 'View Details Action Button is Not Displayed');
        expect(userPage.deleteActionButton.isDisplayed()).toBe(true, 'Delete Action Button is Not Displayed');
    });

    it('Validate the BreadCrumbs on the User Details Page', function () {
        navigation.typeInSearchFilterRecommendation(userEmail);
        userPage.clickUserEmailHyperLinkCellSearch(userEmail);
        navigation.validateBreadCrumbs(['Dashboard', 'Users', 'User Details']);
        navigation.breadCrumbs.$$('a').get(1).click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/user/list/?user=');

    });

    it("Validate the (Last Page And First Page)Pagination User List Page", function () {
        navigation.getRowsPerPageNumber().then(function (number) {
            if (number !== maxRowNumber) {
                navigation.lastPageButton.click();
                expect(navigation.lastPageButton.getAttribute('disabled')).toBe('true');
                expect(navigation.nextPageButton.getAttribute('aria-hidden')).toBe('true');
                navigation.firstPageButton.click();
                expect(navigation.firstPageButton.getAttribute('disabled')).toBe('true');
                expect(navigation.previousPageButton.getAttribute('aria-hidden')).toBe('true');
            } else {
                validationUtil.validateMaxResultReachedMessage();
            }
        });
    });

    it("Validate the(Next Page and Previous Page) Pagination on the User List Page", function () {
        //High (Default) Density
        navigation.nextPageButton.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/user/list/?page=' + 1);
        navigation.previousPageButton.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/user/list/?page=' + 0);
    });

    it("Validate the Rows on the User List Page", function () {
        //High (Default) Density
        navigation.pageSizeButton.click();
        navigation.pageFiftyButton.click();
        userPage.checkForPageCount(50);
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/user/list/?page=0&pageSize=' + 50);

        navigation.pageSizeButton.click();
        navigation.pageTenButton.click();
        userPage.checkForPageCount(10);
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/user/list/?page=0&pageSize=' + 10);

        navigation.pageSizeButton.click();
        navigation.pageTwentyFiveButton.click();
        userPage.checkForPageCount(25);
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/user/list/?page=0&pageSize=' + 25);
    });
});