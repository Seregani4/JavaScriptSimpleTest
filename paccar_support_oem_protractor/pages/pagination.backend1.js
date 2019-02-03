exports.httpBackendMock = function () {
    angular
        .module('httpBackendMock', ['pnetPortalApp', 'ngMockE2E']) // swap out pnet app module for ngMockE2E module
        .run(
        function ($httpBackend) {
            // hardcoded json responses
            var customerList =
            {
                "data":[
                    {
                        "addresses":[
                            {
                                "city":"Minnetonka",
                                "countryCode":"US",
                                "county":"Hennepin",
                                "nickName":"Primary",
                                "state":"MN",
                                "streetAddress":"4400 Baker Rd",
                                "zipcode":"55343"
                            }
                        ],
                        "allDealersCanView":true,
                        "customerAlias":"Peterbilt",
                        "customerKey":"peoplenet:customer:testcustomerg",
                        "dealerKeys":[
                            "peoplenet:dealer:TESTA084"
                        ],
                        "emailAddresses":[
                            {
                                "address":"test@peoplenetonline.com",
                                "nickName":"Primary Email"
                            }
                        ],
                        "fleetManagementKey":"PeopleNet",
                        "hidden":false,
                        "key":"peoplenet:customer:testcustomerg",
                        "name":"PAGINATION MOCKEDBACKEND 1!",
                        "oemKeys":[
                            "paccar"
                        ],
                        "phoneNumbers":[

                        ],
                        "tags":[

                        ],
                        "timestamp":"2015-05-17T03:12:09.325"
                    },
                    {
                        "addresses":[
                            {
                                "city":"Minnetonka",
                                "countryCode":"US",
                                "county":"Hennepin",
                                "nickName":"Primary",
                                "state":"MN",
                                "streetAddress":"4400 Baker Rd",
                                "zipcode":"55343"
                            }
                        ],
                        "allDealersCanView":false,
                        "customerAlias":"Peterbilt",
                        "customerKey":"peoplenet:customer:testcustomerh",
                        "dealerKeys":[
                            "peoplenet:dealer:TESTA084"
                        ],
                        "emailAddresses":[
                            {
                                "address":"test@peoplenetonline.com",
                                "nickName":"Primary Email"
                            }
                        ],
                        "fleetManagementKey":"PeopleNet",
                        "hidden":false,
                        "key":"peoplenet:customer:testcustomerh",
                        "name":"Coke Distribution",
                        "oemKeys":[
                            "paccar"
                        ],
                        "phoneNumbers":[
                            {
                                "nickName":"Toll Free Phone",
                                "number":"8883463486"
                            }
                        ],
                        "tags":[

                        ],
                        "timestamp":"2015-05-13T16:08:34.719"
                    },
                    {
                        "addresses":[
                            {
                                "city":"Minnetonka",
                                "countryCode":"US",
                                "county":"Hennepin",
                                "nickName":"Primary",
                                "state":"MN",
                                "streetAddress":"4400 Baker Rd",
                                "zipcode":"55343"
                            }
                        ],
                        "allDealersCanView":false,
                        "customerAlias":"Peterbilt",
                        "customerKey":"peoplenet:customer:testcustomerc",
                        "dealerKeys":[
                            "peoplenet:dealer:TESTA082"
                        ],
                        "emailAddresses":[
                            {
                                "address":"test@peoplenetonline.com",
                                "nickName":"Primary Email"
                            }
                        ],
                        "fleetManagementKey":"PeopleNet",
                        "hidden":false,
                        "key":"peoplenet:customer:testcustomerc",
                        "name":"Edwards Oil and Gas Transport Division",
                        "oemKeys":[
                            "paccar"
                        ],
                        "phoneNumbers":[
                            {
                                "nickName":"Toll Free Phone",
                                "number":"8883463486"
                            }
                        ],
                        "tags":[

                        ],
                        "timestamp":"2015-05-13T16:08:34.656"
                    },
                    {
                        "addresses":[
                            {
                                "city":"Minnetonka",
                                "countryCode":"US",
                                "county":"Hennepin",
                                "nickName":"Primary",
                                "state":"MN",
                                "streetAddress":"4400 Baker Rd",
                                "zipcode":"55343"
                            }
                        ],
                        "allDealersCanView":false,
                        "customerAlias":"Peterbilt",
                        "customerKey":"peoplenet:customer:testcustomerb",
                        "dealerKeys":[
                            "peoplenet:dealer:TESTA082"
                        ],
                        "emailAddresses":[
                            {
                                "address":"test@peoplenetonline.com",
                                "nickName":"Primary Email"
                            }
                        ],
                        "fleetManagementKey":"PeopleNet",
                        "hidden":false,
                        "key":"peoplenet:customer:testcustomerb",
                        "name":"Furniture Shipment, Inc",
                        "oemKeys":[
                            "paccar"
                        ],
                        "phoneNumbers":[
                            {
                                "nickName":"Toll Free Phone",
                                "number":"8883463486"
                            }
                        ],
                        "tags":[

                        ],
                        "timestamp":"2015-05-13T16:08:34.650"
                    },
                    {
                        "addresses":[
                            {
                                "city":"Minnetonka",
                                "countryCode":"US",
                                "county":"Hennepin",
                                "nickName":"Primary",
                                "state":"MN",
                                "streetAddress":"4400 Baker Rd",
                                "zipcode":"55343"
                            }
                        ],
                        "allDealersCanView":false,
                        "customerAlias":"Peterbilt",
                        "customerKey":"peoplenet:customer:testcustomerj",
                        "dealerKeys":[
                            "peoplenet:dealer:TESTA084"
                        ],
                        "emailAddresses":[
                            {
                                "address":"test@peoplenetonline.com",
                                "nickName":"Primary Email"
                            }
                        ],
                        "fleetManagementKey":"PeopleNet",
                        "hidden":false,
                        "key":"peoplenet:customer:testcustomerj",
                        "name":"Jamison Shipping",
                        "oemKeys":[
                            "paccar"
                        ],
                        "phoneNumbers":[
                            {
                                "nickName":"Toll Free Phone",
                                "number":"8883463486"
                            }
                        ],
                        "tags":[

                        ],
                        "timestamp":"2015-05-13T16:08:34.727"
                    },
                    {
                        "addresses":[
                            {
                                "city":"Minnetonka",
                                "countryCode":"US",
                                "county":"Hennepin",
                                "nickName":"Primary",
                                "state":"MN",
                                "streetAddress":"4400 Baker Rd",
                                "zipcode":"55343"
                            }
                        ],
                        "allDealersCanView":false,
                        "customerAlias":"Peterbilt",
                        "customerKey":"peoplenet:customer:testcustomerf",
                        "dealerKeys":[
                            "peoplenet:dealer:TESTA083"
                        ],
                        "emailAddresses":[
                            {
                                "address":"test@peoplenetonline.com",
                                "nickName":"Primary Email"
                            }
                        ],
                        "fleetManagementKey":"PeopleNet",
                        "hidden":false,
                        "key":"peoplenet:customer:testcustomerf",
                        "name":"Logistics 'R Us",
                        "oemKeys":[
                            "paccar"
                        ],
                        "phoneNumbers":[
                            {
                                "nickName":"Toll Free Phone",
                                "number":"8883463486"
                            }
                        ],
                        "tags":[

                        ],
                        "timestamp":"2015-05-13T16:08:34.752"
                    },
                    {
                        "addresses":[
                            {
                                "city":"Minnetonka",
                                "countryCode":"US",
                                "county":"Hennepin",
                                "nickName":"Primary",
                                "state":"MN",
                                "streetAddress":"4400 Baker Rd",
                                "zipcode":"55343"
                            }
                        ],
                        "allDealersCanView":false,
                        "customerAlias":"Peterbilt",
                        "customerKey":"peoplenet:customer:testcustomeri",
                        "dealerKeys":[
                            "peoplenet:dealer:TESTA084"
                        ],
                        "emailAddresses":[
                            {
                                "address":"test@peoplenetonline.com",
                                "nickName":"Primary Email"
                            }
                        ],
                        "fleetManagementKey":"PeopleNet",
                        "hidden":false,
                        "key":"peoplenet:customer:testcustomeri",
                        "name":"Logistics and Trucking, Co",
                        "oemKeys":[
                            "paccar"
                        ],
                        "phoneNumbers":[
                            {
                                "nickName":"Toll Free Phone",
                                "number":"8883463486"
                            }
                        ],
                        "tags":[

                        ],
                        "timestamp":"2015-05-13T16:08:34.726"
                    },
                    {
                        "addresses":[
                            {
                                "city":"Minnetonka",
                                "countryCode":"US",
                                "county":"Hennepin",
                                "nickName":"Primary",
                                "state":"MN",
                                "streetAddress":"4400 Baker Rd",
                                "zipcode":"55343"
                            }
                        ],
                        "allDealersCanView":false,
                        "customerAlias":"Peterbilt",
                        "customerKey":"peoplenet:customer:testcustomere",
                        "dealerKeys":[
                            "peoplenet:dealer:TESTA083"
                        ],
                        "emailAddresses":[
                            {
                                "address":"test@peoplenetonline.com",
                                "nickName":"Primary Email"
                            }
                        ],
                        "fleetManagementKey":"PeopleNet",
                        "hidden":false,
                        "key":"peoplenet:customer:testcustomere",
                        "name":"Quality Trucking, Co",
                        "oemKeys":[
                            "paccar"
                        ],
                        "phoneNumbers":[
                            {
                                "nickName":"Toll Free Phone",
                                "number":"8883463486"
                            }
                        ],
                        "tags":[

                        ],
                        "timestamp":"2015-05-13T16:08:34.661"
                    },
                    {
                        "addresses":[
                            {
                                "city":"Minnetonka",
                                "countryCode":"US",
                                "county":"Hennepin",
                                "nickName":"Primary",
                                "state":"MN",
                                "streetAddress":"4400 Baker Rd",
                                "zipcode":"55343"
                            }
                        ],
                        "allDealersCanView":false,
                        "customerAlias":"Peterbilt",
                        "customerKey":"peoplenet:customer:testcustomera",
                        "dealerKeys":[
                            "peoplenet:dealer:TESTA082",
                            "peoplenet:dealer:TESTA084"
                        ],
                        "emailAddresses":[
                            {
                                "address":"test@peoplenetonline.com",
                                "nickName":"Primary Email"
                            }
                        ],
                        "fleetManagementKey":"PeopleNet",
                        "hidden":false,
                        "key":"peoplenet:customer:testcustomera",
                        "name":"Trucking Distribution, Co",
                        "oemKeys":[
                            "paccar"
                        ],
                        "phoneNumbers":[
                            {
                                "nickName":"Toll Free Phone",
                                "number":"8883463486"
                            }
                        ],
                        "tags":[

                        ],
                        "timestamp":"2015-05-18T18:13:20.541"
                    },
                    {
                        "addresses":[
                            {
                                "city":"Minnetonka",
                                "countryCode":"US",
                                "county":"Hennepin",
                                "nickName":"Primary",
                                "state":"MN",
                                "streetAddress":"4400 Baker Rd",
                                "zipcode":"55343"
                            }
                        ],
                        "allDealersCanView":false,
                        "customerAlias":"Peterbilt",
                        "customerKey":"peoplenet:customer:testcustomerd",
                        "dealerKeys":[
                            "peoplenet:dealer:TESTA083"
                        ],
                        "emailAddresses":[
                            {
                                "address":"test@peoplenetonline.com",
                                "nickName":"Primary Email"
                            }
                        ],
                        "fleetManagementKey":"PeopleNet",
                        "hidden":false,
                        "key":"peoplenet:customer:testcustomerd",
                        "name":"Walmart, Inc",
                        "oemKeys":[
                            "paccar"
                        ],
                        "phoneNumbers":[
                            {
                                "nickName":"Toll Free Phone",
                                "number":"8883463486"
                            }
                        ],
                        "tags":[

                        ],
                        "timestamp":"2015-05-13T16:08:34.659"
                    }
                ],
                "responseDescription":{
                    "pageSize":10,
                    "page":0,
                    "totalHits":10
                }
            };
            // tells our mock backend to respond with a 200 code as well as predefined json
            $httpBackend.whenGET(/customers\?sort=name/).respond(customerList);
            $httpBackend.whenGET(/customers\?include=key&include=name&include=addresses&include=phoneNumbers&include=emailAddresses&sort=name/).respond(customerList);
            $httpBackend.whenGET(/customers\?include=key&include=name&include=addresses&include=phoneNumbers&include=emailAddresses&page=0&sort=name/).respond(customerList);
            // explicit pass throughs on everything else
            $httpBackend.whenGET(/.*/).passThrough();
            $httpBackend.whenPOST(/.*/).passThrough();
            $httpBackend.whenDELETE(/.*/).passThrough();
            $httpBackend.whenPUT(/.*/).passThrough();
        });
};
