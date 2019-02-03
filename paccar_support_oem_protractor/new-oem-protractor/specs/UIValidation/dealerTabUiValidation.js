/**
 * Created by pshrestha on 5/25/2017.
 */

describe("Verify Users are not able to see the Authorized Dealers Tab for each ROLE -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var vehiclesPage = require('../../../pages/vehicles.page.js');
    var vehiclesDetailPage = require('../../../pages/vehicledetail.page.js');
    var vehicleDetailPage = require('../../../pages/vehicledetail.page.js');
    var faultDetailsPage = require('../../../pages/fault.details.page.js');
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var dealerAdminEmail = browser.params.testuseremails.dealeradmin;
    var dealerOwnerAdmin = browser.params.testuseremails.dealerowneradmin;
    var dealerRegionAdmin = browser.params.testuseremails.dealerregionadmin;
    var dealerTechEmail = browser.params.testuseremails.dealertech;
    var factoryWorkerEmail = browser.params.testuseremails.factoryworker;
    var password = browser.params.adduser.password;
    var vin = browser.params.vehicle.vin;

    browser.driver.manage().window().maximize();

    afterEach(function () {
        browser.executeScript('window.localStorage.clear();');
    });

    it("Remove any recommendation from the vehicle before the test", function () {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.clickVehiclesLink();
        navigation.typeInSearchFilter(vin);
        vehiclesPage.clickVehicleHyperlinkCellSearch(vin);
        //check and remove inRepair before the test.
        vehiclesPage.recommendation.getText().then(function (status) {
            //console.log(status); //used to debug
            if (status === 'In Repair') {
                navigation.moreOptionsButton.click();
                vehiclesPage.removeInRepairBtn.click();
                navigation.submitDialogButton.click();
                browser.sleep(3000);
                vehiclesPage.recommendation.getText().then(function (status) {
                    if (status === 'Informational' || status === 'Stop Now' || status === 'Service Now' || status === 'Service Soon') {
                        navigation.moreOptionsButton.click();
                        vehiclesPage.clearActiveFaultsBtn.click();
                        navigation.submitDialogButton.click();
                        browser.sleep(5000);
                    }
                });
            }
            if (status === 'Informational' || status === 'Stop Now' || status === 'Service Now' || status === 'Service Soon') {
                navigation.moreOptionsButton.click();
                vehiclesPage.clearActiveFaultsBtn.click();
                navigation.submitDialogButton.click();
                browser.sleep(5000);
            }
        });
        navigation.clickVehiclesLink();
        navigation.typeInSearchFilter(vin);
        vehiclesPage.verifyStatusOnVehicle('No Action');
        vehiclesPage.clickVehicleHyperlinkCellSearch(vin);
        vehiclesPage.verifyCorrectVehicleDetailPage(vin);
        vehiclesDetailPage.verifyStatusOnDetailsPage('no action');
        vehiclesDetailPage.verifyStatusIconOnVehicleDetailsPage('no action');
    });

    it("Verify Service Now fault is set", function () {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        //Trigger service now fault for verification.
        vehiclesPage.triggerFault('service now');
        navigation.clickVehiclesLink();
        navigation.typeInSearchFilter(vin);
        vehiclesPage.verifyStatusOnVehicle('Service Now');
        vehiclesPage.clickVehicleHyperlinkCellSearch(vin);
        vehiclesPage.verifyCorrectVehicleDetailPage(vin);
        vehiclesDetailPage.verifyStatusOnDetailsPage('service now');
        vehiclesDetailPage.verifyStatusIconOnVehicleDetailsPage('service now');
    });

    var userArray = [paccarAdminEmail, dealerAdminEmail, dealerOwnerAdmin, dealerRegionAdmin, dealerTechEmail, factoryWorkerEmail];
    userArray.filter(function (eachUser) {
        it("Verify visibility of the Authorized dealer tab as " + eachUser, function () {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            navigation.clickVehiclesLink();
            navigation.typeInSearchFilter(vin);
            browser.sleep(2000);
            if (eachUser === factoryWorkerEmail) {
                vehiclesPage.factoryWorkerVerifyStatusOnVehicle('Service Now');
                vehiclesPage.factoryWorkerClickVehicleHyperlink(vin);
                vehicleDetailPage.faultDetailsButton.get(0).click();
                expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/faults/peoplenet:faultlog');
                faultDetailsPage.verifyAuthorizedDealerTabNotPresent();
            }
            else {
                vehiclesPage.verifyStatusOnVehicle('Service Now');
                vehiclesPage.clickVehicleHyperlinkCellSearch(vin);
                vehicleDetailPage.faultDetailsButton.get(0).click();
                expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/faults/peoplenet:faultlog');
                faultDetailsPage.verifyTabsOnFaultDetailPage();
                faultDetailsPage.authorizedDealerTab.click();
            }
        });
    });

    it("Verify Service Now fault is cleared", function () {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.clickVehiclesLink();
        navigation.typeInSearchFilter(vin);
        vehiclesPage.verifyStatusOnVehicle('Service Now');
        vehiclesPage.clickVehicleHyperlinkCellSearch(vin);
        vehiclesPage.verifyCorrectVehicleDetailPage(vin);
        vehiclesDetailPage.verifyStatusOnDetailsPage('service now');
        navigation.moreOptionsButton.click();
        vehiclesPage.clearActiveFaultsBtn.click();
        vehiclesPage.confirmBtn.click();
        //Verify the fault gets removed.
        vehiclesDetailPage.verifyStatusOnDetailsPage('no action');
        vehiclesDetailPage.verifyStatusIconOnVehicleDetailsPage('no action');
        navigation.clickVehiclesLink();
        navigation.typeInSearchFilter(vin);
        vehiclesPage.verifyStatusOnVehicle('No Action');
    });
});