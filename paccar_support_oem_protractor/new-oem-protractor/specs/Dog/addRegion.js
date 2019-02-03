/**
 * Created by pshrestha on 6/28/2017.
 */

//TODO: Browser Sleeps in this test needs to be deleted after the EDR database issue is figured out.

describe("Add and Delete Region from a Dealer Owner Group -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var dealerOwnerGroupPage = require('../../../pages/dealerOwnerGroup.page.js');
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var DOAEmail = browser.params.testuseremails.dealerowneradmin;
    var DOUEmail = browser.params.testuseremails.dealerowneruser;
    var DRAEmail = browser.params.testuseremails.dealerregionadmin;
    var DRUEmail = browser.params.testuseremails.dealerregionuser;
    var dogName = browser.params.testdealerOwnerGroup.name;
    var password = browser.params.adduser.password;
    var testRegion = '000testRegion';

    browser.driver.manage().window().maximize();

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    var loginUserArray = [paccarAdminEmail, DOAEmail];
    loginUserArray.filter(function (eachUser) {

        it(eachUser + " adds a test region to the DOG", function () {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            navigation.clickDealerOwnerGroupsLink();
            navigation.typeInSearchFilter(dogName);
            dealerOwnerGroupPage.clickDealerGroupHyperlinkCellSearch(dogName);
            dealerOwnerGroupPage.regionsTab.click();
            dealerOwnerGroupPage.allRegionRows.count().then(function (value) {
                dealerOwnerGroupPage.addRegionBtn.click();
                dealerOwnerGroupPage.regionNameField.sendKeys(testRegion);
                dealerOwnerGroupPage.nextButton.click();
                dealerOwnerGroupPage.saveButton.click();
                browser.sleep(2000);
                expect(dealerOwnerGroupPage.allRegionRows.count()).toBe(value + 1, 'The region did not get added.');
            });
        });

        it(eachUser + " deletes the test region from DOG", function () {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            navigation.clickDealerOwnerGroupsLink();
            navigation.typeInSearchFilter(dogName);
            dealerOwnerGroupPage.clickDealerGroupHyperlinkCellSearch(dogName);
            dealerOwnerGroupPage.regionsTab.click();
            dealerOwnerGroupPage.deleteRegion(testRegion);
            browser.sleep(2000); //This sleep is needed for the page to update with the changes.
        });
    });

    var userArray = [DOUEmail, DRAEmail, DRUEmail];
    userArray.filter(function (eachUser) {

        it('Verify ' + eachUser + ' cannot add a Region', function () {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            navigation.clickDealerOwnerGroupsLink();
            navigation.typeInSearchFilter(dogName);
            dealerOwnerGroupPage.clickDealerGroupHyperlinkCellSearch(dogName);
            dealerOwnerGroupPage.regionsTab.click();
            expect(dealerOwnerGroupPage.addRegionBtn.isPresent()).toBe(false, eachUser + ' can see the add button');
            //Need the clear localStorage here since it is a single test running in a loop.
            browser.executeScript('window.localStorage.clear();');
        });
    });
});