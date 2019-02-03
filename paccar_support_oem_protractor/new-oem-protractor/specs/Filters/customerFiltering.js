/**
 * Created by pshrestha on 7/28/2017.
 */

describe("Filtering Customers by Dealer Location, DOG and Dealer Region -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var customersPage = require('../../../pages/customers.page.js');
    var dealersPage = require('../../../pages/dealers.page.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var dealerAdminEmail = browser.params.testuseremails.dealeradmin;
    var dealerUserEmail = browser.params.testuseremails.dealeruser;
    var dealerOwnerAdmin = browser.params.testuseremails.dealerowneradmin;
    var dealerRegionAdmin = browser.params.testuseremails.dealerregionadmin;
    //Customer admin of preferred automation customer who has W009 as preferred dealer.
    var customerAdminEmail = browser.params.testuseremails.preferredcustomeradmin;
    var customer = browser.params.testpreferredcustomer.name;
    var password = browser.params.adduser.password;

    var firstDealerId = "peoplenet:dealer:" + browser.params.testdealer.id;
    var secondDealerId = "peoplenet:dealer:" + browser.params.testdealer2.id;
    var preferredDealers = [firstDealerId, secondDealerId];
    var customerData = [];
    customerData.dealerKeys = preferredDealers;


    //filter options
    var dealerShip = browser.params.testdealer.name;
    var dealerCode = browser.params.testdealer.code;
    var dealerCode2 = browser.params.testdealer2.code;
    var dog = browser.params.testdealerOwnerGroup.name;
    var dealerRegion = browser.params.testdealerRegion.name;

    browser.driver.manage().window().maximize();

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    var loginUsers = [paccarAdminEmail, dealerAdminEmail, dealerOwnerAdmin, dealerRegionAdmin, dealerUserEmail];
    var filterType = [dealerShip, dealerRegion, dog];

    it('Restore preferred dealer settings', function () {
        loginPage.get();
        loginPage.login('paccar', customerAdminEmail, password);
        customersPage.setCustomerPreferredDealersEndpoint(customerAdminEmail, customer, customerData)
    });

    loginUsers.forEach(function (eachUser) {
        //Filter by each type and the customer
        it(eachUser + " filters customer list", function () {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            navigation.clickCustomersLink();
            //Filter by each type as each user
            if (eachUser !== dealerAdminEmail && eachUser !== dealerUserEmail && eachUser !== dealerOwnerAdmin) {
                filterType.forEach(function (eachType) {
                    navigation.typeInSearchFilterRecommendation(eachType);
                    navigation.typeInSearchFilterRecommendation(customer);
                    //verify the customer is visible
                    customersPage.verifyCustomerInList(customer);
                    navigation.clearAllFiltersButton.click();
                });
            }
            else {
                navigation.typeInSearchFilterRecommendation(customer);
                //verify the customer is visible
                customersPage.verifyCustomerInList(customer);
                navigation.clearAllFiltersButton.click();
            }

        });

        //Filter by all three types and the customer
        it(eachUser + " filters customer list with all three search params", function () {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            navigation.clickCustomersLink();
            if (eachUser !== dealerAdminEmail && eachUser !== dealerUserEmail) {
                navigation.typeInSearchFilterRecommendation(dealerShip);
            }
            navigation.typeInSearchFilterRecommendation(dealerRegion);
            navigation.typeInSearchFilterRecommendation(dog);
            navigation.typeInSearchFilterRecommendation(customer);
            //verify the customer is visible
            customersPage.verifyCustomerInList(customer);
            navigation.clearAllFiltersButton.click();
        });

    });

    it("Customer Admin removes the primary dealer", function () {
        loginPage.get();
        loginPage.login('paccar', customerAdminEmail, password);
        //fleet health child links present
        navigation.clickDealersLink();
        navigation.typeInSearchFilter(dealerCode);
        dealersPage.clickDealerHyperlinkCellSearch(dealerCode);
        //remove preferred
        dealersPage.uncheckPreferredDealerCheckbox();
        navigation.clickDealersLink();
        navigation.clearAllFiltersButton.click();
        navigation.typeInSearchFilter(dealerCode2);
        dealersPage.clickDealerHyperlinkCellSearch(dealerCode2);
        //remove preferred
        dealersPage.uncheckPreferredDealerCheckbox();
        navigation.clickDashboardLink();

    });

    loginUsers.forEach(function (eachUser) {

        it(eachUser + " filters customer list with", function () {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            navigation.clickCustomersLink();
            navigation.clearAllFiltersButton.click();
            if (eachUser !== dealerAdminEmail && eachUser !== dealerUserEmail) {
                filterType.forEach(function (eachType) {
                    navigation.typeInSearchFilterRecommendation(eachType);
                    navigation.typeInSearchFilterRecommendation(customer);
                    //verify the customer is not visible
                    customersPage.verifyCustomerIsNotInList(customer);
                    navigation.clearAllFiltersButton.click();
                });
            }
            else {
                navigation.clearAllFiltersButton.click();
                navigation.typeInSearchFilterRecommendation(customer);
                //verify the customer is not visible
                customersPage.verifyCustomerIsNotInList(customer);
                navigation.clearAllFiltersButton.click();
            }
        });
    });

    it("Customer Admin add the primary dealer back", function () {
        loginPage.get();
        loginPage.login('paccar', customerAdminEmail, password);
        //fleet health child links present
        navigation.clickDealersLink();
        navigation.typeInSearchFilter(dealerCode);
        dealersPage.clickDealerHyperlinkCellSearch(dealerCode);
        //add as preferred dealer
        dealersPage.checkPreferredDealerCheckbox();
        navigation.clickDealersLink();
        navigation.clearAllFiltersButton.click();
        navigation.typeInSearchFilter(dealerCode2);
        dealersPage.clickDealerHyperlinkCellSearch(dealerCode2);
        //add as preferred dealer
        dealersPage.checkPreferredDealerCheckbox();
        navigation.clickDashboardLink();
    });
});