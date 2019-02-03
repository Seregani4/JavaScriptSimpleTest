/**
 * Created by pshrestha on 3/24/2017.
 */

describe("Verify View Dealer Option on Vehicle Details Page -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var vehiclesPage = require('../../../pages/vehicles.page.js');
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var paccarUserEmail = browser.params.testuseremails.paccaruser;
    var divisionUserEmail = browser.params.testuseremails.divisionuser1;
    var dealerAdminEmail = browser.params.testuseremails.dealeradmin;
    var dealerUserEmail = browser.params.testuseremails.dealeruser;
    var dealerTechEmail = browser.params.testuseremails.dealertech;
    var customerAdminEmail = browser.params.testuseremails.preferredcustomeradmin;
    var customerUserEmail = browser.params.testuseremails.preferredcustomeruser;
    var dealerOwnerAdminEmail = browser.params.testuseremails.dealerowneradmin;
    var dealerRegionAdminEmail = browser.params.testuseremails.dealerregionadmin;
    var password = browser.params.adduser.password;
    //var vin = '1NKZXKTX9GJ104366';
    var vinPreferred = '1XKDDP9X2GJ980077';
    var testDealer = 'Worldwide Equipment - Pikeville';
    var testDealer2 = 'Montana Peterbilt - Billings';

    browser.driver.manage().window().maximize();

    afterEach(function () {
        browser.executeScript('window.localStorage.clear();');
    });

    var loginUserArray = [paccarAdminEmail, dealerAdminEmail];
    loginUserArray.filter(function (eachUser) {
        it(eachUser + " set a Primary Dealer for a Vehicle", function () {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);

            navigation.clickVehiclesLink();
            navigation.typeInSearchFilter(vinPreferred);
            vehiclesPage.clickVehicleHyperlinkCellSearch(vinPreferred);
            vehiclesPage.clickEditVehicleBtn(vinPreferred);
            vehiclesPage.setPrimaryDealer(testDealer);
            vehiclesPage.clickSaveBtn(vinPreferred);
            browser.sleep(1000);
            navigation.moreOptionsButton.click();
            expect(vehiclesPage.viewDealerBtn.isDisplayed()).toBe(true, 'View Dealer option is not present.');
        });
    });

    var loginUserArrayOne = [customerAdminEmail, customerUserEmail, dealerUserEmail, dealerOwnerAdminEmail, dealerRegionAdminEmail];
    loginUserArrayOne.filter(function (eachUser) {
        it("Verify other users cannot edit Primary Dealer field", function () {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);

            navigation.clickVehiclesLink();
            navigation.typeInSearchFilter(vinPreferred);
            vehiclesPage.clickVehicleHyperlinkCellSearch(vinPreferred);
            vehiclesPage.clickEditVehicleBtn(vinPreferred);
            vehiclesPage.cannotSetPrimaryDealer();
            vehiclesPage.cancelBtn.click();
            browser.sleep(1000);
            navigation.moreOptionsButton.click();
            expect(vehiclesPage.viewDealerBtn.isDisplayed()).toBe(true, 'View Dealer option is not present for ' + eachUser);
        });
    });

    var loginUserArrayTwo = [paccarUserEmail, divisionUserEmail, dealerTechEmail];
    loginUserArrayTwo.filter(function (eachUser) {
        it("Verify certain users cannot edit vehicles but can view primary dealers.", function () {
            loginPage.get();
            loginPage.login('paccar', eachUser, password);

            navigation.clickVehiclesLink();
            navigation.typeInSearchFilter(vinPreferred);
            vehiclesPage.clickVehicleHyperlinkCellSearch(vinPreferred);
            expect(vehiclesPage.editVehicleActionBarButton.isPresent()).toBe(false, eachUser + ' can see the edit vehicle button');
            navigation.moreOptionsButton.click();
            expect(vehiclesPage.viewDealerBtn.isDisplayed()).toBe(true, 'View Dealer option is not present for ' + eachUser);
        });
    });

    it("Paccar admin clears the Primary Dealer for a Vehicle", function () {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);

        navigation.clickVehiclesLink();
        navigation.typeInSearchFilter(vinPreferred);
        vehiclesPage.clickVehicleHyperlinkCellSearch(vinPreferred);
        vehiclesPage.clickEditVehicleBtn(vinPreferred);
        vehiclesPage.primaryDealerField.clear();
        vehiclesPage.clickSaveBtn(vinPreferred);
        browser.sleep(1000);
        navigation.moreOptionsButton.click();
        expect(vehiclesPage.viewDealerBtn.isPresent()).toBe(false, 'View Dealer option is still present after removing the Primary Dealer.');
    });
});
