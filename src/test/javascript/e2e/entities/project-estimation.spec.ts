import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('ProjectEstimation e2e test', () => {

    let navBarPage: NavBarPage;
    let projectEstimationDialogPage: ProjectEstimationDialogPage;
    let projectEstimationComponentsPage: ProjectEstimationComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load ProjectEstimations', () => {
        navBarPage.goToEntity('project-estimation');
        projectEstimationComponentsPage = new ProjectEstimationComponentsPage();
        expect(projectEstimationComponentsPage.getTitle())
            .toMatch(/Project Estimations/);

    });

    it('should load create ProjectEstimation dialog', () => {
        projectEstimationComponentsPage.clickOnCreateButton();
        projectEstimationDialogPage = new ProjectEstimationDialogPage();
        expect(projectEstimationDialogPage.getModalTitle())
            .toMatch(/Create or edit a Project Estimation/);
        projectEstimationDialogPage.close();
    });

   /* it('should create and save ProjectEstimations', () => {
        projectEstimationComponentsPage.clickOnCreateButton();
        projectEstimationDialogPage.projectSelectLastOption();
        projectEstimationDialogPage.phaseSelectLastOption();
        projectEstimationDialogPage.save();
        expect(projectEstimationDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ProjectEstimationComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-project-estimation div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class ProjectEstimationDialogPage {
    modalTitle = element(by.css('h4#myProjectEstimationLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    projectSelect = element(by.css('select#field_project'));
    phaseSelect = element(by.css('select#field_phase'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

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

    phaseSelectLastOption = function() {
        this.phaseSelect.all(by.tagName('option')).last().click();
    };

    phaseSelectOption = function(option) {
        this.phaseSelect.sendKeys(option);
    };

    getPhaseSelect = function() {
        return this.phaseSelect;
    };

    getPhaseSelectedOption = function() {
        return this.phaseSelect.element(by.css('option:checked')).getText();
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
