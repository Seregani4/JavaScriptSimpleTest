describe('OTA userlogin endpoint', function() {
    var securityUtil = require('../../../utilities/security.util.js')

    var username = browser.params.testuseremails.peoplenetadmin
    var password = browser.params.adduser.password

    it('Should login successfully with valid credentials and clientId', function(done) {
        var credentialsData = securityUtil.createCredentialsData(username, password)
        securityUtil.doMobileLogin(credentialsData)
            .then(function(response) {
                expect(response.status).toEqual(200)
                expect(response.body).not.toBe(null)
                expect(response.body.success).toEqual(true)
                expect(response.body.encodedToken).not.toBe(null)
                expect(response.body.idToken).not.toBeDefined()
                expect(response.body.rejectReason).not.toBeDefined()
                expect(response.body.code).not.toBeDefined()
                done()
            })
            .catch(function(error) {
                done.fail('Expected statusCode to be 200, was ' + error.status)
            })
    })

    it('Should fail with 401 if username is invalid', function(done) {
        var credentialsData = securityUtil.createCredentialsData('invalidUsername123456', password)
        securityUtil.doMobileLogin(credentialsData)
            .then(function(response) {
                done.fail('Expected statusCode to be 401, was ' + response.status)
            })
            .catch(function(error) {
                expect(error.status).toEqual(401)
                expect(error.message).toEqual('Unauthorized')
                done()
            })
    })

    it('Should fail with 401 if password is invalid', function(done) {
        var credentialsData = securityUtil.createCredentialsData(username, 'someInvalidPassword123456')
        securityUtil.doMobileLogin(credentialsData)
            .then(function(response) {
                done.fail('Expected statusCode to be 401, was ' + response.status)
            })
            .catch(function(error) {
                expect(error.status).toEqual(401)
                expect(error.message).toEqual('Unauthorized')
                done()
            })
    })

    it('Should fail with 401 if clientId is invalid', function(done) {
        var credentialsData = securityUtil.createCredentialsData(username, password, 'someInvalidClientId')
        securityUtil.doMobileLogin(credentialsData)
            .then(function(response) {
                done.fail('Expected statusCode to be 401, was ' + response.status)
            })
            .catch(function(error) {
                expect(error.status).toEqual(401)
                expect(error.message).toEqual('Unauthorized')
                done()
            })
    })
})