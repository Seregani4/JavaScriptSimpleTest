/**
 * Created by Luis Bartte - 2018-07-05
 */

describe('Vehicle subscription status query by VIN List', function() {

    // Needed data from configuration
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;
    var vin = browser.params.vehicle.preferredVin;
    let baseGatewayUrl = browser.params.environment.securityGtwyUrl;
    var checkSubsStatusByVinListUrl = baseGatewayUrl + '/vehicles/subscriptionStatus/by-vin-list';

    // Load utils
    var securityUtil = require('../../../utilities/security.util.js');
    var superagent = require('superagent');

    let credentialsData = securityUtil.createCredentialsData(peoplenetAdminEmail, password);

    it('Status returned should be a active/inactive value for a list of vins', function(done) {
        let postStatusRequest = superagent.post(checkSubsStatusByVinListUrl);
        securityUtil.doSecuredCall(credentialsData, postStatusRequest)
            .then(function(){
                postStatusRequest.send([vin])
                    .then( function(response) {
                        expect(response.status).toBe(200);
                        expect(response.body.length).toBe(1);
                        expect(response.body[0].vin).toBe(vin);
                        expect(['active', 'inactive']).toContain(response.body[0].status);
                        done();
                    }).catch(function (error) {
                        done().fail('Unexpected error status, should be 200, got: ' + error.status);
                });
            });
    });

    it('Status list returned should be empty if the vins do not exist', function(done) {
        var vinList = ['firstVin', 'secondVin', 'thirdVin'];
        let postStatusRequest = superagent.post(checkSubsStatusByVinListUrl);
        securityUtil.doSecuredCall(credentialsData, postStatusRequest)
            .then(function(){
                postStatusRequest.send(vinList)
                    .then( function(response) {
                        expect(response.status).toBe(200);
                        expect(response.body.length).toBe(0);
                        done();
                    }).catch(function (error) {
                        done().fail('Unexpected error status, should be 200, got: ' + error.status);
                });
            });
    });

    it('Sending a request without token should result in 401 (UNAUTHORIZED) HTTP status', function(done) {
        let postStatusRequest = superagent.post(checkSubsStatusByVinListUrl);
        postStatusRequest.send([vin])
            .then(function(response) {
                done().fail('Unexpected error status, should be 401, got: ' + response.status);
            }).catch(function (error) {
                expect(error.status).toBe(401);
                done();
            });
    });
});