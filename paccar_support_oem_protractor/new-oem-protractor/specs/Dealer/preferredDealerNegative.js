/**
 * Created by jelliott on 1/13/2017.
 */
describe("Verify Others are Unable to see the Preferred Dealer Checkbox -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var dealersPage = require('../../../pages/dealers.page.js');
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var paccarUserEmail = browser.params.testuseremails.paccaruser;
    var dealerAdminEmail = browser.params.testuseremails.dealeradmin;
    var dealerUserEmail = browser.params.testuseremails.dealeruser;
    var divisionUserEmail = browser.params.testuseremails.divisionuser;
    var dealersCode = browser.params.testdealer.code;
    var customerUserEmail = browser.params.testuseremails.customeruser;
    var password = browser.params.adduser.password;
    var peterbiltDealer = 'A653'; //Somehow this dealership got deleted
    var peterbiltDealer1 = 'A650';

    browser.driver.manage().window().maximize();

    var loginUserArray = [peoplenetAdminEmail, paccarAdminEmail, paccarUserEmail, dealerAdminEmail, dealerUserEmail, divisionUserEmail];
    //var loginUserArray=[divisionUserEmail];

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });
    loginUserArray.filter(function (eachUser) {
        it("Verify Certain Users are unable to see Preferred Dealer Checkbox", function () {

            console.log(eachUser);
            loginPage.get();
            loginPage.login('paccar', eachUser, password);
            navigation.clickDealersLink();
            if (eachUser === divisionUserEmail) {
                navigation.typeInSearchFilter(peterbiltDealer1);
                dealersPage.clickDealerHyperlinkCellSearch(peterbiltDealer1);
            } else {
                navigation.typeInSearchFilter(dealersCode);
                dealersPage.clickDealerHyperlinkCellSearch(dealersCode);
            }
            expect(dealersPage.preferredDealerCheckbox.isDisplayed()).toBe(false);
            browser.executeScript('window.localStorage.clear();');

        });
    });
});
