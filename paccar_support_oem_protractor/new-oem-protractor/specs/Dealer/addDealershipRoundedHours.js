/**
 * Created by pshrestha on 6/21/2017.
 */

describe("Validate editing Dealership Rounded Hours of Service -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var dealersPage = require('../../../pages/dealers.page.js');

    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var password = browser.params.adduser.password;

    var dealersCode = browser.params.testdealer.code;
    var roundedServiceName = 'roundedHourOfService';
    var roundedOpenTime = '5:30';
    var roundedCloseTime = '15:45';

    browser.driver.manage().window().maximize();

    beforeEach(function () {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);

        navigation.clickDealersLink();
        navigation.typeInSearchFilter(dealersCode);
        dealersPage.clickDealerCheckbox(dealersCode);
        navigation.editActionButton.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/dealer/edit');

    });

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    //PVP-2553
    it(" Paccar admin validates adding New Rounded Service Hours", function () {

        //Enter complete information
        dealersPage.addServiceHoursBtn.click();
        expect(dealersPage.serviceTypeField.isDisplayed()).toBe(true);
        dealersPage.addServiceHours(roundedServiceName, roundedOpenTime, roundedCloseTime);
        dealersPage.checkWeekDays();
        dealersPage.addHoursDoneBtn.click();
        expect(dealersPage.serviceTypeField.isDisplayed()).toBe(false, 'The fields did not save.');
        dealersPage.editDealerSaveBtn.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/dealer/list', 'The SAVE button did not work.');

        //validate the New Service Hours on dealer details page
        navigation.typeInSearchFilter(dealersCode);
        dealersPage.clickDealerHyperlinkCellSearch(dealersCode);
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/dealer/details');
        dealersPage.validateHoursOfServiceData(roundedServiceName, roundedOpenTime);
    });
    
    it("Paccar admin deletes the rounded service of hours", function () {
        dealersPage.deleteServiceHours();
        browser.sleep(2000);
        dealersPage.editDealerSaveBtn.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/dealer/list', 'The SAVE button did not work.');
        navigation.typeInSearchFilter(dealersCode);
        dealersPage.clickDealerHyperlinkCellSearch(dealersCode);
        expect(dealersPage.serviceHoursData.get(0).isPresent()).toBe(false, 'The hours did not get deleted.');
    });
});