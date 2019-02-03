var PaginationBarPage = function() {

    this.firstPageBtn = element(by.css('[ng-click="changePage(1)"]'));
    this.previousPageBtn = element(by.css('[ng-click="changePage(page - 1)"]'));
    this.nextPageBtn = element(by.css('[ng-click="changePage(page + 1)"]'));
    this.lastPageBtn = element(by.css('[ng-click="changePage(lastPage)"]'));
    this.noResultsMsg = element(by.css('[ng-show="results == null"]'));
    //this.pageNumberBox = element(by.css('[ng-disabled="data.hidePageNumber"]'));
    //this.pageNumberInput = element(by.model('data.currentPage'));
    this.pageSizeDropdown = element(by.model('ctrl.pageSize'));

    this.selectPageSize = function(item) {
        element(by.cssContainingText('[ng-repeat="pageSizeOption in ctrl.pageSizeOptions"]', item)).click();
    };

};

module.exports = new PaginationBarPage();
