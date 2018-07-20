/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SysproenerpTestModule } from '../../../test.module';
import { CostCodeDetailComponent } from '../../../../../../main/webapp/app/entities/cost-code/cost-code-detail.component';
import { CostCodeService } from '../../../../../../main/webapp/app/entities/cost-code/cost-code.service';
import { CostCode } from '../../../../../../main/webapp/app/entities/cost-code/cost-code.model';

describe('Component Tests', () => {

    describe('CostCode Management Detail Component', () => {
        let comp: CostCodeDetailComponent;
        let fixture: ComponentFixture<CostCodeDetailComponent>;
        let service: CostCodeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SysproenerpTestModule],
                declarations: [CostCodeDetailComponent],
                providers: [
                    CostCodeService
                ]
            })
            .overrideTemplate(CostCodeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CostCodeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CostCodeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CostCode(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.costCode).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
