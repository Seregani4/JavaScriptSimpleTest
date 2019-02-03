/**
 * Created by tbui on 4/7/2016.
 */
var request = require('superagent');
var moment = require('moment');

var UsersHttp = function() {
    
    var pmgProxyAuthUrl = browser.params.environment.pmgProxyAuthUrl;
    var authZeroUrl = browser.params.environment.authZeroUrl;
    var authZeroUserSearchToken = browser.params.authzerotokens.usersearchtoken;
    var authZeroLogsToken = browser.params.authzerotokens.userlogstoken;
    var authServiceUrl = browser.params.environment.authServiceUrl;
    var uidString;
    var encodedUidString;
    var authZeroLogsUri;
    var blacklistToken;
    var blacklistTokenId;

    this.pmgProxyWifiAuthRequest = function (comment, dsn, username, password, expectedStatus) {
        //Buffer/pause to allow for password request to go through
        browser.sleep(2000);
        //POST to pmg proxy wifi auth endpoint
        request.post(pmgProxyAuthUrl)
            .set('Content-Type', 'application/json')
            .send('{"comment":"' + comment + '","dsn":' + dsn + ', "username":"' + username + '", "password":"' + password + '"}')
            //.buffer() // <-- Force the request to buffer via .buffer()
            .end(function (err, res) {
                expect(res.status).toEqual(expectedStatus);
        });
    };

    // Helper methods to save off tokens/uid strings
    this.getUid = function(username) {
        var encodedUsername = encodeURIComponent('"' + username + '"');
        // Make GET request to Auth0 user search service to obtain internal Auth0 user id value
        request.get(authZeroUrl + '/users?fields=email%2Cuser_id&include_fields=true&q=' + encodedUsername + '&search_engine=v2')
            .set('Authorization', 'Bearer ' + authZeroUserSearchToken)
            .end(function (err, res) {
                expect(res.status).toEqual(200);
                //expect(res.text).toContain('user_id');
                var responseText = JSON.parse(res.text); // parse string to json object
                if (res.text.indexOf('user_id') > -1) {
                    var userId = responseText[0].user_id; // grab specific key-value from json obj
                    var uidStringify = JSON.stringify(userId);
                    uidString = uidStringify;
                    var uidStripQuotes = uidString.replace(/"/g, '');
                    encodedUidString = encodeURIComponent(uidStripQuotes);
                    authZeroLogsUri = authZeroUrl + '/users/' + encodedUidString + '/logs';
                    //uidString = thisUid; // convert back to string
                    console.log('thisUID: ' + userId);
                    console.log('globalUID: ' + uidString);
                    console.log('encodedUID: ' + encodedUidString);
                    console.log('uri: ' + authZeroLogsUri);
                }
                else {
                    expect(true).toBe(false, 'No user_id returned from call');
                }
            });
    };

    this.verifyUserViaEmail = function(username) {
        var encodedUsername = encodeURIComponent('"' + username + '"');
        request.get(authZeroUrl + '/users?fields=email%2Cuser_id&include_fields=true&q=' + encodedUsername + '&search_engine=v2')
            .set('Authorization', 'Bearer ' + authZeroUserSearchToken)
            .end(function (err, res) {
                if (res === undefined) {
                    expect(false).toBe(true, 'Result was undefined');
                }
                else {
                    expect(res.status).toEqual(200);
                    if (res.text.indexOf('user_id') > -1) {
                        var responseText = JSON.parse(res.text); // parse string to json object
                        var userId = responseText[0].user_id; // grab specific key-value from json obj
                        var userIdString = JSON.stringify(userId); // convert back to string
                        //var formattedUidString = userIdString.replace(/"/g, '');
                        //var encodedUidString = encodeURIComponent(formattedUidString);
                        request.post(authZeroUrl + '/tickets/email-verification')
                            .set('Content-Type', 'application/json')
                            .set('Authorization', 'Bearer ' + authZeroUserSearchToken)
                            .send('{"user_id":' + userIdString + '}')
                            .end(function (err, res) {
                                expect(res.status).toEqual(201);
                                var responseText = JSON.parse(res.text);
                                if (res.text.indexOf('ticket') > -1) {
                                    var verificationUrl = responseText.ticket;
                                    var verificationUrlString = JSON.stringify(verificationUrl);
                                    var emailValidationLink = verificationUrlString.replace(/"/g, ''); // strip quotes from string
                                    request.get(emailValidationLink)
                                        .end(function (err, res) {
                                            expect(res.status).toEqual(200);
                                            expect(res.text).toContain('Your email was verified. You can continue using the application.');
                                            if (res.text.indexOf('') > -1) {
                                                //Attempt to reuse verification link, expect error message
                                                request.get(emailValidationLink)
                                                    .end(function (err, res) {
                                                        expect(res.status).toEqual(200);
                                                        expect(res.text).toContain('This URL can be used only once');
                                                    });
                                            }
                                            else {
                                                expect(true).toBe(false, 'Error with GET request to email verification URL');
                                            }
                                        });
                                }
                                else {
                                    expect(true).toBe(false, 'No ticket returned from call, user was not created');
                                }
                            });
                    }
                    else {
                        expect(true).toBe(false, 'No user id returned from logs. User was not created.');
                    }
                }
            });
    };
    
    this.setUserPassword = function(username, password) {
        var encodedUsername = encodeURIComponent('"' + username + '"');
        // Make GET request to Auth0 user search service to obtain internal Auth0 user id value
        request.get(authZeroUrl + '/users?fields=email%2Cuser_id&include_fields=true&q=' + encodedUsername + '&search_engine=v2')
            .set('Authorization', 'Bearer ' + authZeroUserSearchToken)
            .end(function (err, res) {
                expect(res.status).toEqual(200);
                if (res.text.indexOf('user_id') > -1) {
                    var responseText = JSON.parse(res.text); // parse string to json object
                    var userId = responseText[0].user_id; // grab specific key-value from json obj
                    var userIdString = JSON.stringify(userId); // convert back to string
                    //var formattedUidString = userIdString.replace(/"/g, '');
                    //var encodedUidString = encodeURIComponent(formattedUidString);
                    request.post(authZeroUrl + '/tickets/password-change')
                        .set('Content-Type', 'application/json')
                        .set('Authorization', 'Bearer ' + authZeroUserSearchToken)
                        .send('{"user_id":' + userIdString + ', "new_password": "' + password + '"}')
                        .end(function (err, res) {
                            expect(res.status).toEqual(201);
                            var responseText = JSON.parse(res.text);
                            if (res.text.indexOf('ticket') > -1) {
                                var verificationUrl = responseText.ticket;
                                var verificationUrlString = JSON.stringify(verificationUrl);
                                passwordSetLink = verificationUrlString.replace(/"/g, ''); // strip quotes from string
                                request.get(passwordSetLink)
                                    .end(function (err, res) {
                                        expect(res.status).toEqual(200);
                                    });
                            }
                            else {
                                expect(true).toBe(false, 'No password ticket returned from call');
                            }
                        });
                }
                else {
                        expect(true).toBe(false, 'No uid returned from logs, user not created');
                    }
            });
    };

    // this.verifyNewUser = function() {
    //     // var encodedUsername = encodeURIComponent('"' + username + '"');
    //     // // Make GET request to Auth0 user search service to obtain internal Auth0 user id value
    //     // request.get(authZeroUrl + '/users?fields=email%2Cuser_id&include_fields=true&q=' + encodedUsername + '&search_engine=v2')
    //     //     .set('Authorization', 'Bearer ' + authZeroUserSearchToken)
    //     //     .end(function (err, res) {
    //     //         expect(res.status).toEqual(200);
    //     //         var responseText = JSON.parse(res.text); // parse string to json object
    //     //         var userId = responseText[0].user_id; // grab specific key-value from json obj
    //     //         var userIdString = JSON.stringify(userId); // convert back to string
    //     //         // POST request to grab Auth0 email verification url
    //     //         request.post(authZeroUrl + '/tickets/email-verification')
    //     //             .set('Content-Type', 'application/json')
    //     //             .set('Authorization', 'Bearer ' + authZeroUserSearchToken)
    //     //             .send('{"user_id":' + uidString + '}')
    //     //             .end(function (err, res) {
    //     //                 expect(res.status).toEqual(201);
    //     //                 var responseText = JSON.parse(res.text);
    //     //                 var verificationUrl = responseText.ticket;
    //     //                 var verificationUrlString = JSON.stringify(verificationUrl);
    //     //                 var formattedVerificationUrl = verificationUrlString.replace(/"/g, ''); // strip quotes from string
    //                     // GET request to Auth0 email verification url
    //                     request.get(emailValidationLink)
    //                         .end(function (err, res) {
    //                             expect(res.status).toEqual(200);
    //                             expect(res.text).toContain('Your email was verified. You can continue using the application.');
    //                             //Attempt to reuse verification link, expect error message
    //                             request.get(emailValidationLink)
    //                                 .end(function (err, res) {
    //                                     expect(res.status).toEqual(200);
    //                                     expect(res.text).toContain('This account is already verified');
    //                                 });
    //                         });
    //         //         });
    //         // });
    // };

    // this.setUserPassword = function() {
    //     // var encodedUsername = encodeURIComponent('"' + username + '"');
    //     // // Make GET request to Auth0 user search service to obtain internal Auth0 user id value
    //     // request.get(authZeroUrl + '/users?fields=email%2Cuser_id&include_fields=true&q=' + encodedUsername + '&search_engine=v2')
    //     //     .set('Authorization', 'Bearer ' + authZeroUserSearchToken)
    //     //     .end(function (err, res) {
    //     //         console.log(res.text);
    //     //         expect(res.status).toEqual(200); //todo - not functioning
    //     //         var responseText = JSON.parse(res.text); // parse string to json object
    //     //         var userId = responseText[0].user_id; // grab specific key-value from json obj
    //     //         var userIdString = JSON.stringify(userId); // convert back to string
    //     //         // POST request to set password via Auth0
    //     //         request.post(authZeroUrl + '/tickets/password-change')
    //     //             .set('Content-Type', 'application/json')
    //     //             .set('Authorization', 'Bearer ' + authZeroUserSearchToken)
    //     //             .send('{"user_id":' + userIdString + ', "new_password": "' + password + '"}')
    //     //             .end(function (err, res) {
    //     //                 expect(res.status).toEqual(201);
    //     //                 var responseText = JSON.parse(res.text);
    //     //                 var verificationUrl = responseText.ticket;
    //     //                 var verificationUrlString = JSON.stringify(verificationUrl);
    //     //                 var formattedVerificationUrl = verificationUrlString.replace(/"/g, ''); // strip quotes from string
    //                     // GET request to Auth0 email verification url
    //     // this.getUid(username);
    //     // this.setUserPassword('Password1');
    //                     request.get(passwordSetLink)
    //                         .end(function (err, res) {
    //                             expect(res.status).toEqual(200);
    //                         });
    //         //         });
    //         // });
    // };

    this.verifyPasswordEmailSent = function(username) {
        // // browser.sleep(5000);
        var encodedUsername = encodeURIComponent('"' + username + '"');
        // Make GET request to Auth0 user search service to obtain internal Auth0 user id value
        request.get(authZeroUrl + '/users?fields=email%2Cuser_id&include_fields=true&q=' + encodedUsername + '&search_engine=v2')
            .set('Authorization', 'Bearer ' + authZeroUserSearchToken)
            .end(function (err, res) {
                expect(res.status).toEqual(200);
                if (res.text.indexOf('user_id') > -1) {
                    var responseText = JSON.parse(res.text); // parse string to json object
                    var userId = responseText[0].user_id; // grab specific key-value from json obj
                    var userIdString = JSON.stringify(userId); // convert back to string
                    var formattedUidString = userIdString.replace(/"/g, '');
                    var encodedUidString = encodeURIComponent(formattedUidString);
                    // GET request to scrape user logs
                    request.get(authZeroUrl + '/users/' + encodedUidString + '/logs')
                        .set('Authorization', 'Bearer ' + authZeroLogsToken)
                        .end(function (err, res) {
                            var responseText = JSON.parse(res.text);
                            if (res.text.indexOf('date') > -1) {
                                var nowTime = moment();
                                var dateString = JSON.stringify(responseText[0].date); // Convert from json object to string
                                var formattedDateString = dateString.replace(/"/g, ''); // Strip quotation marks from string
                                var emailTimeValue = moment(formattedDateString);
                                var delta = nowTime.valueOf() - emailTimeValue.valueOf(); // Ensure email is correct, and not an older one
                                var emailType = responseText[0].type;
                                //console.log(delta);

                                expect(res.status).toEqual(200);
                                expect(delta).toBeLessThan(75000);
                                expect(emailType).toBe('scpr');
                            }
                            else {
                                console.log(authZeroLogsUri);
                                expect(true).toBe(false, 'No response data received from logs call');
                            }
                        });
                }
                else {
                    expect(true).toBe(false, 'No response data received from uid call');
                }
            });
    };

    this.verifyRealmId = function(username, password, clientID, expectedRealm) {
        request.post(browser.params.environment.securityGtwyUrl + '/userLogin')
            .set('Content-Type', 'application/json')
            .send('{"username":"' + username +'","password":"' + password + '", "clientId":"' + clientID + '"}')
            //.buffer() // <-- Force the request to buffer via .buffer()
            .end(function (err, res) {
                //console.log(res.status);
                expect(res.status).toBe(200, '200 response not returned');
                var responseText = JSON.parse(res.text); // parse string to json object
                //console.log(responseText);
                var realm = responseText.idToken.realm; // grab specific key-value from json obj
                var realmString = JSON.stringify(realm); // convert back to string
                var formattedRealmString = realmString.replace(/"/g, ''); // strip quotes from string
                //validate realm string value against expected value
                expect(formattedRealmString).toBe(expectedRealm, 'Invalid realm returned.');
            });
    };

    this.authServicePOST = function(_comment, username, password, clientId, expectedResponse) {
        if (expectedResponse == 200) {
            request.post(browser.params.environment.authServiceUrl + '/authenticate')
                .set('Content-Type', 'application/json')
                .send('{"_comment":"' + _comment + '","username":"' + username + '","password":"' + password + '","clientId":"' + clientId + '"}')
                .buffer()
                .end(function (err, res) {
                    //console.log(res.status);
                    expect(res.status).toBe(200, '200 response not returned');
                    var responseText = JSON.parse(res.text); // parse string to json object
                    //console.log(responseText);
                    expect(responseText.id_token).not.toBe(null, 'Expected response field ID_TOKEN null.');
                    expect(responseText.access_token).not.toBe(null, 'Expected response field ID_TOKEN null.');
                    expect(responseText.token_type).not.toBe(null, 'Expected response field ID_TOKEN null.');
                });
        }
        else {
            request.post(browser.params.environment.authServiceUrl + '/authenticate')
                .set('Content-Type', 'application/json')
                .send('{"_comment":"' + _comment + '","username":"' + username + '","password":"' + password + '","clientId":"' + clientId + '"}')
                .buffer()
                .end(function (err, res) {
                    //console.log(res.status);
                    expect(res.status).not.toBe(200, '200 response returned when it should not have been');
                });
        }
    };

    this.blacklistPOST = function(_comment, username, password, clientId, tokenType) {
        if (tokenType.toUpperCase() == 'VALID') {
            // Obtain token from auth endpoint
            request.post(browser.params.environment.authServiceUrl + '/authenticate')
                .set('Content-Type', 'application/json')
                .send('{"_comment":"' + _comment + '","username":"' + username + '","password":"' + password + '","clientId":"' + clientId + '"}')
                .buffer()
                .end(function (err, res) {
                    expect(res.status).toBe(200, '200 response not returned');
                    var responseText = JSON.parse(res.text); // parse string to json object
                    var token = JSON.stringify(responseText.id_token);
                    blacklistToken = token.replace(/"/g, '');
                    //console.log(blacklistToken);
                    expect(responseText.id_token).not.toBe(null, 'Expected response field ID_TOKEN null.');
                    expect(responseText.access_token).not.toBe(null, 'Expected response field ID_TOKEN null.');
                    expect(responseText.token_type).not.toBe(null, 'Expected response field ID_TOKEN null.');
                    // Post token to blacklist endpoint
                    request.post(browser.params.environment.userServiceUrl + '/tokens/blacklistToken')
                        .set('Content-Type', 'application/json')
                        .send(blacklistToken)
                        .end(function (err, res) {
                            blacklistTokenId = res.text;
                            expect(res.status).toBe(200, 'Bad request');
                            expect(res.text).not.toBe(null, 'No tokenId returned');
                        });
                });
        }
        else if (tokenType.toUpperCase() == 'INVALID') {
            blacklistToken = 'invalidtoken123';
            request.post(browser.params.environment.userServiceUrl + '/tokens/blacklistToken')
                .set('Content-Type', 'application/json')
                .send(blacklistToken)
                .end(function (err, res) {
                    blacklistTokenId = res.text;
                    expect(res.status).toBe(200, 'Bad request');
                    expect(res.text).not.toBe(null, 'No tokenId returned');
                });
        }
        else if (tokenType.toUpperCase() == 'EXPIRED') {
            // Using static expired token from Wifi Admin user in QA
            blacklistToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3RyaW1ibGUtcWEuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDU3NTE5YWE3OGFmZjg0NGYzNWVkNDZhYyIsImF1ZCI6IjAzcWVSTnBwUFNSbnpUWnliTlBxZklxWWFFTWtIV0prIiwiZXhwIjoxNDM1MDExNDAxLCJpYXQiOjE0NjQ5NjgyMDF9.ztcGitq4n6rC4NJ2HagdkGeSQxWrwU4bpsbJVQVFiKg';
            request.post(browser.params.environment.userServiceUrl + '/tokens/blacklistToken')
                .set('Content-Type', 'application/json')
                .send(blacklistToken)
                .end(function (err, res) {
                    blacklistTokenId = res.text;
                    expect(res.status).toBe(200, 'Bad request');
                    expect(res.text).not.toBe(null, 'No tokenId returned');
                });
        }
        else {
            expect(true).toBe(false, 'Invalid function parameter');
        }
    };

    this.blacklistServiceGET = function(blacklistStatus) {
        request.get(browser.params.environment.userServiceUrl + '/tokens/blacklistToken/{tokenId}?tokenId=' + blacklistTokenId)
            .set('Authorization', 'Bearer ' + blacklistToken)
            .end(function (err, res) {
                expect(res.status).toBe(200, 'Bad request');
                expect(res.body).toBe(blacklistStatus);
            });
    };

    this.blacklistServiceDEL = function() {
        request.delete(browser.params.environment.userServiceUrl + '/tokens/blacklistToken/{tokenId}?tokenId=' + blacklistTokenId)
            .set('Authorization', 'Bearer ' + blacklistTokenId)
            .end(function (err, res) {
                //console.log('DELETE response: ' + res.text);
                expect(res.status).toBe(200, 'Bad DELETE request');
                expect(res.text).toBe(blacklistTokenId);
                request.get(browser.params.environment.userServiceUrl + '/tokens/blacklistToken/{tokenId}?tokenId=' + blacklistTokenId)
                    .set('Authorization', 'Bearer ' + blacklistToken)
                    .end(function (err, res) {
                        //console.log('GET response: ' + res.body);
                        expect(res.status).toBe(200, 'Bad GET request');
                        expect(res.body).toBe(false);
                    });
            });
    };

    this.apiGatewayPOST = function(blacklistStatus) {
        if (blacklistStatus.toUpperCase() == 'FALSE') {
            request.post(browser.params.environment.apiGatewayUrl + '/api/v1/wifi/authorization')
                .set('Authorization', 'Bearer ' + blacklistToken)
                .set('Content-Type', 'application/json')
                .send('')
                .buffer()
                .end(function (err, res) {
                    //console.log(res.body);
                    //expect(res.status).toBe(500); TODO fix for this coming soon
                    if (res === undefined) {
                        expect(false).toBe(true, 'Result was undefined');
                    }
                    else {
                        var responseText = JSON.parse(res.text); // parse string to json object
                        expect(responseText.message).not.toContain('access token is blacklisted', 'Token is blacklisted prior to test start');
                    }
                });
        }
        else if (blacklistStatus.toUpperCase() == 'TRUE') {
            request.post(browser.params.environment.apiGatewayUrl + '/api/v1/wifi/authorization')
                .set('Authorization', 'Bearer ' + blacklistToken)
                .set('Content-Type', 'application/json')
                .send()
                .buffer()
                .end(function (err, res) {
                    //console.log(res.status);
                    //console.log(res.text);
                    if (res === undefined) {
                        expect(false).toBe(true, 'Result was undefined');
                    }
                    else {
                        expect(res.status).toBe(401, '401 status expected, but ( ' + res.status + ' ) returned');
                        expect(res.text).toContain('access token is blacklisted', 'Token is blacklisted prior to test start');
                    }
                });
        }
        else if (blacklistStatus.toUpperCase() == 'FALSE - INVALID') {
            request.post(browser.params.environment.apiGatewayUrl + '/api/v1/wifi/authorization')
                .set('Authorization', 'Bearer ' + blacklistToken)
                .set('Content-Type', 'application/json')
                .send('')
                .buffer()
                .end(function (err, res) {
                    //console.log(res.body);
                    if (res === undefined) {
                        expect(false).toBe(true, 'Result was undefined');
                    }
                    else {
                        var responseText = JSON.parse(res.text); // parse string to json object
                        expect(res.status).toBe(401);
                        expect(responseText.message).toContain('401 Unauthorized', 'Expected 401 Unauthorized msg, received: ' + responseText.message);
                    }
                });
        }
        else if (blacklistStatus.toUpperCase() == 'FALSE - EXPIRED') {
            blacklistToken = 'D3fouCnc6Otc2LOU';  // set blacklist token to an expired token
            request.post(browser.params.environment.apiGatewayUrl + '/api/v1/wifi/authorization')
                .set('Authorization', 'Bearer ' + blacklistToken)
                .set('Content-Type', 'application/json')
                .send('')
                .buffer()
                .end(function (err, res) {
                    //console.log(res.body);
                    if (res === undefined) {
                        expect(false).toBe(true, 'Result was undefined');
                    }
                    else {
                        var responseText = JSON.parse(res.text); // parse string to json object
                        expect(res.status).toBe(401);
                        // TODO: Determine if this can actually be tested (must wait 24 hours for token to expire)
                        //expect(responseText.message).toContain('jwt expired', 'Expected jwt expired msg, received: ' + responseText.message);
                    }
                });
        }
        else {
            expect(true).toBe(false, 'Invalid function parameter');
        }
    }

};

module.exports = new UsersHttp();