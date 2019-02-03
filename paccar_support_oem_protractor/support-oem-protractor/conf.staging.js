/**
 * Created by Cottomoeller on 5/17/2016.
 */
var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
var jasmineReporters = require('jasmine-reporters');

exports.config = {
    //seleniumAddress: 'http://10.8.70.127:4444/wd/hub',
    //seleniumAddress: 'http://10.8.70.209:4444/wd/hub',
    //seleniumAddress: 'http://10.10.77.47:4444/wd/hub',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    allScriptsTimeout: 100000,
    framework: 'jasmine',
    jasmineNodeOpts: {
        defaultTimeoutInterval: 100000
    },

    capabilities: {
        'browserName': 'chrome'
        //'browserName': 'internet explorer'
        //'browserName': 'firefox'
    },
    //resultJsonOutputFile: 'output/results.json',
    onPrepare: function() {
        jasmine.getEnv().addReporter(
            new Jasmine2HtmlReporter({
                takeScreenshots: true,
                takeScreenshotsOnlyOnFailures: true,
                consolidate: true,
                consolidateAll: true,
                savePath: 'reports/'
            })
        );

        jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
            consolidate: true,
            consolidateAll: true,
            savePath: 'junitreports',
            filePrefix: 'xmloutput'
        }));
    },


    specs: [
        //'specs/**/*.js'

        //UIValidation
        //'specs/UIValidation/**.js'
        //'specs/UIValidation/applicationsPageUiValidation.js'
        //'specs/UIValidation/otapPageUiValidation.js'
        //'specs/UIValidation/customerListPageUiValidation.js',
        //'specs/UIValidation/eventsUiValidation.js'
        //'specs/UIValidation/dataImportUiValidation.js'
        //'specs/UIValidation/dealerListPageUiValidation.js',
        //'specs/UIValidation/deviceCollectionsUiValidation.js'
        //'specs/UIValidation/deviceListPageUiValidation.js',
        //'specs/UIValidation/digitalCallHistoryUiValidation.js'
        //'specs/UIValidation/fleetHealthMapUiValidation.js'
        'specs/UIValidation/faultDetailsPageUiValidation.js'
        //'specs/UIValidation/outboundMidsUiValidation.js'
        //'specs/UIValidation/userListUiValidation.js',
        //'specs/UIValidation/vehicleListPageUiValidation.js'
        //'specs/UIValidation/otapPageUiValidation.js'
    ],
    suites: {
        smoke: 'specs/smokeTests/*.js',
        full: 'specs/**/*.js'
    },

    baseUrl: 'http://peoplenet-portal-staging.connectedfleet.io',
    params : {
        environment: {
            url: 'http://peoplenet-portal-staging.connectedfleet.io',
            entityUrl: 'http://entity-service-staging.connectedfleet.io:8080',
            securityGtwyUrl: 'http://security-gateway-rp-staging.connectedfleet.io:8080',
            vehicleFaultCodeUrl: 'http://entity-service-staging.connectedfleet.io:8080/vehiclehealth/faultcode',
            midParser:'http://mid-parser-staging.connectedfleet.io:8080/mobile-originated',
            eventProcessorUrl: 'http://oem-event-processor-staging.connectedfleet.io:8080/processEvent',
            userGatewayServiceUrl: 'http://user-gateway-service-qa.connectedfleet.io:8080/users',
            entityGatewayServiceUrl: 'http://entity-gateway-qa.connectedfleet.io:8080'
        },
        adduser: {
            firstname: '007James',
            lastname: '007Bond',
            email: '007Bond@test.com',
            newemail: '00000007ventura@email.com',
            username: '007Bond, 007James',
            gmailusername: 'paccarportalqa',
            password: 'Password1',
            phone: '1234567890',
            formattedphone: '(123) 456-7890',
            newpassword: 'Password2',
            organizationtype: {
                administrative: 'Administrative',
                oem: 'OEM',
                division: 'Division',
                dealerOwner: 'Dealer Owner',
                dealerRegion: 'Dealer Region',
                dealer: 'Dealer',
                customer: 'Customer',
                pfm: 'PFM'
            },
            organizationname: {
                paccar: 'Pacc',
                dealer: 'Worldwide Equipment - Pikeville - W009',
                customer: 'Automation Customer',
                peoplenet: 'Peoplenet',
                dealerOwnerGroup: 'Automation-DealerOwnerGroup',
                editDealerOwnerGroup: 'EditAutomation-DealerOwnerGroup',
                dealerRegion: 'Automation-Region1',
                preferredCustomer: 'Automation Preferred Customer'
            }
        },
        edituser: {
            firstname: '008Bobby',
            lastname: '008Bonds',
            username: '008Bonds, 008Bobby',
            password: 'Password1',
            changePassword: 'Password1234',
            email: '008Bonds@test.com',
            phone: '1110080007',
            formattedphone: '(111) 008-0007'
        },
        addcustomer: {
            dealer: 'Allstate Peterbilt of Winona - A083',
            name: '000SupportalTestCustomer',
            orgNameSearchCustomer: '000TonyTestCustomer',
            address1: '100 Test Ln N',
            address2: 'Suite 1',
            city: 'Plymouth',
            state: 'MN',
            country: 'United States',
            zip: '55446',
            phone: '6515551212',
            phoneNickName: 'Primary',
            fax: '1112223333',
            faxNickName: 'Fax',
            email: 'test@peoplenetonline.com',
            formattedphone: '(651) 555-1212',
            formattedfax: '(111) 222-3333'
        },
        editcustomer: {
            dealer: 'Allstate Peterbilt of Alexandria - A120',
            name: '000TestSupportalEditCustomer',
            orgNameSearchCustomer: '000TestEditCustomer',
            address1: '200 Test Ln N',
            address2: 'Suite 2',
            city: 'Plymouth',
            state: 'MN',
            country: 'United States',
            zip: '55433',
            phone: '8515567212',
            phoneNickName: 'Primary',
            fax: '3112423833',
            faxNickName: 'Fax',
            email: 'testEdit@peoplenetonline.com',
            formattedphone: '(851) 556-7212',
            formattedfax: '(311) 242-3833'
        },
        addprefcustomer: {
            name: 'ABC Preferred Customer',
            address1: '890 Customer Lane',
            address2: 'Suite 1',
            city: 'Plymouth',
            state: 'MN',
            country: 'United States',
            zip: '55555',
            phone: '9087654321',
            fax: '1234567809',
            email: 'testcustomer@preferred.com',
            formattedphone: '(908) 765-4321',
            formattedfax: '(123) 456-7809'
        },
        roleslabels: {
            peoplenetadmin: 'PeopleNet Admin',
            paccaradmin: 'OEM Administrator',
            paccaruser: 'OEM User',
            paccarpoweruser: 'OEM Power User',
            divisionuser: 'Customer Service',
            dealerowneradmin: 'Dealer Owner Admin',
            dealerowneruser: 'Dealer Owner User',
            dealerregionadmin: 'Dealer Region Admin',
            dealerregionuser: 'Dealer Region User',
            dealeradmin: 'Dealer Admin',
            dealertechnician: 'Dealer Service Technician',
            dealeruser: 'Dealer Power User',
            customeradmin: 'Customer Administrator',
            customeruser: 'Customer User',
            customerservice: 'Customer Service',
            factoryworker: 'Factory Worker',
            cumminsuser: 'Cummins User',
            tsr1: 'Peoplenet TSR1',
            tsr2: 'Peoplenet TSR2'
        },
        roleids: {
            peoplenetadmin: 'cd3696d1-e8f5-4731-9e76-84cf16a53762',
            paccaradmin: '7a8ec472-d378-4848-861e-33fa4dcd6e35',
            paccaruser: '7a8ec472-d378-4848-861e-33fa4dcd6e34',
            dealerowneradmin: 'b3d8a9d0-d79e-11e6-aa58-1221f78bca5f',
            dealerowneruser: 'b3e1c1dc-d79e-11e6-aa58-1221f78bca5f',
            dealerregionadmin: 'b3e1f546-d79e-11e6-aa58-1221f78bca5f',
            dealerregionuser: 'b3e21901-d79e-11e6-aa58-1221f78bca5f',
            factoryworker: '98adcc62-7946-4386-a326-6ebec335cae9',
            dealeradmin: 'a3fcbf96-599d-4624-8cb7-994d193742ee',
            dealeruser: '2b987640-dc94-466b-aaae-3dc47af6bd12',
            customeradmin: '9583ea5d-524f-4373-a6c2-d36d592b3197',
            customeruser: '32db9886-ff2f-4e54-9503-d268ee223ed3',
            dealertech: '80a2a2c6-f806-11e4-9b1b-12003d63d834',
            customerservice: '144998cd-17fa-4ee5-879d-3e2cac30083e',
            tsr1: 'e2627683-4116-4385-b8c3-5fd3bb87c68f',
            tsr2: '59bb0e2b-7b53-4d6a-b974-f020f98dc930'
        },
        testcustomer: {
            name: 'Automation Customer (Do Not Edit)',
            uid: 'bb3d3217-becc-4397-bd32-17becc1397aa'
        },
        testdealer: {
            name: 'Worldwide Equipment - Pikeville',
            id: '2898a370-5efd-4277-98a3-705efdc27732',
            code:'W009'
        },
        customertype: {
            preferred: 'Preferred Customers',
            joinall: 'Join All Customers'
        },
        testdealerOwnerGroup: {
            name: 'Automation-DealerOwnerGroup', //check why name: 'Automation-DealerOwnerGroup (Do Not Edit)', fails
            id: 'fb8d433b-8830-48ca-acd9-0f7d2876254b'
        },
        testdealerRegion: {
            name: 'Automation-Region1'
            //id: 'fb8d433b-8830-48ca-acd9-0f7d2876254b'
        },
        testuseremails: {
            peoplenetadmin: 'peoplenetadmin-automation@test.com',
            paccaradmin: 'paccaradmin-automation@test.com',
            paccaruser: 'paccaruser-automation@test.com',
            dealeradmin: 'dealeradmin-automation@test.com',
            dealeruser: 'dealeruser-automation@test.com',
            changeuser: 'changePasswordAutamationUser@test.com',
            customeradmin: 'customeradmin-automation@test.com',
            customeradmin2: 'customeradmin@test.com',
            customeruser: 'customeruser-automation@test.com',
            customeruser2: 'customeruser@test.com',
            tsr1:'tsr1-automation@test.com',
            tsr2:'tsr2-automation@test.com'
        },
        testusernames: {
            peoplenetadmin: 'Peoplenet Admin-Automation',
            paccaradmin: 'Paccar Admin-Automation',
            paccaruser: 'Paccar User-Automation',
            dealeradmin: 'Dealer Admin-Automation',
            dealeruser: 'Dealer User-Automation',
            customeradmin: 'Customer Admin-Automation',
            customeruser: 'Customer User-Automation',
            dealerowneradmin: 'DealerOwner Admin-Automation',
            dealerowneruser: 'DealerOwner User-Automaion',
            dealerregionadmin: 'DealerRegion Admin-Automation',
            dealerregionuser: 'DealerRegion User-Automation'
        },
        testuseruids: {
            peoplenetadmin: '91c771cf-7a20-49d2-b9a2-d398ae0a0f72',
            paccaradmin: 'f988552a-24ce-429a-8b6a-7a8db8ed0ccc',
            paccaruser: '1ab05960-efa4-447e-aa14-a27d29ab0493',
            dealeradmin: 'ed3d4464-5ca9-4f91-afb8-ce8a81312539',
            dealeruser: 'bb377972-1711-494b-956a-b70fad03a4e9',
            customeradmin: '40b2d03a-c76f-4753-8ac9-c984cdac702b',
            customeruser: '485da5e7-dd4c-4a44-be31-8e4d8fb43b8c'
        },
        vehicle: {
            description: 'Running Automation *Please Do Not Edit*',
            dsn: '7010136',
            dsn2: '7010148',
            dsn3: '7500231',
            groupname: 'testgrp3',
            groupname2: 'testgrp4',
            unitnumber: 'AUTOMATION',
            vin: '1XKYDP9XXGJ474000',
            vin2: '1XPBDP9X1ED239688',
            vinlast6: '239688'
        },
        gmail: {
            email: 'paccarportalqa@gmail.com',
            password: 'Pn3t_R00ck5'
        },
        vehiclegroup: {
            basename: 'Protractor Test Group',
            name1: 'Protractor Test Group 1',
            name2: 'Protractor Test Group 2'
        },
        map: {
            dealermarker: '[cy="207.90549940648657"]',
            repairvehicle: '[cy="429.1057450284035"]'
        }
    }
};