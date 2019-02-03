/**
 * Created by Cottomoeller on 12/17/2015.
 */
var DigitalCallHistoryPage = function() {
    var moment = require('moment');

    this.digitalCallHistoryForm = element(by.name('$ctrl.form'));
    this.dsnField = element(by.name('dsn'));
    this.sourceField = element(by.name('source'));
    this.mwiField = element(by.name('mwi'));
    this.daysBackField = element(by.name('days'));
    this.endDateField = element(by.name('endDate'));

    this.sourceDropdownList = element.all(by.css('[role="option"]'));
    this.mwiDropdownList = element.all(by.css('[class="md-text ng-binding"]'));
    this.searchBtn = element(by.css('[type="submit"]'));

    this.dataTableHeading = element(by.cssContainingText('[class="md-title ng-scope"]','Call Sessions'));
    this.DCHTableHeader = $('tr').$$('th');
    this.allDchrows = element.all(by.repeater('row in $ctrl.rows'));
    this.allDchcolumns = element.all(by.repeater('col in $ctrl.cols'));
    this.viewPacketBtn = element.all(by.css('[aria-label="View Call Log Packets"][aria-hidden="false"]'));

    //column headers
    var packetColumn = 0;

    // Verify Data
    this.verifyDchTableDataIsVisible = function() {
        expect(this.DCHTableHeader.getText()).toContain('Packets', 'Packets column is missing');
        expect(this.DCHTableHeader.getText()).toContain('Nimbus Disp.', 'Nimbus Disp. column is missing');
        expect(this.DCHTableHeader.getText()).toContain('OBC Disp.', 'OBC Disp. column is missing');
        expect(this.DCHTableHeader.getText()).toContain('OBC Suppl. Disp.', 'OBC Suppl. Disp.n is missing');
        expect(this.DCHTableHeader.getText()).toContain('Call Reason', 'Call Reason column is missing');
        expect(this.DCHTableHeader.getText()).toContain('Nimbus Start', 'Nimbus Start column is missing');
        expect(this.DCHTableHeader.getText()).toContain('Nimbus End', 'Nimbus End column is missing');
        expect(this.DCHTableHeader.getText()).toContain('OBC Start', 'OBC Start column is missing');
        expect(this.DCHTableHeader.getText()).toContain('OBC End', 'OBC End column is missing');
        expect(this.DCHTableHeader.getText()).toContain('OBC Media', 'OBC Media column is missing');

        expect(this.DCHTableHeader.getText()).toContain('RSSI', 'RSSI column is missing');
        expect(this.DCHTableHeader.getText()).toContain('SID', 'SID column is missing');
        expect(this.DCHTableHeader.getText()).toContain('Lat', 'Lat column is missing');
        expect(this.DCHTableHeader.getText()).toContain('Long', 'Long column is missing');
        expect(this.DCHTableHeader.getText()).toContain('Min', 'Min column is missing');
        expect(this.DCHTableHeader.getText()).toContain('OBC Src IP', 'OBC Src IP column is missing');
        expect(this.DCHTableHeader.getText()).toContain('OBC Dest IP', 'OBC Dest IP column is missing');
        expect(this.DCHTableHeader.getText()).toContain('IP Address Src', 'IP Address Src column is missing');
        expect(this.DCHTableHeader.getText()).toContain('DNS System ID', 'DNS System ID column is missing');
        expect(this.DCHTableHeader.getText()).toContain('Provider', 'Provider column is missing');

        expect(this.DCHTableHeader.getText()).toContain('Op Band', 'Op Band column is missing');
        expect(this.DCHTableHeader.getText()).toContain('Voltage', 'Voltage column is missing');
        expect(this.DCHTableHeader.getText()).toContain('Rev', 'Rev column is missing');
        expect(this.DCHTableHeader.getText()).toContain('Source', 'Source column is missing');
        expect(this.DCHTableHeader.getText()).toContain('Nimbus Bytes Sent', 'Nimbus Bytes Sent column is missing');
        expect(this.DCHTableHeader.getText()).toContain('Nimbus Bytes Rec', 'Nimbus Bytes Re column is missing');
        expect(this.DCHTableHeader.getText()).toContain('Nimbus Resent Count', 'Nimbus Resent Count column is missing');
        expect(this.DCHTableHeader.getText()).toContain('OBC Bytes Sent', 'OBC Bytes Sent column is missing');
        expect(this.DCHTableHeader.getText()).toContain('OBC Bytes Rec', 'OBC Bytes Rec column is missing');
        expect(this.DCHTableHeader.getText()).toContain('OBC Resent Count', 'OBC Resent Count column is missing');

        expect(this.DCHTableHeader.getText()).toContain('CRC Error', 'CRC Error column is missing');
        expect(this.DCHTableHeader.getText()).toContain('OBC Firmware Ver', 'OBC Firmware Ver column is missing');
        expect(this.DCHTableHeader.getText()).toContain('Flags', 'Flags column is missing');
        expect(this.DCHTableHeader.getText()).toContain('NDP', 'NDP column is missing');
        expect(this.DCHTableHeader.getText()).toContain('NDP Sys ID', 'NDP Sys ID column is missing');
        expect(this.allDchrows.count()).toBeGreaterThan(0);
    };


    this.verifyDigitalCallHistoryData = function() {
        expect(this.digitalCallHistoryForm.isDisplayed()).toBe(true, 'Digital Call History Data is missing');
    };

    this.verifyAllFieldsArePresent = function(){
        expect(this.dsnField.isDisplayed()).toBe(true, 'The DSN field could not be found');
        expect(this.sourceField.isDisplayed()).toBe(true, 'The Source field could not be found');
        expect(this.mwiField.isDisplayed()).toBe(true, 'The MWI field could not be found');
        expect(this.daysBackField.isDisplayed()).toBe(true, 'The Days Back field could not be found');
        expect(this.endDateField.isDisplayed()).toBe(true, 'The End Date field could not be found');
        expect(this.searchBtn.isDisplayed()).toBe(true, 'The Search button was not found');
    };

    this.verifySourceDropdownValues = function(){
        this.sourceField.click();
        expect(this.sourceDropdownList.getText()).toContain('Both', 'An Item was missing in the Source dropdown list');
        expect(this.sourceDropdownList.getText()).toContain('PFM Session Records', 'An Item was missing in the Source dropdown list');
        expect(this.sourceDropdownList.getText()).toContain('OBC Call Records', 'An Item was missing in the Source dropdown list');
        element(by.cssContainingText('[role="option"]', 'Both')).click();
    };

    this.verifyMWIDropdownValues = function(){
        this.mwiField.click();
        expect(this.mwiDropdownList.getText()).toContain('No', 'An Item was missing in the MWI dropdown list');
        expect(this.mwiDropdownList.getText()).toContain('Yes', 'An Item was missing in the MWI dropdown list');
        //element(by.cssContainingText('[role="option"]', 'No')).click();
    };

    this.enterDSN = function(dsn){
        this.dsnField.sendKeys(dsn);
    };

    this.enterNoOfDays = function(days){
        this.daysBackField.clear();
        this.daysBackField.sendKeys(days);
    };

    this.clickVievDetailButtonInRow = function (rowNumber) {
        this.allDchrows.get(rowNumber).$$('span').$$('a').click();
        browser.sleep(5000);
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/digitalSession/details/', 'The page did not load.');
    };

    this.clickFirstViewButtonInTable = function(){
        this.viewPacketBtn.get(0).click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/digitalSession/details/', 'The page did not load.');
    }


};

module.exports = new DigitalCallHistoryPage();