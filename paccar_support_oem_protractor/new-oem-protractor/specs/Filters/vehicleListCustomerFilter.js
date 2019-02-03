/**
 * Created by pshrestha on 8/15/2017.
 */

describe("Verifying Filtering for Customer and VG on Vehicle List Page -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var vehiclesPage = require('../../../pages/vehicles.page.js');
    var vehicleUtil = require('../../../utilities/vehicle.util.js');
    var customersPage = require('../../../pages/customers.page.js');
    var customerUtil = require('../../../utilities/customer.util.js');
    var chipFilterUtil = require('../../../utilities/chipFilterMatrix.utils.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var dealerAdminEmail = browser.params.testuseremails.dealeradmin;
    var dealerOwnerAdmin = browser.params.testuseremails.dealerowneradmin;
    var dealerRegionAdmin = browser.params.testuseremails.dealerregionadmin;
    //need to use preferred CA
    var customerAdminEmail = browser.params.testuseremails.preferredcustomeradmin;
    var customer = browser.params.testpreferredcustomer.name;
    var vehicleGroup2 = browser.params.vehiclegroup.name3;
    var password = browser.params.adduser.password;

    browser.driver.manage().window().maximize();

    var loginUserArray = [peoplenetAdminEmail, paccarAdminEmail, dealerAdminEmail, dealerOwnerAdmin, dealerRegionAdmin
        , customerAdminEmail];
    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    loginUserArray.forEach(function (eachUser) {

        it('Filter by ' + customer + ' and validate the name and number of vehicles as--> ' + eachUser, function () {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            navigation.clickVehiclesLink();
            if (eachUser !== customerAdminEmail) {
                vehicleUtil.vehicleListCustomerSearch(customer); //need condition for CAs (not filter for customer name)
            }
            //validate the numbers match up.
            vehiclesPage.allVehicleRows.count().then(function (noOfVehicles) {
                customerUtil.goToCustomerDetails(customer, eachUser);
                customersPage.clickManageVehiclesTab();
                if (eachUser !== customerAdminEmail) {
                    customerUtil.viewAvailableVehicles();
                }
                expect(customersPage.allVehicleRows.count()).toEqual(noOfVehicles, 'The no. of vehicles does not match.');
            });
        });
    });

    loginUserArray.forEach(function (eachUser) {
        it('Filter by ' + vehicleGroup2 + ' and validate the customer name and number of vehicles as--> ' + eachUser, function () {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            navigation.clickVehiclesLink();
            if (eachUser !== customerAdminEmail) {
                navigation.typeInSearchFilterRecommendation(customer); //need condition for CAs (not filter for customer name)
            }
            navigation.applyChipFilter(chipFilterUtil.customerVehicleGroups, vehicleGroup2, 1);
            vehiclesPage.verifyCustomerName(customer);
            //validate the numbers match up.
            vehiclesPage.allVehicleRows.count().then(function (noOfVehicles) {
                customerUtil.goToCustomerDetails(customer, eachUser);
                customersPage.clickManageVehiclesTab();
                if (eachUser !== customerAdminEmail) {
                    //select the VG
                    customersPage.vehicleListDropdown.click();
                    customersPage.vehicleListTypes.get(1).click();
                }
                //select the "Selected" option
                customerUtil.viewAvailableVehicles();
                expect(customersPage.allVehicleRows.count())
                    .toEqual(noOfVehicles, 'The no. of vehicles does not match.');
            });
        });
    });
});
