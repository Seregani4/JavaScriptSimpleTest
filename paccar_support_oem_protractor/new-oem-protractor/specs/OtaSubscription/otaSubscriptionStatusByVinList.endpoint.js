/**
 * Created by Rodrigo Machado - 2018-06-27
 */

describe('Vehicle OTA status query by VIN List',  () =>  {

    // Needed data from configuration
    var peoplenetAdminEmail = browser.params.testuseremails.peoplenetadmin;
    var password = browser.params.adduser.password;
    var vin = browser.params.vehicle.preferredVin;
    let baseGatewayUrl = browser.params.environment.securityGtwyUrl;
    var checkOtaStatusByVinListUrl = baseGatewayUrl + '/vehicles/ota-status/by-vin-list';

    // Load utils
    var securityUtil = require('../../../utilities/security.util.js');
    var otaSubscriptionUtil = require('../../../utilities/otaSubscription.util.js');
    var superagent = require('superagent');

    let credentialsData = securityUtil.createCredentialsData(peoplenetAdminEmail, password);

    it('Status returned should be a true/false value for a list of vins', function(done) {
        let postStatusRequest = superagent.post(checkOtaStatusByVinListUrl);
        securityUtil.doSecuredCall(credentialsData, postStatusRequest)
            .then( () => {
                postStatusRequest.send([vin])
                    .then( response =>  {
                        expect(response.status).toBe(200);
                        expect(response.body.length).toBe(1);
                        expect(response.body[0].vin).toBe(vin);
                        expect([true, false]).toContain(response.body[0].status);
                        done();
                    }).catch( error =>  {
                        done().fail('Unexpected error status, should be 200, got: ${error.status}');
                    });
        });

    });

    it('Status list returned should be the same length as the one provided initially, even if VINs are not correct', function(done) {
        var vinList = ['firstVin', 'secondVin', 'thirdVin'];
        let postStatusRequest = superagent.post(checkOtaStatusByVinListUrl);
        securityUtil.doSecuredCall(credentialsData, postStatusRequest)
            .then( () => {
                postStatusRequest.send(vinList)
                    .then( response =>  {
                        expect(response.status).toBe(200);
                        expect(response.body.length).toBe(vinList.length);
                        expect(vinList).toContain(response.body[0].vin);
                        expect(vinList).toContain(response.body[1].vin);
                        expect(vinList).toContain(response.body[2].vin);
                        expect(response.body[0].status).toBe(false);
                        expect(response.body[1].status).toBe(false);
                        expect(response.body[2].status).toBe(false);
                        done();
                    }).catch( error =>  {
                        done().fail('Unexpected error status, should be 200, got: ${error.status}');
                    });
        });

    });

    it('Status set to true, should be returned as true when reading it from endpoint', function(done) {
        otaSubscriptionUtil.setOtaStatus(credentialsData, vin, true,  () =>  {
            let postStatusRequest = superagent.post(checkOtaStatusByVinListUrl);
            securityUtil.doSecuredCall(credentialsData, postStatusRequest)
                .then( () => {
                    postStatusRequest.send([vin])
                        .then( response =>  {
                            expect(response.status).toBe(200);
                            expect(response.body.length).toBe(1);
                            expect(response.body[0].vin).toBe(vin);
                            expect(response.body[0].status).toBe(true);
                            done();
                        }).catch( error =>  {
                            done().fail('Unexpected error status, should be 200, got: ${error.status}');
                        });
            });
        });
    });

    it('Status set to false, should be returned as false when reading it from endpoint', function(done) {
        otaSubscriptionUtil.setOtaStatus(credentialsData, vin, false,  () =>  {
            let postStatusRequest = superagent.post(checkOtaStatusByVinListUrl);
            securityUtil.doSecuredCall(credentialsData, postStatusRequest)
                .then( () => {
                    postStatusRequest.send([vin])
                        .then( response =>  {
                            expect(response.status).toBe(200);
                            expect(response.body.length).toBe(1);
                            expect(response.body[0].vin).toBe(vin);
                            expect(response.body[0].status).toBe(false);
                            done();
                        }).catch( error =>  {
                            done().fail('Unexpected error status, should be 200, got: ${error.status}');
                        });
            });
        });
    });

    it('Sending no data in the POST request should result ina a 400 (BAD REQUEST) HTTP status', function(done) {
        let postStatusRequest = superagent.post(checkOtaStatusByVinListUrl);
        securityUtil.doSecuredCall(credentialsData, postStatusRequest)
            .then( () => {
                postStatusRequest.send()
                    .then( response => {
                        done().fail('Unexpected error status, should be 400, got: ${response.status}');
                    }).catch( error => {
                        expect(error.status).toBe(400);
                        done();
                    });
        });
    });

    it('Sending a request without token should result in 401 (UNAUTHORIZED) HTTP status', function(done) {
        let postStatusRequest = superagent.post(checkOtaStatusByVinListUrl);
        postStatusRequest.send([vin])
            .then( response =>  {
                done().fail('Unexpected error status, should be 401, got: ${response.status}');
            }).catch( error =>  {
                expect(error.status).toBe(401);
                done();
            });
    });

});
