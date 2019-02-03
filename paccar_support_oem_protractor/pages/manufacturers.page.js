/**
 * Created by Cottomoeller on 12/18/2015.
 */
var ManufacturersPage = function() {
    this.allManufacturerRows = element.all(by.repeater('row in $ctrl.rows'));
    this.manufacturerPageHeaders =element.all(by.tagName('th'));
    this.addManufacturerBtn = element(by.css('[href="/#/nav/manufacturer/add"]'));
    //this.editActionButton = element(by.css('[aria-label="edit"]'));


    // Verify Data
    this.verifyManufacturerListTableDataIsVisible = function() {
        expect(this.manufacturerPageHeaders.getText()).toContain('Name', 'Name column is missing');

        this.allManufacturerRows.count().then(function(count) {
            expect(count).toBeGreaterThan(0, 'There was no Customer data to be found');
        });

    };

    this.clickManufacturerCheckbox = function(manufacturerName){
        this.allManufacturerRows.filter(function (row) {
            // index 2 for user names
            return row.$$('td').get(1).getText().then(function (name) {
                return name === manufacturerName;
            });
        }).then(function (filteredRows) {
            if (filteredRows.length < 1) {
                expect(false).toBe(true, 'No manufacturer was found by that name');
            }
            filteredRows[0].$$('md-checkbox').get(0).click();
        });
    };

    this.checkForPageCount = function(expectedCount) {
        this.allManufacturerRows.count().then(function(count) {
            expect(count<=expectedCount).toBe(true);
        });
    };
};

module.exports = new ManufacturersPage();