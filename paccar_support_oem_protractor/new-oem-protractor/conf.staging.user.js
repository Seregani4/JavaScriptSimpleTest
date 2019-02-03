/**
 * Created by Popazov on 6/15/2018.
 */

var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
var jasmineReporters = require('jasmine-reporters');
var request = require('superagent');
this.getValidPortForService = (eachService) => {
    console.log(`Get address from:${browser.params.environment.consulUrl}/v1/catalog/service/${eachService.name}`)
    return request.get(`${browser.params.environment.consulUrl}/v1/catalog/service/${eachService.name}`)
        .retry(3)
        .set('Content-Type', 'application/json')
        .then((response) => {
            eachService.port = response.body[0].ServicePort
            let environment = browser.params.environment;
            switch (eachService.name) {
                case "entity-service":
                    environment.entityUrl = `http://${eachService.name}.service.consul:${eachService.port}`
                    environment.vehicleFaultCodeUrl = `http://${eachService.name}.service.consul:${eachService.port}/vehiclehealth/faultcode`
                    environment.vehicleGuidanceUrl = `http://${eachService.name}.service.consul:${eachService.port}/vehiclehealth/guidance`
                    console.log("entity-service urls:")
                    console.log(environment.entityUrl)
                    console.log(environment.vehicleFaultCodeUrl)
                    console.log(environment.vehicleGuidanceUrl)
                    break;
                case "entity-search":
                    environment.entitySearchUrl = `http://${eachService.name}.service.consul:${eachService.port}`
                    environment.updateVehicleWholeInfoUrl = `http://${eachService.name}.service.consul:${eachService.port}/vehicles/with-timestamp`
                    environment.updateVehicleInfoUrl = `http://${eachService.name}.service.consul:${eachService.port}/vehicles/basicInfo`
                    console.log("entity-search urls:")
                    console.log(environment.entitySearchUrl)
                    console.log(environment.updateVehicleWholeInfoUrl)
                    console.log(environment.updateVehicleInfoUrl)
                    break;
                case "oem-event-processor":
                    console.log("oem-event-processor urls:")
                    environment.eventProcessorUrl = `http://${eachService.name}.service.consul:${eachService.port}/processEvent/`
                    console.log(environment.eventProcessorUrl)
                    break;
                case "user-gateway-service":
                    console.log("user-gateway-service urls:")
                    environment.userGatewayServiceUrl = `http://${eachService.name}.service.consul:${eachService.port}/users`
                    console.log(environment.userGatewayServiceUrl)
                    break;
                case "entity-gateway":
                    console.log("entity-gateway.service urls:")
                    environment.entityGatewayServiceUrl = `http://${eachService.name}.service.consul:${eachService.port}`
                    console.log(environment.entityGatewayServiceUrl)
                    break;
                case "oem-site-service":
                    console.log("oem-site-service:")
                    environment.oemSiteServiceUrl = `http://${eachService.name}.service.consul:${eachService.port}/distributor`
                    console.log(environment.oemSiteServiceUrl)
                    break;
                case "notification-service":
                    console.log("notification-service:")
                    environment.vehicleNotificationUrl = `http://${eachService.name}.service.consul:${eachService.port}/alert`
                    console.log(environment.vehicleNotificationUrl)
                    break;
                case "event-ledger":
                    console.log("event-ledger:")
                    environment.eventLedgerServiceConsul = `http://${eachService.name}.service.consul:${eachService.port}`
                    console.log(environment.eventLedgerServiceConsul)
                    break;
                default:
                    break;
            }
            return response
        })
};
exports.config = {
    // seleniumAddress: 'http://localhost:4444/wd/hub',
    seleniumAddress: 'http://52.90.87.13:4444/wd/hub', //AWS
    //seleniumAddress: 'http://172.31.201.91:4444/wd/hub', //VM
    //framework: 'custom',
    framework: 'jasmine',
    //frameworkPath: '../node_modules/protractor-cucumber-framework',
    allScriptsTimeout: 200000,
    jasmineNodeOpts: {
        defaultTimeoutInterval: 20000000
    },
    // multiCapabilities: [{
    //     'browserName': 'Internet Explorer'
    // },{
    //     'browserName': 'chrome'
    // }, {
    //     'browserName': 'firefox'
    // }],

    capabilities: {
        'browserName': 'chrome',
        'chromeOptions': {
            'prefs': {
                'credentials_enable_service': false,
                'profile': {
                    'password_manager_enabled': false
                }
            }
        }
        // 'browserName': 'internet explorer',
        // 'browserName': 'firefox'
    },

    onPrepare: () => {
        let defer = protractor.promise.defer();
        //var sessionId = 'Test';
        jasmine.getEnv().addReporter(
            new Jasmine2HtmlReporter({
                takeScreenshots: true,
                takeScreenshotsOnlyOnFailures: true,
                consolidate: true,
                consolidateAll: true,
                showConfiguration: true,
                reportTitle: "Report Title",
                showSummary: true,
                showQuickLinks: true,
                savePath: 'reports/staging'
            })
        );
        jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
            consolidate: true,
            consolidateAll: true,
            savePath: 'junitreports',
            filePrefix: 'xmloutput'
        }));
        let services = [
            {name: "entity-service"},
            {name: "entity-search"},
            {name: "oem-event-processor"},
            {name: "user-gateway-service"},
            {name: "entity-gateway"},
            {name: "oem-site-service"},
            {name: "notification-service"},
            {name: "event-ledger"}

        ]

        //Get correct  links for services
        return Promise.all([
            this.getValidPortForService(services[0]),
            this.getValidPortForService(services[1]),
            this.getValidPortForService(services[2]),
            this.getValidPortForService(services[3]),
            this.getValidPortForService(services[4]),
            this.getValidPortForService(services[5]),
            this.getValidPortForService(services[6]),
            this.getValidPortForService(services[7])
        ]).then(()=>{
            defer.fulfill(true);
        }).catch((err) => {
            console.log("Error appeared while Urls Setup "+ err)
            defer.fulfill(true);
        });
    },
    specs: [
        'specs/User/**.js'
    ],
    exclude: [
        'specs/User/invalidUserEmail.js'
    ],
    suites: {
        full: 'specs/**/*.js',
        customer: 'specs/Customer/*.js',
        dealer: 'specs/Dealer/*.js',
        dog: 'specs/Dog/*.js',
        filters: 'specs/Filters/*.js',
        globalSearch: 'specs/GlobalSearch/*.js',
        kenMex: 'specs/KenMex/*.js',
        loginNav: 'specs/LoginNavigation/*.js',
        remoteDiagnostic: 'specs/RemoteDiagnostic/*.js',
        ui: 'specs/UIValidation/*.js',
        user: 'specs/User/*.js',
        vehicle: 'specs/Vehicle/*.js',
        demo: 'specs/basicPageNav.js',
        email: 'specs/Email/*.js'
    },
    baseUrl: 'http://paccar-portal-staging.connectedfleet.io',
    params: {
        environment: {
            // Put static link here:
            url: 'http://paccar-portal-staging.connectedfleet.io',
            supportalUrl: 'http://peoplenet-portal-staging.connectedfleet.io',
            securityGtwyUrl: 'https://security-gateway-rp-staging.connectedfleet.io',
            consulUrl: '172.17.0.1:8500',
            webServicesUrl: 'http://pmg-proxy-staging.connectedfleet.io:1880/',
            mailosaurApiKey: 'uNQ0LIR3YCETab2',
            mailosaurServerId: 'qpokwwn6',
            mailosaurEmailAdress: 'happytest.qpokwwn6@mailosaur.io'
        },
        adduser: {
            firstname: '000PaccarUTests',
            lastname: '000AutomationUserTests',
            email: '0002AddPaccarAutomationUserTests@test.com',
            newemail: 'paccarAutoUserTests@email.com',
            username: 'paccarAutoUserTests',
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
                paccar: 'Pacc',
                division: 'Kenwor',
                dealerOwnerGroup: 'Automation-DealerOwnerGroup',
                editDealerOwnerGroup: 'EditAutomation-DealerOwnerGroup',
                dealerRegion: 'Automation-Region1',
                dealer: 'Western Peterbilt - Moses Lake - W403',
                customer: 'Automation Customer',
                preferredCustomer: 'Automation Preferred Customer'
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
            name: '000-STG-Customer',
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
            dealeradmin: 'Dealer Administrator',
            dealertechnician: 'Dealer Service Technician',
            dealeruser: 'Dealer Power User',
            customeradmin: 'Customer Administrator',
            customeruser: 'Customer User',
            vehiclegroupuser: 'Vehicle Group User',
            customerservice: 'Customer Service',
            factoryworker: 'Factory Worker',
            tsr1: 'Peoplenet TSR1',
            tsr2: 'Peoplenet TSR2'
        },
        roleids: {
            peoplenetadmin: 'cd3696d1-e8f5-4731-9e76-84cf16a53762',
            paccaradmin: '7a8ec472-d378-4848-861e-33fa4dcd6e35',
            paccarpoweruser: '410e8996-e535-11e4-98b3-122d2d89044a',
            paccaruser: '7a8ec472-d378-4848-861e-33fa4dcd6e34',
            cumminsuser: 'e0e55a9e-e8b5-403d-8e1f-f3edb721f522',
            dealerowneradmin: '71cfc65b-d920-11e6-a397-12f7117e1a1b',
            dealerowneruser: '71d2426a-d920-11e6-a397-12f7117e1a1b',
            dealerregionadmin: '71d2761e-d920-11e6-a397-12f7117e1a1b',
            dealerregionuser: '71d2abd7-d920-11e6-a397-12f7117e1a1b',
            factoryworker: '1666ed86-8f46-43dd-89e9-cfce5d56f352',
            dealeradmin: 'a3fcbf96-599d-4624-8cb7-994d193742ee',
            dealeruser: '2b987640-dc94-466b-aaae-3dc47af6bd12',
            customeradmin: '9583ea5d-524f-4373-a6c2-d36d592b3197',
            customeruser: '32db9886-ff2f-4e54-9503-d268ee223ed3',
            dealertech: '41142c6f-e535-11e4-98b3-122d2d89044a',
            customerservice: '144998cd-17fa-4ee5-879d-3e2cac30083e',
            tsr1: 'c59604a0-03c9-42c8-a0b9-2f76250d719a',
            tsr2: 'b73ed577-96fd-4c65-963d-b3d5842640df'
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
            uid: '7c5e155f-822d-4ef2-801f-799e94feb350',
            email: 'edit@peoplenetonline.com',
            address1: '123 Baker Rd',
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
        testcustomer1: {
            name: 'Customer DO NOT EDIT'
        },
        testcustomer2: {
            name: 'AutomationCustomerW009 (DO NOT EDIT)'
        },
        testcustomer3:{
            name: 'Alala'
        },
        testpreferredcustomer: {
            name: 'Automation Preferred Customer (Do Not Edit)',
            uid: '0e917a68-8f3e-43fc-9ec8-c3d6ebf2ab5b'
        },
        testregularcustomer: {
            name: 'Automation Regular Customer (Do Not Edit)',
            uid: 'e0078e93-69b3-4d38-ab91-db55e0959667'
        },
        testcumminscustomer: {
            name: 'Automation Customer Cummins (Do Not Edit)',
            email: 'customerWithCumminsTruck@test.com',
            uid: 'f6f8844b-f6d5-4911-bd1f-d59cf98403c7'
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
            id: '1b406902-4c2f-4a38-83a7-af8f43775b49'
        },
        testEditDealerOwnerGroup: {
            name: 'EditAutomation-DealerOwnerGroup (Do Not Edit)',
            id: '89055ad4-4cf1-4393-bf72-0bd60e1be4a3'
        },
        testdealerRegion: {
            name: 'Automation-Region1 (Do Not Edit)', //The preferred location W009 belongs to this region.
            id: 'b2a2e7ec-b9d5-4627-91f4-774fed24871a',
            name1: 'Automation-Region2 (Do Not Edit)',
            name2: 'EditDOG-RegionAutomation (Do Not Delete)'
        },
        testdealer: {
            name: 'Worldwide Equipment - Pikeville',
            code: 'W009',
            id: 'bc65220b-9300-46f2-a522-0b930036f2a3'
        },
        testdealer2: {
            name: 'Wallwork Kenworth - Fergus Falls',
            code: 'W065',
            id: 'f15e55b3-4ff4-4d97-9e55-b34ff48d975a'
        },
        testdealer3: {
            name: 'MHC Kenworth - Charlotte'
        },
        testCumminsDealer: {
            name: 'Black Hills Kenworth',
            code: 'B515',
            id: '82f6503-2668-45b6-af65-03266835b6df'
        },
        testuseremails: {
            superadmin: 'superadmin-automation@test.com',
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
            preferredcustomeradmin: 'preferredcustomeradin-automation@test.com',
            preferredcustomeruser: 'preferredcustomeruser-automation@test.com',
            customeradmin2: 'customeradmin@test.com',
            customeruser: 'customeruser-automation@test.com',
            customerusercummins: 'customerusercummins-automation@test.com',
            customeruser2: 'customeruser@test.com',
            dealertech: 'dealertech-automation@test.com',
            tsr1: 'tsr1-automation@test.com',
            tsr2: 'tsr2-automation@test.com',
            lockOutUser: 'lockoutuser-automation@test.com',
            mailosaurUser: 'happytest.qpokwwn6@mailosaur.io',
            mailosaurPeopleAdmin: 'peoplenetadmin.qpokwwn6@mailosaur.io',
            mailosaurPaccarAdminKenMex: 'kenmexpaccaradmin-automation.qpokwwn6@mailosaur.io',
            mailosaurPeopleNetAdminKenMex: 'peoplenetadminkenmex-automation.qpokwwn6@mailosaur.io'
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
            preferredcustomeradmin: 'AdminAutomation PreferredCustomer',
            preferredcustomeruser: 'Preferred CustomerUserAutomation',
            customeradmin2: 'Customer Admin',
            customeruser2: 'Customer User',
            tsr1: 'tsr1 tsr1',
            tsr2: 'tsr2 tsr2',
            lockOutUser: 'LockOut User-Automation'
        },
        testuseruids: {
            peoplenetadmin: '27f6c7b7-700e-470f-b6ec-95ed634ffee0',
            paccaradmin: '999a84e6-a69e-47d0-b7e9-47b41f87bced',
            kenmexpaccaradmin: '1291a5b5-22cc-4efc-a3a4-2ecb19367a53',
            paccaruser: 'bc599d44-ac26-4ffd-8e6b-e26716ffef31',
            paccarpoweruser: 'b9adb4a5-ee6b-4f14-9e66-15fd8042b7ad',
            divisionuser: '6341f6a4-fdad-4c41-b521-2267839125c4',
            divisionuser1: '6f398b78-dfdb-4cb9-a6f2-592fcf54be5f',
            cumminsuser: '976b139a-3870-44ca-88f8-69b872dc453d',
            dealerowneradmin: '1c0bfe48-b3be-4368-b8d7-2da8853f052b',
            dealerowneruser: 'ea0f7726-cdc3-4948-9023-607aadcebe0c',
            dealerregionadmin: 'e092e830-efaa-44c8-b793-c2e3c3573605',
            dealerregionuser: 'e9998808-191f-4ba4-85a4-abefc24dcffa',
            factoryworker: '1b942bb3-d881-4954-bede-92f5665f3e66',
            dealeradmin: '8c8cfea8-694a-466e-8d3e-d2e468978747',
            dealeruser: '4aed0299-64e2-4e10-9900-b78911512784',
            customeradmin: '949f4e94-7207-4f59-b8a9-95587bd5feb5',
            customeradmincummins: 'c82bf419-02c3-4594-aa0f-d624418a7fdb',
            preferredcustomeradmin: 'd8d306b6-02af-4ce4-97d9-be0811a1a62a',
            customeruser: '02cf10ff-61b4-4238-9458-9d535ac9816c',
            customerusercummins: '2208d9fb-d310-4f23-b42e-c97104cecebb',
            dealertech: '1550273a-9025-419e-8e4f-b01bad76c386',
            lockOutUser: '336c3ea0-ddf6-4d33-ba64-8e64bd56852a',
            tsr1: '17079c02-3ab2-4f5f-be01-7f9332f410e8',
            tsr2: '1f172fae-df58-40bc-a88e-89b100500862',
            testUserUid: 'd14e653d-2bbd-485c-a968-293707bc1f0b',
            mailosaurId: 'a00377e5-32fd-496b-a2bc-9ef4b5c24d52'

        },
        vehicle: {
            description: '*Please Do Not Edit*',
            dsn: '7010548',
            dsn1: '7010269',
            dsn2: '7010273',
            dsn3: '7010130',
            dsn4: '7010547',
            realdata2dsn: '7040445',
            cumminsdsn: '7010225',
            realdatavin: '1XPBDP9XXFD256720',
            realdatavin2: '1XPBDP9X2ED226142',
            groupname: 'testgrp3',
            groupname2: 'testgrp2',
            unitnumber: 'AUTOMATION',
            vin: '1NKZXKTX9GJ104366',
            vin1: '1XPBDP9X6GD305350',
            vin2: '1XPBDP9X4GD326763',
            vin4: '1NPSLP9X6GD325112',
            vin5: '3WKYDP0XXHF407304',
            vin6: '1XKYDP9X7GJ492017',
            vin7: '1XPBD49X6HD297749',
            vin8: '1XKYDP9X9GJ492018',
            vinlast6: '305350',
            vinForDealersSearch: '1XKYDP9X0GJ474183',
            joinAllVin: '1NPXLP9X6GD323236',
            preferredVin: '1XKZDK9X9GJ498165',
            primaryVin: '1XKADP9X5GR980210', //has W009 as Primary dealer
            regularVin: '1XKYDP9X0GJ474183',
            vinForTransfer: '1NPCL79X4HD352945',
            altvin: '1XPBDP9X7GD298067',
            cumminsrealvin: '1XPBD49X5GD346065',
            e2evin1: '1XKADP9X6FJ438773',
            e2evin2: '1XKADP9X9FJ429968',
            e2evin3: '1XKYDP9X2FJ437604',
            e2evin4: '1XKYDP9X5FJ467504'
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
            repairvehicle: '[cy="429.1057450284035"]'
        },
        customersubscribedarray: [
            "peoplenet:customer:0e917a68-8f3e-43fc-9ec8-c3d6ebf2ab5b|all"
        ],
        dealersubscribedarray: [
            "peoplenet:customer:0e917a68-8f3e-43fc-9ec8-c3d6ebf2ab5b|all"
        ],
        dealerownersubscribedarray: [
            "peoplenet:customer:0e917a68-8f3e-43fc-9ec8-c3d6ebf2ab5b|all"
        ]
    }
};
