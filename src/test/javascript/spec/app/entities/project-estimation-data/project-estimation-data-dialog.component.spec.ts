/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SysproenerpTestModule } from '../../../test.module';
import { ProjectEstimationDataDialogComponent } from '../../../../../../main/webapp/app/entities/project-estimation-data/project-estimation-data-dialog.component';
import { ProjectEstimationDataService } from '../../../../../../main/webapp/app/entities/project-estimation-data/project-estimation-data.service';
import { ProjectEstimationData } from '../../../../../../main/webapp/app/entities/project-estimation-data/project-estimation-data.model';
import { CostCodeService } from '../../../../../../main/webapp/app/entities/cost-code';
import { ProjectEstimationService } from '../../../../../../main/webapp/app/entities/project-estimation';

describe('Component Tests', () => {

    describe('ProjectEstimationData Management Dialog Component', () => {
        let comp: ProjectEstimationDataDialogComponent;
        let fixture: ComponentFixture<ProjectEstimationDataDialogComponent>;
        let service: ProjectEstimationDataService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SysproenerpTestModule],
                declarations: [ProjectEstimationDataDialogComponent],
                providers: [
                    CostCodeService,
                    ProjectEstimationService,
                    ProjectEstimationDataService
                ]
            })
            .overrideTemplate(ProjectEstimationDataDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProjectEstimationDataDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProjectEstimationDataService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ProjectEstimationData(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.projectEstimationData = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'projectEstimationDataListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ProjectEstimationData();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.projectEstimationData = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'projectEstimationDataListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
