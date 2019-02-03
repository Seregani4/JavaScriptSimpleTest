//Created by jstaffon on 6/25/18//
var otaSubscriptionPage = function () {

    //OTA Subscriptions table
    this.otaTable = element(by.model('$ctrl.selectedRows'));
    this.allOtaRows = element.all(by.repeater('row in $ctrl.rows'));
    this.subscriptionSearch = element.all(by.model('$mdAutocompleteCtrl.scope.searchText')).get(1);

    this.columns = {
        tableVinColumn: {value: 1, name: 'VIN'},
    };


    //Check page count
    this.checkForPageCount = function (expectedCount) {
        this.allOtaRows.count().then(function (count) {
            expect(count <= expectedCount).toBe(true);
        });
    };

    this.clickVehicleHyperlinkCellSearch = function (vin) {
        var this1 = this;
        this.allOtaRows.filter(function (row) {
            // index 2 for user names
            return row.$$('td').get(this1.columns.tableVinColumn.value).getText().then(function (name) {
                return name === vin;
            });
        }).then(function (filteredRows) {
            if (filteredRows.length < 1) {
                expect(false).toBe(true, 'No Vehicle was found by that vin: ' + vin);
            } else {
                filteredRows[0].element(by.linkText(vin)).click();
                expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/vehicle/details/' + vin);
            }
        });
    };

    this.clickCustomerHyperlinkCellSearch = function (customer) {
        this.allOtaRows.filter(function (row) {
            // index 2 for user names
            return row.$$('td').get(0).getText().then(function (name) {
                return name === customer;
            });
        }).then(function (filteredRows) {
            if (filteredRows.length < 1) {
                expect(false).toBe(true, 'No Customer was found by that name: ' + customer);
            } else {
                filteredRows[0].element(by.linkText(customer)).click();
                expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/customer/details/peoplenet:customer:');
            }
        });
    };

};

module.exports = new otaSubscriptionPage();