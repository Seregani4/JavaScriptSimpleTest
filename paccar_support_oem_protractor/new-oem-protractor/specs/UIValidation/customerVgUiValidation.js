/**
 * Created by pshrestha on 9/21/2017.
 */

describe("Validate vehicle group UI information -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var vehicleGroupPage = require('../../../pages/vehiclegroup.page.js');
    var customersPage = require('../../../pages/customers.page.js');
    var customerUtil = require('../../../utilities/customer.util.js');
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var testCustomer = browser.params.testregularcustomer.name;
    var password = browser.params.adduser.password;

    browser.driver.manage().window().maximize();

    beforeEach(function () {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        customerUtil.goToCustomerDetails(testCustomer, paccarAdminEmail);
        customersPage.clickVehicleGroupsTab();
    });

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("Validate the Rows on the Vehicle Group Page", function () {

        //Note: Number of rows needs to be 51 because of the ALL VEHICLES row.
        customersPage.pageSizeButton.click();
        customersPage.pageFiftyButton.click();
        expect(customersPage.vehicleGroupList.count()).toBeLessThanOrEqual(51);

        customersPage.pageSizeButton.click();
        customersPage.pageTenButton.click();
        expect(vehicleGroupPage.allVehicleGroupRows.count()).toBeLessThanOrEqual(11);

        customersPage.pageSizeButton.click();
        customersPage.pageTwentyFiveButton.click();
        expect(vehicleGroupPage.allVehicleGroupRows.count()).toBeLessThanOrEqual(26);
        //Last page button
        customersPage.lastPageButton.click();
        expect(customersPage.lastPageButton.getAttribute('disabled')).toBe('true');
        expect(customersPage.nextPageButton.getAttribute('disabled')).toBe('true');
        //First page button
        customersPage.firstPageButton.click();
        expect(customersPage.firstPageButton.getAttribute('disabled')).toBe('true');
        expect(customersPage.previousPageButton.getAttribute('disabled')).toBe('true');
    });
});