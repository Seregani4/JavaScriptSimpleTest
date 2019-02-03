var req = require('superagent');
var moment = require('moment');
var request = require('superagent-bluebird-promise');

var DataSubscription = function() {
    
    this.deleteOrganization = function(code){

        var organizationId;
        
        req.get('http://data-subscription-service-qa.connectedfleet.io:8080/organizations?pageSize=250')
            .set('user_security_attributes', '{"uid":"09bd7237-eea4-4ccc-91c8-deca51a5f51c"}')
            .end(function (err, res1) {

                if(res1.status != 200){
                    console.log("Organization Code to find: " + code);
                    console.log('Get Orgainzations Response: ' + res1.status);
                    console.log("Get Organizations Response Text: " + res1.text);
                }

                for(var i in res1.body.data){

                    // console.log("Organization data item: " + res1.body.data[i].code);
                    if(code == res1.body.data[i].code){
                        organizationId = res1.body.data[i].id;
                    }
                }

                //Delete the org
                req.del('http://data-subscription-service-qa.connectedfleet.io:8080/organizations/' + organizationId)
                    .set('user_security_attributes', '{"uid":"09bd7237-eea4-4ccc-91c8-deca51a5f51c"}')
                    .end(function(err, res2){
                        // console.log('http://data-subscription-service-qa.connectedfleet.io:8080/organizations/' + organizationId);
                        // console.log('Organization Deleted: ' + organizationId);
                        // console.log('Organization Response: ' + res2.text);
                        if(res2.status != 200){
                            console.log("Organization Id to delete: " + organizationId + " - Organization Code: " + code);
                            console.log("Delete Organizations Response: " + res2.status);
                            console.log("Delete Organizations Response Text: " + res2.text);
                        }
                    });

            });
    };

    this.deleteSubscriber = function(code){
        
        var subscriberId;
        
        req.get('http://data-subscription-service-qa.connectedfleet.io:8080/subscribers?pageSize=250')
            .set('user_security_attributes', '{"uid":"09bd7237-eea4-4ccc-91c8-deca51a5f51c"}')
            .end(function (err, res1) {

                if(res1.status != 200){
                    console.log("Subscriber Code to find: " + code);
                    console.log('Get Subscribers Response: ' + res1.status);
                    console.log("Get Subscribers Response Text: " + res1.text);
                }

                for(var i in res1.body.data){
                    // console.log("Subscriber data item: " + res1.body.data[i].code);
                    if(code == res1.body.data[i].code){
                        subscriberId = res1.body.data[i].id;
                        // console.log("id: " + subscriberId);
                    }
                }

                //Delete the subscriber
                req.del('http://data-subscription-service-qa.connectedfleet.io:8080/subscribers/' + subscriberId)
                    .set('user_security_attributes', '{"uid":"09bd7237-eea4-4ccc-91c8-deca51a5f51c"}')
                    .end(function(err, res2){
                        // console.log('Subscriber Deleted: ' + subscriberId);
                        // console.log('Subscriber Response: ' + res2.text);
                        if(res2.status != 200){
                            console.log("Subscriber Id to delete: " + subscriberId + " - Organization Code: " + code);
                            console.log("Delete Subscribers Response: " + res2.status);
                            console.log("Delete Subscribers Response Text: " + res2.text);
                        }
                    });

            });
    };
    
    this.cascadeSubscriberDelete = function(subscriberCode) {

        var organizationId;
        var subscriberId;

        //Get the organization and subscriber IDs
        request.get('http://data-subscription-service-qa.connectedfleet.io:8080/subscribers?pageSize=250')
            .set('user_security_attributes', '{"uid":"09bd7237-eea4-4ccc-91c8-deca51a5f51c"}')
            .then(
                function (res1){

                    for (var i in res1.body.data) {
                        //console.log("Actual Subscriber code: " + res1.body.data[i].code);
                        //console.log("Expected Subscriber code: " + subscriberCode);

                        if (subscriberCode == res1.body.data[i].code) {
                            subscriberId = res1.body.data[i].id;
                            //console.log("Subscriber Id: " + subscriberId);
                            organizationId = res1.body.data[i].organization.id;
                            //console.log("Organization Id: " + organizationId);
                            break;
                        }
                    }

                    //Delete the subscriber
                    request.del('http://data-subscription-service-qa.connectedfleet.io:8080/subscribers/' + subscriberId)
                        .set('user_security_attributes', '{"uid":"09bd7237-eea4-4ccc-91c8-deca51a5f51c"}')
                        .then(
                            function(res2){
                                console.log('Subscriber Id Deleted: ' + subscriberId);
                                console.log('Subscriber Response: ' + res2.text);

                                //Delete the organization
                                request.del('http://data-subscription-service-qa.connectedfleet.io:8080/organizations/' + organizationId)
                                    .set('user_security_attributes', '{"uid":"09bd7237-eea4-4ccc-91c8-deca51a5f51c"}')
                                    .then(
                                        function(res3){
                                            console.log('http://data-subscription-service-qa.connectedfleet.io:8080/organizations/' + organizationId);
                                            console.log('Organization Deleted: ' + organizationId);
                                            console.log('Organization Response: ' + res3.text);
                                        },
                                        function(error3){
                                            console.log("Organization Id to delete: " + organizationId);
                                            console.log("Delete Organizations Response: " + error3.status);
                                        });

                            },
                            function(error2){
                                console.log("Subscriber Id to delete: " + subscriberId);
                                console.log("Delete Subscribers Error: " + error2);
                            });

            }, function (error) {
                console.log("Subscriber Code to find: " + subscriberCode);
                console.log('Get Subscribers Error: ' + error);
            });
    };
};

module.exports = new DataSubscription();
