import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CostCode } from './cost-code.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CostCode>;

@Injectable()
export class CostCodeService {

    private resourceUrl =  SERVER_API_URL + 'api/cost-codes';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/cost-codes';

    constructor(private http: HttpClient) { }

    create(costCode: CostCode): Observable<EntityResponseType> {
        const copy = this.convert(costCode);
        return this.http.post<CostCode>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(costCode: CostCode): Observable<EntityResponseType> {
        const copy = this.convert(costCode);
        return this.http.put<CostCode>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CostCode>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CostCode[]>> {
        const options = createRequestOption(req);
        return this.http.get<CostCode[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CostCode[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<CostCode[]>> {
        const options = createRequestOption(req);
        return this.http.get<CostCode[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CostCode[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CostCode = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CostCode[]>): HttpResponse<CostCode[]> {
        const jsonResponse: CostCode[] = res.body;
        const body: CostCode[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CostCode.
     */
    private convertItemFromServer(costCode: CostCode): CostCode {
        const copy: CostCode = Object.assign({}, costCode);
        return copy;
    }

    /**
     * Convert a CostCode to a JSON which can be sent to the server.
     */
    private convert(costCode: CostCode): CostCode {
        const copy: CostCode = Object.assign({}, costCode);
        return copy;
    }
}
