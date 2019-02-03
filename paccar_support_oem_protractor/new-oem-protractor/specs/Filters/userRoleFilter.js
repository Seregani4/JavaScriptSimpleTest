/**
 * Created by pshrestha on 6/2/2017.
 */
const _ = require('lodash');
describe("Filtering validation for Users by ROLE -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var userUtility = require('../../../utilities/user.util.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var paccarUserEmail = browser.params.testuseremails.paccaruser;
    var dealerOwnerAdminEmail = browser.params.testuseremails.dealerowneradmin;
    var dealerRegionAdminEmail = browser.params.testuseremails.dealerregionadmin;
    var dealerAdminEmail = browser.params.testuseremails.dealeradmin;
    var dealerUserEmail = browser.params.testuseremails.dealeruser;
    var divisionUserEmail = browser.params.testuseremails.divisionuser;
    var dealerTechEmail = browser.params.testuseremails.dealertech;
    var customerAdminEmail = browser.params.testuseremails.customeradmin;
    var customerUserEmail = browser.params.testuseremails.customeruser;
    var password = browser.params.adduser.password;
    //Roles
    var peopleNetAdmin = browser.params.roleslabels.peoplenetadmin;
    var paccarAdmin = browser.params.roleslabels.paccaradmin;
    var paccarUser = browser.params.roleslabels.paccaruser;
    var divisionUser = browser.params.roleslabels.divisionuser;
    var customerAdmin = browser.params.roleslabels.customeradmin;
    var customerUser = browser.params.roleslabels.customeruser;
    var dealerOwnerAdmin = browser.params.roleslabels.dealerowneradmin;
    var dealerRegionAdmin = browser.params.roleslabels.dealerregionadmin;
    var dealerAdmin = browser.params.roleslabels.dealeradmin;
    var dealerUser = browser.params.roleslabels.dealeruser;
    var dealerTech = browser.params.roleslabels.dealertechnician;
    var factoryWorker = browser.params.roleslabels.factoryworker;

    //Note: The Filter By Role capability was limited to Peoplenet and Paccar admins only. PACCAR CR: PVP 3672.
    var userRolesMap = {};
    userRolesMap[peoplenetAdminEmail] = [peopleNetAdmin, paccarAdmin, paccarUser, divisionUser, dealerOwnerAdmin, dealerRegionAdmin, dealerAdmin,
        dealerTech, dealerUser, customerAdmin, customerUser, factoryWorker];
    userRolesMap[paccarAdminEmail] = [paccarAdmin, paccarUser, divisionUser, dealerOwnerAdmin, dealerRegionAdmin, dealerAdmin,
        dealerTech, dealerUser, customerAdmin, customerUser, factoryWorker];
    userRolesMap[paccarUserEmail] = [paccarUser, divisionUser, dealerOwnerAdmin, dealerRegionAdmin, dealerAdmin, dealerTech,
        dealerUser, customerAdmin, customerUser, factoryWorker];
    //TODO uncomment after fix PVP-3706
    // userRolesMap[divisionUserEmail] = [divisionUser, customerAdmin, customerUser];
    // userRolesMap[dealerOwnerAdminEmail] = [divisionUser, dealerOwnerAdmin, dealerRegionAdmin, dealerAdmin, dealerTech, dealerUser,
    //     customerAdmin, customerUser];
    // userRolesMap[dealerRegionAdminEmail] = [dealerOwnerAdmin, dealerRegionAdmin, dealerAdmin, dealerTech, dealerUser, customerAdmin,
    //     customerUser];
    // userRolesMap[dealerAdminEmail] = [divisionUser, dealerOwnerAdmin, dealerRegionAdmin, dealerAdmin, dealerTech, dealerUser,
    //     customerAdmin, customerUser];
    // userRolesMap[dealerUserEmail] = [dealerOwnerAdmin, dealerRegionAdmin, dealerAdmin, dealerTech, dealerUser, customerAdmin,
    //     customerUser];
    // userRolesMap[dealerTechEmail] = [dealerTech, dealerUser, customerAdmin, customerUser];
    // userRolesMap[customerAdminEmail] = [dealerUser, customerAdmin, customerUser];
    // userRolesMap[customerUserEmail] = [customerAdmin, customerUser];

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

    // var loginUserArray = Object.keys(userRolesMap);
    _.forEach(userRolesMap, function (roles, eachUser) {

        it("Validate the functionality of filtering by role as " + eachUser, function () {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            navigation.clickUsersLink();
            roles.forEach(role => userUtility.validateRole(role));
        });
    });
});