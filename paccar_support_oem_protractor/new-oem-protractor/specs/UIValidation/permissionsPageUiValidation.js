/**
 * Created by jelliott on 1/9/2017.
 */

describe("Permissions Page UI Validation -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var permissionsPage = require('../../../pages/permissions.page.js');
    var superAdmin = 'superadmin-automation@test.com';
    var password = 'Password$2';
    var permissionsName = 'Application Create';

    browser.driver.manage().window().maximize();

    beforeEach(function () {
        loginPage.get();
        loginPage.login('paccar', superAdmin, password);
        navigation.clickPermissionsLink();
        permissionsPage.verifyPermissionListTableDataIsVisible();
    });

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("Validate the All Buttons on permissions List Page", function () {
        //High (Default) Density
        expect(navigation.clearAllFiltersButton.isDisplayed()).toBe(true, 'Clear all filters Button is Not Displayed');
        //expect(navigation.densityToggleBtn.isDisplayed()).toBe(true,'Density Toggle Button is Not Displayed');
        expect(navigation.moreOptionsButton.isDisplayed()).toBe(true, 'More Options Button is Not Displayed');
        //expect(navigation.refreshActionButton.isDisplayed()).toBe(true,'Refresh Button is Not Displayed');
        expect(navigation.addActionButton.isDisplayed()).toBe(true, 'Add permissions Button is Not Displayed');
        //browser.sleep(500);
        navigation.addActionButton.click();
        expect(browser.getCurrentUrl()).toBe(browser.params.environment.url + '/#/nav/permission/add');
        browser.navigate().back();
        expect(browser.getCurrentUrl()).toBe(browser.params.environment.url + '/#/nav/permission/list/');
        navigation.moreOptionsButton.click();
    });

    it("Validate the Action Bar and Action Buttons is Displayed on permissions List Page", function () {
        navigation.typeInSearchFilter(permissionsName);
        permissionsPage.clickPermissionCheckbox(permissionsName);
        expect(navigation.actionBar.isDisplayed()).toBe(true, 'Action Bar is Not Displayed');
        expect(navigation.editActionButton.isDisplayed()).toBe(true, 'Edit Action Button is Not Displayed');
        expect(navigation.deleteActionButton.isDisplayed()).toBe(true, 'Delete Action Button is Not Displayed');
    });

    it('Validate the BreadCrumbs on the permissions Details Page', function () {
        navigation.typeInSearchFilter(permissionsName);
        permissionsPage.clickPermissionCheckbox(permissionsName);
        navigation.editActionButton.click();
        navigation.validateBreadCrumbs(['Dashboard', 'Permissions', 'Edit Permission']);
        navigation.breadCrumbs.$$('a').get(1).click();
        expect(browser.getCurrentUrl()).toBe(browser.params.environment.url + '/#/nav/permission/list/');
        navigation.addActionButton.click();
        navigation.validateBreadCrumbs(['Dashboard', 'Permissions', 'Add Permission']);
    });

    it("Validate the (Last Page And First Page)Pagination permissions List Page", function () {
        //High (Default) Density
        navigation.lastPageButton.click();
        //expect(permissionsPage.lastPageButton.isEnabled()).toBe(false);
        //expect(permissionsPage.nextPageButton.isEnabled()).toBe(false);
        expect(navigation.lastPageButton.getAttribute('disabled')).toBe('true');
        expect(navigation.nextPageButton.getAttribute('aria-hidden')).toBe('true');
        navigation.firstPageButton.click();
        expect(navigation.firstPageButton.getAttribute('disabled')).toBe('true');
        expect(navigation.previousPageButton.getAttribute('aria-hidden')).toBe('true');
        //expect(permissionsPage.firstPageButton.isEnabled()).toBe(false);
        //expect(permissionsPage.previousPageButton.isEnabled()).toBe(false);
    });

    it("Validate the(Next Page and Previous Page) Pagination on the permissions List Page", function () {
        //High (Default) Density
        navigation.nextPageButton.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/permission/list/');
        navigation.previousPageButton.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/permission/list/');
    });

    it("Validate the Rows on the permissions List Page", function () {
        //High (Default) Density
        navigation.pageSizeButton.click();
        navigation.pageFiftyButton.click();
        permissionsPage.checkForPageCount(50);
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/permission/list/');

        navigation.pageSizeButton.click();
        navigation.pageTenButton.click();
        permissionsPage.checkForPageCount(10);
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/permission/list/');

        navigation.pageSizeButton.click();
        navigation.pageTwentyFiveButton.click();
        permissionsPage.checkForPageCount(25);
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/permission/list/');
    });
});

