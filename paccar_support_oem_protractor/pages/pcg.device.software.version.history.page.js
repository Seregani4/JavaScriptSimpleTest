/**
 * Created by Popazov on 7/10/2017.
 */

var pcgDeviceSoftwareVersionHistoryPage = function () {
    this.pcgDeviceSoftwareVersionHistoryTitle = element(by.className('page-header-title'));
    this.pcgDeviceSoftwareVersionTableHeader = $('tr').$$('th');
    this.allPcgDeviceSoftwareVersionRows = element.all(by.repeater('row in $ctrl.rows'));
    this.allPcgDevice = element.all(by.repeater('row in $ctrl.rows'));
    this.dsnInput = element(by.name('dsn'));

    this.verifyPcgSoftwareVersionPageData = function () {
        expect(this.pcgDeviceSoftwareVersionHistoryTitle.getText()).toBe('PCG Device Software Version History', 'Title is invalid');
        expect(this.dsnInput.isDisplayed()).toBe(true, 'DSN input is missing');
    };

    this.verifyPcgDeviceSoftwareVersionHeader = function () {
        var pcgSoftwareversionHeaderText = this.pcgDeviceSoftwareVersionTableHeader.getText();
        expect(pcgSoftwareversionHeaderText).toContain('Date of Change', 'Date of Change column is missing');
        expect(pcgSoftwareversionHeaderText).toContain('Kernel Version', 'Kernel Version column is missing');
        expect(pcgSoftwareversionHeaderText).toContain('External Version', 'External Version column is missing');
        expect(pcgSoftwareversionHeaderText).toContain('Platform Version', 'Platform Version column is missing');
        expect(pcgSoftwareversionHeaderText).toContain('System Version', 'System Version column is missing');
    };

    this.verifyIsDataInTablePresent = function () {
        expect(this.allPcgDeviceSoftwareVersionRows.count()).toBeGreaterThan(0, 'Table Data is missing');
    };

    this.typeInDsnFilter = function (dsn) {
        this.dsnInput.sendKeys(dsn).sendKeys(protractor.Key.ENTER);
    };

};

module.exports = new pcgDeviceSoftwareVersionHistoryPage();