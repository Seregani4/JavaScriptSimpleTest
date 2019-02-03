/**
 * Created by Cottomoeller on 4/22/2016.
 */

describe("Ui Validation for OTAP Page ----- ", function(){

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var otapPage = require('../../../pages/otap.page.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;

    browser.driver.manage().window().maximize();

    beforeEach(function() {
        loginPage.get();
        loginPage.login('supportal', peoplenetAdminEmail, password);
        navigation.deviceManagementButton.click();
        navigation.clickOTAPLink();
    });
    afterEach(function() {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("Verify OTAP Profile List is Displayed on the OTAP Profile List Page", function(){
        otapPage.verifyOTAPRequestData();
        otapPage.OTAPProfiles.click();
        expect(otapPage.otapProfilesTable.isDisplayed()).toBe(true, 'The Profile List is missing');
        expect(browser.getCurrentUrl()).toBe(browser.params.environment.url + '/#/nav/otap/request/');
    },500000);


    it("Validate 'Send' button works on the OTAP Page",function(){
        expect(otapPage.sendBtn.isPresent()).toBe(true);
        otapPage.dsnsField.sendKeys('8000090');
        otapPage.otapType.click();
        otapPage.profileOtapType.click();

        otapPage.profileDropDown.click();
        otapPage.optionOne.click();
        otapPage.sendBtn.click();
        browser.sleep(1000);
        otapPage.checkForToastAlert();
    });

    it("Verify OTAP Page buttons", function(){
        otapPage.OTAPProfiles.click();
        navigation.moreOptionsButton.click();
        expect(otapPage.newProfileButton.isPresent()).toBe(true, 'The New Profile Button is missing');
    },500000);

    it("Validate the Rows on the OTAP Profile List Page", function(){
        otapPage.OTAPProfiles.click();
        expect(browser.getCurrentUrl()).toBe(browser.params.environment.url + '/#/nav/otap/request/');
        navigation.pageSizeButton.click();
        navigation.pageSizeFiftyButton.click();
        otapPage.verifyPageCount(50);
        navigation.pageSizeButton.click();
        navigation.pageTenButton.click();
        otapPage.verifyPageCount(10);
        navigation.pageSizeButton.click();
        navigation.pageTwentyFiveButton.click();
        otapPage.verifyPageCount(25);
    },500000);

    it("Validate the (Last Page And First Page)Pagination OTAP Profile List Page", function(){
        otapPage.OTAPProfiles.click();
        navigation.lastPageButton.click();
        expect(navigation.lastPageButton.getAttribute('disabled')).toBe('true');
        expect(navigation.nextPageButton.getAttribute('aria-hidden')).toBe('true');
        navigation.firstPageButton.click();
        expect(navigation.firstPageButton.getAttribute('disabled')).toBe('true');
        expect(navigation.previousPageButton.getAttribute('aria-hidden')).toBe('true');
    },500000);

    it("Validate the(Next Page and Previous Page) Pagination on the OTAP Profile List Page", function(){
        otapPage.OTAPProfiles.click();
        navigation.nextPageButton.click();
        expect(otapPage.pageDropDown.getText()).toContain(2);
        navigation.previousPageButton.click();
        expect(otapPage.pageDropDown.getText()).toContain(1);
    },500000);

});