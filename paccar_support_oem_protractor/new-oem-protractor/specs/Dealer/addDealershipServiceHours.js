/**
 * Created by pshrestha on 6/12/2017.
 */

describe("Validate editing Dealership Hours of Service information -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var customersPage = require('../../../pages/customers.page.js');
    var vehiclesPage = require('../../../pages/vehicles.page.js');
    var dealersPage = require('../../../pages/dealers.page.js');
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var password = browser.params.adduser.password;
    var dealersCode = browser.params.testdealer.code;
    var testServiceTypeName = 'testHoursOfService';
    var openTime = '7';
    var closeTime = '17';

    //var EC = protractor.ExpectedConditions; //Example code that waits for the element to be visible.
    //browser.wait(EC.elementToBeClickable(dealersPage.serviceTypeField), 5000);

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

    //PVP-2576
    it("Paccar admin validates adding Blank Form New for Service Hours", function () {
        dealersPage.addServiceHoursBtn.click();
        expect(dealersPage.serviceTypeField.isDisplayed()).toBe(true);
        dealersPage.addHoursDoneBtn.click();
        expect(dealersPage.serviceTypeField.isDisplayed()).toBe(true, 'The empty fields got saved.');
        dealersPage.editDealerSaveBtn.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/dealer/edit', 'The empty form got saved.');
    });

    it("Paccar admin validates adding Incomplete Form for New Service Hours", function () {
        //Enter incomplete information
        dealersPage.addServiceHoursBtn.click();
        expect(dealersPage.serviceTypeField.isDisplayed()).toBe(true);
        dealersPage.serviceTypeField.sendKeys(testServiceTypeName);
        dealersPage.openHourField.sendKeys(openTime);
        dealersPage.checkSaturday.click();
        dealersPage.checkMonday.click();
        browser.sleep(1000);
        dealersPage.addHoursDoneBtn.click();
        expect(dealersPage.serviceTypeField.isDisplayed()).toBe(true);
        browser.sleep(1000);
        dealersPage.editDealerSaveBtn.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/dealer/edit');
    });

    it("Paccar admin validates adding New Service Hours", function () {
        //Enter complete information
        dealersPage.addServiceHoursBtn.click();
        expect(dealersPage.serviceTypeField.isDisplayed()).toBe(true);
        dealersPage.addServiceHours(testServiceTypeName, openTime, closeTime);
        dealersPage.checkWeekDays();
        dealersPage.addHoursDoneBtn.click();
        expect(dealersPage.serviceTypeField.isDisplayed()).toBe(false, 'The fields did not save.');
        dealersPage.editDealerSaveBtn.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/dealer/list', 'The SAVE button did not work.');
        //validate the New Service Hours on dealer details page
        navigation.typeInSearchFilter(dealersCode);
        dealersPage.clickDealerHyperlinkCellSearch(dealersCode);
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/dealer/details');
        dealersPage.validateHoursOfServiceData(testServiceTypeName, openTime);
    });

    it("Paccar admin deletes the test service of hours", function () {
        dealersPage.deleteServiceHours();
        browser.sleep(5000);
        dealersPage.editDealerSaveBtn.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/dealer/list', 'The SAVE button did not work.');
        navigation.typeInSearchFilter(dealersCode);
        dealersPage.clickDealerHyperlinkCellSearch(dealersCode);
        expect(dealersPage.serviceHoursData.get(0).isPresent()).toBe(false, 'The hours did not get deleted.');
    });
});