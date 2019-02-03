/**
 * Created by Popazov on 4/25/2018.
 */


var EmailUtil = function () {

    var chipFilterMatrix = require('../utilities/chipFilterMatrix.utils');
    var validationUtil = require('../utilities/validation.util');
    var serverId = browser.params.environment.mailosaurServerId;
    var apiKey = browser.params.environment.mailosaurApiKey;
    var emailAddress = browser.params.environment.mailosaurEmailAdress;
    var fromEmail = 'RemoteDiagnostics@paccarsolutions.com';
    var userExportSubject = 'Exported data';
    var dealersExportFileName = 'dealers.zip';
    var customersExportFileName = 'customers.zip';
    var userExportFileName = 'users.zip';
    var vehicleExportFileName = 'vehicles.zip';
    var faultLogsExportFileName = 'fault logs.zip';
    var devicesExportFileName = 'vehicle devices.zip';
    var googleAnalyticsExportFileName = 'google analytics.zip';
    var remoteDiagnosticsExportFileName = 'vehicle disabled oem license.zip';
    this.logoPaccar = 'http://assets.connectedfleet.io/mail/logo_paccar-v2.png';
    this.logoPaccar2 = 'http://assets.connectedfleet.io/mail/pnet-logo.png';
    var emailHasBeenChanged = 'Your email has been changed';
    var emailHasBeenChangedToast = 'Your email address has been changed. Please check your email for a link to verify your email address';
    var verifyYourEmail = 'Please verify your email address';
    var verifyToastMessage = 'Your email address has been verified';
    var resetPasswordSbj = 'Reset your password';
    var resetPasswordToast = 'Password must be a minimum of eight characters and must meet at least 3 of these requirements: contain uppercase letters, lowercase letters, numbers, and symbols';
    var requireResetPage1 = 'Password Requirements - Must be a minimum of eight characters and must meet at least 3 of the following requirements:';
    var requireResetPage2 = 'Must contain at least one UPPER CASE letter';
    var requireResetPage3 = 'Must contain at least one lower case letter';
    var requireResetPage4 = 'Must contain at least one symbol';
    var requireResetPage5 = 'Must contain at least one number';
    var changePasswordSbj = 'Your password has been changed';
    var registrationSbj = 'Your PACCAR Account';
    var exportEmailText = 'Hello, This is the result of your request to export data. Please check the attached file. Thank you, The PACCAR Team Email Information Please do not reply to this message using the "reply" button, as it was sent from an unmonitored e-mail address. The information contained in this e-mail is intended for the original recipient only. Copy and paste the link above into one of the recommended browsers if your default browser will not load. If you are experiencing technical issues with the PACCAR Solutions web portal, please contact the support team via e-mail or SupportLink.';
    var dealersExportFileNameSpanish = 'concesionarios.zip';
    var customersExportFileNameSpanish = 'clientes.zip';
    var userExportFileNameSpanish = 'usuarios.zip';
    var vehicleExportFileNameSpanish = 'vehículos.zip';
    var faultLogsExportFileNameSpanish = 'registros de fallas.zip';
    var devicesExportFileNameSpanish = 'dispositivos de vehículos.zip';
    var googleAnalyticsExportFileNameSpanish = 'google analitico.zip';
    var remoteDiagnosticsExportFileNameSpanish = 'vehículo deshabilitado oem licencia.zip';
    var userExportSubjectSpanish = 'Datos exportados';
    var emailHasBeenChangedSpanish = 'Su correo electrónico ha sido modificado';
    //TODO wrong spanish translate for toast message
    var emailHasBeenChangedToastSpanish = 'Your email address has been changed. Please check your email for a link to verify your email address';
    var verifyYourEmailSpanish = 'Correo: Validación de correo electrónico';
    //TODO wrong spanish translate for toast message
    var verifyToastMessageSpanish = 'Your email address has been verified';
    var resetPasswordSbjSpanish = 'Recuperación de contraseña';
    var resetPasswordToastSpanish = 'Password must be a minimum of eight characters and must meet at least 3 of these requirements: contain uppercase letters, lowercase letters, numbers, and symbols'
    var requireResetPageSpanish1 = 'Password Requirements - Must be a minimum of eight characters and must meet at least 3 of the following requirements:';
    var requireResetPageSpanish2 = 'Must contain at least one UPPER CASE letter';
    var requireResetPageSpanish3 = 'Must contain at least one lower case letter';
    var requireResetPageSpanish4 = 'Must contain at least one symbol';
    var requireResetPageSpanish5 = 'Must contain at least one number';
    var changePasswordSbjSpanish = 'Contraseña se ha cambiado';
    var registrationSbjSpanish = 'Correo: Nuevo usuario';
    var exportEmailTextSpanish = 'Datos Exportados Estimado usuario, Este es el resultado de su solicitud para exportación de datos. Favor de revisar el archivo adjunto. Gracias, El Equipo PACCAR Información de correo electrónico Favor de no responder a este mensaje utilizando el botón de “Responder”, debido a que este mensaje fue enviado de un correo electrónico no-monitoreado. La información contenida en este correo electrónico es intencionada solamente para el destinatario original. Copie y pegue el hipervínculo de arriba en uno de los navegadores recomendados si su navegador predefinido no se carga. Si experimenta problemas técnicos con su portal de internet de PACCAR Solutions, favor de contactar a su equipo de soporte vía e-mail o SupportLink.';
    var mailosaurUser = browser.params.testuseremails.mailosaurUser;
    var mailosaurPeopepleAdmin = browser.params.testuseremails.mailosaurPeopleAdmin;
    var mailosaurId = browser.params.testuseruids.mailosaurId;
    var mailosaurPeopleNetKenMexId = browser.params.testuseruids.mailosaurKenMexId;
    var mailosaurPaccarAdminKenMex = browser.params.testuseremails.mailosaurPaccarAdminKenMex;
    var mailosaurPeopleAdminKenMex = browser.params.testuseremails.mailosaurPeopleNetAdminKenMex;
    var evgServiceNowNotification = require('../json/evgServiceNowNotification.json');
    var evgStopNowNotification = require('../json/evgStopNowNotification.json');
    var evgServiceNowSpanishNotification = require('../json/evgServiceNowSpanishNotification.json');
    var evgStopNowSpanishNotification = require('../json/evgStopNowSpanishNotification.json');
    const MailosaurClient = require('mailosaur');
    const client = new MailosaurClient(apiKey);

    this.emailMap = [
        {
            mailosaurUser: mailosaurUser,
            mailosaurPeopepleAdmin: mailosaurPeopepleAdmin,
            mailosaurId: mailosaurId,
            subject: userExportSubject,
            emailHasBeenChanged: emailHasBeenChanged,
            emailHasBeenChangedToast: emailHasBeenChangedToast,
            verifyYourEmail: verifyYourEmail,
            verifyToastMessage: verifyToastMessage,
            resetPasswordSbj: resetPasswordSbj,
            resetPasswordToast: resetPasswordToast,
            requireResetPage1: requireResetPage1,
            requireResetPage2: requireResetPage2,
            requireResetPage3: requireResetPage3,
            requireResetPage4: requireResetPage4,
            requireResetPage5: requireResetPage5,
            changePasswordSbj: changePasswordSbj,
            registrationSbj: registrationSbj,
            dealersExport: dealersExportFileName,
            customersExport: customersExportFileName,
            userExport: userExportFileName,
            vehicleExport: vehicleExportFileName,
            faultLogsExport: faultLogsExportFileName,
            devicesExport: devicesExportFileName,
            googleAnalyticsExport: googleAnalyticsExportFileName,
            remoteDiagnosticsExport: remoteDiagnosticsExportFileName,
            exportEmailText: exportEmailText,
            chipFilterUser: chipFilterMatrix.users,
            chipFilterCustomer: chipFilterMatrix.customers,
            security: 'Security',
            profile: 'Profile',
            language: 'English',
            notifications: 'Notifications',
            subsriptionUpdateMessage: 'Subscription updated successfully.',
            vehicleLocationInformation: 'Vehicle / Location Information',
            infoProvided: 'Fault Information Provided by Cummins Inc.',
            troubleshooting: 'Troubleshooting Guidance',
            serviceCenters: 'Service Centers',
            location: 'Location of Vehicle at Fault Occurrence'
        },
        {
            mailosaurUser: mailosaurPaccarAdminKenMex,
            mailosaurPeopepleAdmin: mailosaurPeopleAdminKenMex,
            mailosaurId: mailosaurPeopleNetKenMexId,
            subject: userExportSubjectSpanish,
            emailHasBeenChanged: emailHasBeenChangedSpanish,
            emailHasBeenChangedToast: emailHasBeenChangedToastSpanish,
            verifyYourEmail: verifyYourEmailSpanish,
            verifyToastMessage: verifyToastMessageSpanish,
            resetPasswordSbj: resetPasswordSbjSpanish,
            resetPasswordToast: resetPasswordToastSpanish,
            requireResetPage1: requireResetPageSpanish1,
            requireResetPage2: requireResetPageSpanish2,
            requireResetPage3: requireResetPageSpanish3,
            requireResetPage4: requireResetPageSpanish4,
            requireResetPage5: requireResetPageSpanish5,
            changePasswordSbj: changePasswordSbjSpanish,
            registrationSbj: registrationSbjSpanish,
            dealersExport: dealersExportFileNameSpanish,
            customersExport: customersExportFileNameSpanish,
            userExport: userExportFileNameSpanish,
            vehicleExport: vehicleExportFileNameSpanish,
            faultLogsExport: faultLogsExportFileNameSpanish,
            devicesExport: devicesExportFileNameSpanish,
            googleAnalyticsExport: googleAnalyticsExportFileNameSpanish,
            remoteDiagnosticsExport: remoteDiagnosticsExportFileNameSpanish,
            exportEmailText: exportEmailTextSpanish,
            chipFilterUser: 'Usuarios',
            chipFilterCustomer: 'Clientes',
            security: 'Seguridad',
            profile: 'Perfil',
            language: 'Spanish',
            notifications: 'Notificaciones',
            subsriptionUpdateMessage: 'Actualización de suscripción exitosa',
            vehicleLocationInformation: 'Información del Vehículo y Ubicación',
            infoProvided: 'Información de Diagnóstico Proporcionado por Cummins Inc.',
            troubleshooting: 'Guía de Diagnóstico',
            serviceCenters: 'Centros de Servicios',
            location: 'Ubicación de la Falla'
        }
    ];

    this.waitForEmail = (subject, sentTo) => {
        var receiver = sentTo || emailAddress;
        return client.messages.waitFor(serverId, {
            sentTo: sentTo,
            subject: subject
        }).then(email => {
            expect(email.subject).toBe(subject, 'Invalid Email Subject');
            expect(JSON.stringify(email.to[0].email)).toContain(receiver, 'Invalid Receiver Email Address name');
            return email.id;
        }).catch(err => expect(false).toBe(true, 'ERROR: ' + err));
    };

    this.validateEmail = (subject, imageUrl, receiver, emailLink) => {
        return client.messages.waitFor(serverId, {
            subject: subject,
            sentTo: receiver
        }).then(email => {
            this.basicEmailValidation(email, subject, imageUrl, receiver);
            var regExp = new RegExp(emailLink + "[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}");
            var linkFromMail = email.html.links[1].href;
            expect(linkFromMail).toMatch(regExp, 'Wrong Link');
            return linkFromMail;
        }).catch(err => expect(false).toBe(true, 'ERROR: ' + err));
    };

    this.validateRegistrationEmail = (subject, imageUrl, receiver) => {
        return client.messages.waitFor(serverId, {
            subject: subject,
            sentTo: receiver
        }).then(email => {
            this.basicEmailValidation(email, subject, imageUrl, receiver);
            return email.id;
        }).catch(err => expect(false).toBe(true, 'ERROR: ' + err));
    };

    this.validateEvgNotificationEmail = (subject, imageUrl, receiver, status) => {
        return client.messages.waitFor(serverId, {
            subject: subject,
            sentTo: receiver
        }).then(email => {
            this.basicEmailValidation(email, subject, imageUrl, receiver);
            this.validateEvgNotificationContent(email)
            return email.id;
        }).catch(err => expect(false).toBe(true, 'ERROR: ' + err));
    };

    this.validateChangePasswordEmail = (subject, imageUrl, receiver) => {
        return client.messages.waitFor(serverId, {
            subject: subject,
            sentTo: receiver
        }).then(email => {
            this.basicEmailValidation(email, subject, imageUrl, receiver);
            return email.id;
        }).catch(err => expect(false).toBe(true, 'ERROR: ' + err));
    };

    this.validateCumminsFaultEmail = (subject, imageUrl, emailObject, count) => {
        var counter = 0
        var count = count || 3
        return client.messages.waitFor(serverId, {
            sentTo: emailObject.mailosaurUser
        }).then(email => {
            expect(email.from[0].email).toBe(fromEmail);
            expect(email.html.images[0].src).toBe(imageUrl, 'Wrong logo image');
            expect(email.subject).toContain(subject, 'Invalid subject');
            expect(email.html.body).toContain(emailObject.vehicleLocationInformation, 'Text not exist');
            expect(email.html.body).toContain(emailObject.infoProvided,'Text not exist');
            expect(email.html.body).toContain(emailObject.troubleshooting,'Text not exist');
            expect(email.html.body).toContain(emailObject.serviceCenters,'Text not exist');
            expect(email.html.body).toContain(emailObject.location, 'Text not exist');
            // console.log(email)
            return email.id;
        }).catch(err => {
            if (counter > count) {
                expect(false).toBe(true, 'ERROR: ' + err)
                return err
            }
            counter++
            return this.validateCumminsFaultEmail(subject, imageUrl, emailObject, counter)
        });
    };

    this.deleteAllEmails = () => {
        return client.messages.deleteAll(serverId)
            .then(() => true)
            .catch(err => expect(false).toBe(true, 'ERROR: ' + err));
    };

    this.getAllEmailsList = () => {
        return client.messages.list(serverId)
            .then(result => result.items)
            .catch(err => expect(false).toBe(true, 'ERROR: ' + err));
    };

    this.getLastEmail = () => {
        return client.messages.list(serverId)
            .then(result => result.items[0])
            .catch(err => expect(false).toBe(true, 'ERROR: ' + err));
    };

    this.getLastEmailData = () => {
        return client.messages.list(serverId)
            .then(result => client.messages.get(result.items[0].id))
            .catch(err => expect(false).toBe(true, 'ERROR: ' + err));
    };

    this.getEmailData = id => {
        if (id) {
            return this.getEmailById(id)
        } else {
            return this.getLastEmailData()
        }
    };

    this.getEmailsByRecipient = recipient => {
        return client.messages.search(serverId, {
            sentTo: recipient
        })
            .then(results => results)
            .catch(err => expect(false).toBe(true, 'ERROR: ' + err));
    };

    this.getEmailById = id => {
        return client.messages.get(id)
            .then(result => result)
            .catch(err => expect(false).toBe(true, 'ERROR: ' + err));
    };

    this.validateLastEmailSender = sender => {
        return this.getLastEmailData()
            .then(result => {
                expect(result.from[0].email).toBe(sender);
                return true;
            }).catch(err => expect(false).toBe(true, 'ERROR: ' + err));
    };

    this.basicEmailValidation = (email, subject, imageUrl, receiver) => {
        expect(email.subject).toBe(subject, 'Invalid subject');
        expect(email.from[0].email).toBe(fromEmail);
        expect(email.html.images[0].src).toBe(imageUrl, 'Wrong logo image');
        expect(JSON.stringify(email.to)).toContain(receiver, 'Invalid Receiver Email Address name');
    };

    this.validateExportEmail = (fileName, id, imageUrl, receiver, subject, text) => {
        return this.getEmailData(id)
            .then(email => {
                this.basicEmailValidation(email, subject || userExportSubject, imageUrl, receiver);
                expect(email.attachments[0].fileName).toBe(fileName, 'Invalid file name');
                let res = text.split(" ", "<", ">");
                validationUtil.validateTextContainArray(email.html.body, res);
                return true;
            }).catch(err => expect(false).toBe(true, 'ERROR: ' + err));
    };

    this.validateEvgNotificationContent = (email) => {
        let evgNotificationJson
        if(email.subject.includes('Stop Now')) {
            evgNotificationJson = evgStopNowNotification
        } else if (email.subject.includes('Service Now')) {
            evgNotificationJson = evgServiceNowNotification
        } else if (email.subject.includes('Detenerse')) {
            evgNotificationJson = evgStopNowSpanishNotification
        } else if (email.subject.includes('Servicio Inmediato')) {
            evgNotificationJson = evgServiceNowSpanishNotification
        }

        let messageIDPosition = email.html.body.search('MSG-')
        //Remove message id before comparing the notification body
        expect(email.html.body.replace(email.html.body.substring(messageIDPosition, messageIDPosition + 10),'')).toBe(evgNotificationJson.html.body, 'Invalid body');
    }
};

module.exports = new EmailUtil();