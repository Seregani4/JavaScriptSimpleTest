/**
 * Created by Cottomoeller on 12/30/2015.
 */
var TopTenFaultsPage = function () {
    this.faultTable = element.all(by.repeater('fault in ctrl.faults'));

    this.topTenFaultsHeader = element.all(by.repeater('col in $ctrl.cols'));
    this.allTop10Faults = element.all(by.repeater('row in $ctrl.rows'));
    this.showErrorButtons = element.all(by.xpath("//button[@ng-click = '$ctrl.owner.goToVehicleList(row.faultCode.key)']"));

    this.topTenFaultFirstColumn = element.all(by.xpath('//td[1]'));
    this.vinFromTable = element(by.xpath('(//td/span)[7]'));
    this.codeFromFaultLog = element.all(by.xpath('//td[5]'));

    this.verifyTopTenFaultsDataIsVisible = function () {
        expect(this.topTenFaultsHeader.getText()).toContain('DTC', 'DTC is not Displayed');
        expect(this.topTenFaultsHeader.getText()).toContain('FMI', 'FMI is not Displayed');
        expect(this.topTenFaultsHeader.getText()).toContain('SPN', 'SPN is not Displayed');
        expect(this.topTenFaultsHeader.getText()).toContain('Count', 'Count is not Displayed');
        expect(this.topTenFaultsHeader.getText()).toContain('Percent', 'Count is not Displayed');
        expect(this.allTop10Faults.count()).toBeGreaterThan(0);
    };

    this.clickArrowButton = function (rowNumber) {
        element.all(by.xpath('(//span/button)[' + rowNumber + ']')).click()
    }

};

module.exports = new TopTenFaultsPage();