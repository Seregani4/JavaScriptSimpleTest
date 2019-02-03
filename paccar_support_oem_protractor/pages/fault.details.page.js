/**
 * Created by jelliott on 12/22/2016.
 */

var FaultDetailsPage = function () {
    //Fault Detail Tabs
    this.faultDetailTabs = element.all(by.repeater('tab in $mdTabsCtrl.tabs'));


    /////////////////////////Details Tab//////////////////////////////
    //Map Modal
    this.faultDetailsHeader = element(by.className("fault-details-header"));
    this.mapModalLink = element(by.css('[ng-if="$ctrl.fault.address.streetAddress"]'));
    this.mapModal = element(by.css('[id="map"]'));
    this.mapModalCloseButton = element(by.css('[ng-click="$ctrl.closeMap()"]'));
    this.mileageValue = element(by.xpath("//div[@class = 'fault-details-data']"));


    //more details on a fault
    this.moreDetailsButton = element.all(by.cssContainingText('[class="ng-binding ng-scope"]', 'More Details')).get(0);


    //fault details page data validation
    this.occurrenceCount = element.all(by.css('[class="fault-details-data ng-binding"]')).get(4);
    this.SPN = element.all(by.css('[class="fault-details-data ng-binding"]')).get(7);
    this.FMI = element.all(by.css('[class="fault-details-data ng-binding"]')).get(8);
    this.eventLocation = element(by.css('[ng-click="$ctrl.showMap(event)"]'));
    this.mapCloseButton = element(by.css('[ng-click="$ctrl.closeMap()"]'));

    this.verifySPNLength = function () {
        this.SPN.getText().then(function (text) {
            console.log(text);
            console.log(text.length);
            expect(text.length).not.toEqual(0);

        });
    };

    this.verifyFMILength = function () {
        this.FMI.getText().then(function (text) {
            console.log(text);
            console.log(text.length);
            expect(text.length).not.toEqual(0);
        });
    };

    this.verifyOccurenceCount = function () {

        this.occurrenceCount.getText().then(function (text) {
            console.log(text);
            console.log(text.length);
            expect(text.length).not.toEqual(0);
        });
    };


    ////////////////////SnapShot Data Tab////////////////////////////////////////
    this.snapshotDataTab = this.faultDetailTabs.get(1);
    this.snapShotMessage = element(by.css('[fault="$ctrl.fault"]'));
    this.snapShotFaultGraphDataButton = element.all(by.repeater('thumbnailOptions in snapshotGroup.thumbnails'));
    this.snapShotDataDropDowns = element.all(by.css('[aria-label="panelTitle"]'));
    this.enlargedsnapShotGraph = element.all(by.css('[class="fault-snapshot-graph__background"]'));
    this.enlargedSnapShotDataCloseButton = element(by.css('[class="fault-snapshot-graph__closebtn"]'));

    this.openAllSnapshotGroup = function () {
        var _this1 = this;
        this.snapShotDataDropDowns.count().then(function (count) {
            for (var i = 1; i < count; i++) {
                _this1.snapShotDataDropDowns.get(i).click()
            }
        });
    };

    ////////////////////////Email Tab//////////////////////////////////////////////
    this.emailTab = this.faultDetailTabs.get(3);
    this.emailPanel = element(by.css('[role="tabpanel"]'));
    this.emailHeaders = element.all(by.xpath("//div[@class='fault-email-content ng-binding']/table[1]//h3"))

    ////////////////////////Authorized Dealer Tab//////////////////////////////////////////////
    this.authorizedDealer = this.faultDetailTabs.get(2);
    this.authorizedDealerTableHeader = element(by.xpath("//div[@class = 'column-headers']"));
    this.moreDealersButton = element(by.css('[href="/#/nav/dealer/list/"]'));

    //Need a separate identifier for the element that's can verify the tab is not present.
    this.authorizedDealerTab = element(by.cssContainingText('[role="tab"]', 'Authorized Dealers'));

    this.authorizedDealerPanel = element(by.css('[ng-if="$ctrl.authorizedDealers.length && $ctrl.canReadDealers"]'));
    this.authorizedDealerApproximateDistance = element(by.xpath("//a//display-unit"));


    this.verifyTabsOnFaultDetailPage = function () {
        expect(this.faultDetailTabs.getText()).toContain('DETAILS');
        expect(this.faultDetailTabs.getText()).toContain('SNAPSHOT DATA');
        expect(this.faultDetailTabs.getText()).toContain('EMAIL');
        expect(this.faultDetailTabs.getText()).toContain('AUTHORIZED DEALERS');
    };

    this.verifyAuthorizedDealerTabNotPresent = function () {
        expect(this.authorizedDealerTab.isPresent()).toBe(false, 'The authorized dealer tab is till present.');
    };

    this.verifySnapshotData = function () {
        this.snapshotDataTab.click();
        expect(this.snapShotMessage.isPresent()).toBe(true);
        this.snapShotDataDropDowns.get(1).click();
        this.snapShotDataDropDowns.get(2).click();
        this.snapShotDataDropDowns.get(3).click();
        this.snapShotDataDropDowns.get(4).click();
        this.snapShotDataDropDowns.get(5).click();
        this.snapShotDataDropDowns.get(6).click();
        this.snapShotDataDropDowns.get(7).click();
        expect(this.snapShotFaultGraphDataButton.isDisplayed()).not.toContain(false);
        this.snapShotFaultGraphDataButton.get(2).click();
        expect(this.enlargedsnapShotGraph.isDisplayed()).not.toContain(false);
        expect(this.enlargedSnapShotDataCloseButton.isDisplayed()).toBe(true);
        this.enlargedSnapShotDataCloseButton.click();
    };

    this.verifyMapModal = function () {
        expect(this.mapModalLink.isPresent()).toBe(true, 'Map Modal Link is not Present');
        this.mapModalLink.click();
        expect(this.mapModal.isPresent()).toBe(true, 'Map Modal Did not show up');
        expect(this.mapModalCloseButton.isPresent()).toBe(true, "The Map Modal Close Button is not Present");
        this.mapModalCloseButton.click();
    };

};

module.exports = new FaultDetailsPage();