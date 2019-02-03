/**
 * Created by pshrestha on 7/11/2017.
 */

describe("Edit a Dealer Owner Group -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var dealerOwnerGroupPage = require('../../../pages/dealerOwnerGroup.page.js');
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var editDogName = browser.params.testEditDealerOwnerGroup.name;
    var description = 'DO NOT DELETE/EDIT';
    var newDescription = 'New-Description';
    var newDogName = 'EditedDealerOwnerGroup';
    var password = browser.params.adduser.password;

    browser.driver.manage().window().maximize();

    beforeEach(function () {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.clickDealerOwnerGroupsLink();
    });

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it("Paccar admin edits a DOG", function () {
        navigation.typeInSearchFilterRecommendation(editDogName);
        dealerOwnerGroupPage.clickDealerGroupHyperlinkCellSearch(editDogName);
        //edit the test DOG
        expect(dealerOwnerGroupPage.editBtn.isDisplayed()).toBe(true, 'Edit button is not present.');
        dealerOwnerGroupPage.editBtn.click();
        dealerOwnerGroupPage.editDogName(newDogName, newDescription);
        //validate the edited name
        navigation.clickDealerOwnerGroupsLink();
        navigation.typeInSearchFilterRecommendation(newDogName);
        dealerOwnerGroupPage.verifyAddedDog(newDogName);
    });

    it("Paccar Admin reverts the changes on the DOG", function () {
        navigation.typeInSearchFilterRecommendation(newDogName);
        dealerOwnerGroupPage.clickDealerGroupHyperlinkCellSearch(newDogName);
        //revert the name and description back
        expect(dealerOwnerGroupPage.editBtn.isDisplayed()).toBe(true, 'Edit button is not present.');
        dealerOwnerGroupPage.editBtn.click();
        dealerOwnerGroupPage.editDogName(editDogName, description);
        //validate the name
        navigation.clickDealerOwnerGroupsLink();
        navigation.typeInSearchFilterRecommendation(editDogName);
        dealerOwnerGroupPage.verifyAddedDog(editDogName);
    });
});