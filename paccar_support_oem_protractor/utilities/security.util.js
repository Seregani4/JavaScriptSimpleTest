/**
 * Created by Rodrigo Machado - 2018-06-15
 */

var securityUtil = function() {
    var superagent = require('superagent');

    let baseGatewayUrl = browser.params.environment.securityGtwyUrl;
    let loginUrl =  baseGatewayUrl + "/userLogin";
    let mobileLoginUrl = baseGatewayUrl + '/mobile/userLogin'

    this.createCredentialsData = function(user, password,  clientId) {
        var credentialsData = new Object();
        credentialsData.clientId = clientId ? clientId : "PaccarPortal";
        credentialsData.password = password;
        credentialsData.username = user;
        return credentialsData;
    }

    this.doSecuredCall = function (credentialsData, requestObj) {
        return superagent.post(loginUrl)
            .set('Content-Type', 'application/json')
            .send(credentialsData)
            .then(function(response) {
                if (response.status != 200) {
                    console.log(response);
                } 
                expect(response.status).toEqual(200);
                requestObj.set('Accept','application/json, text/plain, */*')
                    .set('x-oem', 'paccar')
                    .set('X-Auth-Token', response.body.encodedToken);
            })
    }

    this.doMobileLogin = function(credentialsData) {
        return superagent.post(mobileLoginUrl)
            .set('Content-Type', 'application/json')
            .send(credentialsData)
    }
}

module.exports = new securityUtil();
