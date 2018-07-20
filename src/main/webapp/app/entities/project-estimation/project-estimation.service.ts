import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ProjectEstimation } from './project-estimation.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ProjectEstimation>;

@Injectable()
export class ProjectEstimationService {

    private resourceUrl =  SERVER_API_URL + 'api/project-estimations';

    constructor(private http: HttpClient) { }

    create(projectEstimation: ProjectEstimation): Observable<EntityResponseType> {
        const copy = this.convert(projectEstimation);
        return this.http.post<ProjectEstimation>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(projectEstimation: ProjectEstimation): Observable<EntityResponseType> {
        const copy = this.convert(projectEstimation);
        return this.http.put<ProjectEstimation>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ProjectEstimation>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ProjectEstimation[]>> {
        const options = createRequestOption(req);
        return this.http.get<ProjectEstimation[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ProjectEstimation[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ProjectEstimation = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ProjectEstimation[]>): HttpResponse<ProjectEstimation[]> {
        const jsonResponse: ProjectEstimation[] = res.body;
        const body: ProjectEstimation[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ProjectEstimation.
     */
    private convertItemFromServer(projectEstimation: ProjectEstimation): ProjectEstimation {
        const copy: ProjectEstimation = Object.assign({}, projectEstimation);
        return copy;
    }

    /**
     * Convert a ProjectEstimation to a JSON which can be sent to the server.
     */
    private convert(projectEstimation: ProjectEstimation): ProjectEstimation {
        const copy: ProjectEstimation = Object.assign({}, projectEstimation);
        return copy;
    }
}
