/**
 * Created by pshrestha on 8/17/2017.
 */

var DashboardUtil = function () {

    //date time variables
    var moment = require('moment');

    var navigation = require('../pages/navigation.page.js');
    var dashboard2 = require('../pages/dashboard2.page.js');
    var chipFiltersUtil = require('../utilities/chipFilterMatrix.utils.js');
    this.toastAlert = element(by.css('[role="alert"]'));
    var vin = browser.params.vehicle.vin;
    var dealer = browser.params.testdealer.name;
    var customer = browser.params.testcustomer.name;
    var preferred = chipFiltersUtil.dashboardPreferred
    var vehicleGroup = browser.params.vehiclegroup.name0;
    var make = browser.params.manufacturer.name;
    var factory = 'Chillicothe';

    this.filterInDashboard = function(portalType, searchType){
        if(portalType === 'supportal'){
            navigation.fleetHealthButton.click();
        }
        navigation.chipFilter.sendKeys(searchType);
        browser.sleep(1000);
        navigation.chipFilterResults.get(1).click();
        if(searchType === vin){
            expect(dashboard2.vehicleChip.isDisplayed()).toBe(true,'The ' + searchType + ' chip is not present.');
        }else if(searchType === dealer){
            expect(dashboard2.dealerChip.isDisplayed()).toBe(true,'The ' + searchType + ' chip is not present.');
        }else if(searchType === customer){
            expect(dashboard2.customerChip.isDisplayed()).toBe(true,'The ' + searchType + ' chip is not present.');
        }else if(searchType === vehicleGroup){
            expect(dashboard2.vehicleGrpChip.isDisplayed()).toBe(true,'The ' + searchType + ' chip is not present.');
        }else if(searchType === make){
            expect(dashboard2.manufacturerChip.isDisplayed()).toBe(true,'The ' + searchType + ' chip is not present.');
        }else if(searchType === preferred){
            expect(dashboard2.preferredChip.isDisplayed()).toBe(true,'The ' + searchType + ' chip is not present.');
        }else if(searchType === factory){
            expect(dashboard2.factoryChip.isDisplayed()).toBe(true,'The ' + searchType + ' chip is not present.');
        }else
            expect(dashboard2.statusChip.isDisplayed()).toBe(true,'The ' + searchType + ' chip is not present.');

    };

    this.clearAllFilter = function(){
        browser.sleep(1000);
        navigation.clearAllButton.click();
        expect(dashboard2.allChips.get(0).isPresent()).toBe(false, 'The chips did not clear');
    };

    this.closeChipFilter = function(filterToClose){
        if(filterToClose !== vehicleGroup){
            dashboard2.chipFilterCloseBtn.get(0).click();
            browser.sleep(1000);
        }
        if(filterToClose === vin){
            expect(dashboard2.vehicleChip.isPresent()).toBe(false, 'The ' + filterToClose + ' chip did not clear');
        }else if(filterToClose === dealer){
            expect(dashboard2.dealerChip.isPresent()).toBe(false, 'The ' + filterToClose + ' chip did not clear');
        }else if(filterToClose === customer){
            expect(dashboard2.customerChip.isPresent()).toBe(false, 'The ' + filterToClose + ' chip did not clear');
        }else if(filterToClose === vehicleGroup){
            dashboard2.chipFilterCloseBtn.get(1).click();
            browser.sleep(1000);
            expect(dashboard2.vehicleGrpChip.isPresent()).toBe(false, 'The ' + filterToClose + ' chip did not clear');
        }else if(filterToClose === make){
            expect(dashboard2.manufacturerChip.isPresent()).toBe(false, 'The ' + filterToClose + ' chip did not clear');
        }else if(filterToClose === factory){
            expect(dashboard2.factoryChip.isPresent()).toBe(false, 'The ' + filterToClose + ' chip did not clear');
            //Validate the location icon is NOT present
            expect(dashboard2.locationIcon.isPresent()).toBe(false,'The location icon is still present.');
        }else
            expect(dashboard2.statusChip.isPresent()).toBe(false, 'The ' + filterToClose + ' chip did not clear');
    };

    this.validateNoNumChange = function (noActionNum) {
        dashboard2.noActionNoOfVehicle.getText().then (function (afterNum){
            noActionNum.then(function (prevNum) {
                expect(afterNum).not.toBe(prevNum, 'The number of vehicles did not change.');
            });
        });
    };

};

module.exports = new DashboardUtil();
