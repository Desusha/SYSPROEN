/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SysproenerpTestModule } from '../../../test.module';
import { ProjectEstimationDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/project-estimation/project-estimation-delete-dialog.component';
import { ProjectEstimationService } from '../../../../../../main/webapp/app/entities/project-estimation/project-estimation.service';

describe('Component Tests', () => {

    describe('ProjectEstimation Management Delete Component', () => {
        let comp: ProjectEstimationDeleteDialogComponent;
        let fixture: ComponentFixture<ProjectEstimationDeleteDialogComponent>;
        let service: ProjectEstimationService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SysproenerpTestModule],
                declarations: [ProjectEstimationDeleteDialogComponent],
                providers: [
                    ProjectEstimationService
                ]
            })
            .overrideTemplate(ProjectEstimationDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProjectEstimationDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProjectEstimationService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
