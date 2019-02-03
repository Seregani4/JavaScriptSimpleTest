/**
 * Created By Pshrestha on 10/25/2017
 */

describe("Verify vehicle group permissions -----> ", () => {

    var loginPage = require('../../../pages/login.page.js');
    var customersPage = require('../../../pages/customers.page.js');
    var customerUtil = require('../../../utilities/customer.util.js');
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var paccarUser = browser.params.testuseremails.paccaruser;
    var dealerAdminEmail = browser.params.testuseremails.dealeradmin;
    var dealerUserEmail = browser.params.testuseremails.dealeruser;
    var dealerOwnerAdmin = browser.params.testuseremails.dealerowneradmin;
    var dealerOwnerUser = browser.params.testuseremails.dealerowneruser;
    var dealerRegionAdmin = browser.params.testuseremails.dealerregionadmin;
    var dealerRegionUser = browser.params.testuseremails.dealerregionuser;
    var dealerTech = browser.params.testuseremails.dealertech;
    var customerAdmin = browser.params.testuseremails.preferredcustomeradmin;
    var customerUser = browser.params.testuseremails.preferredcustomeruser;
    var joinAllCustomerAdmin = browser.params.testuseremails.customeradmin;
    var divisionUser = browser.params.testuseremails.divisionuser;
    var preferredCustomerName = browser.params.testpreferredcustomer.name;
    var joinAllCustomerName = browser.params.testcustomer.name;
    var preferredCustomerType = browser.params.customertype.preferred;
    var joinAllCustomerType = browser.params.customertype.joinall;

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

    var prefUserArray = [paccarAdminEmail, dealerAdminEmail, dealerOwnerAdmin, dealerRegionAdmin, paccarUser,
        dealerUserEmail, dealerOwnerUser, dealerRegionUser, dealerTech, customerAdmin, customerUser, divisionUser];

    var joinAllUserArray = [paccarAdminEmail, joinAllCustomerAdmin, dealerAdminEmail, dealerUserEmail, dealerOwnerAdmin, dealerOwnerUser, dealerRegionAdmin,
        dealerRegionUser];

    prefUserArray.forEach((eachUser) => {
        it('Verify ' + eachUser + ' have the write permission for Preferred Customers.', () => {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            customerUtil.goToCustomerDetails(preferredCustomerName, eachUser);
            customersPage.vehicleGroupsTab.click();
            customersPage.verifyVgPermission(eachUser, preferredCustomerType);
        });

    });
    joinAllUserArray.forEach((eachUser) => {
        it('Verify ' + eachUser + '  have the write permission for Join All Customers.', () => {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            customerUtil.goToCustomerDetails(joinAllCustomerName, eachUser);
            customersPage.vehicleGroupsTab.click();
            customersPage.verifyVgPermission(eachUser, joinAllCustomerType);
        });
    });
});