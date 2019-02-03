/**
 * Created by pshrestha on 9/22/2017.
 */

//PVP-2919
describe("Verify Permission to Device Support Options on Vehicle Details Page -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var vehiclesPage = require('../../../pages/vehicles.page.js');
    var deviceDetailPage = require('../../../pages/device.details.page.js');
    var deviceListPage = require('../../../pages/devices.page.js');
    var toastMessageUtil = require('../../../utilities/toastMessage.util.js');
    var peoplenetAdmin = browser.params.testuseremails.peoplenetadmin;
    var paccarAdmin = browser.params.testuseremails.paccaradmin;
    var paccarUser = browser.params.testuseremails.paccaruser;
    var factoryWorker = browser.params.testuseremails.factoryworker;
    var dealerAdmin = browser.params.testuseremails.dealeradmin;
    var dealerUser = browser.params.testuseremails.dealeruser;
    var dealerTech = browser.params.testuseremails.dealertech;
    var dealerOwnerAdmin = browser.params.testuseremails.dealerowneradmin;
    var dealerRegionAdmin = browser.params.testuseremails.dealerregionadmin;
    var password = browser.params.adduser.password;
    var vin = browser.params.vehicle.realdatavin2;
    /*
    * Note: This DSN is available in all environments.
    * Should be only used in this particular test.
    * DO NOT ADD IN CONFIG AND USE IN OTHER TESTS.
    * */
    var dsn = '7578365';
    var stringType = 'Device';
    var hardReboot = 'Hard Reboot';

    var loginUserArray = [paccarAdmin, paccarUser, factoryWorker, dealerAdmin, dealerUser, dealerTech,
        dealerOwnerAdmin, dealerRegionAdmin];
    var randomUser = loginUserArray[Math.floor(Math.random() * loginUserArray.length)];

    browser.driver.manage().window().maximize();

    afterEach(function () {
        browser.executeScript('window.localStorage.clear();');
    });

    loginUserArray.forEach(function (eachUser) {

        it("Verify " + eachUser + " is able to see Device Support option", function () {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            navigation.clickVehiclesLink();
            navigation.typeInSearchFilter(vin);
            if (eachUser === factoryWorker) {
                vehiclesPage.factoryWorkerClickVehicleHyperlink(vin);
            } else {
                vehiclesPage.clickVehicleHyperlinkCellSearch(vin);
            }
            vehiclesPage.clickDsnDeviceDetails(eachUser);
            deviceDetailPage.verifyDeviceDetailCard(eachUser);
            deviceDetailPage.verifyLastLocationMap();
            deviceDetailPage.verifyDeviceDetailsForOEM(eachUser);
        });

        it("Verify " + eachUser + " can perform visible actions", function () {
            loginPage.get();
            loginPage.login('paccar', peoplenetAdmin, password);
            //Use global search since it's faster.
            navigation.clickThisGlobalSearchResult(dsn, stringType, 1);
            var realVin = deviceListPage.allDeviceRows.get(0).$$('td').get(5).getText();
            realVin.then(function (vin) {
                navigation.logOut();
                loginPage.get();
                loginPage.login('paccar', eachUser, password);
                navigation.clickGlobalSearchResultSuggestions(vin, 'vehicle');
                vehiclesPage.clickDsnDeviceDetails(eachUser);
                deviceDetailPage.performDiagnosticsAction();
                browser.sleep(1000);
                deviceDetailPage.clickVinDiscoButton();
                toastMessageUtil.verifyToastAlert('VIN Discovery request submitted successfully');
            });
        });
    });

    //Cannot perform successful Hard Reboot as each user.
    it("Verify " + randomUser + " can perform Hard Reboot", function () {
        loginPage.get();
        loginPage.login('paccar', peoplenetAdmin, password);
        navigation.clickThisGlobalSearchResult(dsn, stringType, 1);
        var realVin = deviceListPage.allDeviceRows.get(0).$$('td').get(5).getText();
        realVin.then(function (vin) {
            navigation.logOut();
            loginPage.get();
            loginPage.login('paccar', randomUser, password);
            navigation.clickGlobalSearchResultSuggestions(vin, 'vehicle');
            vehiclesPage.clickDsnDeviceDetails(randomUser);
            deviceDetailPage.performAction(hardReboot);
            navigation.logOut();
            // //Need to wait for device reboot begin.
            browser.sleep(5000);
            browser.waitForAngularEnabled(false);
            deviceDetailPage.validateHardReboot(dsn);
        });
    });
});