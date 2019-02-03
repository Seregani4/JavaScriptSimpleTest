/**
 * Created by jelliott on 1/9/2017.
 */

var PermissionsPage = function() {
//Headers
    this.permissionPageHeaders = element.all(by.repeater('col in $ctrl.cols'));
//Permission Roles
    this.allpermissionsRows = element.all(by.repeater('row in $ctrl.rows'));


    this.verifyPermissionListTableDataIsVisible = function(){
        expect(this.permissionPageHeaders.getText()).toContain('Name', 'Name column is missing');
        expect(this.permissionPageHeaders.getText()).toContain('Description', 'Description column is missing');
        this.allpermissionsRows.count().then(function(count) {
            expect(count).toBeGreaterThan(0, 'There was no Customer data to be found');
        });
    };

    this.clickPermissionCheckbox = function(roleName){
        this.allpermissionsRows.filter(function (row) {
            // index 2 for user names
            return row.$$('td').get(1).getText().then(function (name) {
                return name === roleName;
            });
        }).then(function (filteredRows) {
            if (filteredRows.length < 1) {
                expect(false).toBe(true, 'No Role was found by that name');
            }
            filteredRows[0].$$('md-checkbox').get(0).click();
        });
    };

    this.checkForPageCount = function(expectedCount) {
        this.allpermissionsRows.count().then(function(count) {
            expect(count<=expectedCount).toBe(true);
        });
    };



};

module.exports = new PermissionsPage();