/**
 * Created by Rodrigo Machado - 2018-06-15
 */

describe('Vehicle OTA status endpoints', function() {
    //Fault Code Requirements
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;

    // Load utils
    var otaSubscriptionUtil = require('../../../utilities/otaSubscription.util.js');
    var securityUtil = require('../../../utilities/security.util.js');

    let credentialsData = securityUtil.createCredentialsData(peoplenetAdminEmail, password); 
    var vin = browser.params.vehicle.preferredVin;

    it('Status returned should be a true/false value', function(done) {
        otaSubscriptionUtil.getOtaStatus(credentialsData, vin, function (status) {
                expect([true,false]).toContain(status);
                done();
            });
        
    });

    it('Status set to true, should be returned as true when reading it from endpoint', function(done) {
        otaSubscriptionUtil.setOtaStatus(credentialsData, vin, true, function () {
            otaSubscriptionUtil.getOtaStatus(credentialsData, vin, function (status) {
                expect(status).toEqual(true);
                done();
            });
        });
    });
    
    it('Status set to false, should be returned as false when reading it from endpoint', function(done) {
        otaSubscriptionUtil.setOtaStatus(credentialsData, vin, false, function () {
            otaSubscriptionUtil.getOtaStatus(credentialsData, vin, function (status) {
                expect(status).toEqual(false);
                done();
            });
        });
    });
});