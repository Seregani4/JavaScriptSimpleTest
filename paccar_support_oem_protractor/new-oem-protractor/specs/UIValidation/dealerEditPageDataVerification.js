/**
 * Created by tbui on 2/26/2016.
 */

describe("Verify Dealer Edit page has the proper fields -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var dealersPage = require('../../../pages/dealers.page.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;

    browser.driver.manage().window().maximize();

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("Verifying fields are visible", function () {
        loginPage.get();
        loginPage.login('paccar', peoplenetAdminEmail, password);

        //fleet health child links present
        navigation.clickDealersLink();
        navigation.typeInSearchFilter('A084');
        dealersPage.clickDealerCheckbox('A084');
        navigation.editActionButton.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/dealer/edit');

        expect(dealersPage.nameField.isDisplayed()).toBe(true, "The Name field on the Add Customer page could not be found");
        expect(dealersPage.emailField.isDisplayed()).toBe(true, "The Email field on the Add Customer page could not be found");
        expect(dealersPage.idField.isDisplayed()).toBe(true, "The ID field on the Add Customer page could not be found");
        expect(dealersPage.latitudeField.isDisplayed()).toBe(true, "The Latitude field on the Add Customer page could not be found");
        expect(dealersPage.longitudeField.isDisplayed()).toBe(true, "The longitude field on the Add Customer page could not be found");
        expect(dealersPage.geofencesHeader.isDisplayed()).toBe(true, "The Geofence Header on the Add Customer page could not be found");
        expect(dealersPage.locationsHeader.isDisplayed()).toBe(true, "The Locations Header on the Add Customer page could not be found");
        expect(dealersPage.phoneNumbersHeader.isDisplayed()).toBe(true, "The Phone Numbers Header on the Add Customer page could not be found");
        expect(dealersPage.hoursOfServiceHeader.isDisplayed()).toBe(true, "The Hours of Service Header on the Add Customer page could not be found");
        expect(dealersPage.cancelBtn.isDisplayed()).toBe(true, "The Cancel Button on the Add Customer page could not be found");
        expect(dealersPage.saveBtn.isDisplayed()).toBe(true, "The Save Button on the Add Customer page could not be found");
    });
});