/**
 * Edited by pShrestha on 2/13/2018.
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
        'platform': 'Windows 10',
        'browserName': 'chrome',
        'screenResolution': '1280x1024',
        'chromeOptions': {
            'prefs': {
                'credentials_enable_service': false,
                'profile': {
                    'password_manager_enabled': false
                }
            },
            'args': ['--start-maximized']
        }
        //'browserName': 'internet explorer'
        //'browserName': 'firefox'
    },
    onPrepare: function() {
        jasmine.getEnv().addReporter(
            new Jasmine2HtmlReporter({
                takeScreenshots: true,
                takeScreenshotsOnlyOnFailures: true,
                consolidate: true,
                consolidateAll: true,
                savePath: './reports/'
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
        'specs/basicPageNav.js',
        //Cannot run - No users with various roles
        // 'specs/LoginNavigation/linkVerification.js',
        'specs/LoginNavigation/linkNavigation.js',
        'specs/UIValidation/vehicleDetailsPageUiValidation.js'
    ],
    baseUrl: 'https://www.paccarsolutions.com',
    params : {
        environment: {
            url: 'https://www.paccarsolutions.com'
        },
        adduser: {
            firstname: '000Paccar',
            lastname: '000Automation',
            email: '000AddPaccarAutomation@test.com',
            newemail: 'paccarAuto@email.com',
            username: 'paccarAuto',
            gmailusername: 'paccarportalqa',
            password: 'Password$2',
            phone: '1234567890',
            formattedphone: '(123) 456-7890',
            newpassword: 'Password$2',
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
            peoplenetadmin: 'PeopleNet Admin: A PeopleNet employee can do anything',
            paccaradmin: 'OEM Administrator: PACCAR, Dealer, & Customer Management',
            paccaruser: 'OEM User: View Only and Standard Analytics',
            paccarpoweruser: 'OEM Power User: View Only & Expert Analytics',
            divisionuser: 'Customer Service: A Paccar employee within the distributed systems management team (division specific)',
            dealeradmin: 'Dealer Admin: Admin of a Dealer',
            dealertechnician: 'Dealer Service Technician: View Only',
            dealeruser: 'Dealer Power User: Customer Management',
            customeradmin: 'Customer Administrator: Customer Management',
            customeruser: 'Customer User: View Only'
        },
        testuseremails: {
            //test user for Prod - Pnet admin
            peoplenetadmin: 'robertsmerf5@gmail.com',
            paccaradmin: 'robertsmerf5@gmail.com',
            paccaruser: 'robertsmerf5@gmail.com'
        },
        testusernames: {
            peoplenetadmin: 'Rob Smerf'
        },
        testuseruids: {
            peoplenetadmin: '7fa2377b-2151-4029-86ed-8271819432e0'
        },
        testcustomer: {
            name: 'Automation Customer (Do Not Edit)',
            uid: 'bb3d3217-becc-4397-bd32-17becc1397aa'
        },
        testdealer: {
            name: 'Worldwide Equipment - Pikeville',
            code:'W009',
            id: '2898a370-5efd-4277-98a3-705efdc27732'
        },
        vehicle: {
            vin: '1XKYDP9XXGJ474000',
            vinlast6: '474000',
            altvin: '1XKYDP0X5GJ980184'
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
        manufacturer: {
            name: 'Kenworth',
            name1: 'Peterbilt'
        },
        map: {
            dealermarker: '[cy="207.90549940648657"]',
            repairvehicle: '[cy="450.2953735183678"]'
        }
    }
};
