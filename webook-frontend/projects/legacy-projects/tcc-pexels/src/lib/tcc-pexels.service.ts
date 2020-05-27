import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PexelsPhoto, PexelsResult, TCC_PEXELS_API_KEY } from './tcc-pexels.tokens';

@Injectable()
export class TccPexelsService {
  constructor(private http: HttpClient, @Inject(TCC_PEXELS_API_KEY) private apiKey: string) { }

  private getHttpHeadersWithBearer(): HttpHeaders {
    return new HttpHeaders().set('Authorization', this.apiKey);
  }

  private appendParam(paramsObj: HttpParams, key: string, value: any): HttpParams {
    if (!value) {
      return paramsObj;
    }
    return paramsObj.append(key, value);
  }

  public search(query: string, limit?: number, page?: number): Observable<PexelsResult> {
    let params = new HttpParams();
    params = this.appendParam(params, 'query', encodeURI(query));
    params = this.appendParam(params, 'per_page', limit);
    params = this.appendParam(params, 'page', page);

    const url = `https://api.pexels.com/v1/search`;
    return this.http.get<PexelsResult>(url, { params, headers: this.getHttpHeadersWithBearer() });
  }

  public getById(id: string): Observable<PexelsPhoto> {
    const url = `https://api.pexels.com/v1/photos/${id}`;
    return this.http.get<PexelsPhoto>(url, { headers: this.getHttpHeadersWithBearer() });
  }
}
