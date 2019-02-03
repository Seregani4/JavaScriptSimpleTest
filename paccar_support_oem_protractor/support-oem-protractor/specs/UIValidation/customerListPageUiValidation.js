/**
 * Created by jelliott on 10/19/2016.
 */
describe("Customer List Page UI Validation----- : ", function() {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var customerPage = require('../../../pages/customers.page.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;
    var customerName='Automation Customer (Do Not Edit)';
    browser.driver.manage().window().maximize();

    beforeEach(function(){
        loginPage.get();
        loginPage.login('supportal', peoplenetAdminEmail, password);
        navigation.fleetHealthButton.click();
        navigation.clickCustomersLink();
        customerPage.verifyCustomerListTableDataIsVisible();
       });

    afterEach(function() {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });
    it("Validate the All Buttons on Customer List Page for both High and Low Density", function(){
        //High (Default) Density
        //expect(navigation.searchFilterButton.isDisplayed()).toBe(true,'Search Filter Button is Not Displayed');
        //expect(navigation.densityToggleBtn.isDisplayed()).toBe(true,'Density Toggle Button is Not Displayed');
        expect(navigation.moreOptionsButton.isDisplayed()).toBe(true,'More Options Button is Not Displayed');
        //expect(navigation.refreshActionButton.isDisplayed()).toBe(true,'Refresh Button is Not Displayed');
        expect(customerPage.addCustomerButton.isDisplayed()).toBe(true,'Add Customer Button is Not Displayed');
        //browser.sleep(500);
        customerPage.addCustomerButton.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/customer/add');
        browser.navigate().back();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/customer/list/');
        //paccarNavigation.togglePageDensity('LOW');
        ////Low  Density
        //expect(customerPage.addCustomerButton.isDisplayed()).toBe(true,'Add Customer Button is Not Displayed');
        //customerPage.addCustomerButton.click();
        //expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/customer/add');
    });


    it("Validate the Action Bar and Action Buttons is Displayed on Customer List Page", function(){
        navigation.typeInSearchFilterRecommendation(customerName);
        customerPage.clickCustomerCheckbox(customerName);
        expect(navigation.actionBar.isDisplayed()).toBe(true,'Action Bar is Not Displayed');
        expect(customerPage.editActionButton.isDisplayed()).toBe(true,'Edit Action Button is Not Displayed');
        expect(customerPage.viewDetailsActionButton.isDisplayed()).toBe(true,'View Details Action Button is Not Displayed');
        expect(customerPage.deleteActionButton.isDisplayed()).toBe(true,'Delete Action Button is Not Displayed');
    });

    it("Validate the (Last Page And First Page)Pagination Customer List Page for High Page Density", function(){
        //High (Default) Density
        navigation.lastPageButton.click();
        //expect(customerPage.lastPageButton.isEnabled()).toBe(false);
        //expect(customerPage.nextPageButton.isEnabled()).toBe(false);
        expect(navigation.lastPageButton.getAttribute('disabled')).toBe('true');
        expect(navigation.nextPageButton.getAttribute('aria-hidden')).toBe('true');
        navigation.firstPageButton.click();
        expect(navigation.firstPageButton.getAttribute('disabled')).toBe('true');
        expect(navigation.previousPageButton.getAttribute('aria-hidden')).toBe('true');
        //expect(customerPage.firstPageButton.isEnabled()).toBe(false);
        //expect(customerPage.previousPageButton.isEnabled()).toBe(false);
    });

    //it("Validate the (Last Page And First Page)Pagination Customer List Page for Low Page Density", function(){
    //     paccarNavigation.togglePageDensity('LOW');
    //    //Low  Density
    //    navigation.lastPageButton.click();
    //    expect(navigation.lastPageButton.getAttribute('disabled')).toBe('true');
    //    expect(navigation.nextPageButton.getAttribute('aria-hidden')).toBe('true');
    //
    //    navigation.firstPageButton.click();
    //    expect(navigation.firstPageButton.getAttribute('disabled')).toBe('true');
    //    expect(navigation.previousPageButton.getAttribute('aria-hidden')).toBe('true');
    //
    //});

    it("Validate the(Next Page and Previous Page) Pagination on the Customer List Page for High Page Density", function(){
        //High (Default) Density
        navigation.nextPageButton.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/customer/list/?page='+1);
        navigation.previousPageButton.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/customer/list/?page='+0);
    });

    //it("Validate the(Next Page and Previous Page) Pagination on the Customer List Page for Low Page Density", function(){
    //    paccarNavigation.togglePageDensity('LOW');
    //    //Low  Density
    //    navigation.nextPageButton.click();
    //    expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/customer/list/?page='+1);
    //    navigation.previousPageButton.click();
    //    expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/customer/list/?page='+0);
    //});



    it("Validate the Rows on the Customer List Page for High Page Density", function(){
        //High (Default) Density
        navigation.pageSizeButton.click();
        navigation.pageFiftyButton.click();
        customerPage.checkForPageCount(50);
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/customer/list/?page=0&pageSize='+50);

        navigation.pageSizeButton.click();
        navigation.pageTenButton.click();
        customerPage.checkForPageCount(10);
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/customer/list/?page=0&pageSize='+10);

        navigation.pageSizeButton.click();
        navigation.pageTwentyFiveButton.click();
        customerPage.checkForPageCount(25);
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/customer/list/?page=0&pageSize='+25);

    });

    //it("Validate the Rows on the Customer List Page for Low Page Density", function(){
    //    paccarNavigation.togglePageDensity('LOW');
    //    //Low  Density
    //    navigation.pageSizeButton.click();
    //    navigation.pageSizeFiftyButton.click();
    //    customerPage.checkForPageCount(50);
    //    expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/customer/list/?page=0&pageSize='+50);
    //
    //    navigation.pageSizeButton.click();
    //    navigation.pageSizeTenButton.click();
    //    customerPage.checkForPageCount(10);
    //    expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/customer/list/?page=0&pageSize='+10);
    //
    //    navigation.pageSizeButton.click();
    //    navigation.pageSizeTwentyFiveButton.click();
    //    customerPage.checkForPageCount(25);
    //    expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/customer/list/?page=0&pageSize='+25);
    //});

});