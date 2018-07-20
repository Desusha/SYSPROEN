/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SysproenerpTestModule } from '../../../test.module';
import { CostCodeDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/cost-code/cost-code-delete-dialog.component';
import { CostCodeService } from '../../../../../../main/webapp/app/entities/cost-code/cost-code.service';

describe('Component Tests', () => {

    describe('CostCode Management Delete Component', () => {
        let comp: CostCodeDeleteDialogComponent;
        let fixture: ComponentFixture<CostCodeDeleteDialogComponent>;
        let service: CostCodeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SysproenerpTestModule],
                declarations: [CostCodeDeleteDialogComponent],
                providers: [
                    CostCodeService
                ]
            })
            .overrideTemplate(CostCodeDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CostCodeDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CostCodeService);
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
