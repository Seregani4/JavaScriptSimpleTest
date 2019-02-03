/**
 * Created by jelliott on 10/21/2016.
 */

describe("Ui Validation on Applications Page ----- ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var applicationsPage = require('../../../pages/applications.page.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var superAdmin = 'superadmin-automation@test.com';
    var password = 'Password$2';
    var applicationName = 'Caterpillar';
    browser.driver.manage().window().maximize();

    beforeEach(function () {
        loginPage.get();
        //Only super admin can see the Application Link.
        loginPage.login('supportal', superAdmin, password);
        navigation.clientDataButton.click();
        navigation.clickApplicationsLink();
        applicationsPage.verifyApplicationsData();
    });

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("Validate the All Buttons on Applications List Page", function () {
        //expect(navigation.densityToggleBtn.isDisplayed()).toBe(true,' Density Toggle Button is not Displayed');
        expect(navigation.clearAllFiltersButton.isDisplayed()).toBe(true,'Clear all filters Button is Not Displayed');
        expect(applicationsPage.addApplicationButton.isDisplayed()).toBe(true, 'Add Dealer Button is Not Displayed');
        applicationsPage.addApplicationButton.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/application/add');
        browser.navigate().back();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/application/list/');

    });

    it("Validate the Action Bar and Action Buttons is Displayed on Applications List Page", function () {
        applicationsPage.allApplicationsRows.get(0).$$('md-checkbox').get(0).click();
        //browser.sleep(1000);
        expect(navigation.actionBar.isDisplayed()).toBe(true, 'Action Bar is Not Displayed');
        expect(applicationsPage.editActionButton.isDisplayed()).toBe(true, 'Edit Action Button is Not Displayed');
        expect(applicationsPage.deleteActionButton.isDisplayed()).toBe(true, 'Delete Action Button is Not Displayed');
    });

    it("Validate the Action Bar and Action Buttons is Displayed on application List Page", function () {
        navigation.typeInSearchFilter(applicationName);
        applicationsPage.clickApplicationCheckbox(applicationName);
        expect(navigation.actionBar.isDisplayed()).toBe(true, 'Action Bar is Not Displayed');
        expect(applicationsPage.editActionButton.isDisplayed()).toBe(true, 'Edit Action Button is Not Displayed');
        expect(applicationsPage.deleteActionButton.isDisplayed()).toBe(true, 'Delete Action Button is Not Displayed');
    });

    it("Validate the (Last Page And First Page)Pagination application List Page for High Page Density", function () {
        //High (Default) Density
        navigation.lastPageButton.click();
        //expect(applicationsPage.lastPageButton.isEnabled()).toBe(false);
        //expect(applicationsPage.nextPageButton.isEnabled()).toBe(false);
        expect(navigation.lastPageButton.getAttribute('disabled')).toBe('true');
        expect(navigation.nextPageButton.getAttribute('aria-hidden')).toBe('true');
        navigation.firstPageButton.click();
        expect(navigation.firstPageButton.getAttribute('disabled')).toBe('true');
        expect(navigation.previousPageButton.getAttribute('aria-hidden')).toBe('true');
        //expect(applicationsPage.firstPageButton.isEnabled()).toBe(false);
        //expect(applicationsPage.previousPageButton.isEnabled()).toBe(false);
    });


    it("Validate the(Next Page and Previous Page) Pagination on the application List Page for High Page Density", function () {
        //High (Default) Density
        navigation.nextPageButton.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/application/list/');
        navigation.previousPageButton.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/application/list/');
    });


    it("Validate the Rows on the application List Page for High Page Density", function () {
        //High (Default) Density
        navigation.pageSizeButton.click();
        navigation.pageFiftyButton.click();
        applicationsPage.checkForPageCount(50);
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/application/list/');

        navigation.pageSizeButton.click();
        navigation.pageTenButton.click();
        applicationsPage.checkForPageCount(10);
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/application/list/');

        navigation.pageSizeButton.click();
        navigation.pageTwentyFiveButton.click();
        applicationsPage.checkForPageCount(25);
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/application/list/');

    });

});