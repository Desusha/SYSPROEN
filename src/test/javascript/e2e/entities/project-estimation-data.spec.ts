import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('ProjectEstimationData e2e test', () => {

    let navBarPage: NavBarPage;
    let projectEstimationDataDialogPage: ProjectEstimationDataDialogPage;
    let projectEstimationDataComponentsPage: ProjectEstimationDataComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load ProjectEstimationData', () => {
        navBarPage.goToEntity('project-estimation-data');
        projectEstimationDataComponentsPage = new ProjectEstimationDataComponentsPage();
        expect(projectEstimationDataComponentsPage.getTitle())
            .toMatch(/Project Estimation Data/);

    });

    it('should load create ProjectEstimationData dialog', () => {
        projectEstimationDataComponentsPage.clickOnCreateButton();
        projectEstimationDataDialogPage = new ProjectEstimationDataDialogPage();
        expect(projectEstimationDataDialogPage.getModalTitle())
            .toMatch(/Create or edit a Project Estimation Data/);
        projectEstimationDataDialogPage.close();
    });

   /* it('should create and save ProjectEstimationData', () => {
        projectEstimationDataComponentsPage.clickOnCreateButton();
        projectEstimationDataDialogPage.setNumberOfUnitInput('5');
        expect(projectEstimationDataDialogPage.getNumberOfUnitInput()).toMatch('5');
        projectEstimationDataDialogPage.setUnitPriceInput('5');
        expect(projectEstimationDataDialogPage.getUnitPriceInput()).toMatch('5');
        projectEstimationDataDialogPage.setTotalPriceInput('5');
        expect(projectEstimationDataDialogPage.getTotalPriceInput()).toMatch('5');
        projectEstimationDataDialogPage.costCodeSelectLastOption();
        projectEstimationDataDialogPage.projectSelectLastOption();
        projectEstimationDataDialogPage.save();
        expect(projectEstimationDataDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ProjectEstimationDataComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-project-estimation-data div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class ProjectEstimationDataDialogPage {
    modalTitle = element(by.css('h4#myProjectEstimationDataLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    numberOfUnitInput = element(by.css('input#field_numberOfUnit'));
    unitPriceInput = element(by.css('input#field_unitPrice'));
    totalPriceInput = element(by.css('input#field_totalPrice'));
    costCodeSelect = element(by.css('select#field_costCode'));
    projectSelect = element(by.css('select#field_project'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setNumberOfUnitInput = function(numberOfUnit) {
        this.numberOfUnitInput.sendKeys(numberOfUnit);
    };

    getNumberOfUnitInput = function() {
        return this.numberOfUnitInput.getAttribute('value');
    };

    setUnitPriceInput = function(unitPrice) {
        this.unitPriceInput.sendKeys(unitPrice);
    };

    getUnitPriceInput = function() {
        return this.unitPriceInput.getAttribute('value');
    };

    setTotalPriceInput = function(totalPrice) {
        this.totalPriceInput.sendKeys(totalPrice);
    };

    getTotalPriceInput = function() {
        return this.totalPriceInput.getAttribute('value');
    };

    costCodeSelectLastOption = function() {
        this.costCodeSelect.all(by.tagName('option')).last().click();
    };

    costCodeSelectOption = function(option) {
        this.costCodeSelect.sendKeys(option);
    };

    getCostCodeSelect = function() {
        return this.costCodeSelect;
    };

    getCostCodeSelectedOption = function() {
        return this.costCodeSelect.element(by.css('option:checked')).getText();
    };

    projectSelectLastOption = function() {
        this.projectSelect.all(by.tagName('option')).last().click();
    };

    projectSelectOption = function(option) {
        this.projectSelect.sendKeys(option);
    };

    getProjectSelect = function() {
        return this.projectSelect;
    };

    getProjectSelectedOption = function() {
        return this.projectSelect.element(by.css('option:checked')).getText();
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
