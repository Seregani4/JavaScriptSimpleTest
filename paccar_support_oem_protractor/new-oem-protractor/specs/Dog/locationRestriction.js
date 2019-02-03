/**
 * Created by pshrestha on 7/20/2017.
 */

describe("Add location to a region and verify the locations are not available for other regions -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var dealerOwnerGroupPage = require('../../../pages/dealerOwnerGroup.page.js');
    var tableUtil = require('../../../utilities/tables.util');
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var DOAEmail = browser.params.testuseremails.dealerowneradmin;
    var DOUEmail = browser.params.testuseremails.dealerowneruser;
    var DRAEmail = browser.params.testuseremails.dealerregionadmin;
    var DRUEmail = browser.params.testuseremails.dealerregionuser;
    var dogName = browser.params.testdealerOwnerGroup.name;
    var password = browser.params.adduser.password;
    var dogRegion = browser.params.testdealerRegion.name1;
    var testRegion = 'EditNameRegion';
    var dealer1 = '';
    var dealer2 = '';

    browser.driver.manage().window().maximize();

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    var loginUserArray = [paccarAdminEmail, DOAEmail];
    loginUserArray.filter(function (eachUser) {

        it(eachUser + " adds a location to the test region.", function () {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            navigation.clickDealerOwnerGroupsLink();
            navigation.typeInSearchFilter(dogName);
            dealerOwnerGroupPage.clickDealerGroupHyperlinkCellSearch(dogName);
            dealerOwnerGroupPage.regionsTab.click();
            dealerOwnerGroupPage.clickViewLocationButton(testRegion, eachUser)
                .then(() => {
                    return tableUtil.getTableCellData(0, dealerOwnerGroupPage.assignLocationColmns.nameColumn, dealerOwnerGroupPage.assignLocationTableBody)
                })
                .then((dealer) => {
                    dealer1 = dealer;
                    return tableUtil.getTableCellData(1, dealerOwnerGroupPage.assignLocationColmns.nameColumn, dealerOwnerGroupPage.assignLocationTableBody)
                })
                .then((dealerTwo) => {
                    dealer2 = dealerTwo;
                    dealerOwnerGroupPage.addLocationToRegion(dealer1);
                    dealerOwnerGroupPage.addLocationToRegion(dealer2);
                    dealerOwnerGroupPage.locationAddSaveBtn.click();
                    dealerOwnerGroupPage.checkForToastAlert('Locations updated');
                    browser.sleep(2000);
                    //verify the locations are added to the region
                    browser.refresh(); //Needed to update the add operation
                    dealerOwnerGroupPage.regionsTab.click();
                    dealerOwnerGroupPage.clickViewLocationButton(testRegion, eachUser);
                    dealerOwnerGroupPage.verifyLocationInRegion(dealer1);
                    dealerOwnerGroupPage.verifyLocationInRegion(dealer2);
                })
        });

        it(eachUser + " verify the locations that belong to a region is not available to add to a different region.",
            function () {
                loginPage.get();
                loginPage.login('paccar', eachUser, password);
                navigation.clickDealerOwnerGroupsLink();
                navigation.typeInSearchFilter(dogName);
                dealerOwnerGroupPage.clickDealerGroupHyperlinkCellSearch(dogName);
                dealerOwnerGroupPage.regionsTab.click();
                //Have to take loggedInUser in account due to different permissions.
                dealerOwnerGroupPage.clickViewLocationButton(dogRegion, eachUser);
                dealerOwnerGroupPage.verifyLocationNotInList(dealer1);
                dealerOwnerGroupPage.verifyLocationNotInList(dealer2);
            });

        it(eachUser + " removes the locations from the test region.", function () {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            navigation.clickDealerOwnerGroupsLink();
            navigation.typeInSearchFilter(dogName);
            dealerOwnerGroupPage.clickDealerGroupHyperlinkCellSearch(dogName);
            dealerOwnerGroupPage.regionsTab.click();
            dealerOwnerGroupPage.clickViewLocationButton(testRegion, eachUser);
            dealerOwnerGroupPage.removeLocationFromRegion(dealer1);
            dealerOwnerGroupPage.removeLocationFromRegion(dealer2);
            dealerOwnerGroupPage.locationAddSaveBtn.click();
            dealerOwnerGroupPage.checkForToastAlert('Locations updated');
            browser.sleep(2000);
            //verify the locations are removed from the region and are available.
            browser.refresh(); //Needed to update the add operation
            dealerOwnerGroupPage.regionsTab.click();
            dealerOwnerGroupPage.clickViewLocationButton(dogRegion, eachUser);
            dealerOwnerGroupPage.verifyLocationInList(dealer1);
            dealerOwnerGroupPage.verifyLocationInList(dealer2);
        });
    });

    var loginUsers = [DOUEmail, DRAEmail, DRUEmail];
    loginUsers.filter(function (eachUser) {
        it(eachUser + " validates cannot add/remove location to a region", function () {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            navigation.clickDealerOwnerGroupsLink();
            navigation.typeInSearchFilter(dogName);
            dealerOwnerGroupPage.clickDealerGroupHyperlinkCellSearch(dogName);
            dealerOwnerGroupPage.regionsTab.click();
            dealerOwnerGroupPage.clickViewLocationButton(testRegion, eachUser);
            dealerOwnerGroupPage.cannotEditLocationInRegion();
        });
    });
});