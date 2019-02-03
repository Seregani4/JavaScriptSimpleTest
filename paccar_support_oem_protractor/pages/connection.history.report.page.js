/**
 * Created by Popazov on 7/10/2017.
 */

var connectionHistoryReportPage = function () {
    this.connectionHistoryReportTitle = element(by.className('page-header-title'));
    this.connectionHistoryReportTableTitle = element(by.className('md-title'));
    this.connectionHistoryListTableHeader = $('tr').$$('th');
    this.dsnInput = element(by.name('dsn'));
    this.startTimeInput = element(by.name('startTime'));
    this.endTimeInput = element(by.name('endTime'));
    this.deviceTypeAllRadioButton = element.all(by.css('md-radio-button')).get(0);
    this.deviceTypePCGRadioButton = element.all(by.css('md-radio-button')).get(1);
    this.deviceTypePCTRadioButton = element.all(by.css('md-radio-button')).get(2);
    this.searchButton = element(by.css('[type="submit"]'));

    this.verifyConnectionHistoryReportData = function () {
        expect(this.connectionHistoryReportTitle.getText()).toBe('Connection History Report', 'Title is invalid');
        expect(this.dsnInput.isDisplayed()).toBe(true, 'DSN input is missing');
        expect(this.startTimeInput.isDisplayed()).toBe(true, 'Start Time input is missing');
        expect(this.endTimeInput.isDisplayed()).toBe(true, 'End Time input is missing');
        expect(this.deviceTypeAllRadioButton.getText()).toBe('All', 'End Time input is missing');
        expect(this.deviceTypePCGRadioButton.getText()).toBe('PCG', 'End Time input is missing');
        expect(this.deviceTypePCTRadioButton.getText()).toBe('PCT', 'End Time input is missing');
        expect(this.searchButton.isDisplayed()).toBe(true, 'Search Button is missing');
    };

    this.veifyConnectionHistoryTableHeaderData = function () {
        var connectionHeaderListTableText = this.connectionHistoryListTableHeader.getText();
        expect(connectionHeaderListTableText).toContain('Date', 'Date column is missing');
        expect(connectionHeaderListTableText).toContain('Device Type', 'Device Type column is missing');
        expect(connectionHeaderListTableText).toContain('Connection Status', 'Connection Status column is missing');
    }


};

module.exports = new connectionHistoryReportPage();