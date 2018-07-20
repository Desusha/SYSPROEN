import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Phase e2e test', () => {

    let navBarPage: NavBarPage;
    let phaseDialogPage: PhaseDialogPage;
    let phaseComponentsPage: PhaseComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Phases', () => {
        navBarPage.goToEntity('phase');
        phaseComponentsPage = new PhaseComponentsPage();
        expect(phaseComponentsPage.getTitle())
            .toMatch(/Phases/);

    });

    it('should load create Phase dialog', () => {
        phaseComponentsPage.clickOnCreateButton();
        phaseDialogPage = new PhaseDialogPage();
        expect(phaseDialogPage.getModalTitle())
            .toMatch(/Create or edit a Phase/);
        phaseDialogPage.close();
    });

   /* it('should create and save Phases', () => {
        phaseComponentsPage.clickOnCreateButton();
        phaseDialogPage.setPhaseNoInput('phaseNo');
        expect(phaseDialogPage.getPhaseNoInput()).toMatch('phaseNo');
        phaseDialogPage.setNameInput('name');
        expect(phaseDialogPage.getNameInput()).toMatch('name');
        phaseDialogPage.setDescriptionInput('description');
        expect(phaseDialogPage.getDescriptionInput()).toMatch('description');
        phaseDialogPage.setOrderInput('5');
        expect(phaseDialogPage.getOrderInput()).toMatch('5');
        phaseDialogPage.projectSelectLastOption();
        phaseDialogPage.save();
        expect(phaseDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class PhaseComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-phase div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class PhaseDialogPage {
    modalTitle = element(by.css('h4#myPhaseLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    phaseNoInput = element(by.css('input#field_phaseNo'));
    nameInput = element(by.css('input#field_name'));
    descriptionInput = element(by.css('input#field_description'));
    orderInput = element(by.css('input#field_order'));
    projectSelect = element(by.css('select#field_project'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setPhaseNoInput = function(phaseNo) {
        this.phaseNoInput.sendKeys(phaseNo);
    };

    getPhaseNoInput = function() {
        return this.phaseNoInput.getAttribute('value');
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

    setOrderInput = function(order) {
        this.orderInput.sendKeys(order);
    };

    getOrderInput = function() {
        return this.orderInput.getAttribute('value');
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
