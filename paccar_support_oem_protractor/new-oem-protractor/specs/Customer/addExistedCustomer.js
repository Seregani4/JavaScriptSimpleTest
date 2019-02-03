/**
 * Created by Popazov on 10/25/2018.
 */

describe("Validate Existed and similar  Customer Create -----> ", () => {

    var loginPage = require('../../../pages/login.page');
    var navigation = require('../../../pages/navigation.page');
    var customersPage = require('../../../pages/customers.page');
    var validationUtil = require('../../../utilities/validation.util');
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var password = browser.params.adduser.password;
    var testAddress = browser.params.addcustomer.address1;
    var testNumber = browser.params.addcustomer.phone;
    var testFax = browser.params.addcustomer.fax;
    var testNameCustomer = 'Customer.test/1';
    var testEmailCustomer = 'testcustomerwarning@test.com';
    var matchAddressWarning = 'Warning: Address 1 matches an existing customer';
    var matchPhoneWarning = 'Warning: Phone matches an existing customer';
    var matchFaxWarning = 'Warning: Fax matches an existing customer';
    var similarNameWarning = 'Warning: Customer name is similar to an existing customer';

    browser.driver.manage().window().maximize();

    beforeEach(() => {
        // Get a fresh Angular "session" so we can avoid bootstrapping errors
        browser.driver.get("about:blank");
        browser.sleep(1000);
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.customersLink.click();
        customersPage.addCustomerButton.click();
    });

    afterEach(() => {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    beforeAll(() => {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.customersLink.click();
        customersPage.addCustomerButton.click();
        var randomInt = Math.floor(Math.random() * 999999 + 1000000);
        testNameCustomer = testNameCustomer + randomInt
        customersPage.addNewCustomerForTransfer(browser.params.customertype.joinall, testNameCustomer, testEmailCustomer);
        browser.executeScript('window.localStorage.clear();');
    });

    afterAll((done) => {
        customersPage.deleteCustomerEndpoint(paccarAdminEmail, testNameCustomer)
            .then(() => {
                done()
            })
    });

    it('TC-2712 Validate warning message about already existing customer name', () => {
        customersPage.nameField.sendKeys(testNameCustomer);
        customersPage.emailField.click();
        expect(customersPage.nameErrorMessage.getText()).toBe(`${testNameCustomer} is already registered.`, 'Wrong error message');
    });

    it('TC-2676 Validate similar customer warning(name, address, phone, fax)', () => {
        customersPage.nameField.sendKeys(testNameCustomer + 1);
        customersPage.addressField1.sendKeys(testAddress);
        customersPage.phoneField.sendKeys(testNumber);
        customersPage.faxField.sendKeys(testFax);
        customersPage.emailField.sendKeys(1 + testEmailCustomer);
        customersPage.checkDealerNetworkCheckbox();
        customersPage.matchErrorMessage.getText()
            .then(text => {
                validationUtil.validateTextContainArray(text, [
                    matchAddressWarning,
                    matchPhoneWarning,
                    matchFaxWarning
                ])
            });
        expect(customersPage.similarErrorMessage.getText()).toBe(similarNameWarning, 'Wrong warning message');
        customersPage.saveBtn.click();
        expect(customersPage.similarPopUp.isPresent()).toBe(true, `Pop-up menu didn't show`);
        expect(customersPage.customerWrapper.count()).toBeGreaterThan(0, 'Pop-up wrapper was empty');
    });
});