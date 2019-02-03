var GlobalSearchPage = function() {
    this.noResultsMsg = element(by.css('[ng-show="ctrl.results == null"]'));
    this.results = element.all(by.repeater('(type, result) in ctrl.results'));

    this.allResultObjects = element.all(by.repeater('type in results'));

    this.findResultButtonByName = function(name) {
        return element(by.cssContainingText('.ng-binding', name)).getText();
    };

    this.clickResultButton = function(name) {
        return element(by.cssContainingText('.ng-binding', name)).click();
    };
};

module.exports = new GlobalSearchPage();
