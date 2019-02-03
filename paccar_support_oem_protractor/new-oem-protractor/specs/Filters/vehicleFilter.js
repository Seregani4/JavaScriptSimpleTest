/**
 * Edited by jstaffon on 8/30/2018 *
 */

describe("Verifying Filtering for Vehicle List Page -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var vehiclesPage = require('../../../pages/vehicles.page.js');
    var vehicleDetailPage = require('../../../pages/vehicledetail.page.js');
    var validationUtil = require('../../../utilities/validation.util.js');
    var tableUtil = require('../../../utilities/tables.util.js');
    var otaSubPage = require('../../../pages/otaSupscription.page.js');
    var subscriptionsPage = require('../../../pages/subscriptions.page.js');
    var devicesPage = require('../../../pages/devices.page.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var customerAdminEmail = browser.params.testuseremails.preferredcustomeradmin;
    var testCustomer = browser.params.testcustomer.name;
    var password = browser.params.adduser.password;
    var vin = browser.params.vehicle.vin;
    var otaVin = browser.params.vehicle.otavin2;
    var expVin = browser.params.vehicle.expiredSubscriptionVin;
    var input;
    
    browser.driver.manage().window().maximize();

    // var loginUserArray=[peoplenetAdminEmail,paccarAdminEmail,paccarUserEmail,dealerAdminEmail,dealerUserEmail,divisionUserEmail,
    //     factoryWorkerEmail,dealerTechEmail,customerAdminEmail,customerUserEmail];
    var loginUserArray = [peoplenetAdminEmail, paccarAdminEmail];
    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    loginUserArray.filter(function (eachUser) {

        it("Verify " + eachUser + " are able to filter Vehicles by recommendation", function () {

            console.log(eachUser);
            loginPage.get();
            loginPage.login('paccar', eachUser, password);

            navigation.clickVehiclesLink();
            //In Repair
            input = 'In Repair';
            navigation.chipFilter.sendKeys(input);
            browser.sleep(2000);
            navigation.chipFilterResults.get(1).click();
            //element.all(by.css('[ng-click="$mdAutocompleteCtrl.select($index)"]')).get(2).click();
            tableUtil.verifyColumn(input, vehiclesPage.columns.tableRecommendationColumn);
            navigation.chipFilterCloseBtn.click();

            //Stop Now
            input = 'Stop Now';
            navigation.chipFilter.sendKeys(input);
            browser.sleep(2000);
            navigation.chipFilterResults.get(1).click();
            //element.all(by.css('[ng-click="$mdAutocompleteCtrl.select($index)"]')).get(2).click();
            tableUtil.verifyColumn(input, vehiclesPage.columns.tableRecommendationColumn);
            navigation.chipFilterCloseBtn.click();

            //Kenworth
            input = 'Kenworth';
            navigation.chipFilter.sendKeys(input);
            browser.sleep(1000);
            navigation.chipFilterResults.get(1).click();
            //element.all(by.css('[ng-click="$mdAutocompleteCtrl.select($index)"]')).get(1).click();
            vehiclesPage.vehicleHeader.get(5).click(); //This will sort the list to show vehicles with MAKE field present.
            tableUtil.verifyColumn(input, vehiclesPage.columns.tableMakeColumn);
            navigation.chipFilterCloseBtn.click();

            //Peterbilt
            input = 'Peterbilt';
            navigation.chipFilter.sendKeys(input);
            browser.sleep(1000);
            navigation.chipFilterResults.get(1).click();
            //element.all(by.css('[ng-click="$mdAutocompleteCtrl.select($index)"]')).get(1).click();
            vehiclesPage.vehicleHeader.get(5).click(); //This will sort the list to show vehicles with MAKE field present.
            tableUtil.verifyColumn(input, vehiclesPage.columns.tableMakeColumn);
            navigation.chipFilterCloseBtn.click();


            navigation.logOut();
            browser.executeScript('window.localStorage.clear();');
        });
    });

    it('Validate apply filters saved by another users', function () {
        loginPage.get();
        loginPage.login('paccar', peoplenetAdminEmail, password);
        navigation.vehiclesLink.click();
        navigation.chipFilter.sendKeys('Automation Test Filter');
        navigation.chipFilter.sendKeys(protractor.Key.ENTER);
        navigation.manageSearchFilterButton.click();
        navigation.saveNewFilter.click();
        navigation.inputFilterName.sendKeys('Automation Test Filter');
        navigation.saveDialogButton.click();
        navigation.dashboardLink.click();
        navigation.userMenuButton.click();
        navigation.logoutBtn.click();
        loginPage.login('paccar', customerAdminEmail, password);
        navigation.vehiclesLink.click();
        navigation.manageSearchFilterButton.click();
        navigation.textFromManageSearchFilterDropDown.getText().then(function (text) {
            expect(text).not.toContain('Automation Test Filter', "User see created filter from other user");
        });
    });

    it('Vehicle - Drop Down Search/Filter TC-1661', function () {
        loginPage.get();
        loginPage.login('paccar', peoplenetAdminEmail, password);
        navigation.vehiclesLink.click();
        validationUtil.validateDropDownSearchAndFilters(navigation.chipFilterCustomersButton, testCustomer, 0, vehiclesPage.columns.tableCustomerColumn, true);
    });

    it("TC-2183 Validate - 'Inactive' filter type shouldn't ignored when 'Active' filter is present ", function () {
        loginPage.get();
        loginPage.login('paccar', peoplenetAdminEmail, password);
        navigation.vehiclesLink.click();
        navigation.typeInSearchFilter(vin);
        vehiclesPage.clickVehicleHyperlinkCellSearch(vin);
        navigation.clearAllFiltersButton.click();
        navigation.applyChipFilter("Statuses",'Active',1);
        navigation.applyChipFilter("Statuses",'Inactive',1);
        vehicleDetailPage.statusFromFaultLog.getText().then(function (status) {
            validationUtil.validateTextContainArray(status, 'Inactive');
        });
    });

    it('TC-2177 Verify enhanced vehicle guidance chip filter is an option in the Status chip drop-down', function () {
        loginPage.get();
        loginPage.login('paccar', peoplenetAdminEmail, password);
        navigation.clickVehiclesLink();
        navigation.typeInSearchFilter(vin);
        vehiclesPage.clickVehicleHyperlinkCellSearch(vin);
        navigation.chipFilterDropDownButton.click();
        navigation.chipFilterStatusesButton.click();
        navigation.chipFilterSuggestionDropDown.getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                'Active',
                'Inactive',
                'Enhanced Vehicle Guidance'
            ])
        });
    });

    it('TC-2177 Verify EVG chip applied by default when navigating to VIN from Vehicle list page', function(){
        loginPage.get();
        loginPage.login('paccar', peoplenetAdminEmail, password);
        navigation.clickVehiclesLink();
        navigation.typeInSearchFilter(vin);
        vehiclesPage.clickVehicleHyperlinkCellSearch(vin);
        vehiclesPage.verifyEvgChip(vin);
    });

    it('TC-2579 Verify EVG chip applied by default when navigating to VIN from OTA Subscription page', function(){
        loginPage.get();
        loginPage.login('paccar', peoplenetAdminEmail, password);
        navigation.otaSubscriptionLink.click();
        navigation.typeInSearchFilter(otaVin);
        otaSubPage.clickVehicleHyperlinkCellSearch(otaVin);
        vehiclesPage.verifyEvgChip(otaVin);
    });

    it('TC-2579 Verify EVG chip applied by default when navigating to VIN from Subscription page', function(){
        loginPage.get();
        loginPage.login('paccar', peoplenetAdminEmail, password);
        navigation.subscriptionsLink.click();
        navigation.typeInSearchFilter(expVin);
        subscriptionsPage.clickVehicleHyperlinkCellSearch(expVin);
        vehiclesPage.verifyEvgChip(expVin);
    });

    it('TC-2579 Verify EVG chip applied by default when navigating to VIN from Device List page', function(){
        loginPage.get();
        loginPage.login('paccar', peoplenetAdminEmail, password);
        navigation.devicesLink.click();
        navigation.typeInSearchFilter(vin);
        devicesPage.clickVehicleHyperlinkCellSearch(vin);
        vehiclesPage.verifyEvgChip(vin);
    });
});

