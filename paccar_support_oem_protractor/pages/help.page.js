/**
 * Created by pshrestha on 3/23/2017.
 */


var HelpPage = function() {

    //////////////////////////Help Page Content///////////////////////////
    //message on the page only for Customer Users
    this.customerMessage = element(by.cssContainingText('[ng-if="$ctrl.isCustomer"]','Please contact your dealership for technical support.'));

    //message on the screen for all users except customers
    this.generalMessage = element(by.css('[translate="help.assistance_msg"]'));

    this.supportLink = element(by.css('[href="https://paccarparts.custhelp.com"]'));
    // this.peterbiltLogo = element(by.css('[src="images/peterbiltlogo.7bac203.png"]'));
    // this.kenworthLogo = element(by.css('[src="images/kenworthbuglogo.7bac203.png"]'));
    this.peterbiltLogo = element.all(by.tagName("img")).get(0);
    this.kenworthLogo = element.all(by.tagName("img")).get(1);
    this.peterbiltEmail = element(by.linkText('peterbilt.smart.care@paccar.com'));
    this.kenworthEmail = element(by.linkText('kw.trucktechplus@paccar.com'));

    ///////////Privacy and Terms Page Content///////////
    this.privacyTab = element.all(by.repeater('tab in $mdTabsCtrl.tabs')).get(0);
    this.privacyText = element(by.tagName('md-card-content'));
    this.termsTab = element.all(by.repeater('tab in $mdTabsCtrl.tabs')).get(1);
    this.termsText = element(by.cssContainingText('[class="md-subheader-content"]','Terms of Use'));


    this.checkHelpPageInfo = function(loggedInUser){
        if(loggedInUser == 'customeradmin-automation@test.com' || loggedInUser == browser.params.testuseremails.customeruser){
            expect(browser.getCurrentUrl()).toBe(browser.params.environment.url + '/#/nav/help', 'The Help page did not load.');
            expect(this.customerMessage.isDisplayed()).toBe(true,'The Customer specific message did not show.');
        }
        else {
            expect(browser.getCurrentUrl()).toBe(browser.params.environment.url + '/#/nav/help', 'The Help page did not load for ' + loggedInUser);
            expect(this.generalMessage.isDisplayed()).toBe(true, 'The message is missing.');
            expect(this.supportLink.isDisplayed()).toBe(true, 'The SUPPORTLINK image is missing.');
            expect(this.peterbiltLogo.isDisplayed()).toBe(true, 'The Peterbilt logo is missing.');
            expect(this.peterbiltEmail.isDisplayed()).toBe(true, 'The Peterbilt email address is missing.');
            expect(this.kenworthLogo.isDisplayed()).toBe(true, 'The Kenworth logo is missing.');
            expect(this.kenworthEmail.isDisplayed()).toBe(true, 'The Kenworth email address is missing.');
        }
    };

    this.checkPrivacyContent = function(){
        expect(this.privacyTab.isDisplayed()).toBe(true, 'The Privacy tab is missing.');
        expect(this.privacyText.isDisplayed()).toBe(true, 'The Privacy text is missing.');
    };

    this.chackTermsContent = function(){
        this.termsTab.click();
        expect(this.termsText.isDisplayed()).toBe(true, 'The Terms text is missing.');
    };
};

module.exports = new HelpPage();