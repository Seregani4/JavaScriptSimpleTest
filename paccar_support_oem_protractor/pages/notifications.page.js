/**
 * Created by Cottomoeller on 12/8/2015.
 */
var NotificationsPage = function() {
    var moment = require('moment');
    this.allNotificationCardHeaders = element.all(by.css('[ng-show="$ctrl.ttmnotification._source.subject"]'));
    this.allNotificationRows = element.all(by.repeater('ttmnotification in $ctrl.data'));
    this.timeStamp = element.all(by.css('[ng-show="$ctrl.notificationlog.timestamp"]'));
    this.ttmTimeStamp = element.all(by.xpath("//span[@title = 'Local Time' ]"));
    this.notificationsPerPage = element(by.css('[class="entity-paging__label ng-binding"]'));
    this.userEmailFromList = element.all(by.css('[class="break-word ng-binding ng-scope layout-row"]')).first();
    this.vievDetailsButtonsList = element.all(by.css("a[href*='/#/nav/notification/details/peoplenet:notificationlog']"));
    this.textFromFirstTable = element.all(by.xpath('(//md-card[@ng-hide="$ctrl.deleted"])[1]'));
    this.notificationStatus = element.all(by.css("div[ng-show='$ctrl.notificationlog.status']"));
    this.jsonBodyPreview = element(by.xpath("//pre[@class = 'notification-details-json flex']"));
    //get the date 30 days prior to today's date
    var priorDate = moment().subtract(30, 'days');
    var neededFormat = priorDate.format('MM/DD/YYYY');

    //Buttons (different from navigation page)
    this.lastPageButton = element(by.css('[aria-label="Last Page"]'));

    this.verifyNotificationHeader = function(notification){
        expect(this.allNotificationCardHeaders.get(0).getText()).toContain(notification);
    };

    this.verifyNotificationsData = function() {
        expect(this.allNotificationRows.count()).toBeGreaterThan(0, 'Notifications Data is missing');
    };

    this.verifyRecipient = function(email){
        expect(this.allNotificationRows.get(0).getText()).
            toContain(email, 'Notifications is having issues. 5 min wait time makes the test fail.');
    };

    this.verifyTimeStamp = function(){
        var newDateTime = moment().format('MMMM D, YYYY h:mm:ss a');
        var date = '';
        this.timeStamp.get(0).getText().then(function(text){
            //console.log(text);
            date = text;//Sets "date" to the timestamp on the page
        });
        expect(date < newDateTime).toBe(true, 'Timestamp was not found on the page');
    };

    this.verifyLastTimeStamp = function(ttmFlag){
        var date = '';
        var timeStampSelector
        if (ttmFlag){
            timeStampSelector= this.ttmTimeStamp.last()
        }
        else {
            timeStampSelector= this.timeStamp.last()
        }
        //get the last notification card
        timeStampSelector.getText().then(function(text){
            //console.log(text.split(" ")[0]);
            date = text.split(" ")[0];//Sets "date" to the timestamp on the page
            return date;
        }).then(function(dateOnCard){
            //console.log(neededFormat);
            expect(dateOnCard)
                .toBe(neededFormat, 'Timestamp does not meet the 30 day requirement. Test ran at: '
                    + moment().format('MMMM D, YYYY h:mm:ss a'));
        });
    };
};

module.exports = new NotificationsPage();
