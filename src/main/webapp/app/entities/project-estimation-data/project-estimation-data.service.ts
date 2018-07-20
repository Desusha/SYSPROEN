import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ProjectEstimationData } from './project-estimation-data.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ProjectEstimationData>;

@Injectable()
export class ProjectEstimationDataService {

    private resourceUrl =  SERVER_API_URL + 'api/project-estimation-data';

    constructor(private http: HttpClient) { }

    create(projectEstimationData: ProjectEstimationData): Observable<EntityResponseType> {
        const copy = this.convert(projectEstimationData);
        return this.http.post<ProjectEstimationData>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(projectEstimationData: ProjectEstimationData): Observable<EntityResponseType> {
        const copy = this.convert(projectEstimationData);
        return this.http.put<ProjectEstimationData>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ProjectEstimationData>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ProjectEstimationData[]>> {
        const options = createRequestOption(req);
        return this.http.get<ProjectEstimationData[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ProjectEstimationData[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ProjectEstimationData = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ProjectEstimationData[]>): HttpResponse<ProjectEstimationData[]> {
        const jsonResponse: ProjectEstimationData[] = res.body;
        const body: ProjectEstimationData[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ProjectEstimationData.
     */
    private convertItemFromServer(projectEstimationData: ProjectEstimationData): ProjectEstimationData {
        const copy: ProjectEstimationData = Object.assign({}, projectEstimationData);
        return copy;
    }

    /**
     * Convert a ProjectEstimationData to a JSON which can be sent to the server.
     */
    private convert(projectEstimationData: ProjectEstimationData): ProjectEstimationData {
        const copy: ProjectEstimationData = Object.assign({}, projectEstimationData);
        return copy;
    }
}
