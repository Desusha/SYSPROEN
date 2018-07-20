/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SysproenerpTestModule } from '../../../test.module';
import { ProjectEstimationComponent } from '../../../../../../main/webapp/app/entities/project-estimation/project-estimation.component';
import { ProjectEstimationService } from '../../../../../../main/webapp/app/entities/project-estimation/project-estimation.service';
import { ProjectEstimation } from '../../../../../../main/webapp/app/entities/project-estimation/project-estimation.model';

describe('Component Tests', () => {

    describe('ProjectEstimation Management Component', () => {
        let comp: ProjectEstimationComponent;
        let fixture: ComponentFixture<ProjectEstimationComponent>;
        let service: ProjectEstimationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SysproenerpTestModule],
                declarations: [ProjectEstimationComponent],
                providers: [
                    ProjectEstimationService
                ]
            })
            .overrideTemplate(ProjectEstimationComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProjectEstimationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProjectEstimationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ProjectEstimation(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.projectEstimations[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
