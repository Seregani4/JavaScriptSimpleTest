/**
 * Created by Cottomoeller on 12/17/2015.
 */
var EventsPage = function () {
    var request = require('superagent');
    var moment = require('moment');
    var fileReader = require('fs');
    var Buffer = require('buffer').Buffer;
    var startByte = 15,
        endByte = 16,
        newBytes = 'replacing with this line';

    this.eventList = element.all(by.repeater('event in $ctrl.events.results'));
    //var mid = require('../DataFile/midFile.dat');
    this.eventsForm = element.all(by.className('event-search-card'));
    this.eventLedgerField = element(by.name('eventLedger'));
    this.emitterTypeField = element(by.name('emitterType'));
    this.emitterIdField = element(by.name('emitterId'));
    this.eventTypeField =  element(by.css('[aria-label="Event Type"]'));
    this.eventDate =  element(by.css('[value="$ctrl.startTime"]'));
    this.calendarIcon = element(by.className('md-datepicker-button md-icon-button md-button md-default-theme md-ink-ripple'));
    this.calendar = element.all(by.className('md-calendar-scroll-mask')).last();
    this.dateField = element(by.className('md-datepicker-input'));
    this.timeField = element(by.css('[ng-hide="$ctrl.hideTime"]'));
    this.searchBtn = element(by.cssContainingText('.md-button', 'Search'));
    this.showSearchButton =  element(by.css('[aria-label="Show Search"]'));
    this.searchBtn = element(by.cssContainingText('.md-button','Search'));

    this.eventLedgerDropdown = element.all(by.css('[role="option"]'));
    this.emitterTypeDropdown = element.all(by.repeater('item in $mdAutocompleteCtrl.matches'));
    this.vehicleEmitterTypeDropdown = element.all(by.cssContainingText('[role="button"]','VEHICLE'));
    this.deviceEmitterTypeDropdown = element.all(by.cssContainingText('[role="button"]','DEVICE'));
    this.entitiesEmitterTypeDropdown = element.all(by.cssContainingText('[role="button"]','entities'));

    this.eventsReportHeader = $('tr').$$('th');
    this.allEventsRows = element.all(by.className('md-body'));
    this.lastEventTime = element(by.xpath('//tbody/tr[1]/td[5]'));
    this.backToTopBtn = element(by.id('back2TopBtn'));

    this.fillInField = function (fieldForFill, input) {
        fieldForFill.clear();
        fieldForFill.sendKeys(input);
        fieldForFill.sendKeys(protractor.Key.ENTER);
        browser.sleep(1000);
    };

    //ColumnNumbers
    this.columns = {
        eventIdColumn: {value: 0, name: 'Event ID Column'},
        eventTypeColumn: {value: 1, name: 'Event Type Column'},
        eventTimeColumn: {value: 2, name: 'Event Time Column'}
           };


    this.scrollTableToBottom = function () {
        for (var i = 100; i < 1000; i += 100) {
            browser.executeScript("document.getElementsByClassName('md-virtual-repeat-scroller')[0].scrollTop =" + i);
            browser.sleep(1000);
        }
    };

    this.scrollToElement = function(el){
        browser.executeScript('arguments[0].scrollIntoView()', el.getWebElement());
    };

    this.scrollTableToTop = function () {
        browser.executeScript("document.getElementsByClassName('md-virtual-repeat-scroller')[0].scrollTop = 0");
        browser.sleep(2000);
    };

    this.verifyIsDataInTablePresent = function () {
        expect(this.allEventsRows.count()).toBeGreaterThan(0, 'Table Data is missing');
    };

    this.verifyLastEventDate = function (date) {
        this.allEventsRows.$$('tr').get(0).getText().then(function (eventTime) {
            expect(eventTime).toContain(date, 'The date did not match');

        })
    };

    this.verifyEventTypeColumn = function (eventType) {
        this.verifyIsDataInTablePresent();
        var _this1 = this;
        this.allEventsRows.filter(function (row) {
            return row.$$('td').get(_this1.columns.eventTypeColumn.value).getText().then(function (eventTypeColumn) {
                expect(eventTypeColumn).toContain(eventType, 'The Types did not match');
            });
        }).then(function (filteredRows) {
        });
    };

    //Select Emitter Type
    this.selectEmitterType = function (emitterType) {
        this.emitterTypeField.click();
        this.emitterTypeField.clear();
        element.all(by.cssContainingText('[role="button"]', emitterType)).click();
    };


    this.selectEventLedger = function (eventLedger) {
        this.eventLedgerField.click();
        element.all(by.cssContainingText('[role="option"]', eventLedger)).click();
    };

    this.selectEventType = function (eventType) {
        this.eventTypeField.click();
        this.eventTypeField.clear();
        this.eventTypeField.sendKeys(eventType);
        var suggestion = element(by.cssContainingText('[role="button"]',eventType));
        suggestion.isPresent().then(function(result) {
             if ( result) {
                 suggestion.click();
             }
        });
    };

    this.typeDate = function (date) {
        this.dateField.clear();
        this.dateField.sendKeys(date);

    };


    this.fillFiltersFields = function (eventLedger, emitterType, emitterId, eventType) {
        this.selectEventLedger(eventLedger);
        this.selectEmitterType(emitterType);
        this.emitterIdField.clear();
        this.emitterIdField.sendKeys(emitterId);
        this.selectEventType(eventType);
    };

    this.editEmitterType = function(emitterTypeValue) {
        this.emitterTypeField.click();
        this.emitterTypeField.clear();
        this.emitterTypeField.sendKeys(emitterTypeValue);
        this.entitiesEmitterTypeDropdown.click();
    };
    this.editEmitterID = function(emitterIdValues) {
            this.emitterIdField.click();
            //this.emitterIdField.clear();
            this.emitterIdField.sendKeys(emitterIdValues);
        };
    // Verify Data
    this.verifyEventsTableIsVisible = function () {
        expect(this.eventsReportHeader.getText()).toContain('Event Id', 'Event Id column is missing.');
        expect(this.eventsReportHeader.getText()).toContain('Event Type', 'Event Type column is missing.');
        expect(this.eventsReportHeader.getText()).toContain('Event Time', 'Event Time column is missing.');
        expect(this.eventsReportHeader.getText()).toContain('Mid Type', 'MID column is missing.');
    };



    this.verifyEventsData = function () {
        expect(this.allEventsRows.count()).toBeGreaterThan(0, 'Events Data is missing');
    };

    this.verifyAllFieldsArePresent = function () {
        expect(this.eventLedgerField.isDisplayed()).toBe(true, 'The Event Ledger field could not be found');
        expect(this.emitterTypeField.isDisplayed()).toBe(true, 'The Emitter Type field could not be found');
        expect(this.emitterIdField.isDisplayed()).toBe(true, 'The Emitter ID field could not be found');
        expect(this.eventTypeField.isDisplayed()).toBe(true, 'The Event Type field could not be found');
        expect(this.eventDate.isDisplayed()).toBe(true, 'The Event Date field could not be found');
        expect(this.calendarIcon.isDisplayed()).toBe(true, 'The Calendar Icon field could not be found');
        expect(this.dateField.isDisplayed()).toBe(true, 'The Date field could not be found');
        expect(this.timeField.isDisplayed()).toBe(true, 'The Time Date field could not be found');
        expect(this.searchBtn.isDisplayed()).toBe(true, 'The Search button was not found');
    };

    this.verifyEventLedgerDropdownValues = function () {
        this.eventLedgerField.click();
        browser.sleep(1000);
        expect(this.eventLedgerDropdown.getText()).toContain('Connected Fleet', 'An Item was missing in the Event Ledger dropdown list');
        expect(this.eventLedgerDropdown.getText()).toContain('M2M', 'An Item was missing in the Event Ledger dropdown list');
        expect(this.eventLedgerDropdown.getText()).toContain('OEM', 'An Item was missing in the Event Ledger dropdown list');
        //element(by.cssContainingText('[role="option"]', 'EDRIVER')).click();
        //this.eventLedgerField.click();
    };

    this.verifyCalendarIsDisplayed = function () {
        this.calendarIcon.click();
        expect(this.calendar.isDisplayed()).toBe(true, 'The Calendar is not displayed');
        this.calendar.click();
    };

    this.createUndecoratedEvent = function () {//TODO Find out how to pass a binary file to super agent
        //var newDateTime = moment().add(1, 'minute').format('YYYY-M-DTh:mm:ss');
        request.post(browser.params.environment.midParser)
            .set("Content-Type", "application/octet-stream")
            .send("../DataFile/midFile.dat")
            .end(function (err, res) {
                expect(res.status).toEqual(200);
            });
    };

    this.findThisEvent = function (eventName) {
        this.eventList.filter(function (row) {
            // index 2 for user names
            return row.$$('td').get(1).getText().then(function (name) {
                return name === eventName;
            });
        }).then(function (filteredRows) {
            if (filteredRows.length < 1) {
                expect(false).toBe(true, 'No Event was found matching this Event Name');
            }
            filteredRows[0].element(by.css('[class="entity-link ng-binding"]')).click();
            //filteredRows[0].element(by.className('entity-link ng-binding')).click();
            expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/event/details/VEHICLE/');
        });

    };

    this.readMidFile = function (filePath) {
        ////fileReader.readFile(filePath, 'utf8', function(err, contents) {
        ////    console.log(contents);//Asynchoronous Read File
        //
        //});
        //
        //console.log('after calling readFile');
        //var contents = fileReader.readFileSync(filePath, 'utf8');//Read file in synchronously
        //console.log(contents);
        fileReader.open(filePath, 'r', function (err, fd) {
            if (err)
                throw err;
            var buffer = new Buffer(1);
            //for(var i=0;i>3;i++)
            while (true) {
                var num = fileReader.readSync(fd, buffer, 0, 1, null);
                if (num === 0)
                    break;
                console.log('byte read', buffer[0].toString(16));
            }
        });

    };

    this.mouseMoveAndClick = function (x,y){
        browser.actions()
            .mouseMove({x: x, y: y })
            .mouseDown()
            .perform();
    };

    //this.editDsnAndTriggerTimeInMid = function(filePath,newDsn,newTriggerTime){
    //    //var wstream = fileReader.createWriteStream(filePath);
    //    //wstream.write(newDsn);
    //    //wstream.write(newTriggerTime);
    //    //wstream.end();
    //
    //    //var buffer = new Buffer(1);
    //    var fsWriteStream = fileReader.createWriteStream('DataFile/temp.dat', {flags: 'w+'});
    //    var fsReadStream = fileReader.createReadStream(filePath, {start: endByte+1});
    //    fsReadStream.pipe(fsWriteStream);
    //
    //    fsWriteStream.on('finish', function(){
    //        var fsReadStream2 = fileReader.createReadStream(filePath);
    //        var fsWriteStream2 = fileReader.createWriteStream("DataFile/temp.dat", {start: startByte, flags: 'r+'});
    //        //var fsWriteStream2 = fileReader.createWriteStream("DataFile/temp.dat", {start: endByte+1, flags: 'r+'});
    //        fsWriteStream2.write(newBytes);
    //        fsReadStream2.pipe(fsWriteStream2);
    //        fsWriteStream2.end();
    //    });
    //
    //
    //}
};

module.exports = new EventsPage();