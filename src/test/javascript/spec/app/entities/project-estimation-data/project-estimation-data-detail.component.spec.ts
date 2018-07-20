/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SysproenerpTestModule } from '../../../test.module';
import { ProjectEstimationDataDetailComponent } from '../../../../../../main/webapp/app/entities/project-estimation-data/project-estimation-data-detail.component';
import { ProjectEstimationDataService } from '../../../../../../main/webapp/app/entities/project-estimation-data/project-estimation-data.service';
import { ProjectEstimationData } from '../../../../../../main/webapp/app/entities/project-estimation-data/project-estimation-data.model';

describe('Component Tests', () => {

    describe('ProjectEstimationData Management Detail Component', () => {
        let comp: ProjectEstimationDataDetailComponent;
        let fixture: ComponentFixture<ProjectEstimationDataDetailComponent>;
        let service: ProjectEstimationDataService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SysproenerpTestModule],
                declarations: [ProjectEstimationDataDetailComponent],
                providers: [
                    ProjectEstimationDataService
                ]
            })
            .overrideTemplate(ProjectEstimationDataDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProjectEstimationDataDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProjectEstimationDataService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ProjectEstimationData(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.projectEstimationData).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
