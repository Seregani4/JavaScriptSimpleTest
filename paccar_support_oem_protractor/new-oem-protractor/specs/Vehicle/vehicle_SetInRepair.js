/**
 * Created by Pshrestha on 1/5/2017.
 */

describe("Verify In Repair Status is set on vehicle -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var vehiclesPage = require('../../../pages/vehicles.page.js');
    var vehiclesDetailPage = require('../../../pages/vehicledetail.page.js');
    var vehicleUtil = require('../../../utilities/vehicle.util');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var paccarUserEmail = browser.params.testuseremails.paccaruser;
    var divisionUserEmail = browser.params.testuseremails.divisionuser;
    var factoryWorkerEmail = browser.params.testuseremails.factoryworker;
    var dealerAdminEmail = browser.params.testuseremails.dealeradmin;
    var dealerUserEmail = browser.params.testuseremails.dealeruser;
    var dealerTechEmail = browser.params.testuseremails.dealertech;
    var noAction = vehicleUtil.getNoActionStatus();
    var inRepair = vehicleUtil.getInRepairStatus();
    var informational = vehicleUtil.getInformationalStatus();
    var stopNow = vehicleUtil.getStopNowStatus();
    var serviceNow = vehicleUtil.getStopNowStatus();
    var serviceSoon = vehicleUtil.getServiceSoonStatus();
    var statusArray = [inRepair, informational, stopNow, serviceNow, serviceSoon, stopNow];
    var password = browser.params.adduser.password;
    //var vin = browser.params.vehicle.vin;
    var vin = '1NPXLP9XXGD323241';

    browser.driver.manage().window().maximize();

    afterEach(() => {
        browser.executeScript('window.localStorage.clear();');
    });

    var loginUserArray = [peoplenetAdminEmail, paccarAdminEmail, dealerAdminEmail, dealerUserEmail];

    loginUserArray.forEach(eachUser => {
        it(`Verify Users are able to see Set-In Repair option ${eachUser}`, () => {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            vehicleUtil.goToVehicleDetails(vin);
            //check and remove inRepair if status=inRepair before the test.
            vehiclesPage.recommendation.getText().then(status => {
                if (statusArray.indexOf(status) >= 0) {
                    vehicleUtil.cleanupVehicleStatus(status);
                }
            });
            browser.sleep(1000);
            navigation.moreOptionsButton.click();
            expect(vehiclesPage.setInRepairBtn.isDisplayed()).toBe(true, eachUser + ' is Unable to see the Set-In Repair Option.');
            browser.executeScript('window.localStorage.clear();');
        });
    });

    var loginUserArrayOne = [paccarUserEmail, divisionUserEmail, factoryWorkerEmail, dealerTechEmail];

    loginUserArrayOne.forEach(eachUser => {
        it(`Verify Users aren't able to see Set-In Repair option ${eachUser}`, () => {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            navigation.clickVehiclesLink();
            navigation.typeInSearchFilter(vin);
            if (eachUser === factoryWorkerEmail) {
                //Since factory workers cannot see Customer column.
                vehiclesPage.allVehicleRows.get(0).$$('td').get(6).click();
            } else {
                vehiclesPage.clickVehicleHyperlinkCellSearch(vin);
            }
            browser.sleep(2000);
            navigation.moreOptionsButton.click();
            vehiclesPage.setInRepairBtn.isPresent().then(bool => {
                if (bool === true) {
                    expect(vehiclesPage.setInRepairBtn.isDisplayed()).toBe(false, eachUser + ' is able to see the Set-In Repair Option.');
                } else {
                    expect(true).toBe(true);
                }
            });
            browser.executeScript('window.localStorage.clear();');
        });
    });

    loginUserArray.forEach(eachUser => {
        it(`Set a vehicle in In Repair status ${eachUser}`, () => {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            vehicleUtil.verifyVehicleStatus(vin, noAction);
            navigation.moreOptionsButton.click();
            browser.sleep(2000);
            vehiclesPage.setInRepairBtn.click();
            navigation.submitDialogButton.click();
            vehiclesDetailPage.verifyStatusOnDetailsPage('in repair');
        });

        it(`Verify In Repair status is set ${eachUser}`, () => {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            vehicleUtil.verifyVehicleStatus(vin, inRepair);
        });

        it(`Verify In Repair status is cleared and No Action icon is visible ${eachUser}`, () => {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            vehicleUtil.verifyVehicleStatus(vin, inRepair);
            vehicleUtil.cleanupVehicleStatus(inRepair);
        });
    });
});
