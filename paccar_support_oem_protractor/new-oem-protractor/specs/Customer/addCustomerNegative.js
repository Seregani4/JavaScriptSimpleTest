/**
 * Created by jelliott on 1/9/2017.
 */

describe("Adding a new Customer Negative -----> ", () => {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var customersPage = require('../../../pages/customers.page.js');
    var environmentURL = browser.params.environment.url;
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var dealerAdminEmail = browser.params.testuseremails.dealeradmin;
    var dealerUserEmail = browser.params.testuseremails.dealeruser;
    var dealerOwnerAdmin = browser.params.testuseremails.dealerowneradmin;
    var dealerRegionAdmin = browser.params.testuseremails.dealerregionadmin;
    var testCustomerName = browser.params.addcustomer.name;
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

    var loginUserArray = [dealerAdminEmail, paccarAdminEmail, peoplenetAdminEmail, dealerUserEmail, dealerOwnerAdmin, dealerRegionAdmin];

    loginUserArray.filter((eachUser) => {

        it("As a " + eachUser + ", Test Negative Case Scenario for Add Customer", () => {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);

            navigation.clickCustomersLink();
            customersPage.addCustomerButton.click();
            customersPage.nameField.sendKeys(testCustomerName);
            customersPage.saveBtn.click();
            expect(browser.getCurrentUrl()).toBe(environmentURL + '/#/nav/customer/add', 'Either an incomplete' +
                ' Customer was saved or I did not reach the Customer Save page for this user: ' + eachUser);
        });
    });
});