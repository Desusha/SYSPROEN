/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SysproenerpTestModule } from '../../../test.module';
import { ProjectEstimationDetailComponent } from '../../../../../../main/webapp/app/entities/project-estimation/project-estimation-detail.component';
import { ProjectEstimationService } from '../../../../../../main/webapp/app/entities/project-estimation/project-estimation.service';
import { ProjectEstimation } from '../../../../../../main/webapp/app/entities/project-estimation/project-estimation.model';

describe('Component Tests', () => {

    describe('ProjectEstimation Management Detail Component', () => {
        let comp: ProjectEstimationDetailComponent;
        let fixture: ComponentFixture<ProjectEstimationDetailComponent>;
        let service: ProjectEstimationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SysproenerpTestModule],
                declarations: [ProjectEstimationDetailComponent],
                providers: [
                    ProjectEstimationService
                ]
            })
            .overrideTemplate(ProjectEstimationDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProjectEstimationDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProjectEstimationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ProjectEstimation(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.projectEstimation).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
