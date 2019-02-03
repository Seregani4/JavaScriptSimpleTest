/**
 * Created by tbui on 3/7/2016.
 */
describe("Global Search Bar Functionality - Users searching Users: ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');

    var customerAdminEmail = browser.params.testuseremails.customeradmin;
    var customerAdminName = browser.params.testusernames.customeradmin;
    var customerUserEmail = browser.params.testuseremails.customeruser;
    var customerUserName = browser.params.testusernames.customeruser;
    var dealerAdminEmail = browser.params.testuseremails.dealeradmin;
    var dealerAdminName = browser.params.testusernames.dealeradmin;
    var dealerUserEmail = browser.params.testuseremails.dealeruser;
    var dealerUserName = browser.params.testusernames.dealeruser;
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var paccarAdminName = browser.params.testusernames.paccaradmin;
    var paccarAdminUid = browser.params.testuseruids.paccaradmin;
    var paccarUserEmail = browser.params.testuseremails.paccaruser;
    var paccarUserName = browser.params.testusernames.paccaruser;
    var paccarUserUid = browser.params.testuseruids.paccaruser;
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;

    var password = browser.params.adduser.password;


    browser.driver.manage().window().maximize();

    beforeEach(function () {
        loginPage.get();
        loginPage.login('supportal', peoplenetAdminEmail, password);
    });

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });


    it("PA can use global search function to find new customer users it has access to", function () {
        //search for existing users by EMAIL
        navigation.clickThisGlobalSearchResult(customerUserEmail, 'User');
        navigation.clickThisGlobalSearchResult(customerAdminEmail, 'User');
        //search for existing users by NAME
        navigation.clickThisGlobalSearchResult(customerAdminName, 'User');
        navigation.clickThisGlobalSearchResult(customerUserName, 'User');

        navigation.logOut();
    });

    it("PA can use global search function to find new dealer users it has access to", function () {
        //search for existing users by EMAIL
        navigation.clickThisGlobalSearchResult(dealerAdminEmail, 'User');
        navigation.clickThisGlobalSearchResult(dealerUserEmail, 'User');
        ////search for existing users by NAME
        navigation.clickThisGlobalSearchResult(dealerAdminName, 'User');
        navigation.clickThisGlobalSearchResult(dealerUserName, 'User');

    }, 500000);

    it("PA can use global search function to find new paccar  users it has access to", function () {
        //search for existing users by EMAIL
        navigation.clickThisGlobalSearchResult(paccarAdminEmail, 'User');
        navigation.clickThisGlobalSearchResult(paccarUserEmail, 'User');
        //search for existing users by NAME
        navigation.clickThisGlobalSearchResult(paccarAdminName, 'User');
        navigation.clickThisGlobalSearchResult(paccarUserName, 'User');
    }, 500000);
});