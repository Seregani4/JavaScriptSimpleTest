/**
 * Created by pshrestha on 2/2/2018.
 * Test config file to run qTest integrated job.
 */

var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
var jasmineReporters = require('jasmine-reporters');

exports.config = {
    //seleniumAddress: 'http://localhost:4444/wd/hub',
    seleniumAddress: 'http://52.90.87.13:4444/wd/hub', //AWS
    framework: 'jasmine',
    allScriptsTimeout: 100000,
    jasmineNodeOpts: {
        defaultTimeoutInterval: 10000000
    },
    capabilities: {
        'browserName': 'chrome',
        'chromeOptions': {
            'prefs': {
                'credentials_enable_service': false,
                'profile': {
                    'password_manager_enabled': false
                }
            },
            'args': ['--start-maximized']
        }
    },

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
            savePath: './junitreports',
            filePrefix: './xmloutput'
        }));
    },

    specs: [
        'specs/KenMex/customer_kenMex.js',
        'specs/KenMex/dashboard_kenMex.js',
        'specs/KenMex/dealer_kenMex.js',
        'specs/KenMex/login_kenMex.js',
        'specs/KenMex/vehicle_kenMex.js'
    ],
    suites: {
        full: 'specs/**/*.js',
        dog: 'specs/Dog/*.js',
        customer: 'specs/Customer/*.js',
        filters: 'specs/Filters/*.js',
        demo:'specs/basicPageNav.js',
        globalSearch:'specs/GlobalSearch/*.js',
        user:'specs/User/*.js',
        ui:'specs/UIValidation/*.js',
        vehicle:'specs/Vehicle/*.js',
        kenmex: 'specs/KenMex/dashboard_kenMex.js'
    },
    baseUrl: 'http://paccar-portal-qa.connectedfleet.io',
    params : {
        environment: {
            url: 'http://paccar-portal-qa.connectedfleet.io',
            supportalUrl: 'http://peoplenet-portal-qa.connectedfleet.io',
            entityUrl: 'https://entity-service.qa.connectedfleet.io',
            securityGtwyUrl: 'http://security-gateway-rp-qa.connectedfleet.io:8080',
            vehicleFaultCodeUrl: 'https://entity-service.qa.connectedfleet.io/vehiclehealth/faultcode',
            entitySearchUrl: 'https://entity-search.qa.connectedfleet.io',
            //UPDATES THE WHOLE VEHICLE INFO
            updateVehicleWholeInfoUrl: 'https://entity-search.qa.connectedfleet.io/vehicles/with-timestamp',
            //UPDATES ONLY THE BASIC INFO
            updateVehicleInfoUrl: 'https://entity-search.qa.connectedfleet.io/vehicles/basicInfo',
            eventProcessorUrl: 'https://oem-event-processor.qa.connectedfleet.io/processEvent',
            midParserUrl: 'https://mid-parser.qa.connectedfleet.io/mobile-originated',
            userGatewayServiceUrl: 'https://user-gateway-service.qa.connectedfleet.io/users',
            entityGatewayServiceUrl: 'https://entity-gateway.qa.connectedfleet.io',
            //note:there is /ping and /version for the endpoint too.
            oemSiteServiceUrl: 'https://oem-site-service.qa.connectedfleet.io/distributor',
            webServicesUrl: 'http://pmg-proxy-qa.connectedfleet.io:1880/'
        },
        adduser: {
            firstname: '000Paccar',
            lastname: '000Automation',
            email: '000AddPaccarAutomation@test.com',
            newemail: 'paccarAuto@email.com',
            username: 'paccarAuto',
            gmailusername: 'paccarportalqa',
            password: 'Password1',
            password2: 'Password$2',
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
                //Parameters should be incomplete for the pop-up selection to work.
                paccar: 'Pacc',
                division: 'Kenwor',
                cummins: 'Cummi',
                dealerOwnerGroup: 'Automation-DealerOwnerGroup',
                editDealerOwnerGroup: 'EditAutomation-DealerOwnerGroup',
                dealerRegion: 'Automation-Region1',
                dealer: 'Western Peterbilt - Moses Lake - W403',
                customer: 'Automation Customer',
                preferredCustomer: 'Automation Preferred Customer',
                regularCustomer: 'Automation Regular Customer'
            }
        },
        edituser: {
            firstname: '000Automation',
            lastname: '000QAPaccar',
            username: '000QA, 000Automation',
            email: '000EditPaccarAutomation@test.com',
            phone: '1110080007',
            formattedphone: '(111) 008-0007'
        },
        addcustomer: {
            dealer: 'Allstate Peterbilt of Winona - A083',
            name: '000TestPaccarCustomer',
            orgNameSearchCustomer: '000TestCustomer',
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
        addcustomerfortransfer: {
            name: 'TransferCustomer',
            email: 'TransferCustomer@peoplenetonline.com',
            name2: 'CustomerForTransfer',
            email2: 'CustomerForTransfer@peoplenetonline.com'
        },
        editcustomer: {
            dealer: 'Allstate Peterbilt of Alexandria - A120',
            name: '000TestPaccarEditCustomer',
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
        roleslabels: {
            peoplenetadmin: 'PeopleNet Admin',
            paccaradmin: 'OEM Administrator',
            paccaruser: 'OEM User',
            paccarpoweruser: 'OEM Power User',
            divisionuser: 'Customer Service',
            cumminsuser: 'Cummins User',
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
            tsr1: 'Peoplenet TSR1',
            tsr2: 'Peoplenet TSR2'
        },
        roleids: {
            peoplenetadmin: 'cd3696d1-e8f5-4731-9e76-84cf16a53762',
            paccaradmin: '7a8ec472-d378-4848-861e-33fa4dcd6e35',
            paccarpoweruser: '809dc86c-f806-11e4-9b1b-12003d63d834',
            paccaruser: '7a8ec472-d378-4848-861e-33fa4dcd6e34',
            cumminsuser: 'e9a0169e-17de-41ed-b25d-8100802e791d',
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
        realmids: {
            oem: '3eca0893-23b5-4b00-a8c9-3d3ec6e6f2e7',
            auth0: 'bdb9be15-9546-4bfb-96f0-1210791329e1'
        },
        organizationids: {
            /*Note: OrganizationId (other than the ones listed below)
             is the respective key of the entity the user will be added to.*/
            administrative: 'peoplenet',
            oem: 'paccar',
            peterbiltdivision: 'peterbilt',
            kenworthdivision: 'kenworth',
            cummins: 'cummins'
        },
        organizationtypeids: {
            administrative: 'Administrative',
            oem: 'OEM',
            dealerOwner: 'DealerOwner',
            dealerRegion: 'DealerRegion',
            dealer: 'Dealer',
            customer: 'Customer',
            division: 'Manufacturer', //Display Name is Division on OrganizationType table.
            service: 'Service'
        },
        testcustomer: {
            name: 'Automation Customer (Do Not Edit)',
            uid: 'bb3d3217-becc-4397-bd32-17becc1397aa',
            email: 'edit@peoplenetonline.com',
            address1: '1234 Baker Rd',
            address2: 'Suite 1',
            city: 'Minnetonka',
            state: 'MN',
            country: 'United States',
            zip: '55555',
            phone: '1234567890',
            formattedphone: '(123) 456-7890',
            phoneNickName: 'Primary',
            fax: '1234567890',
            formattedfax: '(123) 456-7890'
        },
        testcustomer1:{
            name:'Carlile Transport'
        },
        testcustomer2:{
            name: '00Prashant\'s,Custo,mer'
        },
        testcustomer3:{
            name:'Cust 1 DO NOT EDIT'
        },
        testpreferredcustomer: {
            name: 'Automation Preferred Customer (Do Not Edit)',
            uid: 'bb746a6d-6644-4247-b46a-6d6644f247a9'
        },
        testregularcustomer: {
            name: 'Automation Regular Customer (Do Not Edit)',
            uid: '933bbb39-646e-41a6-b4ad-2da6f814567d'
        },
        testcumminscustomer: {
            name: 'Automation Customer Cummins (Do Not Edit)',
            email: 'customerWithCumminsTruck@test.com',
            uid: '743093c0-5ecd-42bb-a4fb-4c53e2d95879'
        },
        testcumminsuser: {
            name: 'Automation Customer Cummins (Do Not Edit)',
            email: 'automationUserCummins@test.com'
        },
        customertype: {
            preferred: 'Preferred Customers',
            joinall: 'Join All Customers'
        },
        testdealerOwnerGroup: {
            name: 'Automation-DealerOwnerGroup (Do Not Edit)',
            id: 'fb8d433b-8830-48ca-acd9-0f7d2876254b'
        },
        testEditDealerOwnerGroup: {
            name: 'EditAutomation-DealerOwnerGroup (Do Not Edit)',
            id: '0f065130-b146-41a8-be34-9873cca13a46'
        },
        testdealerRegion: {
            name: 'Automation-Region1 (Do Not Edit)',
            id: '00de1440-2961-4512-8b8e-9e6121095c72',
            name1: 'Automation-Region2 (Do Not Edit)',
            name2: 'EditDOG-RegionAutomation (Do Not Delete)'
        },
        testdealer: {
            name: 'Worldwide Equipment - Pikeville',
            code:'W009',
            id: '2898a370-5efd-4277-98a3-705efdc27732'
        },
        testdealer2: {
            name: 'Wallwork Kenworth - Fergus Falls',
            code:'W065',
            id: 'd1302246-ac79-4ec5-b022-46ac79cec5b1'
        },
        testdealer3: {
            name: 'Truckworx Kenworth - Dothan'
        },
        testuseremails: {
            superadmin:'superadmin-automation@test.com',
            peoplenetadmin: 'peoplenetadmin-automation@test.com',
            paccaradmin: 'paccaradmin-automation@test.com',
            kenmexpaccaradmin: 'kenmexpaccaradmin-automation@test.com',
            kenmexsuperadmin: 'kenmexsuperadmin-automation@test.com',
            paccaruser: 'paccaruser-automation@test.com',
            paccarpoweruser: 'paccarpoweruser-automation@test.com',
            divisionuser: 'peterbiltdivision-automation@test.com',
            divisionuser1: 'kenworthdivision-automation@test.com',
            cumminsuser: 'cumminsuser-automation@test.com',
            dealerowneradmin: 'dealerowneradmin-automation@test.com',
            dealerowneruser: 'dealerowneruser-automation@test.com',
            dealerregionadmin: 'dealerregionadmin-automation@test.com',
            dealerregionuser: 'dealerregionuser-automation@test.com',
            dealerregionadmin2: 'dealerregionadmin2-automation@test.com',
            dealerregionuser2: 'dealerregionuser2-automation@test.com',
            factoryworker: 'factoryworker-automation@test.com',
            dealeradmin: 'dealeradmin-automation@test.com',
            dealeruser: 'dealeruser-automation@test.com',
            changeuser: 'changePasswordAutamationUser@test.com',
            customeradmin: 'customeradmin-automation@test.com',
            customeradmincummins: 'customeradmincummins-automation@test.com',
            preferredcustomeradmin:'preferredcustomeradin-automation@test.com',
            preferredcustomeruser:'preferredcustomeruser-automation@test.com',
            customeradmin2: 'customeradmin@test.com',
            customeruser: 'customeruser-automation@test.com',
            customerusercummins: 'customerusercummins-automation@test.com',
            customeruser2: 'customeruser@test.com',
            dealertech: 'dealertech-automation@test.com',
            tsr1:'tsr1-automation@test.com',
            tsr2:'tsr2-automation@test.com',
            lockOutUser: 'lockoutuser-automation@test.com'
        },
        testusernames: {
            peoplenetadmin: 'Peoplenet Admin-Automation',
            paccaradmin: 'Paccar Admin-Automation',
            kenmexpaccaradmin: 'KenMexPaccar Admin-Automation',
            paccaruser: 'Paccar User-Automation',
            paccarpoweruser: 'Paccar PowerUser-Automation',
            divisionuser: 'DivisionPb User-Automation',
            divisionuser1: 'DivisionKw User-Automation',
            cumminsuser: 'Cummins User-Automation',
            dealerowneradmin: 'DealerOwner Admin-Automation',
            dealerowneruser: 'DealerOwner User-Automaion',
            dealerregionadmin: 'DealerRegion Admin-Automation',
            dealerregionuser: 'DealerRegion User-Automation',
            dealerregionadmin2: 'DelaerRegion2 Admin-Automation',
            dealerregionuser2: 'DealerRegion2 User-Automation',
            factoryworker: 'FactoryWorker User-Automation',
            dealeradmin: 'Dealer Admin-Automation',
            dealeruser: 'Dealer User-Automation',
            customeradmin: 'Customer Admin-Automation',
            customeradmincummins: 'CustomerAdmin CumminsAutomation',
            customeruser: 'Customer User-Automation',
            customerusercummins: 'CustomerUser CumminsAutomation',
            dealertech: 'DealerTech User-Automation',
            changeuser: 'Change Password',
            preferredcustomeradmin:'AdminAutomation PreferredCustomer',
            preferredcustomeruser:'Preferred CustomerUserAutomation',
            customeradmin2: 'Customer Admin',
            customeruser2: 'Customer User',
            tsr1:'tsr1 tsr1',
            tsr2:'tsr2 tsr2',
            lockOutUser: 'LockOut User-Automation'
        },
        testuseruids: {
            peoplenetadmin: '91c771cf-7a20-49d2-b9a2-d398ae0a0f72',
            paccaradmin: 'f988552a-24ce-429a-8b6a-7a8db8ed0ccc',
            kenmexpaccaradmin: '64e42691-0c86-4730-ab22-feceedb4f1b6',
            paccaruser: '1ab05960-efa4-447e-aa14-a27d29ab0493',
            paccarpoweruser: '8b983af2-00c9-470f-9a35-865aecfb9413',
            divisionuser: '0bd1d747-8f66-4472-938a-0f09b0bc1c22',
            divisionuser1: '5ac9b0da-77f9-4cba-b731-4f6e659e63b6',
            cumminsuser: '0b2db4d3-d19b-4708-8e0e-1fa34a7eeef3',
            dealerowneradmin: '1929d53a-54b5-4e38-ae22-aebd49575c98',
            dealerowneruser: '2b4f7b2d-36a5-498d-aca5-fc3092699bf2',
            dealerregionadmin: '3e0d3c1f-a691-43c3-95ee-213bf926d6f2',
            dealerregionuser: '7a0fb59a-8311-4dc2-b6e1-f5ed5fd63f3b',
            factoryworker: '5c14568b-e7f0-497c-b965-197fa37c4ba1',
            dealeradmin: 'ed3d4464-5ca9-4f91-afb8-ce8a81312539',
            dealeruser: 'bb377972-1711-494b-956a-b70fad03a4e9',
            customeradmin: '40b2d03a-c76f-4753-8ac9-c984cdac702b',
            preferredcustomeradmin:'e77ed4c7-7bfb-42f1-8d36-31453a52bf40',
            customeradmincummins: '260dfdde-9d3a-41c1-a1a9-21000fb9d249',
            customeruser: '485da5e7-dd4c-4a44-be31-8e4d8fb43b8c',
            customerusercummins: 'a45046a0-9198-4420-b549-6d329f11eba3',
            dealertech: '6f2a74ef-1b19-404d-a3a7-19c1bbddbf20',
            lockOutUser: '74931e1a-e276-47d2-aa2e-c8a8e4416aaf',
            tsr1: '53a587b5-6eb1-4c11-81d1-8dac853441ca',
            tsr2: '6758efae-7061-4283-af40-2326d1611115',
            testUserUid: '8c893b46-90a8-4dd4-87ac-859ec43d885f'
        },
        vehicle: {
            description: 'Running Automation *Please Do Not Edit*',
            dsn: '7010260',
            dsn2: '7010273',
            dsn3: '7500231',
            dsn4: '7010187',
            cumminsdsn: '7010225',
            groupname: 'testgrp1',
            groupname2: 'testgrp2',
            unitnumber: 'AUTOMATION',
            realdatavin: '1XPBDP9XXFD256720',
            realdatavin2: '1XPBDP9X2ED226142',
            vin: '1XKYDP9X4FJ467719',
            vin2: '1XPBDP9X4GD326763',
            vin3: '1XKADP9X1EJ413990',
            vin4: '1NKDX4TX1HJ171282',
            vin5: 'VIN2039482304982323',
            vin6: '1NKDX7EX0HJ166222',
            vin7: '1NKDX4TX1HJ171282',
            vinDOG: '1XKYDP9X1FJ438808',
            vinForDealersSearch: '1XKYDP9X0GJ474183',
            vinForTransfer: '1NPXLP9X0GD323247',
            joinAllVin: '1NKZXKTX9GJ104366',
            preferredVin: '1NPXLP9XXGD323241',
            primaryVin: '1XKYDP9X2GJ473987', //has W009 as Primary dealer
            regularVin: '1XKYDP9X0GJ474183',
            vinlast6: '326766',
            cumminsrealvin: '1XPBD49X5GD346065',
            cumminsvin: '1XPBD49X5GD335999',
            cumminsvin1: '1XPBD49X5GD335901',
            e2evin1: '1NPXLP9X1GD323239',
            e2evin2: '1XKYDP0X5GJ980184',
            e2evin3: '1XKYDP9X1GJ474001',
            e2evin4: '1XPBDP9X1GD345173'
        },
        gmail: {
            email: 'paccarportalqa@gmail.com',
            password: 'Pn3t_R00ck5'
        },
        vehiclegroup: {
            basename: 'Protractor Test Group',
            name0: 'doNotDelete',
            name1: 'Protractor Test Group 1',
            name2: 'Protractor Test Group 2',
            name3: 'preferredVG'
        },
        manufacturer: {
            name: 'Kenworth',
            name1: 'Peterbilt'
        },
        map: {
            dealermarker: '[cy="207.90549940648657"]',
            repairvehicle: '[cy="305.5524176507729"]'
        },
        customersubscribedarray: [
            "peoplenet:customer:bb746a6d-6644-4247-b46a-6d6644f247a9|all"
        ],
        dealersubscribedarray: [
            "peoplenet:customer:bb746a6d-6644-4247-b46a-6d6644f247a9|all",
            "peoplenet:customer:a78375de-86f1-4432-8375-de86f1243207|all"
        ],
        dealerownersubscribedarray: [
            'peoplenet:customer:84a1766a-393e-4118-90ab-8ad143753c25|all',
            'peoplenet:customer:8da304ac-5d7c-42bc-81fb-1945d8715976|all',
            'peoplenet:customer:81da93cd-19e5-4986-9f23-428021cc6e9e|all',
            'peoplenet:customer:e17fd3a4-0cde-4010-89c1-bcbeb1f92f71|all',
            'peoplenet:customer:4f27508e-a32d-4a4c-a6cf-94359c9a97d2|all',
            'peoplenet:customer:bb746a6d-6644-4247-b46a-6d6644f247a9|all',
            'peoplenet:customer:8cce7899-206a-4911-bd26-ca2addcc38a1|all',
            'peoplenet:customer:64c86e9d-e478-4f96-a8fb-3cd1e7bc25b1|all',
            'peoplenet:customer:00e5072d-7017-44fc-a507-2d701764fcbd|all',
            'peoplenet:customer:ebe42e4e-5349-48ea-8d46-fda343301d41|all',
            'peoplenet:customer:b995de83-c9f3-4c64-b4be-978d359b5871|all',
            'peoplenet:customer:f1352582-13aa-47fa-aeba-6e4a63b247aa|all',
            'peoplenet:customer:b1f5f32b-5b35-440c-8697-51813a057bd2|all',
            'peoplenet:customer:7d06776f-9129-48ba-b8ad-188806aa3cfd|all',
            'peoplenet:customer:147f0595-6c3f-4e07-bf05-956c3f7e070e|all',
            'peoplenet:customer:aa8eedaf-99a7-42de-ac5c-d1526ff957d4|all',
            'peoplenet:customer:cb787b9f-6180-40ff-8e67-03f7663f1a7f|all',
            'peoplenet:customer:6e522e86-b41a-4140-94fa-c3f90fb04685|all',
            'peoplenet:customer:08120d09-e4f0-4be8-920d-09e4f05be894|all',
            'peoplenet:customer:f853bc21-5564-4c7b-8567-02a2e5d49e6a|all',
            'peoplenet:customer:a78375de-86f1-4432-8375-de86f1243207|all',
            'peoplenet:customer:603b5ac5-165d-4a37-960a-6ce97933aef0|all',
            'peoplenet:customer:bf7f737b-9b91-47c1-b7ad-088356d63f28|all'
        ]
    }
};
