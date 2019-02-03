/**
 * Created by pshrestha on 7/12/2017.
 */

describe("Verify Ownership Transfer is set on vehicle -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var vehiclesPage = require('../../../pages/vehicles.page.js');
    var customersPage = require('../../../pages/customers.page.js');
    var customerUtil = require('../../../utilities/customer.util.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var prefCustomerAdminEmail = browser.params.testuseremails.preferredcustomeradmin;
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var dealerAdminEmail = browser.params.testuseremails.dealeradmin;
    var dealerOwnerAdmin = browser.params.testuseremails.dealerowneradmin;
    var dealerRegionAdmin = browser.params.testuseremails.dealerregionadmin;
    var dealerRegionAdmin1 = browser.params.testuseremails.dealerregionadmin2;
    var password = browser.params.adduser.password;
    var vin = '1XKYDP9X2GJ980131';
    var owner = browser.params.testcustomer.name; //has no preferred dealers.
    var ownerId = browser.params.testcustomer.uid; //has no preferred dealers.
    var secondOwner = browser.params.testpreferredcustomer.name; //W009 and W065 as preferred dealers.
    var thirdOwner =  browser.params.testcustomer2.name; //Has W009 as Preferred Dealer.
    var firstDealerid = "peoplenet:dealer:" + browser.params.testdealer.id;
    var secondDealerid = "peoplenet:dealer:" + browser.params.testdealer2.id;
    var preferredDealers = [firstDealerid, secondDealerid];
    var customerData = [];
    customerData.dealerKeys = preferredDealers;

    /*
     * NOTE: Transfer Ownership does not go through when transferring a Vehicle with no dealer key. BUG PVP-3247.
     * dealerRegionAdmin1 cannot Transfer ownership from "thirdOwner" since the Dealership is not in
     * it's region (Automation Region 2).
     * */

    browser.driver.manage().window().maximize();

    afterEach(function () {
        browser.executeScript('window.localStorage.clear();');
    });

    var userLoginArray =
        [paccarAdminEmail, dealerAdminEmail, dealerOwnerAdmin, dealerRegionAdmin, peoplenetAdminEmail, dealerRegionAdmin1];

    userLoginArray.filter(function (eachUser) {

        it(eachUser + " transfers ownership on a vehicle", function () {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);

            navigation.clickVehiclesLink();
            navigation.typeInSearchFilter(vin);
            vehiclesPage.clickVehicleHyperlinkCellSearch(vin);

            browser.sleep(1000);
            if (eachUser === paccarAdminEmail) {
                customerUtil.transferOwnership(secondOwner);
            } else if (eachUser === dealerAdminEmail || eachUser === dealerRegionAdmin) {
                customerUtil.transferOwnership(thirdOwner);
            } else if (eachUser === dealerOwnerAdmin) {
                customerUtil.transferOwnership(secondOwner);
            } else if (eachUser === peoplenetAdminEmail) {
                customerUtil.transferOwnership(owner);
            } else {
                expect(vehiclesPage.editVehicleActionBarButton.isPresent()).toBe(false,
                    'Edit button is present for a dealer with no connection to the vehicle.');
                navigation.moreOptionsButton.click();
                expect(vehiclesPage.transferOwnershipBtn.isPresent()).toBe(false,
                    'Dealer admin who is not preferred can see the Transfer Ownership Button.')
            }
        });
    });

    it('Restore the ownership history and verify', function () {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        //clears the ownership history
        vehiclesPage.clearOwnershipHistoryAssignCustomer(vin,ownerId);
        navigation.clickVehiclesLink();
        navigation.typeInSearchFilter(vin);
        vehiclesPage.clickVehicleHyperlinkCellSearch(vin);
        vehiclesPage.validateCustomerName(owner);
    });

    it('Restore preferred dealer settings', function () {
        loginPage.get();
        loginPage.login('paccar', prefCustomerAdminEmail, password);
        customersPage.setCustomerPreferredDealersEndpoint(prefCustomerAdminEmail, secondOwner, customerData)
    })
});