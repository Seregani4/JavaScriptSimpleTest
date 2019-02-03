/**
 * Created by Cottomoeller on 12/17/2015.
 */
var OutboundMidsPage = function() {

    this.dsnField = element(by.css('[name="dsn"]'));
    this.midsTable = element(by.cssContainingText('[class="md-title ng-binding ng-scope"]','Outbound Mids'));

    this.verifyOutboundMidsData = function() {
        expect(this.dsnField.isDisplayed()).toBe(true, 'Outbound Mids Data is missing');
        expect(this.midsTable.isDisplayed()).toBe(false, 'The MIDs table is visible when it should not');
    };

    this.searchDSN = function(dsn){
        this.dsnField.sendKeys(dsn);
        this.dsnField.sendKeys(protractor.Key.ENTER);
        expect(this.midsTable.isDisplayed()).toBe(true, 'The MIDs table is not visible');
    };
};

module.exports = new OutboundMidsPage();