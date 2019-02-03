describe("Validate filters on dealer owner page -----> ", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var dealersOwnerGroupPage = require('../../../pages/dealerOwnerGroup.page.js');
    var vehicleDetailPage = require('../../../pages/vehicledetail.page.js');
    var validationUtil = require('../../../utilities/validation.util');
    var chipFilterMatrix = require('../../../utilities/chipFilterMatrix.utils.js');
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var password = browser.params.adduser.password;
    var testDealerOwnerGroup = browser.params.testdealerOwnerGroup.name;

    browser.driver.manage().window().maximize();

    afterEach(function () {
        //clear browser storage to simulate logout!
        browser.executeScript('window.localStorage.clear();');
    });

    it('TC-1657 Dealer Owner Group - Drop Down Search/Filter', function () {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.dealerOwnerGroupsLink.click();
        validationUtil.validateDropDownSearchAndFilters(navigation.chipFilterDealerOwnerGroupButton, testDealerOwnerGroup, 0, dealersOwnerGroupPage.columns.nameColumn, true);
    });

    it('TC-2182 Validate location page, Not all locations displayed ', function () {
        var first;
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.dealerOwnerGroupsLink.click();
        navigation.typeInSearchFilter(testDealerOwnerGroup);
        dealersOwnerGroupPage.clickDealerGroupHyperlinkCellSearch(testDealerOwnerGroup);
        navigation.allTabs.get(1).click();
        navigation.rowsPerPage.getText()
            .then(function (count) {
                count = count.substring(10);
                if (count <= 10) {
                    expect(navigation.lastPageButton.getAttribute('disabled')).toBe('true');
                    expect(navigation.nextPageButton.getAttribute('aria-hidden')).toBe('true');
                } else {
                    vehicleDetailPage.allTableRows.count()
                        .then(function (count) {
                            expect(count).toBe(10, 'Rows count should be 10');
                        });
                    vehicleDetailPage.allTableRows.getText()
                        .then(function (valuesFirst) {
                            navigation.nextPageButton.click();
                            return first = valuesFirst;
                        });
                    vehicleDetailPage.allTableRows.getText()
                        .then(function (valuesSecond) {
                            validationUtil.validateTextNotContain(first, valuesSecond);
                        });
                    navigation.lastPageButton.click();
                    expect(navigation.lastPageButton.getAttribute('disabled')).toBe('true');
                    expect(navigation.nextPageButton.getAttribute('aria-hidden')).toBe('true');
                    navigation.firstPageButton.click();
                    expect(navigation.firstPageButton.getAttribute('disabled')).toBe('true');
                    expect(navigation.previousPageButton.getAttribute('aria-hidden')).toBe('true');
                }
            });
    });

    it("TC-2226 Chip filter shouldn't disappears after clicking on the link of the currently opened page", function () {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.dealerOwnerGroupsLink.click();
        navigation.applyChipFilter(chipFilterMatrix.dealerOwnerGroups, testDealerOwnerGroup, 1);
        navigation.dealerOwnerGroupsLink.click();
        expect(navigation.activeChips.isPresent()).toBe(true, "Dealer chip filter didn't create");
        navigation.dealersLink.click();
        expect(navigation.activeChips.isPresent()).toBe(true, "Dealer chip filter didn't create");
    });
});