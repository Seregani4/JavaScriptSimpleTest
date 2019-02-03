describe("Edit Vehicle -----> ", function () {

    var navigation = require('../../../pages/navigation.page.js');
    var loginPage = require('../../../pages/login.page.js');
    var vehiclesPage = require('../../../pages/vehicles.page.js');
    var validationUtil = require('../../../utilities/validation.util.js');
    var dealerOwnerGroupsPage = require('../../../pages/dealerOwnerGroup.page.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var dealerowneradmin = browser.params.testuseremails.dealerowneradmin;
    var dealerregionadmin = browser.params.testuseremails.dealerregionadmin;
    var dealerAdminEmail = browser.params.testuseremails.dealeradmin;
    var dealerUserEmail = browser.params.testuseremails.dealeruser;
    var customerAdminEmail = browser.params.testuseremails.preferredcustomeradmin;
    var password = browser.params.adduser.password;
    //var vehicleVin = browser.params.vehicle.vin;
    //Updated according to PVP-3174. Only vehicle with preferred dealer can be used
    var vin = browser.params.vehicle.preferredVin;
    var unitNumber = browser.params.vehicle.unitnumber;
    var description = browser.params.vehicle.description;
    var testUnitNumber = 'TESTUNITNUMBER123';
    var testDescription = 'Test Out for maintenance.';
    var primaryVin = browser.params.vehicle.primaryVin;
    var dealerName = browser.params.testdealer.name;
    var testOwnerGroup = browser.params.testdealerOwnerGroup.name;


    browser.driver.manage().window().maximize();

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });
    var loginUserArray = [peoplenetAdminEmail, paccarAdminEmail, dealerowneradmin, dealerregionadmin, dealerAdminEmail, dealerUserEmail, customerAdminEmail];
    var loginUserArray2 = [dealerowneradmin, dealerregionadmin, dealerAdminEmail];

    loginUserArray.filter(function (eachUser) {
        it("Appropriate vehicle fields can be edited by " + eachUser, function () {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);

            navigation.clickVehiclesLink();
            navigation.typeInSearchFilter(vin);
            vehiclesPage.clickVehicleMoreOptions(vin);
            vehiclesPage.editMoreOptionsButton.click();
            vehiclesPage.editUnitNumber(testUnitNumber);
            vehiclesPage.editDescription(testDescription);
            vehiclesPage.clickSaveBtn(vin);
            vehiclesPage.validateEditedFields(testDescription, testUnitNumber);
        });

        it("Reset the vehicle fields that were edited" + eachUser, function () {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);

            navigation.clickVehiclesLink();
            navigation.typeInSearchFilter(vin);
            vehiclesPage.clickVehicleMoreOptions(vin);
            vehiclesPage.editMoreOptionsButton.click();
            vehiclesPage.editUnitNumber(unitNumber);
            vehiclesPage.editDescription(description);
            vehiclesPage.clickSaveBtn(vin);
            vehiclesPage.validateEditedFields(description, unitNumber);
        });
    });

    loginUserArray2.filter(function (eachUser) {
        it(" TC-2250 Validate " + eachUser + "permission for edit vehicle", function () {
            var locationList;
            var symbolsNumber = 20;
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            if (eachUser === dealerowneradmin) {
                navigation.clickDealerOwnerGroupsLink();
                dealerOwnerGroupsPage.clickDealerGroupHyperlinkCellSearch(testOwnerGroup);
                dealerOwnerGroupsPage.locationTab.click();
                navigation.pageSizeButton.click();
                navigation.pageFiftyButton.click()
                    .then(function () {
                        return dealerOwnerGroupsPage.allLocationNames.getText()
                    })
                    .then(function (text) {
                        return locationList = text;
                    })
                    .then(function () {
                        validationUtil.validatePrimaryDealerPermission(primaryVin, eachUser);
                        vehiclesPage.primaryDealerField.clear();
                        vehiclesPage.primaryDealerField.sendKeys(dealerName.substring(0, dealerName.length - symbolsNumber));
                        return vehiclesPage.dealerOptions.getText()
                    })
                    .then(function (text) {
                        validationUtil.validateTextContainArray(locationList, text);
                    })
            } else {
                validationUtil.validatePrimaryDealerPermission(primaryVin, eachUser);
                vehiclesPage.primaryDealerField.clear();
                vehiclesPage.primaryDealerField.sendKeys(dealerName.substring(0, dealerName.length - symbolsNumber));
                expect(vehiclesPage.dealerOptions.count()).toBe(1, "Invalid dealers suggestion count ");
                expect(vehiclesPage.dealerOptions.first().getText()).toBe(dealerName, "Invalid dealers suggestion");
            }

        });
    });

});