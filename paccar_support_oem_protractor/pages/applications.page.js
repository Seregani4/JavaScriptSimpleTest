/**
 * Created by Cottomoeller on 12/9/2015.
 */
var ApplicationsPage = function() {

    this.allApplicationsRows = element.all(by.repeater('row in $ctrl.rows'));
    this.addApplicationButton = element(by.css('[ng-click="iconButton.click($event, $ctrl)"]'));

    //Action Bar
     this.editActionButton = element(by.css('[ng-click="iconButton.click($event, $ctrl, $ctrl.getSelectedRows())"]'));
    this.deleteActionButton= element(by.css('[ng-click="iconButton.click($event, $ctrl, $ctrl.getSelectedRows())"]'));

    this.verifyApplicationsData = function() {
            expect(this.allApplicationsRows.count()).toBeGreaterThan(0, 'Application Data is missing');
    };

    this.verifyRealmColumn = function(realm){
        this.allApplicationsRows.filter(function (row) {
            return row.$$('td').get(4).getText().then(function (realmName) {
                expect(realmName).toContain(realm, 'The Realm Name did not match');
            });
        }).then(function (filteredRows) {
            //The "then" is needed so the filter function can complete the promise
        });
    };


    this.clickApplicationCheckbox = function(applicationName){
        this.allApplicationsRows.filter(function (row) {
            // index 2 for user names
            return row.$$('td').get(1).getText().then(function (name) {
                return  name.indexOf(applicationName)>=0;
            });
        }).then(function (filteredRows) {
            if (filteredRows.length < 1) {
                expect(false).toBe(true, 'No customer was found by that name');
            }
            filteredRows[0].$$('md-checkbox').get(0).click();
        });
    };

    this.checkForPageCount = function(expectedCount) {
        this.allApplicationsRows.count().then(function(count) {
            expect(count<=expectedCount).toBe(true);
        });
    };
};

module.exports = new ApplicationsPage();