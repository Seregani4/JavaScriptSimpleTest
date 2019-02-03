var TransferOwnershipPage = function() {

    var request = require('superagent');
    var moment = require('moment');

    this.newCustomerInformation = element(by.name('New Customer Information'));
    this.CustomerNameField = element(by.css('[aria-label="CUSTOMER NAME"]'));
    this.saveBtn = element(by.css('[type="submit"]'));
    this.cancelBtn = element(by.xpath("//button[@ng-click = '$ctrl.goToVehicleDetails()']"));
    this.confirmTransferBtn = element(by.css('[ng-click="dialog.hide()"]'));
    this.cancelTransferBtn = element(by.className('md-cancel-button'));
    this.confirmationPopup = element(by.className('md-transition-in'));
    this.searchFilterButton = element(by.xpath('//md-card-content//input'));
    this.chipFilter = element(by.name('customer'));
    this.chipFilterResults = element.all(by.css('[md-virtual-repeat="item in $mdAutocompleteCtrl.matches"]'));
    this.customerInformationCard = element(by.xpath('//md-card-content'));
    ////Function////
    this.clickCancelBtn = function() {
            this.cancelBtn.click();
            expect(browser.getCurrentUrl()).toBe(browser.params.environment.url + '/#/nav/user/list/');
        };
    this.clickSaveBtn = function()  {
            this.saveBtn.click();
         };

    this.typeInSearchFilter = function(input){
            this.searchFilterButton.getAttribute('aria-hidden').then(function(text) {
                if (text === 'false') {
                    element(by.className('md-icon-button list-filter-button md-button ng-scope md-default-theme md-ink-ripple')).click();
                }
            });
            this.chipFilter.sendKeys(input);
            browser.sleep(2000);
            this.chipFilterResults.get(0).click();
    };

    this.confirmChangeOwner = function() {
            this.saveBtn.click();
            this.confirmTransferBtn.click();
     };

    this.selectCustomer = function (name) {
        this.chipFilter.sendKeys(name);
        var dropDownElements = element.all(by.xpath("//li[@md-virtual-repeat]"));
        var customerSelector = element.all(by.cssContainingText('[role="button"]', name));
        for (i = 0; i < 5; i++) {
            customerSelector.isPresent()
                .then(function (result) {
                    if (!result) {
                        browser.actions().mouseMove(dropDownElements.last()).perform();
                    }
                });
        }
        customerSelector.click();
    };
};
module.exports = new TransferOwnershipPage();