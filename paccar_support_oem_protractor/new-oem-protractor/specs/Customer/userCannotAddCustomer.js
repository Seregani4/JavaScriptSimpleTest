/**
 * Created by tbui on 2/26/2016.
 */
describe("User cannot add customer -----> ", () => {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var customersPage = require('../../../pages/customers.page.js');

    var paccarUserEmail = browser.params.testuseremails.paccaruser;
    var customerAdminEmail = browser.params.testuseremails.customeradmin;
    var customerUserEmail = browser.params.testuseremails.customeruser;

    var password = browser.params.adduser.password;

    browser.driver.manage().window().maximize();

    beforeEach(() => {
        // Get a fresh Angular "session" so we can avoid bootstrapping errors
        browser.driver.get("about:blank");
        browser.sleep(1000);
        loginPage.get();
    });

    afterEach(() => {
        browser.executeScript('window.localStorage.clear();');
    });

    it("Paccar User can NOT add new customer", () => {
        loginPage.login('paccar', paccarUserEmail, password);
        navigation.clickCustomersLink();
        expect(customersPage.addCustomerButton.isPresent()).toBe(false, 'The Add Customer button should not be visible');
    });

    it("Customer Admin can NOT add new customer", () => {
        loginPage.login('paccar', customerAdminEmail, password);
        navigation.clickCustomersLink();
        expect(customersPage.addCustomerButton.isPresent()).toBe(false, 'The Add Customer button should not be visible');
    });

    it("Customer User can NOT add new customer", () => {

        loginPage.login('paccar', customerUserEmail, password);
        navigation.clickCustomersLink();
        expect(customersPage.addCustomerButton.isPresent()).toBe(false, 'The Add Customer button should not be visible');
    });
});