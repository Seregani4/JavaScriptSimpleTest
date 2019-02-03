/**
 * Created by tbui on 3/7/2016.
 */
describe("Global Search Bar Functionality - Users searching Users -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var validationUtil = require('../../../utilities/validation.util.js');
    var customerAdminEmail = browser.params.testuseremails.customeradmin;
    var customerAdminName = browser.params.testusernames.customeradmin;
    var customerUserEmail = browser.params.testuseremails.customeruser;
    var customerUserName = browser.params.testusernames.customeruser;
    var dealerOwnerUser = browser.params.testuseremails.dealerowneruser;
    var dealerAdminEmail = browser.params.testuseremails.dealeradmin;
    var dealerAdminName = browser.params.testusernames.dealeradmin;
    var dealerUserEmail = browser.params.testuseremails.dealeruser;
    var dealerUserName = browser.params.testusernames.dealeruser;
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var paccarAdminName = browser.params.testusernames.paccaradmin;
    var paccarUserEmail = browser.params.testuseremails.paccaruser;
    var paccarUserName = browser.params.testusernames.paccaruser;
    var password = browser.params.adduser.password;
    var manufacturerList = 'Manufacturer List';

    browser.driver.manage().window().maximize();

    beforeEach(function () {
        // Get a fresh Angular "session" so we can avoid bootstrapping errors
        browser.driver.get("about:blank");
        browser.sleep(1000);
    });

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("Customer User can use global search function to find new users it has access to", function () {
        //log in
        loginPage.get();
        loginPage.login('paccar', customerAdminEmail, password);
        //search for existing users by EMAIL
        navigation.clickThisGlobalSearchResult(customerUserEmail, 'User');
        navigation.logOut();
    });

    it("Dealer Admin can use global search function to find new users it has access to", function () {
        //log in
        loginPage.get();
        loginPage.login('paccar', dealerAdminEmail, password);
        //search for existing users by EMAIL
        navigation.clickThisGlobalSearchResult(dealerAdminEmail, 'User');
        navigation.clickThisGlobalSearchResult(dealerUserEmail, 'User');
        ////search for existing users by NAME
        navigation.clickThisGlobalSearchResult(dealerAdminName, 'User');
        navigation.clickThisGlobalSearchResult(dealerUserName, 'User');
    }, 500000);

    it("Paccar Admin can use global search function to find new users it has access to", function () {
        //log in
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        //search for existing users by EMAIL
        navigation.clickThisGlobalSearchResult(paccarAdminEmail, 'User');
        navigation.clickThisGlobalSearchResult(paccarUserEmail, 'User');
        navigation.clickThisGlobalSearchResult(dealerAdminEmail, 'User');
        navigation.clickThisGlobalSearchResult(dealerUserEmail, 'User');
        navigation.clickThisGlobalSearchResult(customerAdminEmail, 'User');
        navigation.clickThisGlobalSearchResult(customerUserEmail, 'User');
        //search for existing users by NAME
        navigation.clickThisGlobalSearchResult(paccarAdminName, 'User');
        navigation.clickThisGlobalSearchResult(paccarUserName, 'User');
        navigation.clickThisGlobalSearchResult(dealerAdminName, 'User');
        navigation.clickThisGlobalSearchResult(dealerUserName, 'User');
        navigation.clickThisGlobalSearchResult(customerAdminName, 'User');
        navigation.clickThisGlobalSearchResult(customerUserName, 'User');
    }, 500000);

    it('TC-2557 Redundant "Manufacturer list" is shown for roles with no access to "Manufacturers" page', () => {
        loginPage.get();
        loginPage.login('paccar', dealerOwnerUser, password);
        navigation.globalSearchBar.clear();
        navigation.globalSearchBar.sendKeys('Manufacturers');
        navigation.textFromGlobalSuggestions.getText()
            .then(listOfSuggestion => {
                validationUtil.validateTextNotContain(listOfSuggestion, manufacturerList);
            });
    });
});