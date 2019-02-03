/**
 * Created by Cottomoeller on 4/20/2016.
 */
var organizationPage = function () {
    this.organizationHeader = element(by.className('page-header-title'));
    this.organizationList = element(by.className('md-table'));
    this.organizationListTableHeader = $('tr').$$('th');
    this.allOrganizationRows = element.all(by.repeater('row in $ctrl.rows'));

    //ColumnNumbers
    var organizationIdColumn = 0;
    var organizationNameColumn = 1;
    var lastUpdatedColumn = 2;
    var actionsColumn = 3;

    this.verifyOrganizationData = function () {
        expect(this.organizationHeader.getText()).toBe('Organizations', 'Title is invalid');
        expect(this.organizationList.isDisplayed()).toBe(true, 'Organization data is missing');
    };

    //Action Bar and Action Button
    this.newOrganization = element(by.cssContainingText('[type="button"]', 'NEW ORGANIZATION'));



    // Verify Data
    this.verifyOrganizationListTableDataIsVisible = function () {
        var organizationListTableText = this.organizationListTableHeader.getText();
        expect(organizationListTableText).toContain('ORGANIZATION ID', 'ORGANIZATION ID column is missing');
        expect(organizationListTableText).toContain('ORGANIZATION NAME', 'ORGANIZATION NAME column is missing');
        expect(organizationListTableText).toContain('LAST UPDATED', 'LAST UPDATED column is missing');
        expect(organizationListTableText).toContain('ACTIONS', 'ACTIONS column is missing');
        this.verifyIsDataInTablePresent();
    };

    this.verifyIsDataInTablePresent = function () {
        expect(this.allOrganizationRows.count()).toBeGreaterThan(0, 'Table Data is missing');
    };


    this.verifyOrganizationIdColumn = function (Id) {
        this.verifyIsDataInTablePresent();
        this.allOrganizationRows.filter(function (row) {
            return row.$$('td').get(organizationIdColumn).getText().then(function (organizationId) {
                expect(organizationId).toContain(Id, 'The Ids did not match');
            });
        }).then(function (filteredRows) {
            //The "then" is needed so the filter function can complete the promise
        });
    };


    this.verifyOrganizationNameColumn = function (name) {
        this.verifyIsDataInTablePresent();
        this.allOrganizationRows.filter(function (row) {
            return row.$$('td').get(organizationNameColumn).getText().then(function (organizationName) {
                expect(organizationName).toBe(name, 'The names did not match');
            });
        }).then(function (filteredRows) {
            //The "then" is needed so the filter function can complete the promise
        });
    };

    this.verifyLastUpdatedColumn = function (time) {
        this.verifyIsDataInTablePresent();
        this.allOrganizationRows.filter(function (row) {
            return row.$$('td').get(lastUpdatedColumn).getText().then(function (lastUpdated) {
                expect(lastUpdated).toBe(time, 'The Last Updated Time did not match');
            });
        }).then(function (filteredRows) {
            //The "then" is needed so the filter function can complete the promise
        });
    };


};

module.exports = new organizationPage();