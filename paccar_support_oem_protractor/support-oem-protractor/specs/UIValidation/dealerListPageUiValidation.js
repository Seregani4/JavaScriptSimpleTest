/**
 * Created by jelliott on 10/20/2016.
 */

describe("Dealer List Page UI Validation Supportal----- : ", function() {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var dealerPage = require('../../../pages/dealers.page.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;
    var dealerNameID='B515';
    browser.driver.manage().window().maximize();

    beforeEach(function(){
        loginPage.get();
        loginPage.login('supportal', peoplenetAdminEmail, password);
        navigation.fleetHealthButton.click();
        navigation.clickDealersLink();
        dealerPage.verifyDealerListTableDataIsVisible();
    });

    afterEach(function() {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });
    it("Validate the All Buttons on Dealer List Page for both High and Low Density", function(){
        //High (Default) Density
        //expect(navigation.densityToggleBtn.isDisplayed()).toBe(true,'Density Toggle Button is Not Displayed');
        expect(navigation.clearAllFiltersButton.isDisplayed()).toBe(true,'Clear all filters Button is Not Displayed');
        expect(navigation.moreOptionsButton.isDisplayed()).toBe(true,'More Options Button is Not Displayed');
        //expect(navigation.refreshActionButton.isDisplayed()).toBe(true,'Refresh Button is Not Displayed');
        //navigation.togglePageDensity('LOW');
        ////Low  Density
        //expect(navigation.searchFilterButton.isDisplayed()).toBe(true,'Search Filter Button is Not Displayed');
        //expect(navigation.densityToggleBtn.isDisplayed()).toBe(true,'Density Toggle Button is Not Displayed');
        //expect(navigation.moreOptionsButton.isDisplayed()).toBe(true,'More Options Button is Not Displayed');
        //expect(navigation.refreshActionButton.isDisplayed()).toBe(true,'Refresh Button is Not Displayed');
    });


    it("Validate the Action Bar and Action Buttons is Displayed on Dealer List Page", function(){
        navigation.typeInSearchFilter(dealerNameID);
        dealerPage.clickDealerCheckbox(dealerNameID);
        expect(navigation.actionBar.isDisplayed()).toBe(true,'Action Bar is Not Displayed');
        expect(navigation.editActionButton.isDisplayed()).toBe(true,'Edit Action Button is Not Displayed');
        expect(dealerPage.viewDetailsActionButton.isDisplayed()).toBe(true,'View Details Action Button is Not Displayed');
        expect(dealerPage.deleteActionButton.isPresent()).toBe(false,'Delete Action Button  Displayed');
    });

    it("Validate the (Last Page And First Page)Pagination Dealer List Page for High Page Density", function(){
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


    it("Validate the(Next Page and Previous Page) Pagination on the Dealer List Page for High Page Density", function(){
        //High (Default) Density
        navigation.nextPageButton.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/dealer/list/?page='+1);
        navigation.previousPageButton.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/dealer/list/?page='+0);
    });


    it("Validate the Rows on the Dealer List Page for High Page Density", function(){
        //High (Default) Density
        navigation.pageSizeButton.click();
        navigation.pageFiftyButton.click();
        dealerPage.checkForPageCount(50);
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/dealer/list/?page=0&pageSize='+50);

        navigation.pageSizeButton.click();
        navigation.pageTenButton.click();
        dealerPage.checkForPageCount(10);
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/dealer/list/?page=0&pageSize='+10);

        navigation.pageSizeButton.click();
        navigation.pageTwentyFiveButton.click();
        dealerPage.checkForPageCount(25);
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/dealer/list/?page=0&pageSize='+25);

    });



});