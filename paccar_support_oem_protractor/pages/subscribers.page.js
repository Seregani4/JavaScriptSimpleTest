/**
 * Created by Cottomoeller on 4/20/2016.
 */
var subscribersPage = function () {
    this.subscribersList = element(by.className('md-table'));
    this.subscribersHeader = element(by.className('page-header-title'));
    this.subscribersListTableHeader = $('tr').$$('th');
    this.allSubscribersRows = element.all(by.repeater('row in $ctrl.rows'));

    this.verifySubscribersData = function () {
        expect(this.subscribersHeader.getText()).toBe('Subscribers', 'Title is invalid');
        expect(this.subscribersList.isDisplayed()).toBe(true, 'Subscriber List data is missing');
    };


    //New subscriber popup
    this.newSubscriberTitle = element(by.cssContainingText('.ng-binding', 'New Subscriber'));
    this.newSubscriberName = element(by.name('name'));
    this.newSubscriberId = element(by.name('code'));
    this.newSubscriberEmailAddress = element(by.name('email'));
    this.newSubscriberOrganization = element(by.name('organization'));
    this.newSubscriberNotes = element(by.name('notes'));
    this.newSubscriberActiveCheckBox = element(by.model('$ctrl.subscriber.active'));
    this.newSubscriberCancelButton = element(by.buttonText('cancel'));
    this.newSubscriberSaveButton = element(by.buttonText('save'));

    //Subscribers table  validation
    this.verifySubscribersListTableDataIsVisible = function () {
        var subscribersListTableHeaderText = this.subscribersListTableHeader.getText();
        expect(subscribersListTableHeaderText).toContain('SUBSCRIBER NAME', 'SUBSCRIBER NAME column is missing');
        expect(subscribersListTableHeaderText).toContain('ORGANIZATION', 'ORGANIZATION column is missing');
        expect(subscribersListTableHeaderText).toContain('EMAIL ADDRESS', 'EMAIL ADDRESS column is missing');
        expect(subscribersListTableHeaderText).toContain('STATUS', 'STATUS column is missing');
        expect(subscribersListTableHeaderText).toContain('LAST UPDATED', 'LAST UPDATED column is missing');
        expect(subscribersListTableHeaderText).toContain('ACTIONS', 'ACTIONS column is missing');
        this.verifyIsDataInTablePresent();
    };

    this.verifyNewSubscribersPopupFields = function () {
        expect(this.newSubscriberTitle.isDisplayed()).toBe(true, 'New Subscriber Title is missing');
        expect(this.newSubscriberName.isDisplayed()).toBe(true, 'New Subscriber name input is missing');
        expect(this.newSubscriberId.isDisplayed()).toBe(true, 'New Subscriber id input is missing');
        expect(this.newSubscriberEmailAddress.isDisplayed()).toBe(true, 'New Subscriber email input is missing');
        expect(this.newSubscriberOrganization.isDisplayed()).toBe(true, 'New Subscriber organization input is missing');
        expect(this.newSubscriberNotes.isDisplayed()).toBe(true, 'New Subscriber notes input is missing');
        expect(this.newSubscriberActiveCheckBox.isDisplayed()).toBe(true, 'New Subscriber active checkBox is missing');
        expect(this.newSubscriberCancelButton.isDisplayed()).toBe(true, 'New Subscriber cancel button is missing');
        expect(this.newSubscriberSaveButton.isDisplayed()).toBe(true, 'New Subscriber save button is missing');

    }

    //ColumnNumbers
    var subscriberNameColumn = 0;
    var organizationColumn = 1;
    var emailAddressColumn = 2;
    var statusColumn = 3;
    var lastUpdatedColumn = 4;
    var actionsColumn = 5;

    this.verifyIsDataInTablePresent = function () {
        expect(this.allSubscribersRows.count()).toBeGreaterThan(0, 'Table Data is missing');
    };

    this.verifySubscriberNameColumn = function (name) {
        this.verifyIsDataInTablePresent();
        this.allSubscribersRows.filter(function (row) {
            return row.$$('td').get(subscriberNameColumn).getText().then(function (subscriberName) {
                expect(subscriberName).toContain(name, 'The names did not match');
            });
        }).then(function (filteredRows) {
        });
    };

    this.verifyOrganizationColumn = function (organization) {
        this.verifyIsDataInTablePresent();
        this.allSubscribersRows.filter(function (row) {
            return row.$$('td').get(organizationColumn).getText().then(function (subscriberOrganization) {
                expect(subscriberOrganization).toContain(organization, 'The organization did not match');
            });
        }).then(function (filteredRows) {
        });
    };

    this.verifyEmailAddressColumn = function (emailAddress) {
        this.verifyIsDataInTablePresent();
        this.allSubscribersRows.filter(function (row) {
            return row.$$('td').get(emailAddressColumn).getText().then(function (subscriberEmailAddress) {
                expect(subscriberEmailAddress).toContain(emailAddress, 'The Email Address did not match');
            });
        }).then(function (filteredRows) {
        });
    };

    this.verifyStatusColumn = function (status) {
        this.verifyIsDataInTablePresent();
        this.allSubscribersRows.filter(function (row) {
            return row.$$('td').get(statusColumn).getText().then(function (subscriberStatus) {
                expect(subscriberStatus).toContain(status, 'The Status did not match');
            });
        }).then(function (filteredRows) {
        });
    };

    this.verifyLastUpdatedColumn = function (lastUpdated) {
        this.verifyIsDataInTablePresent();
        this.allSubscribersRows.filter(function (row) {
            return row.$$('td').get(lastUpdatedColumn).getText().then(function (subscriberlastUpdated) {
                expect(subscriberlastUpdated).toContain(lastUpdated, 'The Last Updated date did not match');
            });
        }).then(function (filteredRows) {
        });
    };

};

module.exports = new subscribersPage();