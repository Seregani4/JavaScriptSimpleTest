/**
 * Created by Popazov on 4/12/2018.
 */

var GoogleAnalyticsPage = function () {

    this.allRolesDropDown = element(by.model('$ctrl.role'));
    this.allRolesDropDownList = element.all(by.xpath('//md-select-menu//md-option'));
    this.startDateField = element.all(by.className('md-datepicker-input')).first();
    this.endDateField = element.all(by.className('md-datepicker-input')).last();
    this.exportBtn = element(by.css('[type="submit"]'));
    this.errorMessageStartDate = element(by.xpath("//ng-message[@when = 'maxdate']"));
    this.errorMessageEndtDate = element(by.xpath("//ng-message[@when = 'mindate']"));
    this.errorMessagesRequired = element.all(by.xpath("//ng-message[@when = 'required']"));

    this.fillStartDateField = function (date) {
        this.startDateField.click();
        this.startDateField.clear();
        this.startDateField.sendKeys(date);
        return date;
    };

    this.fillEndDateField = function (date) {
        this.endDateField.click();
        this.endDateField.clear();
        this.endDateField.sendKeys(date);
        return date;
    };

};

module.exports = new GoogleAnalyticsPage();
