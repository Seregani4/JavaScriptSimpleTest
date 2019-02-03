/**
 * Created by tbui on 3/15/2016.
 */

describe("Vehicle - E2E Vehicle Validations -----> ", function () {

    var navigation = require('../../../pages/navigation.page');
    var loginPage = require('../../../pages/login.page');
    var customersPage = require('../../../pages/customers.page');
    var usersPage = require('../../../pages/users.page');
    var remoteDiagnostics = require('../../../pages/remoteDiagnostics.page');
    var vehiclesPage = require('../../../pages/vehicles.page');
    var vehicleUtil = require('../../../utilities/vehicle.util');
    var customerUtil = require('../../../utilities/customer.util');
    var validationUtil = require('../../../utilities/validation.util');
    var toastUtil = require('../../../utilities/toastMessage.util');
    var tablesUtil = require('../../../utilities/tables.util');
    var chipFilterMatrix = require('../../../utilities/chipFilterMatrix.utils');
    var superAdmin = browser.params.testuseremails.superadmin;
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var dealerAdminEmail = browser.params.testuseremails.dealeradmin;
    var dealerUserEmail = browser.params.testuseremails.dealeruser;
    var dealerOwnerAdmin = browser.params.testuseremails.dealerowneradmin;
    var dealerRegionAdmin = browser.params.testuseremails.dealerregionadmin;
    var dealerTechEmail = browser.params.testuseremails.dealertech;
    var customerAdminEmail = browser.params.testuseremails.customeradmin;
    var password = browser.params.adduser.password;
    var password2 = browser.params.adduser.password2;
    var superVin = browser.params.vehicle.vin5;
    var vehicleVin = browser.params.vehicle.vin2;
    var vinForDealersSearch = browser.params.vehicle.vinForDealersSearch;
    var vin = browser.params.vehicle.vin3; //used as a invalid VIN
    var testVin = browser.params.vehicle.vin3;
    var unitNumber = browser.params.vehicle.unitnumber;
    var description = browser.params.vehicle.description;
    var testUnitNumber = 'TESTUNITNUMBER123';
    var testDescription = 'Out for maintenance.';
    var testDealer = browser.params.testdealer.name;
    var testDealer2 = browser.params.testdealer2.name;
    var incorrectDealer = 'Incorrect Primary Dealer';
    var customerName = browser.params.testcustomer.name;
    var dealerCode = browser.params.testdealer.code;

    browser.driver.manage().window().maximize();

    beforeEach(function () {
        // Get a fresh Angular "session" so we can avoid bootstrapping errors
        browser.driver.get("about:blank");
        browser.sleep(1000);
    });

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("Appropriate vehicle fields can be edited", function () {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.clickThisGlobalSearchResult(vehicleVin, 'Vehicle');

        //edit and save fields
        vehiclesPage.editVehicleFields(testUnitNumber, testDescription, vehicleVin);
        //clean up - set fields back to default
        vehiclesPage.editVehicleFields(unitNumber, description, vehicleVin);
    });

    it("Paccar Admin can assign vehicle to a customer", function () {
        //Set up customer w/ new vehicle as PA
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);

        customerUtil.goToCustomerDetails(customerName, paccarAdminEmail);
        customersPage.findAndAssignVehicleToCustomer(vehicleVin);
        navigation.logOut();
        //Log in w/ customer user and validate vehicle is viewable
        loginPage.get();
        loginPage.login('paccar', customerAdminEmail, password);

        navigation.clickVehiclesLink();
        vehicleUtil.verifyVehicleExist(vehicleVin);
    });

    it("Set Preferred Dealer as Customer Admin", function () {
        loginPage.get();
        loginPage.login('paccar', customerAdminEmail, password);
        customerUtil.preferredDealerEdit(dealerCode, 'prefer');
    });

    it("Dealer Admin can't assign invalid vehicle to customer", function () {
        //Initial negative case: Dealer cannot add unowned vehicle to customer
        loginPage.get();
        loginPage.login('paccar', dealerAdminEmail, password);

        customerUtil.goToCustomerDetails(customerName, dealerAdminEmail);
        customersPage.clickManageVehiclesTab();
        //After the dealer rule change Dealer roles cannot view VINs that do not have them set as Primary dealers.
        customersPage.cannotAssignVehicle(vin);
        navigation.clickThisGlobalSearchResult(vehicleVin, 'Vehicle');
        vehiclesPage.validateDealerInfo(dealerCode, 'no');
    });

    it("Unset Preferred Dealer as Customer Admin", function () {
        loginPage.get();
        loginPage.login('paccar', customerAdminEmail, password);
        customerUtil.preferredDealerEdit(dealerCode, 'removePrefer');
    });


    it('Clean up: Remove vehicle from customer', function () {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);

        customerUtil.goToCustomerDetails(customerName, paccarAdminEmail);
        customersPage.findAndUnassignVehicleFromCustomer(vehicleVin);
        //Clean up: Remove primary dealer from vehicle
        navigation.clickThisGlobalSearchResult(vehicleVin, 'Vehicle');
        vehiclesPage.editVehicleActionBarButton.click();
        vehiclesPage.clearPrimaryDealer();
        vehiclesPage.clickSaveBtn(vehicleVin);
        vehiclesPage.validateDealerInfo(dealerCode, 'no');
        vehiclesPage.validateCustomerInfo(customerName, 'no');
    });

    it('User must see vehicle according to his access', function () {
        loginPage.get();
        loginPage.login('paccar', dealerAdminEmail, password);
        navigation.vehiclesLink.click();
        navigation.chipFilterDropDownButton.click();
        navigation.chipFilterVehiclesButton.click();
        navigation.chipFilter.sendKeys(vinForDealersSearch);
        expect(navigation.chipFilterSuggestionDropDown.count()).toBe(1, "Suggestion displayed for invalid vehicle");
        expect(navigation.chipFilterSuggestionDropDown.last().isDisplayed()).toBe(true, "DropDown list wasn't open");
        expect(navigation.chipFilterSuggestionDropDown.first().getText()).toContain('search', "DropDown list was open, but without search row");
    });

    it('TC-2273 List of suggestions after selecting "Vehicles" filter type contains vehicles which are not available for logged in user', function () {

        var loginUserArray = [dealerAdminEmail, dealerUserEmail, dealerOwnerAdmin, dealerRegionAdmin, dealerTechEmail, customerAdminEmail];

        loginPage.get();
        loginPage.login('paccar', superAdmin, password2);
        navigation.vehiclesLink.click();
        navigation.applyChipFilter(chipFilterMatrix.vehicles, superVin, 1);
        vehiclesPage.clickVehicleHyperlinkCellSearch(superVin);
        browser.executeScript('window.localStorage.clear();');

        loginUserArray.forEach(function (eachUser) {

            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            navigation.vehiclesLink.click();
            navigation.chipFilter.sendKeys(superVin);
            expect(navigation.secondElementSuggestionDropDown.isPresent()).toBe(false, eachUser + ' can see VIN');
            browser.executeScript('window.localStorage.clear();');

        });
    });

    it('TC-2403 Validate count of rows per page ', function () {
        loginPage.get();
        loginPage.login('paccar', superAdmin, password2);
        navigation.vehiclesLink.click();
        remoteDiagnostics.removalCategoryDropDown.click();
        navigation.pageTwentyFiveButton.click();
        navigation.waitTillElementToBeClickable(usersPage.checkBoxes.last());
        expect(usersPage.checkBoxes.count()).toBe(26, 'wrong count');
        remoteDiagnostics.removalCategoryDropDown.click();
        navigation.pageFiftyButton.click();
        navigation.waitTillElementToBeClickable(usersPage.checkBoxes.last());
        expect(usersPage.checkBoxes.count()).toBe(51, 'wrong count');
        browser.get(`${browser.params.environment.url}/#/nav/vehicle/list/?page=0&pageSize=500&density=high`);
        navigation.waitTillElementToBeClickable(usersPage.checkBoxes.last());
        expect(usersPage.checkBoxes.count()).toBe(501, 'wrong count');
    });

    it(`TC-2614-1 Validate functionality set primary dealer as ${superAdmin}`, () => {
        loginPage.get();
        loginPage.login('paccar', superAdmin, password2);
        navigation.clickVehiclesLink();
        navigation.typeInSearchFilter(vehicleVin);
        vehiclesPage.clickVehicleHyperlinkCellSearch(vehicleVin);
        vehiclesPage.clickEditVehicleBtn(vehicleVin);
        vehiclesPage.primaryDealerField.clear();
        vehiclesPage.setPrimaryDealer(testDealer);
        vehiclesPage.clickSaveBtn(vehicleVin);
        vehiclesPage.clickEditVehicleBtn(vehicleVin);
        vehiclesPage.primaryDealerFieldText.getAttribute('value')
            .then(text => {
                validationUtil.validateTextContainArray(text, testDealer)
            })
    });

    it(`TC-2614-2 Validate successful and error toast`, () => {
        loginPage.get();
        loginPage.login('paccar', dealerOwnerAdmin, password);
        navigation.clickVehiclesLink();
        navigation.typeInSearchFilter(testVin);
        vehiclesPage.clickVehicleHyperlinkCellSearch(testVin);
        vehiclesPage.clickEditVehicleBtn(testVin);
        vehiclesPage.primaryDealerField.clear();
        vehiclesPage.setPrimaryDealer(testDealer2);
        vehiclesPage.vehicleSaveBtn.click();
        toastUtil.verifyToastAlert(`${testVin} has been updated`);
        vehiclesPage.clickEditVehicleBtn(testVin);
        vehiclesPage.primaryDealerField.clear();
        vehiclesPage.primaryDealerField.sendKeys(incorrectDealer);
        vehiclesPage.vehicleSaveBtn.click();
        toastUtil.verifyToastAlert(`Provided Primary Dealer name is not valid.`);
        vehiclesPage.cancelBtn.click();
        vehiclesPage.clickEditVehicleBtn(testVin);
        vehiclesPage.primaryDealerFieldText.getAttribute('value')
            .then(text => {
                validationUtil.validateTextContainArray(text, testDealer2);
            })
    });

    it(`TC-2645 Unit number with ";" should be found in the list`, () => {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.clickVehiclesLink();
        navigation.applyChipFilter(chipFilterMatrix.unitNumber, 'semi-colon;', 1);
        tablesUtil.verifyTableData();
    });

    it('TC-2797 Filter Predicted Options', () => {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.clickVehiclesLink();
        navigation.applyChipFilter(chipFilterMatrix.customers, testDealer2, 1);
        var vehicleOnPage;
        vehiclesPage.textFromVinRows.getText()
            .then(text => {
                vehicleOnPage = text;
                navigation.chipFilterDropDownButton.click();
                navigation.waitTillElementToBeClickable(navigation.chipFilterDropDown.get(0));
                navigation.selectChipFilterByText(chipFilterMatrix.vehicles);
                return vehiclesPage.textFromSuggestions.getText()
            })
            .then(vehicleOnSuggestion => {
                validationUtil.validateTextContainArray(vehicleOnPage, vehicleOnSuggestion);
            });
    });
});