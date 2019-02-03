/**
 * Created by Popazov on 10/4/2017.
 */



describe("Validate adding a Users via Endpoint ----- ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var usersPage = require('../../../pages/users.page.js');
    var userUtil = require('../../../utilities/user.util.js');

    var peoplenetAdminRole = browser.params.roleslabels.peoplenetadmin;
    var paccarAdminRole = browser.params.roleslabels.paccaradmin;
    var paccarUserRole = browser.params.roleslabels.paccaruser;
    var dealerAdminRole = browser.params.roleslabels.dealeradmin;
    var dealerUserRole = browser.params.roleslabels.dealeruser;
    var dealerOwnerUserRole = browser.params.roleslabels.dealerowneruser;
    var dealerOwnerAdminRole = browser.params.roleslabels.dealerowneradmin;
    var dealerRegionUserRole = browser.params.roleslabels.dealerregionuser;
    var dealerRegionAdminRole = browser.params.roleslabels.dealerregionadmin;
    var customerAdminRole = browser.params.roleslabels.customeradmin;
    var customerUserRole = browser.params.roleslabels.customeruser;
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var tsr1 = browser.params.testuseremails.tsr1;
    var tsr2 = browser.params.testuseremails.tsr2;
    var testUserEmail = browser.params.adduser.email;
    var password = browser.params.adduser.password;
    var firstName = browser.params.adduser.firstname;
    var lastName = browser.params.adduser.lastname;
    var userid = 'd789fd5e-4e52-4681-8d2e-53bf9975b076';

    var userRoleMap = new Map();
    userRoleMap.set(peoplenetAdminEmail, [peoplenetAdminRole, paccarAdminRole, paccarUserRole, dealerAdminRole, dealerUserRole,
        dealerOwnerUserRole, dealerOwnerAdminRole, dealerRegionAdminRole, dealerRegionUserRole,
        customerAdminRole, customerUserRole]);
    userRoleMap.set(tsr1, [paccarAdminRole, paccarUserRole, dealerAdminRole, dealerUserRole,
        customerAdminRole, customerUserRole]);
    userRoleMap.set(tsr2, [paccarAdminRole, paccarUserRole, dealerAdminRole, dealerUserRole,
        customerAdminRole, customerUserRole]);

    browser.driver.manage().window().maximize();

    beforeEach(function () {
        loginPage.get();
        loginPage.login('supportal', peoplenetAdminEmail, password);

    });

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    userRoleMap.forEach(function (eachRole, eachUser, mapObj) {
        eachRole.forEach(function (role) {
            it("As a" + eachUser + ",i can create " + role + " via endPoint", function () {
                usersPage.addUserEndpoint(eachUser, role);
                userUtil.navigateToUserDetailPage(testUserEmail);
                usersPage.verifySelectedUserRole(role);
                usersPage.verifyUserName(firstName, lastName);
            });

            it("As a" + eachUser + ",i can delete " + role + " via endPoint", function () {
                usersPage.deleteUserEndpoint(peoplenetAdminEmail,userid);
            });
        });
    });


});