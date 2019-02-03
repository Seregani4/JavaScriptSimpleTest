/**
 * Created by jelliott on 12/22/2016.
 */

describe("Verify Vehicle Details page -----> ", function () {

    var navigation = require('../../../pages/navigation.page.js');
    var loginPage = require('../../../pages/login.page.js');
    var vehiclesUtil = require('../../../utilities/vehicle.util.js');
    var vehicleDetailPage = require('../../../pages/vehicledetail.page.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;
    var vin = browser.params.vehicle.vin;

    browser.driver.manage().window().maximize();

    beforeEach(function () {
        loginPage.get();
        loginPage.login('paccar', peoplenetAdminEmail, password);
        navigation.clickVehiclesLink();
        vehiclesUtil.goToVehicleDetails(vin);
    });

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it('Validate Map Modal Button on Vehicle Detail Page', function () {
        expect(vehicleDetailPage.mapModalLink.isPresent()).toBe(true, 'Map Modal Link is not Present');
        vehicleDetailPage.mapModalLink.click();
        expect(vehicleDetailPage.mapModal.isPresent()).toBe(true, 'Map Modal Did not show up');
        expect(vehicleDetailPage.mapModalCloseButton.isPresent()).toBe(true, "The Map Modal Close Button is not Present");
        vehicleDetailPage.mapModalCloseButton.click();
    });

    it('Validate the BreadCrumbs on the Vehicle Details Page', function () {
        navigation.validateBreadCrumbs(['Dashboard', 'Vehicles', 'Vehicle Details']);
        navigation.breadCrumbs.$$('a').get(1).click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/vehicle/list/');
    });

    it('Fault Log\'s Single Table UI Validation', function () {

        //Validate the More Options Button for the Fault Log is Present
        expect(element.all(by.cssContainingText('[type="button"]', 'more_vert')).get(1).isDisplayed()).toBe(true);
        element.all(by.cssContainingText('[type="button"]', 'more_vert')).get(1).click();
        expect(navigation.configureColumnsButton.isDisplayed()).toBe(true);

        vehicleDetailPage.verifyVehicleDetailFaultLogListTableDataIsVisible();
        vehicleDetailPage.verifyNoDuplicateFaultsPresent();
    });

    it("Validate the (Last Page And First Page)Pagination on the Fault Log on Vehicle Details Page", function () {
        //The Next ,Last,Previous,First Pagination Option are always disabled
        navigation.lastPageButton.click();
        expect(navigation.lastPageButton.getAttribute('disabled')).toBe('true');
        expect(navigation.nextPageButton.getAttribute('aria-hidden')).toBe('true');
        navigation.firstPageButton.click();
        expect(navigation.firstPageButton.getAttribute('disabled')).toBe('true');
        expect(navigation.previousPageButton.getAttribute('aria-hidden')).toBe('true');
    });

    it("Validate the (Next Page and Previous Page) Pagination on the Fault Log on Vehicle Details Page", function () {
        //Not enough faults to simulate button click.
        navigation.nextPageButton.click();
        expect(navigation.nextPageButton.getAttribute('aria-hidden')).toBe('true');
        navigation.previousPageButton.click();
        expect(navigation.previousPageButton.getAttribute('aria-hidden')).toBe('true');
    });

    it("Validate the Rows on the Fault Log on Vehicle Details Page", function () {
        navigation.pageSizeButton.click();
        //pagination element different for fault log table.
        element.all(by.repeater('option in $pagination.limitOptions')).get(5).click();
        vehicleDetailPage.checkForPageCount(50);
        expect(browser.getCurrentUrl()).toContain(50);

        navigation.pageSizeButton.click();
        element.all(by.repeater('option in $pagination.limitOptions')).get(3).click();
        vehicleDetailPage.checkForPageCount(10);
        expect(browser.getCurrentUrl()).toContain(10);

        navigation.pageSizeButton.click();
        element.all(by.repeater('option in $pagination.limitOptions')).get(4).click();
        vehicleDetailPage.checkForPageCount(25);
        expect(browser.getCurrentUrl()).toContain(25);
    });
});