import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Project e2e test', () => {

    let navBarPage: NavBarPage;
    let projectDialogPage: ProjectDialogPage;
    let projectComponentsPage: ProjectComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Projects', () => {
        navBarPage.goToEntity('project');
        projectComponentsPage = new ProjectComponentsPage();
        expect(projectComponentsPage.getTitle())
            .toMatch(/Projects/);

    });

    it('should load create Project dialog', () => {
        projectComponentsPage.clickOnCreateButton();
        projectDialogPage = new ProjectDialogPage();
        expect(projectDialogPage.getModalTitle())
            .toMatch(/Create or edit a Project/);
        projectDialogPage.close();
    });

    it('should create and save Projects', () => {
        projectComponentsPage.clickOnCreateButton();
        projectDialogPage.setProjectNoInput('projectNo');
        expect(projectDialogPage.getProjectNoInput()).toMatch('projectNo');
        projectDialogPage.setNameInput('name');
        expect(projectDialogPage.getNameInput()).toMatch('name');
        projectDialogPage.setDescriptionInput('description');
        expect(projectDialogPage.getDescriptionInput()).toMatch('description');
        projectDialogPage.setStartDateInput('2000-12-31');
        expect(projectDialogPage.getStartDateInput()).toMatch('2000-12-31');
        projectDialogPage.setEndDateInput('2000-12-31');
        expect(projectDialogPage.getEndDateInput()).toMatch('2000-12-31');
        projectDialogPage.statusSelectLastOption();
        projectDialogPage.save();
        expect(projectDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ProjectComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-project div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class ProjectDialogPage {
    modalTitle = element(by.css('h4#myProjectLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    projectNoInput = element(by.css('input#field_projectNo'));
    nameInput = element(by.css('input#field_name'));
    descriptionInput = element(by.css('input#field_description'));
    startDateInput = element(by.css('input#field_startDate'));
    endDateInput = element(by.css('input#field_endDate'));
    statusSelect = element(by.css('select#field_status'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setProjectNoInput = function(projectNo) {
        this.projectNoInput.sendKeys(projectNo);
    };

    getProjectNoInput = function() {
        return this.projectNoInput.getAttribute('value');
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

    setStartDateInput = function(startDate) {
        this.startDateInput.sendKeys(startDate);
    };

    getStartDateInput = function() {
        return this.startDateInput.getAttribute('value');
    };

    setEndDateInput = function(endDate) {
        this.endDateInput.sendKeys(endDate);
    };

    getEndDateInput = function() {
        return this.endDateInput.getAttribute('value');
    };

    setStatusSelect = function(status) {
        this.statusSelect.sendKeys(status);
    };

    getStatusSelect = function() {
        return this.statusSelect.element(by.css('option:checked')).getText();
    };

    statusSelectLastOption = function() {
        this.statusSelect.all(by.tagName('option')).last().click();
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
