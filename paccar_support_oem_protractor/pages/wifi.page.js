/**
 * Created by Cottomoeller on 12/9/2015.
 */
var WiFiPage = function() {
    this.dsnField = element(by.name('dsnList'));
    this.disableWifiBtn = element(by.buttonText('Disable Wi-Fi'));
    this.enableWifiBtn = element(by.buttonText('Enable Wi-Fi'));

    this.verifyWiFiData = function() {
        expect(this.dsnField.isDisplayed()).toBe(true, 'DSN field is missing');
        expect(this.disableWifiBtn.isEnabled()).toBe(false, 'Disable Wifi button is not disabled');
        expect(this.enableWifiBtn.isEnabled()).toBe(false, 'Enable Wifi button is not disabled');
    };
};

module.exports = new WiFiPage();