/**
 * Created by Popazov on 5/24/2018.
 */

describe("Subscriptions UI validation", function () {

    var loginPage = require('../../../pages/login.page.js');
    var navigation = require('../../../pages/navigation.page.js');
    var subscriptionPage = require('../../../pages/subscriptions.page.js');
    var paccarAdminEmail = browser.params.testuseremails.paccaradmin;
    var password = browser.params.adduser.password;
    var defaultChipCount = 3;

    browser.driver.manage().window().maximize();
    beforeEach(function () {
        loginPage.get();
        loginPage.login('paccar', paccarAdminEmail, password);
        navigation.clickSubscriptionsLink();
    });

    afterEach(function () {
        browser.executeScript('window.localStorage.clear();');
    });

    it("TC-2263 Validate the Pagination on the Subscription page", function () {
        navigation.clearAllFiltersButton.click();
        navigation.pageSizeButton.click();
        navigation.pageFiftyButton.click();
        navigation.lastPageButton.click();
        expect(navigation.lastPageButton.getAttribute('disabled')).toBe('true');
        expect(navigation.nextPageButton.getAttribute('aria-hidden')).toBe('true');
        navigation.firstPageButton.click();
        expect(navigation.firstPageButton.getAttribute('disabled')).toBe('true');
        expect(navigation.previousPageButton.getAttribute('aria-hidden')).toBe('true');
        navigation.nextPageButton.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/subscription/list/?page=' + 1);
        navigation.previousPageButton.click();
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/subscription/list/?page=' + 0);
    });

    it("TC- 2263 Validate the Rows per page functionality  on the Subscription page", function () {
        navigation.clearAllFiltersButton.click();
        navigation.pageSizeButton.click();
        navigation.pageFiftyButton.click();
        expect(navigation.allTableRows.count()).toBe(50);
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/subscription/list/?page=0&pageSize=' + 50);
        navigation.pageSizeButton.click();
        navigation.pageTenButton.click();
        expect(navigation.allTableRows.count()).toBe(10);
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/subscription/list/?page=0&pageSize=' + 10);
        navigation.pageSizeButton.click();
        navigation.pageTwentyFiveButton.click();
        expect(navigation.allTableRows.count()).toBe(25);
        expect(browser.getCurrentUrl()).toContain(browser.params.environment.url + '/#/nav/subscription/list/?page=0&pageSize=' + 25);
    });

    it("PPSP-881 Check chipFilters functionality", function () {
        expect(navigation.allChips.count()).toBe(defaultChipCount, "Incorrect chip filter count ");
        for (var i = 1; i <= defaultChipCount; i++) {
            navigation.removeChipFilter();
            expect(navigation.allChips.count()).toBe(defaultChipCount - i, "Incorrect chip filter count ");
        }
        browser.refresh();
        expect(navigation.allChips.count()).toBe(0, "Incorrect chip filter count ");
        navigation.clickDashboardLink();
        navigation.clickSubscriptionsLink();
        expect(navigation.allChips.count()).toBe(defaultChipCount, "Incorrect chip filter count ");
        navigation.clearAllFiltersButton.click();
        expect(navigation.allChips.count()).toBe(0, "Incorrect chip filter count ");
    });

    it("Validate Add to cart functionality", function () {
        navigation.clearAllFiltersButton.click();
        subscriptionPage.addToCartBtn.first().click();
        subscriptionPage.validateCartItemCount(1);
        navigation.clickDashboardLink();
        navigation.clickSubscriptionsLink();
        subscriptionPage.validateCartItemCount(1);
        subscriptionPage.viewCartBtn.click();
        expect(browser.getCurrentUrl()).toContain(`${browser.params.environment.url}/#/nav/subscription/confirmation/`);
        navigation.validateBreadCrumbs(["Dashboard", "Subscriptions", "Shopping Cart"]);
        subscriptionPage.verifyShoppingCartPageElements();
        subscriptionPage.deleteButton.click();
        subscriptionPage.validateCartItemCount(0);
        expect(browser.getCurrentUrl()).toContain(`${browser.params.environment.url}/#/nav/subscription/list/`);
        expect(navigation.allChips.count()).toBe(defaultChipCount, "Incorrect chip filter count ");
        navigation.clearAllFiltersButton.click();
        subscriptionPage.addToCartBtn.first().click();
        subscriptionPage.viewCartBtn.click();
        subscriptionPage.checkoutBtn.click();
        navigation.validateBreadCrumbs(["Dashboard", "Subscriptions", "Shopping Cart", "Confirm Contact Information"]);
        expect(subscriptionPage.saveAndContBtn.isDisplayed()).toBe(true, "Save button not displayed");
        expect(navigation.cancelCreationButton.isDisplayed()).toBe(true, "Cancel button not displayed");
        navigation.cancelCreationButton.click();
        navigation.clearAllFiltersButton.click();
        subscriptionPage.removeFromCartBtn.click();
        subscriptionPage.validateCartItemCount(0);
    });

});
