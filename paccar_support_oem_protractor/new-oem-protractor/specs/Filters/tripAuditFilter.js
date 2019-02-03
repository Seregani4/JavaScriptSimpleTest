/**
 * Created by pshrestha on 7/10/2017.
 */

describe("Verifying Filtering on Trip Audit Page of a Vehicle -----> ", function () {
    //PVP-2645
    //Note: Search button added to the page PVP-4412
    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var vehiclesPage = require('../../../pages/vehicles.page.js');
    var tableUtil = require('../../../utilities/tables.util.js');
    var realVin = browser.params.vehicle.realdatavin;
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var password = browser.params.adduser.password;
    var tripStart = 'TRIPSTART';
    var tripEnd = 'TRIPEND';
    var vinDiscovery = 'DISCOVERY';

    browser.driver.manage().window().maximize();

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    var loginUserArray = [peoplenetAdminEmail, paccarAdminEmail];

    loginUserArray.filter(function (eachUser) {

        it('Verify' + eachUser + 'is able to filter by event types', function () {
            loginPage.get();
            loginPage.login('paccar', paccarAdminEmail, password);
            navigation.clickVehiclesLink();
            navigation.typeInSearchFilter(realVin);
            tableUtil.clickTableCell(0, vehiclesPage.columns.tableVinColumn);
            navigation.moreOptionsButton.click();
            vehiclesPage.viewTripAuditBtn.click();
            vehiclesPage.searchButton.click();

            //validate Trip Start filter
            vehiclesPage.eventTypeDropdown.click();
            browser.sleep(1000);
            vehiclesPage.oemTripStart.click();
            vehiclesPage.searchButton.click();
            vehiclesPage.validateEventType(tripStart);

            //validate Trip End filter
            vehiclesPage.eventTypeDropdown.click();
            browser.sleep(1000);
            vehiclesPage.oemTripEnd.click();
            vehiclesPage.searchButton.click();
            vehiclesPage.validateEventType(tripEnd);

            //validate VIN Discovery filter
            vehiclesPage.eventTypeDropdown.click();
            browser.sleep(1000);
            vehiclesPage.vinDiscovery.click();
            vehiclesPage.searchButton.click();
            vehiclesPage.validateEventType(vinDiscovery);
        });
    });
});

