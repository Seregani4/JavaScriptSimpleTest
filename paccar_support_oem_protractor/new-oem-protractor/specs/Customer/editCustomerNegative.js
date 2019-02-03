/**
 * Created by jelliott on 1/9/2017.
 */
describe("Edting a new Customer Negative -----> ",  () => {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var customersPage = require('../../../pages/customers.page.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var dealerAdminEmail = browser.params.testuseremails.dealeradmin;
    var dealerUserEmail = browser.params.testuseremails.dealeruser;
    var dealerOwnerAdmin = browser.params.testuseremails.dealerowneradmin;
    var dealerRegionAdmin = browser.params.testuseremails.dealerregionadmin;
    var password = browser.params.adduser.password;
    var customerName = browser.params.testpreferredcustomer.name;
    browser.driver.manage().window().maximize();

    afterEach( () => {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    var loginUserArray = [dealerAdminEmail, paccarAdminEmail, peoplenetAdminEmail, dealerUserEmail, dealerOwnerAdmin, dealerRegionAdmin];

    loginUserArray.filter( (eachUser) => {
        it("As a " + eachUser + ",Test Negative Case Scenario for Add Customer",  () => {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            //fleet health child links present

            navigation.clickCustomersLink();
            customersPage.verifyCustomerListTableDataIsVisible();
            navigation.typeInSearchFilterRecommendation(customerName);
            customersPage.clickCustomerCheckbox(customerName);
            navigation.editActionButton.click();
            customersPage.nameField.clear();
            customersPage.emailField.clear();
            customersPage.saveBtn.click();
            expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/customer/edit', 'Either an incomplete Customer was saved or I didnt reach the Customer Save page');
        });
    });
});