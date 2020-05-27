import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PixabayResult, TCC_PIXABAY_API_KEY } from './tcc-pixabay.tokens';

@Injectable()
export class TccPixabayService {
  constructor(private http: HttpClient, @Inject(TCC_PIXABAY_API_KEY) private apiKey: string) { }

  private getHttpParamWithBearer(): HttpParams {
    return new HttpParams().append('key', this.apiKey);
  }

  private appendParam(paramsObj: HttpParams, key: string, value: any): HttpParams {
    if (!value) {
      return paramsObj;
    }
    return paramsObj.append(key, value);
  }

  public search(query: string, limit?: number, page?: number, lang?: string, safesearch = true): Observable<PixabayResult> {
    let params = this.getHttpParamWithBearer();
    params = this.appendParam(params, 'q', encodeURI(query));
    params = this.appendParam(params, 'per_page', limit);
    params = this.appendParam(params, 'page', page);
    params = this.appendParam(params, 'lang', lang);
    params = this.appendParam(params, 'safesearch', safesearch);

    const url = `https://pixabay.com/api`;
    return this.http.get<PixabayResult>(url, { params });
  }

  public getById(id: string, lang?: string, safesearch = true): Observable<PixabayResult> {
    let params = this.getHttpParamWithBearer();
    params = this.appendParam(params, 'lang', lang);
    params = this.appendParam(params, 'safesearch', safesearch);

    const url = `https://pixabay.com/api`;
    params = this.appendParam(params, 'id', id);
    return this.http.get<PixabayResult>(url, { params });
  }
}
