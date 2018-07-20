/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SysproenerpTestModule } from '../../../test.module';
import { ProjectEstimationDataComponent } from '../../../../../../main/webapp/app/entities/project-estimation-data/project-estimation-data.component';
import { ProjectEstimationDataService } from '../../../../../../main/webapp/app/entities/project-estimation-data/project-estimation-data.service';
import { ProjectEstimationData } from '../../../../../../main/webapp/app/entities/project-estimation-data/project-estimation-data.model';

describe('Component Tests', () => {

    describe('ProjectEstimationData Management Component', () => {
        let comp: ProjectEstimationDataComponent;
        let fixture: ComponentFixture<ProjectEstimationDataComponent>;
        let service: ProjectEstimationDataService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SysproenerpTestModule],
                declarations: [ProjectEstimationDataComponent],
                providers: [
                    ProjectEstimationDataService
                ]
            })
            .overrideTemplate(ProjectEstimationDataComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProjectEstimationDataComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProjectEstimationDataService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ProjectEstimationData(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.projectEstimationData[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
