/**
 * Created by pshrestha on 6/22/2017.
 */

describe("Validate subscriptions with a customer account -----> ", () => {

    var navigation = require('../../../pages/navigation.page.js');
    var loginPage = require('../../../pages/login.page.js');
    var customersPage = require('../../../pages/customers.page.js');
    var usersPage = require('../../../pages/users.page.js');
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var customer = browser.params.testcustomer.name;
    var password = browser.params.adduser.password;

    browser.driver.manage().window().maximize();

    beforeEach(() => {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.clickCustomersLink();
        navigation.typeInSearchFilterRecommendation(customer);
        customersPage.clickCustomerHyperlinkCellSearch(customer);
        customersPage.clickVehicleGroupsTab();
    });

    afterEach(() => {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it('Paccar Admin subscribes to a customer - All Vehicles', () => {
        expect(customersPage.isNotSubscribeBtn.get(0).isDisplayed()).toBe(true);
        customersPage.subscribeToAllVehicles();
        customersPage.vehicleGroupsTab.click();
        browser.sleep(2000);
        customersPage.verifySubscribedIcon();
        //Verify the subscription does not get lost
        //Repeat same steps since the subscription was getting lost when directed to a different page and going back.
        navigation.clickDashboardLink();
        navigation.clickCustomersLink();
        navigation.typeInSearchFilterRecommendation(customer);
        customersPage.clickCustomerHyperlinkCellSearch(customer);
        customersPage.clickVehicleGroupsTab();
        customersPage.verifySubscribedIcon();
    });

    it('Paccar admin validates the subscription on user profile and un subscribes', () => {
        navigation.clickUserMenu('paccar');
        navigation.clickUserProfileLink();
        usersPage.notificationsTab.click();
        usersPage.validateUserSubscribed(customer);
        usersPage.unSubscribeTheUser();
        navigation.clickCustomersLink();
        navigation.typeInSearchFilterRecommendation(customer);
        customersPage.clickCustomerHyperlinkCellSearch(customer);
        customersPage.clickVehicleGroupsTab();
        customersPage.verifyNotSubscribedIcon();
    });
});