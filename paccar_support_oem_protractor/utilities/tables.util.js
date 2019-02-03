/**
 * Created by Popazov on 9/14/2017.
 */


var TablesUtil = function () {
    this.allTableRows = element.all(by.repeater('row in $ctrl.rows'));
    var navigation = require('../pages/navigation.page.js');
    const _ = require('lodash');

    this.verifyTableData = function (tableSelector) {
        var selector = tableSelector || this.allTableRows;
        expect(selector.count()).toBeGreaterThan(0, 'Table Data is missing');
    };

    this.verifyTableDataIsEmpty = function (tableSelector) {
        var selector = tableSelector || this.allTableRows;
        expect(selector.count()).toBe(0, 'Table Data is mot Empty');
    };

    this.verifyColumn = function (text, column, tableSelector) {
        var elements = tableSelector || this.allTableRows;
        this.verifyTableData(elements);
        elements.filter(function (row) {
            return row.$$('td').get(column.value).getText().then(function (columnText) {
                expect(columnText).toContain(text, 'The ' + column.name + ' did not match');
            });
        }).then(function (filteredRows) {
            //The "then" is needed so the filter function can complete the promise
        });
    };

    this.clickCheckBox = function (checkBoxNumber) {
        var checkbox = element(by.xpath('//tbody/tr[' + checkBoxNumber + ']/td/span/md-checkbox'));
        checkbox.click();
    };

    this.verifyCell = function (row, column, text) {
        this.verifyTableData();
        var array = [];
        array.push(this.allTableRows.get(row));
        array.filter(function (row) {
            return row.$$('td').get(column.value).getText().then(function (columnText) {
                expect(columnText).toContain(text, 'The ' + text + ' did not match');
            });
        });
    };

    this.verifyNotColumn = function (data, column, tableSelector) {
        var elements = tableSelector || this.allTableRows;
        this.verifyTableData(elements);
        elements.filter(function (row) {
            return row.$$('td').get(column.value).getText().then(function (columnText) {
                expect(columnText).not.toEqual(data, 'The ' + column.name + ' match');
            });
        }).then(function (filteredRows) {
            //The "then" is needed so the filter function can complete the promise
        });
    };

    this.getTableCellData = function (rowNumberZeroBased, column, tableSelector) {
        var elements = tableSelector || this.allTableRows;
        return elements.get(rowNumberZeroBased).$$('td').get(column.value).getText()
    };

    this.clickTableCell = function (rowNumberZeroBased, column, tableSelector) {
        var elements = tableSelector || this.allTableRows;
        elements.get(rowNumberZeroBased).$$('td').get(column.value).click()
    };


    this.getTableColumnData = function (column, tableSelector) {
        var elementsText = [];
        var elements = tableSelector || this.allTableRows;
        return elements.filter(function (row) {
            return row.$$('td').get(column.value).getText().then(function (columnText) {
                elementsText.push(columnText);
            });
        }).then(function () {
            return elementsText
        });
    };

    this.getColumnHeadSelector = function (column) {
        return navigation.tableHeaders.get(column.value);
    };

    this.sortTableByColumnDesc = function (column) {
        var type = "md-asc";
        return this.sortTableByColumn(column, type)
    };

    this.sortTableByColumnAsc = function (column) {
        var type = "md-desc";
        return this.sortTableByColumn(column, type)
    };

    this.sortTableByColumn = function (column, type) {
        var _this1 = this;
        return this.getColumnHeadSelector(column).click()
            .then(function () {
                browser.sleep(1000);
                return navigation.sortingArrow.getAttribute('class')
            })
            .then(function (attribute) {
                if (attribute.includes(type)) {
                    _this1.getColumnHeadSelector(column).click();
                } else {
                    return attribute;
                }
            });
    };

    this.validateColumnSortedByDesc = function (columnDataArray) {
        for (var i = 0; i < columnDataArray.length - 1; i++) {
            expect(columnDataArray[i] >= columnDataArray[i + 1]).toBe(true)
        }
    };

    this.validateColumnSortedByAsc = function (columnDataArray) {
        for (var i = 0; i < columnDataArray.length - 1; i++) {
            if (columnDataArray[i + 1] && columnDataArray[i]) {
                expect(columnDataArray[i] <= columnDataArray[i + 1]).toBe(true)
            }
        }
    };

    this.getRandomArrayElements = function (arr, count) {
        var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
        while (i-- > min) {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
        }
        return shuffled.slice(min);
    };

    this.verifyColumnsNames = function(tableHeaders,columns){
        _.forEach(columns,(eachColumn)=>{
            expect(tableHeaders.get(eachColumn.value).getText()).toBe(eachColumn.name,"Wrong column name")
        })
    };
};

module.exports = new TablesUtil();
