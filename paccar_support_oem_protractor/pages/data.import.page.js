/**
 * Created by Cottomoeller on 12/9/2015.
 */
var DataImportsPage = function () {
    const _ = require('lodash');
    var validationUtil = require('../utilities/validation.util.js');
    this.allDataImportJobs = element.all(by.repeater('row in $ctrl.rows'));
    this.dataImportDropdown = element.all(by.css('[class="md-text ng-binding"]')).get(0);
    this.jobsList = element.all(By.css('md-select-menu')).$$('md-option');
    this.jobDetailLinks = element.all(by.xpath("//table//a"));
    this.tableHeader = element.all(by.xpath("//table/thead//th"));

    this.verifyDataImportData = () => {
        expect(this.allDataImportJobs.count()).toBeGreaterThan(0, 'Data Import Data is missing');
    };
    this.cardContent = element(by.xpath("//md-card"));
    var cardContent = ["Execution", "Job Name:", "Instance Id:", "Status:", "Start:", "End:", "Parameters:", "Exit Code:", "Messages:",
        "Read count:", "Filter count:", "Write count:", "Read skip count:", "Write skip count:", "Process skip count:", "Rollback count:"];


    this.columns = {
        executionId: {value: 0, name: 'Execution Id'},
        instanceId: {value: 1, name: 'Instance Id'},
        start: {value: 2, name: 'Start'},
        end: {value: 3, name: 'End'},
        status: {value: 4, name: 'Status'}
    };


    this.clickJobsDropdown = () => {
        this.dataImportDropdown.click();
    };

    this.clickJobDetailLink = (linkNumberZeroBased) => {
        this.jobDetailLinks.get(linkNumberZeroBased).click();
        expect(browser.getCurrentUrl()).toContain(`${browser.params.environment.url}/#/nav/import/details/`);
    };
    this.verifyCardContent = () => {
        this.cardContent.getText()
            .then((text) => {
                validationUtil.validateTextContainArray(text, cardContent)
            })
    };

    this.verifyJobsDropdown = () => {
        expect(this.jobsList.count()).toEqual(15, "The list count was off");
        var jobListText = this.jobsList.getText();
        expect(jobListText).toContain('CDMA Provision', 'CDMA Provision was not found in the Data Import Jobs dropdown list');
        expect(jobListText).toContain('Dealer Chassis', 'Dealer Chassis was not found in the Data Import Jobs dropdown list');
        expect(jobListText).toContain('Dealer Code Change', 'Dealer Code Change was not found in the Data Import Jobs dropdown list');
        expect(jobListText).toContain('Dealer Content', 'Dealer Content was not found in the Data Import Jobs dropdown list');
        expect(jobListText).toContain('Dealer Geo Fence', 'Dealer Geo Fence was not found in the Data Import Jobs dropdown list');
        expect(jobListText).toContain('Dealer Hours', 'Dealer Hours was not found in the Data Import Jobs dropdown list');
        expect(jobListText).toContain('Distributor Content', 'Distributor Content was not found in the Data Import Jobs dropdown list');
        expect(jobListText).toContain('Distributor Hours', 'Distributor Hours was not found in the Data Import Jobs dropdown list');
        expect(jobListText).toContain('Fault Codes', 'Fault Codes was not found in the Data Import Jobs dropdown list');
        expect(jobListText).toContain('GSM Provision', 'GSM Provision was not found in the Data Import Jobs dropdown list');
        expect(jobListText).toContain('LTE Provision', 'LTE Provision was not found in the Data Import Jobs dropdown list');
        expect(jobListText).toContain('OEM Renewals', 'OEM Renewals was not found in the Data Import Jobs dropdown list');
        expect(jobListText).toContain('PCG Provision', 'PCG Provision was not found in the Data Import Jobs dropdown list');
        expect(jobListText).toContain('Vehicle Details', 'Vehicle Details was not found in the Data Import Jobs dropdown list');
        expect(jobListText).toContain('Vehicle Extended Warranty', 'Vehicle Extended Warranty was not found in the Data Import Jobs dropdown list');
    };
};

module.exports = new DataImportsPage();