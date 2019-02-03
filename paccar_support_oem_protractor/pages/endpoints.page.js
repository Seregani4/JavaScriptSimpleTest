/**
 * Created by Cottomoeller on 4/20/2016.
 */
var endpointsPage = function () {
    this.endpointList = element(by.className('md-table'));
    this.endpointHeader = element(by.className('page-header-title'));
    this.endpointsListTableHeader = $('tr').$$('th');
    this.allEnpointsRows = element.all(by.repeater('row in $ctrl.rows'));
    this.eventTypesInput = element(by.name('eventtype'));
    this.searchInput = element(by.model('$ctrl.searchText'));

    //ColumnNumbers
    var queueNameColumn = 0;
    var eventTypeColumn = 1;
    var subscriberColumn = 2;
    var organizationColumn = 3;
    var lastUpdatedColumn = 4;
    var actionsColumn = 5;


    this.verifyIsDataInTablePresent = function () {
        expect(this.allEnpointsRows.count()).toBeGreaterThan(0, 'Table Data is missing');
    };

    this.verifyEndpointData = function () {
        expect(this.endpointHeader.getText()).toBe('Endpoints', 'Title is invalid');
        expect(this.endpointList.isDisplayed()).toBe(true, 'Endpoint data is missing');
    };

    this.verifyEndpointsListTableDataIsVisible = function () {
        var enpointsListTableHeaderText = this.endpointsListTableHeader.getText();
        expect(enpointsListTableHeaderText).toContain('QUEUE NAME', 'QUEUE NAME column is missing');
        expect(enpointsListTableHeaderText).toContain('EVENT TYPE', 'EVENT TYPE column is missing');
        expect(enpointsListTableHeaderText).toContain('SUBSCRIBER', 'SUBSCRIBER column is missing');
        expect(enpointsListTableHeaderText).toContain('ORGANIZATION', 'ORGANIZATION column is missing');
        expect(enpointsListTableHeaderText).toContain('LAST UPDATED', 'LAST UPDATED column is missing');
        expect(enpointsListTableHeaderText).toContain('ACTIONS', 'ACTIONS column is missing');
        this.verifyIsDataInTablePresent();
    };





    this.verifyQueueNameColumn = function (queueName) {
        this.verifyIsDataInTablePresent();
        this.allEnpointsRows.filter(function (row) {
            return row.$$('td').get(queueNameColumn).getText().then(function (queueNameColumn) {
                expect(queueNameColumn).toContain(queueName, 'The names did not match');
            });
        }).then(function (filteredRows) {
        });
    };

    this.verifyEventTypeColumn = function (eventType) {
        this.verifyIsDataInTablePresent();
        this.allEnpointsRows.filter(function (row) {
            return row.$$('td').get(eventTypeColumn).getText().then(function (eventTypeColumn) {
                expect(eventTypeColumn).toContain(eventType, 'The types did not match');
            });
        }).then(function (filteredRows) {
        });
    };

    this.verifySubscriberColumn = function (subscriber) {
        this.verifyIsDataInTablePresent();
        this.allEnpointsRows.filter(function (row) {
            return row.$$('td').get(subscriberColumn).getText().then(function (subscriberName) {
                expect(subscriberName).toContain(subscriber, 'The subscriber did not match');
            });
        }).then(function (filteredRows) {
        });
    };

    this.verifyOrganizationColumn = function (organization) {
        this.verifyIsDataInTablePresent();
        this.allEnpointsRows.filter(function (row) {
            return row.$$('td').get(organizationColumn).getText().then(function (organizationNameColumn) {
                expect(organizationNameColumn).toContain(organization, 'The organization did not match');
            });
        }).then(function (filteredRows) {
        });
    };

    this.verifyLastUpdatedColumn = function (date) {
        this.verifyIsDataInTablePresent();
        this.allEnpointsRows.filter(function (row) {
            return row.$$('td').get(lastUpdatedColumn).getText().then(function (lastUpdated) {
                expect(lastUpdated).toContain(date, 'The Last Update Date did not match');
            });
        }).then(function (filteredRows) {
        });
    };


};

module.exports = new endpointsPage();