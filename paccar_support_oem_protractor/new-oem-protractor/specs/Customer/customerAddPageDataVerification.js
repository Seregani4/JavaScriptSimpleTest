/**
 * Created by tbui on 2/26/2016.
 */
describe("Verify Customer Add page has the proper fields ----->", () => {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var customersPage = require('../../../pages/customers.page.js');
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var password = browser.params.adduser.password;

    browser.driver.manage().window().maximize();

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });
    var loginUserArray = [paccarAdminEmail];

    loginUserArray.filter((eachUser) => {

        it("Verifying fields are visible", () => {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            navigation.clickCustomersLink();
            customersPage.addCustomerButton.click();
            expect(customersPage.nameField.isDisplayed()).toBe(true, "The Name field on the Add Customer page could not be found");
            expect(customersPage.emailField.isDisplayed()).toBe(true, "The Email field on the Add Customer page could not be found");
            expect(customersPage.addressField1.isDisplayed()).toBe(true, "The Address1 field on the Add Customer page could not be found");
            expect(customersPage.addressField2.isDisplayed()).toBe(true, "The Address2 field on the Add Customer page could not be found");
            expect(customersPage.cityField.isDisplayed()).toBe(true, "The City field on the Add Customer page could not be found");
            expect(customersPage.stateField.isDisplayed()).toBe(true, "The State field on the Add Customer page could not be found");
            expect(customersPage.zipField.isDisplayed()).toBe(true, "The Zip Code field on the Add Customer page could not be found");
            expect(customersPage.countryField.isDisplayed()).toBe(true, "The Country field on the Add Customer page could not be found");
            expect(customersPage.phoneField.isDisplayed()).toBe(true, "The Phone field on the Add Customer page could not be found");
            expect(customersPage.faxField.isDisplayed()).toBe(true, "The Fax field on the Add Customer page could not be found");
            expect(customersPage.cancelBtn.isDisplayed()).toBe(true, "The Cancel Button on the Add Customer page could not be found");
            expect(customersPage.saveBtn.isDisplayed()).toBe(true, "The Save Button on the Add Customer page could not be found");
        });
    });
});