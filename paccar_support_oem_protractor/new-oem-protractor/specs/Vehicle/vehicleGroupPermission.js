/**
 * Created by pshrestha on 5/24/2017.
 */

describe("Validate User vehicle group Permissions for users -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var usersPage = require('../../../pages/users.page.js');
    var vehicleGroupPage = require('../../../pages/vehiclegroup.page.js');
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var testUserEmail = browser.params.adduser.email;
    var testUserId = browser.params.testuseruids.testUserUid;
    var password = browser.params.adduser.password;
    var testVehicleGroup = 'readOnlyTest';
    var groupDescription = 'testDescription';
    var newTestGroupName = '000testGroup';
    var newDescription = 'newDescription';
    var vehicleVin = '1NKZLP0X7GJ470663';


    browser.driver.manage().window().maximize();

    beforeEach(function () {
        // Get a fresh Angular "session" so we can avoid bootstrapping errors
        browser.driver.get("about:blank");
        browser.sleep(1000);
    });

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
        usersPage.deleteUserEndpoint(paccarAdminEmail, testUserId);
    });

    var userRoleArray = [
        browser.params.roleslabels.paccarpoweruser,
        browser.params.roleslabels.paccaruser,
        browser.params.roleslabels.dealerowneradmin,
        browser.params.roleslabels.dealerregionadmin,
        browser.params.roleslabels.dealeradmin,
        browser.params.roleslabels.factoryworker,
    ];


    userRoleArray.filter(function (eachUser) {
        it("Verify " + paccarAdminEmail + " vehicle group permissions for." + eachUser, function () {
            loginPage.get();
            usersPage.addUserEndpoint(paccarAdminEmail, eachUser)
            loginPage.login('paccar', paccarAdminEmail, password);
            navigation.clickUsersLink();
            navigation.typeInSearchFilterRecommendation(testUserEmail);
            if (eachUser === "Dealer Administrator") {
                eachUser = "Dealer Admin"
            }
            usersPage.verifyFilteredUserRole(eachUser);
            usersPage.selectFilteredUserEmail(eachUser);
            usersPage.vehicleGroupTab.click();
            vehicleGroupPage.verifyReadAndWritePermission(testVehicleGroup, groupDescription, newTestGroupName, newDescription, vehicleVin);
            usersPage.vehicleGroupTab.click();
            //Verify the VG has been deleted.
            vehicleGroupPage.typeInSearchFilter(newTestGroupName);
            vehicleGroupPage.verifygroupIsNotInList(newTestGroupName);
        });
    });
});