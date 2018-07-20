import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('CostCode e2e test', () => {

    let navBarPage: NavBarPage;
    let costCodeDialogPage: CostCodeDialogPage;
    let costCodeComponentsPage: CostCodeComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load CostCodes', () => {
        navBarPage.goToEntity('cost-code');
        costCodeComponentsPage = new CostCodeComponentsPage();
        expect(costCodeComponentsPage.getTitle())
            .toMatch(/Cost Codes/);

    });

    it('should load create CostCode dialog', () => {
        costCodeComponentsPage.clickOnCreateButton();
        costCodeDialogPage = new CostCodeDialogPage();
        expect(costCodeDialogPage.getModalTitle())
            .toMatch(/Create or edit a Cost Code/);
        costCodeDialogPage.close();
    });

    it('should create and save CostCodes', () => {
        costCodeComponentsPage.clickOnCreateButton();
        costCodeDialogPage.setCostCodeNoInput('costCodeNo');
        expect(costCodeDialogPage.getCostCodeNoInput()).toMatch('costCodeNo');
        costCodeDialogPage.setNameInput('name');
        expect(costCodeDialogPage.getNameInput()).toMatch('name');
        costCodeDialogPage.setDescriptionInput('description');
        expect(costCodeDialogPage.getDescriptionInput()).toMatch('description');
        costCodeDialogPage.costTypeSelectLastOption();
        costCodeDialogPage.save();
        expect(costCodeDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CostCodeComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-cost-code div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class CostCodeDialogPage {
    modalTitle = element(by.css('h4#myCostCodeLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    costCodeNoInput = element(by.css('input#field_costCodeNo'));
    nameInput = element(by.css('input#field_name'));
    descriptionInput = element(by.css('input#field_description'));
    costTypeSelect = element(by.css('select#field_costType'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setCostCodeNoInput = function(costCodeNo) {
        this.costCodeNoInput.sendKeys(costCodeNo);
    };

    getCostCodeNoInput = function() {
        return this.costCodeNoInput.getAttribute('value');
    };

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    setDescriptionInput = function(description) {
        this.descriptionInput.sendKeys(description);
    };

    getDescriptionInput = function() {
        return this.descriptionInput.getAttribute('value');
    };

    setCostTypeSelect = function(costType) {
        this.costTypeSelect.sendKeys(costType);
    };

    getCostTypeSelect = function() {
        return this.costTypeSelect.element(by.css('option:checked')).getText();
    };

    costTypeSelectLastOption = function() {
        this.costTypeSelect.all(by.tagName('option')).last().click();
    };
    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
