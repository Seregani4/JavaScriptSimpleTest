/**
 * Created by pshrestha on 3/6/2017.
 */


describe("Adding a new Dealer Owner Group Permissions -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var validationUtil = require('../../../utilities/validation.util.js');
    var dealerOwnerAdmin = browser.params.testuseremails.dealerowneradmin;
    var dealerOwnerUser = browser.params.testuseremails.dealerowneruser;
    var dealerRegionAdmin = browser.params.testuseremails.dealerregionadmin;
    var dealerRegionUser = browser.params.testuseremails.dealerregionuser;
    var loginUserArray = [dealerOwnerAdmin, dealerOwnerUser, dealerRegionAdmin, dealerRegionUser];
    var dealerOwnerGroupName = browser.params.testdealerOwnerGroup.name;
    var password = browser.params.adduser.password;

    browser.driver.manage().window().maximize();

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });
    
    loginUserArray.forEach(function (eachUser) {
        it("Verify " + eachUser + " have the correct permissions", function () {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            navigation.clickDealerOwnerGroupsLink();
            validationUtil.validateUserPermissionForDOGPage(eachUser, dealerOwnerGroupName);
        });
    });
});

