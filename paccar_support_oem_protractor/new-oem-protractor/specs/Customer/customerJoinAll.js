/**
 * Created by pshrestha on 4/6/2017.
 */

describe("Validate JOIN ALL Functionality -----> ", () => {

    var navigation = require('../../../pages/navigation.page.js');
    var loginPage = require('../../../pages/login.page.js');
    var customersPage = require('../../../pages/customers.page.js');
    var customerUtility = require('../../../utilities/customer.util.js');
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var dealerAdminEmail = browser.params.testuseremails.dealeradmin;
    var password = browser.params.adduser.password;
    var testCustomerName = "";

    browser.driver.manage().window().maximize();

    afterEach(() => {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    beforeAll((done) => {
        return customersPage.addNewCustomerEndpoint(paccarAdminEmail, "regular customer")
            .then((name) => {
                console.log(name)
                return testCustomerName = name
            }).then(() => {
                done()
            })

    });

    afterAll((done) => {
        customersPage.deleteCustomerEndpoint(paccarAdminEmail, testCustomerName)
            .then(() => {
                done()
            })
    });

    it("Dealer Admin cannot see the test Customer without Join All Selected", () => {
        loginPage.get();
        loginPage.login('paccar', dealerAdminEmail, password);
        navigation.clickCustomersLink();
        navigation.typeInSearchFilter(testCustomerName);
        customersPage.verifyCustomerIsNotInList(testCustomerName);
    });

    it("Edit test customer to select Join All", () => {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.clickCustomersLink();
        navigation.typeInSearchFilter(testCustomerName);
        customersPage.clickCustomerCheckbox(testCustomerName);
        navigation.editActionButton.click();
        customersPage.checkDealerNetworkCheckbox();
        customersPage.saveBtn.click();
        navigation.clickCustomersLink();
        navigation.typeInSearchFilter(testCustomerName);
        customersPage.verifyJoinAllIcon();

    });

    it("Dealer Admin can see test Customer after Join All has been checked.", () => {
        loginPage.get();
        loginPage.login('paccar', dealerAdminEmail, password);
        navigation.clickCustomersLink();
        navigation.typeInSearchFilter(testCustomerName);
        customersPage.verifyCustomerList(testCustomerName);
    });
});
