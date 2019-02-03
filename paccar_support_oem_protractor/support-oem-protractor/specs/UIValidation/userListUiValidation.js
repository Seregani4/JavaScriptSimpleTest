/**
 * Created by jelliott on 11/14/2016.
 */

describe("User List Page UI Validation----- : ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var userPage = require('../../../pages/users.page.js');
    var validationUtil = require('../../../utilities/validation.util.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;
    var userEmail = browser.params.testuseremails.paccaruser;
    var maxRowNumber = 10000;
    browser.driver.manage().window().maximize();

    beforeEach(function () {
        loginPage.get();
        loginPage.login('supportal', peoplenetAdminEmail, password);
        navigation.fleetHealthButton.click();
        navigation.clickUsersLink();
        userPage.verifyUserListTableDataIsVisible();
    });

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });
    it("Validate the All Buttons on User List Page for both High and Low Density", function () {
        //High (Default) Density
        expect(navigation.clearAllFiltersButton.isDisplayed()).toBe(true, 'Clear all filters Button is Not Displayed');
        //expect(navigation.densityToggleBtn.isDisplayed()).toBe(true,'Density Toggle Button is Not Displayed');
        expect(userPage.addUserButton.isDisplayed()).toBe(true, 'Add User Button is Not Displayed');
        //navigation.togglePageDensity('LOW');
        ////Low  Density
        //expect(navigation.searchFilterButton.isDisplayed()).toBe(true,'Search Filter Button is Not Displayed');
        //expect(navigation.densityToggleBtn.isDisplayed()).toBe(true,'Density Toggle Button is Not Displayed');
        //expect(userPage.addUserButton.isDisplayed()).toBe(true,'Add User Button is Not Displayed');
    });


    it("Validate the Action Bar and Action Buttons is Displayed on User List Page", function () {
        navigation.typeInSearchFilter(userEmail);
        userPage.clickUserCheckbox(userEmail);
        expect(navigation.actionBar.isDisplayed()).toBe(true, 'Action Bar is Not Displayed');
        expect(navigation.editActionButton.isDisplayed()).toBe(true, 'Edit Action Button is Not Displayed');
        expect(userPage.viewDetailsActionButton.isDisplayed()).toBe(true, 'View Details Action Button is Not Displayed');
        expect(userPage.deleteActionButton.isDisplayed()).toBe(true, 'Delete Action Button is Not Displayed');
    });

    it("Validate the (Last Page And First Page)Pagination User List Page for High Page Density", function () {
        navigation.getRowsPerPageNumber().then(function (number) {
            if(number <= maxRowNumber){
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

    //it("Validate the (Last Page And First Page)Pagination User List Page for Low Page Density", function(){
    //    navigation.togglePageDensity('LOW');
    //
    //    navigation.lastPageButton.click();
    //    //expect(userPage.lastPageButton.isEnabled()).toBe(false);
    //    //expect(userPage.nextPageButton.isEnabled()).toBe(false);
    //    expect(navigation.lastPageButton.getAttribute('disabled')).toBe('true');
    //    expect(navigation.nextPageButton.getAttribute('aria-hidden')).toBe('true');
    //    navigation.firstPageButton.click();
    //    expect(navigation.firstPageButton.getAttribute('disabled')).toBe('true');
    //    expect(navigation.previousPageButton.getAttribute('aria-hidden')).toBe('true');
    //});

    it("Validate the(Next Page and Previous Page) Pagination on the User List Page for High Page Density", function () {
        //High (Default) Density
        navigation.nextPageButton.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/user/list/?page=' + 1);
        navigation.previousPageButton.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/user/list/?page=' + 0);
    });

    //it("Validate the(Next Page and Previous Page) Pagination on the User List Page for Low Page Density", function(){
    //    navigation.togglePageDensity('LOW');
    //    //Low  Density
    //    navigation.nextPageButton.click();
    //    expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/user/list/?page='+1);
    //    navigation.previousPageButton.click();
    //    expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/user/list/?page='+0);
    //});

    it("Validate the Rows on the User List Page for High Page Density", function () {
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

    //it("Validate the Rows on the User List Page for Low Page Density", function(){
    //    navigation.togglePageDensity('LOW');
    //    //Low  Density
    //    navigation.pageSizeButton.click();
    //    navigation.pageSizeFiftyButton.click();
    //    userPage.checkForPageCount(50);
    //    expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/user/list/?page=0&pageSize='+50);
    //
    //    navigation.pageSizeButton.click();
    //    navigation.pageSizeTenButton.click();
    //    userPage.checkForPageCount(10);
    //    expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/user/list/?page=0&pageSize='+10);
    //
    //    navigation.pageSizeButton.click();
    //    navigation.pageSizeTwentyFiveButton.click();
    //    userPage.checkForPageCount(25);
    //    expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/user/list/?page=0&pageSize='+25);
    //});

});