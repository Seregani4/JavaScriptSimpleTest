/**
 * Created by Popazov on 4/12/2018.
 */

describe("Verify google analytics page -----> ", function () {

    var navigation = require('../../../pages/navigation.page.js');
    var loginPage = require('../../../pages/login.page.js');
    var gAnalyticsPage = require('../../../pages/googleAnalytics.page.js');
    var toastMessageUtils = require('../../../utilities/toastMessage.util.js');
    var validationUtils = require('../../../utilities/validation.util.js');
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var password = browser.params.adduser.password;
    var moment = require('moment');
    var yesterdayDate = moment(new Date()).add(-1, 'days').format('YYYY-MM-DD');
    var tomorrowDate = moment(new Date()).add(1, 'days').format('YYYY-MM-DD');
    var wrongStartDate = '2018-05-01';
    var startDateErrorMessage = 'Start Date should be before End Date.';
    var startDateShouldBe = 'Start Date should be after May 02 2018.';
    var endDateErrorMessage = 'End Date cannot be before valid Start Date.';
    var startDateIsRequiredMessage = 'Start Date is required.';
    var endDateIsRequiredMessage = 'End Date is required.';
    var toastAlertText = 'The requested data will be sent to your email address';
    var rolesList = [
        'All Roles',
        browser.params.roleslabels.paccaradmin,
        browser.params.roleslabels.paccaruser,
        browser.params.roleslabels.paccarpoweruser,
        browser.params.roleslabels.factoryworker,
        browser.params.roleslabels.customerservice,
        browser.params.roleslabels.dealerowneradmin,
        browser.params.roleslabels.dealerowneruser,
        browser.params.roleslabels.dealerregionadmin,
        browser.params.roleslabels.dealerregionuser,
        browser.params.roleslabels.dealeradmin,
        browser.params.roleslabels.dealeruser,
        browser.params.roleslabels.dealertechnician,
        browser.params.roleslabels.customeradmin,
        browser.params.roleslabels.customeruser
    ];

    browser.driver.manage().window().maximize();

    beforeEach(function () {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.clickGoogleAnalyticsLink();
    });

    afterEach(function () {
        browser.executeScript('window.localStorage.clear();');
    });

    it("Validate All Buttons on Google Analytics  Page is displayed", function () {
        expect(gAnalyticsPage.allRolesDropDown.isDisplayed()).toBe(true, 'All roles Drop-down not visiable');
        expect(gAnalyticsPage.startDateField.isDisplayed()).toBe(true, 'Start date field not visiable');
        expect(gAnalyticsPage.endDateField.isDisplayed()).toBe(true, 'End date field not visiable');
        expect(gAnalyticsPage.exportBtn.isDisplayed()).toBe(true, 'Export button not visiable');
        gAnalyticsPage.allRolesDropDown.click();
        navigation.waitTillElementToBeClickable(gAnalyticsPage.allRolesDropDownList.last());
        gAnalyticsPage.allRolesDropDownList.getText()
            .then(function (text) {
                validationUtils.validateTextContainArray(text, rolesList)
            })
    });

    it("Validate Start/End date validation", function () {
        gAnalyticsPage.fillStartDateField(wrongStartDate);
        gAnalyticsPage.endDateField.click();
        expect(gAnalyticsPage.errorMessageEndtDate.isDisplayed()).toBe(true, 'Start date error message not displayed');
        expect(gAnalyticsPage.errorMessageEndtDate.getText()).toBe(startDateShouldBe, 'Invalid error message');
        gAnalyticsPage.fillStartDateField(tomorrowDate);
        gAnalyticsPage.fillEndDateField(yesterdayDate);
        gAnalyticsPage.startDateField.click();
        expect(gAnalyticsPage.exportBtn.getAttribute('disabled')).toBe('true');
        expect(gAnalyticsPage.errorMessageStartDate.isDisplayed()).toBe(true, 'Start date error message not displayed');
        expect(gAnalyticsPage.errorMessageStartDate.getText()).toBe(startDateErrorMessage, 'Invalid error message');
        expect(gAnalyticsPage.errorMessageEndtDate.isDisplayed()).toBe(true, 'End date error message not displayed');
        expect(gAnalyticsPage.errorMessageEndtDate.getText()).toBe(endDateErrorMessage, 'Invalid error message');
        gAnalyticsPage.fillStartDateField(yesterdayDate);
        gAnalyticsPage.fillEndDateField(tomorrowDate);
        gAnalyticsPage.exportBtn.click();
        toastMessageUtils.verifyToastAlert(toastAlertText);
        //Can't use element.clear() for this fields, Validation triggered only if last character was removed from  field
        gAnalyticsPage.fillStartDateField('1');
        gAnalyticsPage.startDateField.sendKeys(protractor.Key.BACK_SPACE);
        gAnalyticsPage.fillEndDateField('1');
        gAnalyticsPage.endDateField.sendKeys(protractor.Key.BACK_SPACE);
        expect(gAnalyticsPage.errorMessagesRequired.get(0).isDisplayed()).toBe(true, 'Error message not displayed');
        expect(gAnalyticsPage.errorMessagesRequired.get(1).isDisplayed()).toBe(true, 'Error message not displayed');
        expect(gAnalyticsPage.errorMessagesRequired.get(0).getText()).toBe(startDateIsRequiredMessage, 'Invalid error message');
        expect(gAnalyticsPage.errorMessagesRequired.get(1).getText()).toBe(endDateIsRequiredMessage, 'Invalid error message');
    });
});