/**
 * Created by Cottomoeller on 12/18/2015.
 */
var OEMsPage = function() {
    this.oemList = element.all(by.className('oem-card'));
    this.allOEMSRowsHighDensity = element.all(by.css('[ng-repeat="oem in $ctrl.oems"]'));
    this.allOEMSNamesHighDensity = element.all(by.css('[ng-bind="oem.name"]'));
    this.addOEMBtn = element(by.css('[href="/#/nav/oem/add"]'));

    this.checkForOemData = function(){
        this.oemList.count().then(function(count){
            expect(count).toBeGreaterThan(0, 'There was no OEM Data to be found.')
        });
    };

    this.clickOEMSCheckbox = function(oemsName){
        this.allOEMSRowsHighDensity.filter(function (row) {
            // index 2 for user names
            return row.$$('td').get(1).getText().then(function (name) {
                return name === oemsName;
            });
        }).then(function (filteredRows) {
            if (filteredRows.length < 1) {
                expect(false).toBe(true, 'No customer was found by that name');
            }
            filteredRows[0].$$('md-checkbox').get(0).click();
        });
    };
};

module.exports = new OEMsPage();