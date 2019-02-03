/**
 * Created by Rodrigo Machado - 2018-06-15
 */

var otaSubscription = function() {

    var superagent = require('superagent');
    var securityUtil = require('./security.util.js');
    var path = require('path');
    var remote = require('selenium-webdriver/remote');
    var validationUtil = require('../utilities/validation.util');
    var navigation = require('../pages/navigation.page.js');
    var otaSubscriptionPage = require('../pages/otaSupscription.page.js');

    let baseGatewayUrl = browser.params.environment.securityGtwyUrl;

    this.getOtaStatus = function(credentialsData, vehicleVin, callback) {
        let getStatusRequest = superagent.get(baseGatewayUrl + '/vehicles/' + vehicleVin + '/ota-status');
        return securityUtil.doSecuredCall(credentialsData, getStatusRequest)
            .then(function(){
                getStatusRequest.then( function(response) {
                    if (response.status != 200) {
                        console.log(response);
                    }
                    expect(response.status).toEqual(200);
                    if (callback) {
                        callback(response.body);    
                    }
                });
        });
    };

    this.setOtaStatus = function(credentialsData, vehicleVin, status, callback) {
        var postRequest = superagent.post(baseGatewayUrl + '/vehicles/ota-status');
        return securityUtil.doSecuredCall(credentialsData, postRequest)
            .then(function(){
                let otaStatusData = new Object();
                otaStatusData.status = status;
                otaStatusData.vin = vehicleVin;
                otaStatusData.user = credentialsData.username;
                postRequest.send(otaStatusData)
                    .then( function(response) {
                        if (response.status != 200) {
                            console.log(response);
                        }
                        expect(response.status).toEqual(200);
                        if (callback) {
                            callback();    
                        }
                    })
        });
    };

    this.importOtaFile = function (fileToUpload) {
        browser.setFileDetector(new remote.FileDetector());
        var absolutePath = path.resolve(fileToUpload);
        var input = element(by.css('input[type="file"]'));
        input.sendKeys(absolutePath);
    };

    this.validateOTAListPage = function (translation) {
        validationUtil.validateTitle(translation.menu.otaSubscription);
        navigation.validateBreadCrumbs([
            translation.menu.dashboard,
            translation.menu.otaSubscription
        ]);
        validationUtil.validateActionList(
            navigation.moreOptionsButton,
            navigation.allFiltersActionsList,
            navigation.exportButton,
            [translation.actions.export.toUpperCase(),
            translation.actions.import.toUpperCase(),
            translation.actions.configureColumns.toUpperCase()]);
        navigation.tableHeader.getText().then(function (text) {
            validationUtil.validateTextContainArray(text, [
                translation.otaSubscriptionList.columns.customer,
                translation.otaSubscriptionList.columns.vin,
                translation.otaSubscriptionList.columns.make,
                translation.otaSubscriptionList.columns.year,
                translation.otaSubscriptionList.columns.model,
                translation.otaSubscriptionList.columns.unitNumber,
                translation.otaSubscriptionList.columns.otaStatus
            ]);
        });
        this.validateRowsPerPageLabel(translation);
        this.validateSearchFilter(translation)
    };

    this.validateSearchFilter = function (translation) {
        otaSubscriptionPage.subscriptionSearch.getAttribute('placeholder').then(function (text) {
            validationUtil.validateTextEqual(text, translation.menu.filterResult)
        });
    }

    this.validateRowsPerPageLabel = function (translation) {
        navigation.rowsPerPageLabel.getText().then(function (text) {
            validationUtil.validateTextContain(text, translation.navigation.rowsPerPageLabel);
        })
    };

};

module.exports = new otaSubscription();
