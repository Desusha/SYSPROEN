/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SysproenerpTestModule } from '../../../test.module';
import { ProjectEstimationDataDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/project-estimation-data/project-estimation-data-delete-dialog.component';
import { ProjectEstimationDataService } from '../../../../../../main/webapp/app/entities/project-estimation-data/project-estimation-data.service';

describe('Component Tests', () => {

    describe('ProjectEstimationData Management Delete Component', () => {
        let comp: ProjectEstimationDataDeleteDialogComponent;
        let fixture: ComponentFixture<ProjectEstimationDataDeleteDialogComponent>;
        let service: ProjectEstimationDataService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SysproenerpTestModule],
                declarations: [ProjectEstimationDataDeleteDialogComponent],
                providers: [
                    ProjectEstimationDataService
                ]
            })
            .overrideTemplate(ProjectEstimationDataDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProjectEstimationDataDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProjectEstimationDataService);
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
