/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SysproenerpTestModule } from '../../../test.module';
import { ProjectEstimationDialogComponent } from '../../../../../../main/webapp/app/entities/project-estimation/project-estimation-dialog.component';
import { ProjectEstimationService } from '../../../../../../main/webapp/app/entities/project-estimation/project-estimation.service';
import { ProjectEstimation } from '../../../../../../main/webapp/app/entities/project-estimation/project-estimation.model';
import { ProjectService } from '../../../../../../main/webapp/app/entities/project';
import { PhaseService } from '../../../../../../main/webapp/app/entities/phase';

describe('Component Tests', () => {

    describe('ProjectEstimation Management Dialog Component', () => {
        let comp: ProjectEstimationDialogComponent;
        let fixture: ComponentFixture<ProjectEstimationDialogComponent>;
        let service: ProjectEstimationService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SysproenerpTestModule],
                declarations: [ProjectEstimationDialogComponent],
                providers: [
                    ProjectService,
                    PhaseService,
                    ProjectEstimationService
                ]
            })
            .overrideTemplate(ProjectEstimationDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProjectEstimationDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProjectEstimationService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ProjectEstimation(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.projectEstimation = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'projectEstimationListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ProjectEstimation();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.projectEstimation = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'projectEstimationListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
