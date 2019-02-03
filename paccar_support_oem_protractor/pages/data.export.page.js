/**
 * Created by Cottomoeller on 4/20/2016.
 */
var dataExportPage = function(){
    this.entityField = element(by.name('exportEntity'));
    this.exportButton = element(by.buttonText('EXPORT'));
    this.entityList = element.all(by.css('[role="option"]'));

    this.customerDropdownOption = element(by.css('[value="customers"]'));
    this.dealererDropdownOption = element(by.css('[value="dealers"]'));
    this.userDropdownOption = element(by.css('[value="users"]'));
    this.vehicleDropdownOption = element(by.css('[value="vehicles"]'));

    this.toastAlert = element(by.css('[role="alert"]'));

    this.verifyDataExportData = function() {
        expect(this.entityField.isDisplayed()).toBe(true, 'Data Export field could not be found');
        expect(this.exportButton.isDisplayed()).toBe(true, 'Data Export Button could not be found');
        expect(this.exportButton.isEnabled()).toBe(false, 'Data Export Button should not be clickable but was');
    };

    this.verifyEntityList = function(){
        browser.sleep(1000);
        expect(this.entityList.getText()).toContain('Customers', 'Customers was missing from the entity list');
        expect(this.entityList.getText()).toContain('Dealers', 'Dealers was missing from the entity list');
        expect(this.entityList.getText()).toContain('Users', 'Users was missing from the entity list');
        expect(this.entityList.getText()).toContain('Vehicles', 'Vehicles was missing from the entity list');
    };

    this.clickEntityDropdown = function(){
        this.entityField.click();
    };

    this.selectCustomerEntity = function(){
        this.entityField.click();
        this.customerDropdownOption.click();
    };

    this.selectDelaerEntity = function(){
        this.entityField.click();
        this.dealererDropdownOption.click();
    };

    this.selectUserEntity = function(){
        this.entityField.click();
        this.userDropdownOption.click();
    };

    this.selectVehicleEntity = function(){
        this.entityField.click();
        this.vehicleDropdownOption.click();
    };

    this.selectEntityOption = function (option) {
        this.entityField.click();
        var entity = element(by.css('[value="' + option + '"]'));
        entity.click();
    };

    this.checkForToastAlert = function(){
        browser.sleep(1000);
        browser.ignoreSynchronization = true;
        if(this.toastAlert.isDisplayed()) {
            expect(this.toastAlert.getText()).toContain('The requested data will be sent to your email address.');
            browser.sleep(1000);
            browser.ignoreSynchronization = false;
            return true;
        }else if(this.toastAlert.isDisplayed()){
            expect(this.toastAlert.getText()).toContain('Export Failed.');
            browser.sleep(1000);
            browser.ignoreSynchronization = false;
            return false;
        }
    };

};

module.exports = new dataExportPage();