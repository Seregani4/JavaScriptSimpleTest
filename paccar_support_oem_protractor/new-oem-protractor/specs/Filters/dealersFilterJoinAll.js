/**
 * Created by pshrestha on 10/24/2017.
 */

describe("Validate customer visibility based on type filter -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var customersPage = require('../../../pages/customers.page.js');
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var paccarUser = browser.params.testuseremails.paccaruser;
    var dealerAdminEmail = browser.params.testuseremails.dealeradmin;
    var dealerUserEmail = browser.params.testuseremails.dealeruser;
    var dealerOwnerAdmin = browser.params.testuseremails.dealerowneradmin;
    var dealerOwnerUser = browser.params.testuseremails.dealerowneruser;
    var dealerRegionAdmin = browser.params.testuseremails.dealerregionadmin;
    var dealerRegionUser = browser.params.testuseremails.dealerregionuser;
    var dealerTech = browser.params.testuseremails.dealertech;
    var customerJoinAll = browser.params.testcustomer.name;
    var customerRegular = browser.params.testregularcustomer.name;
    //Chip filter for customer type
    var joinAllChip = browser.params.customertype.joinall;
    var password = browser.params.adduser.password;

    browser.driver.manage().window().maximize();

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    var dealerUsers = [paccarAdminEmail, paccarUser, dealerAdminEmail, dealerOwnerAdmin, dealerRegionAdmin,
        dealerUserEmail, dealerOwnerUser, dealerRegionUser, dealerTech];

    dealerUsers.forEach(function (eachUser) {

        it(eachUser + " validates the Preferred Chip functionality.", function () {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            navigation.clickCustomersLink();
            navigation.typeInSearchFilterRecommendation(joinAllChip);
            //Verify preferred customer and icon is visible.
            navigation.typeInSearchFilterRecommendation(customerRegular);
            customersPage.verifyCustomerIsNotInList(customerRegular);
            //Close the customer chip
            navigation.chipFilterCloseBtnArray.get(0).click();
            //Verify Join all customer is not visible.
            navigation.typeInSearchFilterRecommendation(customerJoinAll);
            customersPage.verifyCustomerInList(customerJoinAll);
            customersPage.verifyJoinAllIcon();
        });
    });
});