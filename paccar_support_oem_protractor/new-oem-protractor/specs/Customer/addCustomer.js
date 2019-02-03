/**
 * Created by tbui on 2/26/2016.
 */
describe("Adding a new Customer -----> ", () => {

    var loginPage = require('../../../pages/login.page');
    var navigation = require('../../../pages/navigation.page');
    var customersPage = require('../../../pages/customers.page');
    var customerUtility = require('../../../utilities/customer.util');
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var dealerAdminEmail = browser.params.testuseremails.dealeradmin;
    var dealerUserEmail = browser.params.testuseremails.dealeruser;
    var dealerOwnerAdmin = browser.params.testuseremails.dealerowneradmin;
    var dealerRegionAdmin = browser.params.testuseremails.dealerregionadmin;
    var testCustomerName = ""
    var password = browser.params.adduser.password;


    browser.driver.manage().window().maximize();

    beforeEach(() => {
        // Get a fresh Angular "session" so we can avoid bootstrapping errors
        browser.driver.get("about:blank");
        browser.sleep(1000);
    });

    afterEach(() => {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("Test the cancel button functionality", () => {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.clickCustomersLink();
        customersPage.verifyCustomerListTableDataIsVisible();
        navigation.addActionButton.click();
        customersPage.cancelBtn.click();
        expect(browser.getCurrentUrl()).toBe(browser.params.environment.url + '/#/nav/customer/list/', 'The CANCEL button didnt work');
    });

    var loginUserArray = [paccarAdminEmail, dealerAdminEmail, dealerUserEmail, dealerOwnerAdmin, dealerRegionAdmin];

    loginUserArray.forEach(eachUser => {

        it(eachUser + "-- adds a new customer", () => {
            return customersPage.addNewCustomerEndpoint(eachUser, 'testCustomer')
                .then((name) => {
                    console.log(name)
                    return testCustomerName = name
                })
                .then(() => {
                    loginPage.get();
                    loginPage.login('paccar', eachUser, password)
                    //Validates the customer has been added successfully.
                    customerUtility.goToCustomerDetails(testCustomerName, eachUser);
                })
        });

        it("Paccar Admin checks and deletes new Customer entity added by " + eachUser, () => {
            loginPage.get();
            customersPage.deleteCustomerEndpoint(paccarAdminEmail, testCustomerName);
            loginPage.login('paccar', eachUser, password);
            navigation.clickCustomersLink();
            navigation.typeInSearchFilter(testCustomerName);
            customersPage.verifyCustomerIsNotInList(testCustomerName);
        });
    });


});