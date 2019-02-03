/**
 * Created by pshrestha on 4/10/2017.
 */

describe("Validate user vehicle group UI information -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var usersPage = require('../../../pages/users.page.js');
    var vehicleGroupPage = require('../../../pages/vehiclegroup.page.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var customerAdminEmail = browser.params.testuseremails.customeradmin;
    var dealerAdminEmail = browser.params.testuseremails.dealeradmin;
    var dealerOwnerAdmin = browser.params.testuseremails.dealerowneradmin;
    var dealerRegionAdmin = browser.params.testuseremails.dealerregionadmin;
    var password = browser.params.adduser.password;

    browser.driver.manage().window().maximize();

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("Verify " + peoplenetAdminEmail + " access to all tabs in it's own user profile page.", function () {
        loginPage.get();
        loginPage.login('paccar', peoplenetAdminEmail, password);
        navigation.clickUserMenu('paccar');
        navigation.clickUserProfileLink();
        usersPage.validateUserProfileTabs(peoplenetAdminEmail);
    });

    it("Verify " + paccarAdminEmail + " access to all tabs in it's own user profile page.", function () {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.clickUserMenu('paccar');
        navigation.clickUserProfileLink();
        usersPage.validateUserProfileTabs(paccarAdminEmail);
    });

    it("Verify " + paccarAdminEmail + " can see all elements of the page.", function () {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.clickUserMenu('paccar');
        navigation.clickUserProfileLink();
        usersPage.vehicleGroupTab.click();
        vehicleGroupPage.verifyVehicleGroupTableIsVisible();
        expect(navigation.addActionButton.isDisplayed()).toBe(true, 'Add Vehicle group button is missing.');
        expect(navigation.clearAllFiltersButton.isDisplayed()).toBe(true, 'Clear all filters Button is Not Displayed');
    });

    it("Validate the Rows on the Vehicle Group  Page ", function () {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.clickUserMenu('paccar');
        navigation.clickUserProfileLink();
        usersPage.vehicleGroupTab.click();
        vehicleGroupPage.userVgPageSizeButton.click();
        vehicleGroupPage.pageFiftyButton.click();
        expect(vehicleGroupPage.allVehicleGroupRows.count()).not.toEqual(0);
        //URL change not implemented for Vehicle Groups
        //expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/deviceCollection/list/?page=0&pageSize='+50);

        vehicleGroupPage.userVgPageSizeButton.click();
        vehicleGroupPage.pageTenButton.click();
        expect(vehicleGroupPage.allVehicleGroupRows.count()).not.toEqual(0);
        //expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/deviceCollection/list/?page=0&pageSize='+10);

        vehicleGroupPage.userVgPageSizeButton.click();
        vehicleGroupPage.pageTwentyFiveButton.click();
        expect(vehicleGroupPage.allVehicleGroupRows.count()).not.toEqual(0);
        //expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/deviceCollection/list/?page=0&pageSize='+25);
    });
});