/**
 * Created by Popazov on 2/7/2018.
 */

describe("Remote page ui validation -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var remoteDiagnosticPage = require('../../../pages/remoteDiagnostics.page.js');
    var tableUtil = require('../../../utilities/tables.util');
    const _ = require('lodash');
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var password = browser.params.adduser.password;
    var urlPart = '/#/nav/remoteDiagnostics/deactivate/?page=';
    var columnsForValidation = [remoteDiagnosticPage.columns.dsnColumn, remoteDiagnosticPage.columns.vinColumn];
    var columnsForSorting = [
        remoteDiagnosticPage.columns.makeColumn,
        remoteDiagnosticPage.columns.deactivationDateColumn,
        remoteDiagnosticPage.columns.dsnColumn,
        remoteDiagnosticPage.columns.vinColumn
    ];

    browser.driver.manage().window().maximize();

    beforeEach(function () {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.clickRemoteDiagLink();
    });

    afterEach(function () {
        browser.executeScript('window.localStorage.clear();');
    });

    it("Validate the Pagination  Remote Diagnostic  Page", function () {
        navigation.lastPageButton.click();
        expect(navigation.lastPageButton.getAttribute('disabled')).toBe('true');
        expect(navigation.nextPageButton.getAttribute('aria-hidden')).toBe('true');
        navigation.firstPageButton.click();
        expect(navigation.firstPageButton.getAttribute('disabled')).toBe('true');
        expect(navigation.previousPageButton.getAttribute('aria-hidden')).toBe('true');
        navigation.nextPageButton.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + urlPart + 1);
        navigation.previousPageButton.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + urlPart + 0);
        navigation.pageSizeButton.click();
        navigation.pageFiftyButton.click();
        navigation.checkForPageCount(50);
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + urlPart + "0&pageSize=50");
        navigation.pageSizeButton.click();
        navigation.pageTenButton.click();
        navigation.checkForPageCount(10);
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + urlPart + "0&pageSize=10");
        navigation.pageSizeButton.click();
        navigation.pageTwentyFiveButton.click();
        navigation.checkForPageCount(25);
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + urlPart + "0&pageSize=25");
    });
    
    it("Deactivate/Reactivate invalid vin", function () {
        var invalidVin = "1ABCDEFGHIJ123456";
        var errorMessage = "One or more VINs could not be processed. Please check the formatting of the remaining VINs and try ENTER VIN(s) again.";
        remoteDiagnosticPage.deactivateVinInput.sendKeys(invalidVin);
        expect(remoteDiagnosticPage.deactivateVinInput.getAttribute('value')).toBe(invalidVin, 'Input field not cleared');
        remoteDiagnosticPage.deactivateResetButton.click();
        expect(remoteDiagnosticPage.deactivateVinInput.getAttribute('value')).toBe('', 'Input field not cleared');
        remoteDiagnosticPage.deactivateVinInput.sendKeys(invalidVin);
        remoteDiagnosticPage.deactivateButton.click();
        remoteDiagnosticPage.popUpConfirmationButton.click();
        expect(navigation.dialogBox.isDisplayed()).toBe(true, "Error message not displayed");
        expect(navigation.dialogBox.getText()).toContain(errorMessage, "Invalid Error Message");
        remoteDiagnosticPage.popUpConfirmationButton.click();
        remoteDiagnosticPage.reactivateTab.click();
        remoteDiagnosticPage.reactivateVinInput.sendKeys(invalidVin);
        expect(remoteDiagnosticPage.reactivateVinInput.getAttribute('value')).toBe(invalidVin, 'Input field not cleared');
        remoteDiagnosticPage.reactivateResetButton.click();
        expect(remoteDiagnosticPage.reactivateVinInput.getAttribute('value')).toBe('', 'Input field not cleared');
        remoteDiagnosticPage.reactivateVinInput.sendKeys(invalidVin);
        remoteDiagnosticPage.reactivateButton.click();
        remoteDiagnosticPage.popUpConfirmationButton.click();
        expect(navigation.dialogBox.isDisplayed()).toBe(true, "Error message not displayed");
        expect(navigation.dialogBox.getText()).toContain(errorMessage, "Invalid Error Message");
        remoteDiagnosticPage.popUpConfirmationButton.click();
    });

    columnsForValidation.forEach(function (column) {
        it("Deactivation list filtering by " + column.name, function () {
            var firstCellvalue, secondCellValue;
            tableUtil.getTableCellData(0, column)
                .then(function (text) {
                    firstCellvalue = text;
                    return tableUtil.getTableCellData(1, column)
                })
                .then(function (text) {
                    secondCellValue = text;
                    navigation.typeInSearchFilter(firstCellvalue);
                    navigation.typeInSearchFilter(secondCellValue);
                    return tableUtil.getTableColumnData(column);
                })
                .then(function (text) {
                    expect(_.isEmpty(_.difference(text, [firstCellvalue, secondCellValue])))
                        .toBe(true, "Incorrect result after filtering by multiple DSN: " + _.difference(text, [firstCellvalue, secondCellValue]));
                    expect(_.isEmpty(_.difference([firstCellvalue, secondCellValue], text)))
                        .toBe(true, "Incorrect result after filtering by multiple DSN: " + _.difference([firstCellvalue, secondCellValue], text));
                })
        });
    });

    columnsForSorting.forEach(function (column) {
        it("Validate Deactivation list soting by " + column.name + " Column", function () {
            var columnValuesSortedByDesc, columnValuesSortedByAsc;
            tableUtil.sortTableByColumnDesc(column)
                .then(function () {
                    return tableUtil.getTableColumnData(column)
                })
                .then(function (array) {
                    columnValuesSortedByDesc = array;
                    return tableUtil.sortTableByColumnAsc(column)
                })
                .then(function () {
                    return tableUtil.getTableColumnData(column)
                })
                .then(function (array) {
                    columnValuesSortedByAsc = array;
                    tableUtil.validateColumnSortedByDesc(columnValuesSortedByDesc);
                    tableUtil.validateColumnSortedByAsc(columnValuesSortedByAsc)
                });
        })
    });
});