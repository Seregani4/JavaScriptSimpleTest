/**
 * Created by pshrestha on 3/16/2017.
 */
describe("Add and Delete new Locations to Dealer Owner Group -----> ", function () {

    var loginPage = require('../../../pages/login.page');
    var navigation = require('../../../pages/navigation.page');
    var dealerOwnerGroupPage = require('../../../pages/dealerOwnerGroup.page');
    var toastUtil = require('../../../utilities/toastMessage.util');
    var validationUtil = require('../../../utilities/validation.util');
    var DOAEmail = browser.params.testuseremails.dealerowneradmin;
    var DOUEmail = browser.params.testuseremails.dealerowneruser;
    var DRAEmail = browser.params.testuseremails.dealerregionadmin;
    var DRUEmail = browser.params.testuseremails.dealerregionuser;
    var DealerAdminEmail = browser.params.testuseremails.dealeradmin;
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var dogName = browser.params.testdealerOwnerGroup.name;
    var password = browser.params.adduser.password;
    var toastMessage = 'has been removed';
    var loc1 = '';
    var loc2 = '';
    var counter = 0;

    browser.driver.manage().window().maximize();

    afterEach(() => {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("Paccar Admin checks and deletes added locations", () => {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.clickDealerOwnerGroupsLink();
        navigation.typeInSearchFilter(dogName);
        dealerOwnerGroupPage.clickDealerGroupHyperlinkCellSearch(dogName);
        dealerOwnerGroupPage.locationTab.click();
        navigation.pageSizeButton.click();
        navigation.pageFiftyButton.click();
        dealerOwnerGroupPage.allDealerGroupRows.count()
            .then(count => {
                return counter = count;
            })
            .then(() => {
                return dealerOwnerGroupPage.allLocationNames.get(0).getText();
            })
            .then(location => {
                loc1 = location;
                return dealerOwnerGroupPage.allLocationNames.get(1).getText();
            })
            .then(location => {
                loc2 = location;
                dealerOwnerGroupPage.deleteLocation(loc1);
                browser.sleep(1000);
                // toastUtil.verifyToastAlert(toastMessage);
                browser.refresh();
                dealerOwnerGroupPage.locationTab.click();
                navigation.pageSizeButton.click();
                navigation.pageFiftyButton.click();
                expect(dealerOwnerGroupPage.allLocationRows.count()).toBe(counter - 1, 'Location did not clear.');
                dealerOwnerGroupPage.deleteLocation(loc2);
                browser.sleep(1000);
                // toastUtil.verifyToastAlert(toastMessage);
                dealerOwnerGroupPage.locationTab.click();
                expect(dealerOwnerGroupPage.allLocationRows.count()).toBe(counter - 2, 'Location did not clear.');
            })
    });

    var loginUserArray = [DOAEmail, DOUEmail, DRAEmail, DRUEmail, DealerAdminEmail];

    it('Verify Users other than PaccarAdmin cannot add locations to a DOG', () => {
        loginUserArray.forEach(eachUser => {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            navigation.clickDealerOwnerGroupsLink();
            navigation.typeInSearchFilter(dogName);
            dealerOwnerGroupPage.clickDealerGroupHyperlinkCellSearch(dogName);
            dealerOwnerGroupPage.locationTab.click();
            expect(dealerOwnerGroupPage.addLocationBtn.isPresent()).toBe(false, eachUser + ' can see the add button');
            //Need the clear localStorage here since it is a single test running in a loop.
            browser.executeScript('window.localStorage.clear();');
        });
    });

    it("Paccar admin adds new Locations to DOG", () => {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.clickDealerOwnerGroupsLink();
        navigation.typeInSearchFilter(dogName);
        dealerOwnerGroupPage.clickDealerGroupHyperlinkCellSearch(dogName);
        dealerOwnerGroupPage.locationTab.click();
        dealerOwnerGroupPage.addLocationBtn.click();
        dealerOwnerGroupPage.addLocation(loc1);
        browser.refresh();
        dealerOwnerGroupPage.locationTab.click();
        dealerOwnerGroupPage.addLocationBtn.click();
        dealerOwnerGroupPage.addLocation(loc2);
    });

    var regExp = new RegExp("[0-9]{2}\/[0-9]{2}\/[0-9]{4}\ [0-9]{2}\:[0-9]{2}\ [A,P][M]");

    it('TC-2010 Validate format time from field "Updated"', () => {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.clickDealerOwnerGroupsLink();
        dealerOwnerGroupPage.localUpdatedTime.getText()
            .then(text => {
                for (var i = 0; i < text.length; i++) {
                    validationUtil.validateTextContainArray(text, regExp);
                }
            })
    });
});