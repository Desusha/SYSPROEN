/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SysproenerpTestModule } from '../../../test.module';
import { CostCodeComponent } from '../../../../../../main/webapp/app/entities/cost-code/cost-code.component';
import { CostCodeService } from '../../../../../../main/webapp/app/entities/cost-code/cost-code.service';
import { CostCode } from '../../../../../../main/webapp/app/entities/cost-code/cost-code.model';

describe('Component Tests', () => {

    describe('CostCode Management Component', () => {
        let comp: CostCodeComponent;
        let fixture: ComponentFixture<CostCodeComponent>;
        let service: CostCodeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SysproenerpTestModule],
                declarations: [CostCodeComponent],
                providers: [
                    CostCodeService
                ]
            })
            .overrideTemplate(CostCodeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CostCodeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CostCodeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CostCode(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.costCodes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
