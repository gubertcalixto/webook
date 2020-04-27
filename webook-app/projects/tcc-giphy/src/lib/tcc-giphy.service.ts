import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { GiphyItemListResult, GiphyItemResult, TCC_GIPHY_API_KEY } from './tcc-giphy.tokens';

@Injectable()
export class TccGiphyService {
  constructor(private http: HttpClient, @Inject(TCC_GIPHY_API_KEY) private apiKey: string) { }

  private getHttpParamWithBearer(): HttpParams {
    return new HttpParams().append('key', this.apiKey);
  }

  private appendParam(paramsObj: HttpParams, key: string, value: any): HttpParams {
    if (!value) {
      return paramsObj;
    }
    return paramsObj.append(key, value);
  }

  public search(
    query: string,
    searchType: 'gifs' | 'stickers' = 'gifs',
    limit?: number,
    offset?: number,
    rating?: string,
    lang?: string,
    randomId?: string
  ): Observable<GiphyItemListResult> {
    let params = this.getHttpParamWithBearer();
    params = this.appendParam(params, 'q', encodeURI(query));
    params = this.appendParam(params, 'limit', limit);
    params = this.appendParam(params, 'offset', offset);
    params = this.appendParam(params, 'rating', rating);
    params = this.appendParam(params, 'lang', lang);
    params = this.appendParam(params, 'random_id', randomId);

    const url = `http://api.giphy.com/v1/${searchType}/search`;
    return this.http.get<GiphyItemListResult>(url, { params });
  }

  public getById(id: string, randomId?: string): Observable<GiphyItemResult> {
    let params = this.getHttpParamWithBearer();
    params = this.appendParam(params, 'random_id', randomId);

    const url = `http://api.giphy.com/v1/gifs/${id}`;
    return this.http.get<GiphyItemResult>(url, { params });
  }

  // NO DOCS AND NOT WORKING
  // public getByIds(ids: string[], randomId?: string): Observable<GiphyItemResult> {
  //   let idsString = '';
  //   ids.forEach(id => idsString += `${id},`);
  //   if (idsString.endsWith(',')) {
  //     idsString = idsString.slice(0, idsString.length - 2);
  //   }
  //   const url = `http://api.giphy.com/v1/gifs`;
  //   return this.http.post<GiphyItemResult>(url, { ids: idsString }, { params: this.getHttpParamWithBearer()});
  // }
}
