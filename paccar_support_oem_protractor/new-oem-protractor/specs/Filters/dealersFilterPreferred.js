/**
 * Created by pshrestha on 10/24/2017.
 */

describe("Filtering Preferred Customers by Dealer Location, DOG and Dealer Region -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var customersPage = require('../../../pages/customers.page.js');
    var dashboardUtil = require('../../../utilities/dashboard.util.js');
    var chipFilterUtil = require('../../../utilities/chipFilterMatrix.utils.js');
    var dashboardPage = require('../../../pages/dashboard2.page.js');
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var paccarUser = browser.params.testuseremails.paccaruser;
    var dealerAdminEmail = browser.params.testuseremails.dealeradmin;
    var dealerUserEmail = browser.params.testuseremails.dealeruser;
    var dealerOwnerAdmin = browser.params.testuseremails.dealerowneradmin;
    var dealerOwnerUser = browser.params.testuseremails.dealerowneruser;
    var dealerRegionAdmin = browser.params.testuseremails.dealerregionadmin;
    var dealerRegionUser = browser.params.testuseremails.dealerregionuser;
    var dealerTech = browser.params.testuseremails.dealertech;
    var customerPreferred = browser.params.testpreferredcustomer.name;
    var customerJoinAll = browser.params.testcustomer.name;
    //Chip filter for customer type
    var preferredChip = browser.params.customertype.preferred;
    var dashboardPreferredChip = chipFilterUtil.dashboardPreferred;
    var password = browser.params.adduser.password;

    browser.driver.manage().window().maximize();

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    var dealerUsers = [dealerAdminEmail, dealerOwnerAdmin, dealerRegionAdmin, dealerUserEmail, dealerOwnerUser,
        dealerRegionUser, dealerTech];
    var paccarUsers = [paccarAdminEmail, paccarUser];

    dealerUsers.forEach(function (eachUser) {

        it(eachUser + " filters customer list.", function () {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            navigation.clickCustomersLink();
            navigation.typeInSearchFilterRecommendation(customerPreferred);
            navigation.typeInSearchFilterRecommendation(customerJoinAll);
            //verify the customers and icons are visible
            customersPage.verifyCustomerInList(customerPreferred);
            customersPage.verifyPreferredIcon();
            customersPage.verifyCustomerInList(customerJoinAll);
            customersPage.verifyJoinAllIcon();
        });

        it(eachUser + " validates the Preferred Chip functionality.", function () {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            navigation.clickCustomersLink();
            navigation.typeInSearchFilterRecommendation(preferredChip);
            //Verify preferred customer and icon is visible.
            navigation.typeInSearchFilterRecommendation(customerPreferred);
            customersPage.verifyCustomerInList(customerPreferred);
            customersPage.verifyPreferredIcon();
            //Close the customer chip
            navigation.chipFilterCloseBtnArray.get(0).click();
            //Verify Join all customer is not visible.
            navigation.typeInSearchFilterRecommendation(customerJoinAll);
            customersPage.verifyCustomerIsNotInList(customerJoinAll);
        });

        it(eachUser + " validates the Preferred Chip functionality.", function () {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            var noActionNum = dashboardPage.noActionNoOfVehicle.getText().then(function (value) {
                return value
            });
            dashboardUtil.filterInDashboard('paccar', dashboardPreferredChip);
            dashboardUtil.validateNoNumChange(noActionNum);
        });
    });

    paccarUsers.forEach(function (eachUser) {
        //TC from qTest for Paccar Roles.
        it(eachUser + " validates customer chip has no changes on applying filters.", function () {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            navigation.clickCustomersLink();
            //get the total number of customers on the list.
            var numOfCustomers = navigation.totalNumber.getText().then(function (value) {
                return value
            });
            navigation.typeInSearchFilterRecommendation(preferredChip);
            //verify the number of customer remains the same
            navigation.validateTotalNumber(numOfCustomers);
        });
    });
});