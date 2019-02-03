var RolesPage = function() {

    //Headers
    this.rolesPageHeaders = element.all(by.repeater('col in $ctrl.cols'));
    this.allRolesEditPageCheckboxes = element.all(by.repeater('application in $ctrl.applications'));
    this.allCheckboxes = element.all(by.model('permission.selected'));
    this.saveBtn = element(by.partialButtonText('Save'));
    this.allRolesRows = element.all(by.repeater('row in $ctrl.rows'));

    //Permission Checkboxes
    this.rolesCheckboxSelected = element.all(by.css('[aria-checked="true"]'));
    this.rolesCheckboxUnselected = element.all(by.css('[aria-checked="false"]'));

    this.verifyRoleListTableDataIsVisible = function(){
        expect(this.rolesPageHeaders.getText()).toContain('Name', 'Name column is missing');
        expect(this.rolesPageHeaders.getText()).toContain('Description', 'Description column is missing');
        expect(this.rolesPageHeaders.getText()).toContain('Permissions', 'Permissions column is missing');
        expect(this.rolesPageHeaders.getText()).toContain('Organization Types', 'Organization Types column is missing');
        expect(this.rolesPageHeaders.getText()).toContain('Applications', 'Applications column is missing');
        this.allRolesRows.count().then(function(count) {
            expect(count).toBeGreaterThan(0, 'There was no Customer data to be found');
        });
    };

    this.clickRoleCheckbox = function(roleName){
        browser.sleep(1000);//This Sleep is here because the Roles Page takes a while to fully initialize all of the elements on the page, sometimes producing an error when this method starts
        this.allRolesRows.filter(function (row) {
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
        this.allRolesRows.count().then(function(count) {
            expect(count<=expectedCount).toBe(true);
        });
    };


};

module.exports = new RolesPage();