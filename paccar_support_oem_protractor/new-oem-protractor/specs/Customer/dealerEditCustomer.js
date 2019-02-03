/**
 * Created by pshrestha on 8/8/2017.
 */

//PVP-2548
describe("Validate edit permissions for preferred and join all customers -----> ", () => {
    var navigation = require('../../../pages/navigation.page.js');
    var loginPage = require('../../../pages/login.page.js');
    var customersPage = require('../../../pages/customers.page.js');
    var usersPage = require('../../../pages/users.page.js');
    var customerUtility = require('../../../utilities/customer.util.js');
    var userUtility = require('../../../utilities/user.util.js');
    var dealership = 'W009';
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var dealerAdminEmail = browser.params.testuseremails.dealeradmin;
    var dealerUserEmail = browser.params.testuseremails.dealeruser;
    var dealerOwnerAdmin = browser.params.testuseremails.dealerowneradmin;
    var dealerRegionAdmin = browser.params.testuseremails.dealerregionadmin;
    var testUserEmail = "dealerEditCus" + browser.params.adduser.email;
    var testUserOrg = browser.params.adduser.organizationtype.customer;
    var testUserRole = browser.params.roleslabels.customeradmin;
    var randomInt = Math.floor(Math.random() * 999999 + 1000000);
    console.log(randomInt)
    var testUserId;
    var testCustomerName = browser.params.addcustomer.name + randomInt;
    var joinAllCustomer = browser.params.customertype.joinall;
    var password = browser.params.adduser.password;

    var userLogin = [dealerAdminEmail, dealerUserEmail, dealerOwnerAdmin, dealerRegionAdmin];

    browser.driver.manage().window().maximize();

    afterEach(() => {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    beforeAll(() => {
        return customersPage.addNewCustomerEndpoint(paccarAdminEmail, 'join all')
            .then((name) => {
                console.log(name)
                return testCustomerName = name
            })
            .then(() => {
                loginPage.get();
                loginPage.login('paccar', paccarAdminEmail, password);
                return userUtility.addSpecificUser(testUserEmail, testUserOrg, testUserRole, testCustomerName)
            })
            .then((id) => {
                testUserId = id
                browser.executeScript('window.localStorage.clear();');
            })
    });

    afterAll((done) => {
        return usersPage.deleteUserEndpoint(paccarAdminEmail, testUserId)
            .then(() => {
                return customersPage.deleteCustomerEndpoint(paccarAdminEmail, testCustomerName)
            })
            .then(() => {
                done()
            })
    });


    it("Dealer Users cannot edit the Join All Customer", () => {
        userLogin.forEach((eachUser) => {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            navigation.clickCustomersLink();
            navigation.typeInSearchFilter(testCustomerName);
            customersPage.clickCustomerHyperlinkCellSearch(testCustomerName);
            expect(customersPage.infoTabEditBtn.isPresent()).toBe(false, 'The dealer user: ' + eachUser + ' can see the edit button');
            navigation.logOut();
        });
    });

    it("Customer admin sets the dealership as Preferred", () => {
        loginPage.get();
        loginPage.login('paccar', testUserEmail, password);
        customerUtility.preferredDealerEdit(dealership, "prefer");
    });

    it("Dealer Users can edit the Preferred Customer", () => {
        userLogin.forEach((eachUser) => {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            navigation.clickCustomersLink();
            navigation.typeInSearchFilter(testCustomerName);
            //Verify the preferred dealer icon is present.
            expect(customersPage.preferredDealerIcon.isDisplayed()).toBe(true);
            customersPage.clickCustomerHyperlinkCellSearch(testCustomerName);
            expect(customersPage.infoTabEditBtn.isDisplayed()).toBe(true, 'The dealer user: ' + eachUser + ' cannot see the edit button');
            navigation.logOut();
        });
    });
});