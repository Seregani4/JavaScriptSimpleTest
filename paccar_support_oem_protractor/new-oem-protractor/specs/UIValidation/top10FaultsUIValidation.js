/**
 * Created by pshrestha on 1/16/2017.
 */
describe("Top 10 fault UI validation-----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var topTenFaultsPage = require('../../../pages/top.ten.faults.page.js');
    var validationUtil = require('../../../utilities/validation.util.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var paccarUserEmail = browser.params.testuseremails.paccaruser;
    var dealerAdminEmail = browser.params.testuseremails.dealeradmin;
    var dealerUserEmail = browser.params.testuseremails.dealeruser;
    var dealerTechEmail = browser.params.testuseremails.dealertech;
    var factoryWorkerEmail = browser.params.testuseremails.factoryworker;
    var customerAdminEmail = browser.params.testuseremails.customeradmin;
    var customerUserEmail = browser.params.testuseremails.customeruser;
    var divisionUserEmail = browser.params.testuseremails.divisionuser;
    var password = browser.params.adduser.password;

    browser.driver.manage().window().maximize();

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });
    
    it("Validating the list of Users who cannot see Top 10 Faults link", function () {
        var loginUsers = [dealerAdminEmail, dealerUserEmail, dealerTechEmail, customerUserEmail, customerAdminEmail];
        loginUsers.filter(function (eachUser) {
            //log in
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            expect(navigation.topTenFaultsLink.isDisplayed()).toBe(false, 'I saw the Top 10 Faults for this User: ' + eachUser);
            navigation.logOut();
            browser.executeScript('window.localStorage.clear();');
        });
    });

    it("Validating the list of Users who can see Top 10 Faults link", function () {
        var loginUsers = [peoplenetAdminEmail, paccarAdminEmail, paccarUserEmail, factoryWorkerEmail, divisionUserEmail];
        loginUsers.filter(function (eachUser) {
            //log in
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            expect(navigation.topTenFaultsLink.isDisplayed()).toBe(true, 'I did not see the Top 10 Faults for this User: ' + eachUser);
            navigation.clickTopTenFaultsLink();
            topTenFaultsPage.verifyTopTenFaultsDataIsVisible();
            expect(navigation.clearAllFiltersButton.isDisplayed()).toBe(true, 'Clear all filters Button is Not Displayed');
            navigation.logOut();
            browser.executeScript('window.localStorage.clear();');
        });
    });

    var regexp = /\w+:\d+:\d{1}:\w+:\w+-\w+/ig;

    it('TC-1404 Top Ten Faults Functionality', function () {
        loginPage.get();
        loginPage.login('paccar', peoplenetAdminEmail, password);
        navigation.topTenFaultsLink.click();
        topTenFaultsPage.topTenFaultFirstColumn.getText().then(function (text) {
            for (var i = 0; i < text.length; i++) {
                if (text[i] === '') {
                    topTenFaultsPage.clickArrowButton(i + 1);
                    navigation.allChips.get(0).getText().then(function (chipValue) {
                        expect(chipValue).toMatch(regexp, "Found wrong chip's value, I saw this chip " + chipValue);
                    });
                } else {
                    topTenFaultsPage.clickArrowButton(i + 1);
                    navigation.allChips.get(0).getText().then(function (chipValue) {
                        validationUtil.validateTextContainArray(text, chipValue);
                        topTenFaultsPage.vinFromTable.click();
                        navigation.clearAllFiltersButton.click();
                        navigation.typeInSearchFilter(chipValue);
                        topTenFaultsPage.codeFromFaultLog.getText().then(function (code) {
                            validationUtil.validateTextContainArray(code, chipValue);
                        });
                    });
                }
                navigation.topTenFaultsLink.click();
            }
        });
    });

    it(`TC-2615 Validate opportunity to delete chipfilter via clear all chips`, () => {
        loginPage.get();
        loginPage.login('paccar', peoplenetAdminEmail, password);
        navigation.topTenFaultsLink.click();
        topTenFaultsPage.clickArrowButton('1');
        navigation.clearAllFiltersButton.click();
        expect(navigation.allChips.count()).toBe(0, "Wrong Chip Filters Count");
    });
});