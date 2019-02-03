/**
 * Created by jelliott on 1/9/2017.
 */

describe("Roles Page UI Validation -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var rolesPage = require('../../../pages/roles.page.js');
    var superAdmin = 'superadmin-automation@test.com';
    var password = 'Password$2';
    var rolesName = 'Customer User';
    var permissionsNumber = 236;

    browser.driver.manage().window().maximize();

    beforeEach(function () {
        loginPage.get();
        loginPage.login('paccar', superAdmin, password);
        navigation.clickRolesLink();
    });

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("Validate the All Buttons on roles List Page for both High and Low Density", function () {
        //High (Default) Density
        rolesPage.verifyRoleListTableDataIsVisible();
        expect(navigation.clearAllFiltersButton.isDisplayed()).toBe(true, 'Clear all filters Button is Not Displayed');
        expect(navigation.moreOptionsButton.isDisplayed()).toBe(true, 'More Options Button is Not Displayed');
        expect(navigation.addActionButton.isDisplayed()).toBe(true, 'Add roles Button is Not Displayed');
        navigation.addActionButton.click();
        expect(browser.getCurrentUrl()).toBe(browser.params.environment.url + '/#/nav/role/add');
        browser.navigate().back();
        expect(browser.getCurrentUrl()).toBe(browser.params.environment.url + '/#/nav/role/list/');
        navigation.moreOptionsButton.click();
        element(by.partialButtonText('LOW')).click();
    });

    it("Validate the Action Bar and Action Buttons is Displayed on roles List Page", function () {
        navigation.typeInSearchFilter(rolesName);
        rolesPage.clickRoleCheckbox(rolesName);
        expect(navigation.actionBar.isDisplayed()).toBe(true, 'Action Bar is Not Displayed');
        expect(navigation.editActionButton.isDisplayed()).toBe(true, 'Edit Action Button is Not Displayed');
        expect(navigation.deleteActionButton.isDisplayed()).toBe(true, 'Delete Action Button is Not Displayed');
    });

    it('Validate the BreadCrumbs on the roles Details Page', function () {
        navigation.typeInSearchFilter(rolesName);
        rolesPage.clickRoleCheckbox(rolesName);
        navigation.editActionButton.click();
        navigation.validateBreadCrumbs(['Dashboard', 'Roles', 'Edit Role']);
        navigation.breadCrumbs.$$('a').get(1).click();
        expect(browser.getCurrentUrl()).toBe(browser.params.environment.url + '/#/nav/role/list/');
        navigation.addActionButton.click();
        navigation.validateBreadCrumbs(['Dashboard', 'Roles', 'Add Role']);
    });

    it('Validate the Number of Permissions on the Roles Edit Page', function () {
        navigation.typeInSearchFilter('Customer Administrator');
        rolesPage.clickRoleCheckbox('Customer Administrator');
        navigation.editActionButton.click();
        // Count the number of permissions
        var totalChecks = Promise.all([
            rolesPage.rolesCheckboxSelected.count(),
            rolesPage.rolesCheckboxUnselected.count()
        ]).then(function (arr) {
            return arr[0] + arr[1];
        });
        expect(totalChecks).not.toBeLessThan(permissionsNumber, 'Total Number of Permissions is incorrect.');
    });

    it("Validate the (Last Page And First Page)Pagination roles List Page", function () {
        //High (Default) Density
        navigation.lastPageButton.click();
        expect(navigation.lastPageButton.getAttribute('disabled')).toBe('true');
        expect(navigation.nextPageButton.getAttribute('aria-hidden')).toBe('true');
        navigation.firstPageButton.click();
        expect(navigation.firstPageButton.getAttribute('disabled')).toBe('true');
        expect(navigation.previousPageButton.getAttribute('aria-hidden')).toBe('true');
    });

    it("Validate the(Next Page and Previous Page) Pagination on the roles List Page", function () {
        //High (Default) Density
        navigation.nextPageButton.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/role/list/');
        navigation.previousPageButton.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/role/list/');
    });

    it("Validate the Rows on the roles List Page", function () {
        //High (Default) Density
        navigation.pageSizeButton.click();
        navigation.pageFiftyButton.click();
        rolesPage.checkForPageCount(50);
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/role/list/');

        navigation.pageSizeButton.click();
        navigation.pageTenButton.click();
        rolesPage.checkForPageCount(10);
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/role/list/');

        navigation.pageSizeButton.click();
        navigation.pageTwentyFiveButton.click();
        rolesPage.checkForPageCount(25);
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/role/list/');
    });
});
