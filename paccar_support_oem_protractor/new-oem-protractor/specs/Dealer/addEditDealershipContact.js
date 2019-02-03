/**
 * Created by pshrestha on 6/13/2017.
 */

describe("Validate adding and editing Dealership contact information -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var dealersPage = require('../../../pages/dealers.page.js');
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var password = browser.params.adduser.password;
    var dealersCode = browser.params.testdealer.code;
    var primaryPhone = '(606) 437-0130';
    var faxNumber = '(606) 437-0469';
    var email = 'testEmail@test.com';

    //var EC = protractor.ExpectedConditions; //Example code that waits for the element to be visible.
    //browser.wait(EC.elementToBeClickable(dealersPage.serviceTypeField), 5000);

    browser.driver.manage().window().maximize();

    beforeEach(() => {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.clickDealersLink();
        navigation.typeInSearchFilter(dealersCode);
    });

    afterEach(() => {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    //PVP-2549
    it("Paccar admin validates adding Blank Form for New Contact info", () => {
        dealersPage.clickDealerCheckbox(dealersCode);
        navigation.editActionButton.click();
        expect(browser.getCurrentUrl()).toContain(`${browser.params.environment.url}/#/nav/dealer/edit`);
        dealersPage.addPhoneBtn.click();
        expect(dealersPage.addPhoneNumberField.get(2).isDisplayed()).toBe(true, 'Phone number field is not displayed.');
        dealersPage.addPhoneDoneBtn.click();
        expect(dealersPage.addPhoneNumberField.get(2).isDisplayed()).toBe(true, 'The empty fields got saved.');
        dealersPage.editDealerSaveBtn.click();
        expect(browser.getCurrentUrl()).toContain(`${browser.params.environment.url}/#/nav/dealer/edit`, 'The empty form got saved.');
    });

    it('Paccar admin deletes the phone numbers listed on the dealership', () => {
        dealersPage.clickDealerCheckbox(dealersCode);
        navigation.editActionButton.click();
        expect(browser.getCurrentUrl()).toContain(`${browser.params.environment.url}/#/nav/dealer/edit`);
        dealersPage.emailField.clear();
        dealersPage.emailField.sendKeys(email);
        //can be used according to the number of Contacts present.
        dealersPage.deleteContact();
        browser.sleep(1000);
        dealersPage.deleteContact();
        dealersPage.editDealerSaveBtn.click();
        expect(browser.getCurrentUrl()).toContain(`${browser.params.environment.url}/#/nav/dealer/list`, 'The save button did not work.');
    });

    it("TC-2266 Validate contact area is displayed", () => {
        dealersPage.clickDealerHyperlinkCellSearch(dealersCode);
        expect(dealersPage.contactData.getText()).toContain(email, "Email Address not displayed")
    });

    it("Paccar admin validates adding Primary Phone Contact", () => {
        dealersPage.clickDealerCheckbox(dealersCode);
        navigation.editActionButton.click();
        expect(browser.getCurrentUrl()).toContain(`${browser.params.environment.url}/#/nav/dealer/edit`);
        //add a Primary phone
        dealersPage.addPhoneBtn.click();
        expect(dealersPage.addPhoneNumberField.first().isDisplayed()).toBe(true);
        dealersPage.addPhoneNumberField.first().sendKeys(primaryPhone);
        dealersPage.primaryPhone.first().click();
        browser.sleep(1000);
        dealersPage.addPhoneDoneBtn.click();
        expect(dealersPage.addPhoneNumberField.get(0).isDisplayed()).toBe(false, 'The form did not save.');
        browser.sleep(1000);
        dealersPage.editDealerSaveBtn.click();
        expect(browser.getCurrentUrl()).toContain(`${browser.params.environment.url}/#/nav/dealer/list`, 'The save button did not work.');
        //Verify the contact info on dealer details page
        navigation.typeInSearchFilter(dealersCode);
        dealersPage.clickDealerHyperlinkCellSearch(dealersCode);
        expect(dealersPage.contactData.isDisplayed()).toBe(true);
        expect(dealersPage.phoneNumberList.get(0).getText()).toContain(`Primary: ${primaryPhone}`, 'The phone number did not display.');
    });

    it("Paccar admin validates adding Toll Free Contact", () => {
        dealersPage.clickDealerCheckbox(dealersCode);
        navigation.editActionButton.click();
        expect(browser.getCurrentUrl()).toContain(`${browser.params.environment.url}/#/nav/dealer/edit`);
        dealersPage.emailField.clear();
        //Add a Fax number
        dealersPage.addPhoneBtn.click();
        expect(dealersPage.addPhoneNumberField.last().isDisplayed()).toBe(true);
        dealersPage.addPhoneNumberField.last().sendKeys(faxNumber);
        dealersPage.faxNumber.last().click();
        dealersPage.addPhoneDoneBtn.click();
        expect(dealersPage.addPhoneNumberField.get(1).isDisplayed()).toBe(false, 'The form did not save.');
        dealersPage.editDealerSaveBtn.click();
        expect(browser.getCurrentUrl()).toContain(`${browser.params.environment.url}/#/nav/dealer/list`, 'The SAVE button did not work.');
        //Verify the contact info on dealer details page
        navigation.typeInSearchFilter(dealersCode);
        dealersPage.clickDealerHyperlinkCellSearch(dealersCode);
        expect(dealersPage.contactData.isDisplayed()).toBe(true);
        expect(dealersPage.phoneNumberList.get(0).getText()).toContain(`Primary: ${primaryPhone}`, 'The phone number did not display or not in the right order.');
        expect(dealersPage.phoneNumberList.get(1).getText()).toContain(`Fax: ${faxNumber}`, 'The phone number did not display or not in the right order.');
        expect(dealersPage.bugElement.isPresent()).toBe(false, 'The BUG is back: "dealer.dealerDetails.:" is listed under contacts.');
    });
});