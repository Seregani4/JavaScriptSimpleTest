/**
 * Created by Cottomoeller on 12/17/2015.
 */
var EventsPage = function () {
    this.oemField = element(by.css('[ng-model="$ctrl.oemKey"]'));
    this.OEMDropdown = element.all(by.css('[role="option"]'));
    this.versionTable = element.all(by.css('[role="listitem"]'));
    this.refreshBtn = element(by.css('[ng-click="$ctrl.search()"]'));

    this.informationIconButtons = element.all(by.css('[md-font-icon="material-icons"]'));
    this.softwareVerisonCount = element.all(by.css('[translate="reports.pmgVersions.count"]'));
    this.softwareVersion = element.all(by.css('[translate="reports.pmgVersions.sw_version"]'));
    this.softwareVersionPercentage = element.all(by.css('[ng-if="$ctrl.total"]'));

    this.verifyPMGVersionsData = function () {
        expect(this.oemField.isDisplayed()).toBe(true, 'PMG Versions Data is missing');
        expect(this.versionTable.count()).not.toBeGreaterThan(0, 'The Version table is visible when it should not be');
        expect(this.refreshBtn.isDisplayed()).toBe(true, 'The Refresh button is missing');
    };

    this.searchOEM = function (oem) {
        this.oemField.click();
        browser.sleep(1000); //need to display full dropdown data
        expect(this.OEMDropdown.getText()).toContain(oem, oem + '  was not found in the OEM Dropdown list');
        element(by.cssContainingText('[role="option"]', oem)).click();
        expect(this.versionTable.count()).toBeGreaterThan(0, 'The MIDs table is not visible');
    };

    this.getTotalVersionCountAndValidatePercentage = function () {
        this.softwareVerisonCount.getText().then(function (allSoftwareVersionCount) {
            var versionCountsArray = allSoftwareVersionCount.map(function (str) {
                return +str.replace(/\D/g, '');
            });

            expect(versionCountsArray.length).toBe(allSoftwareVersionCount.length, "The Arrays lengths does not match");

            var totalCount = versionCountsArray.reduce(function (sum, value) {
                return sum + value;
            }, 0);

            for (var j = 0; j < versionCountsArray.length; j++) {
                var versionCount = versionCountsArray[j];
                var percentage = (versionCount / totalCount * 100).toFixed(2);
                expect(element.all(by.css('[ng-if="$ctrl.total"]')).get(j).getText()).toContain(percentage, "The Percentages does not Match")
            }
        });
    }

};

module.exports = new EventsPage();