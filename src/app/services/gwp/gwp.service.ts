import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Util } from 'app/util';
import { GetGwpListRequest } from './getgwplistrequest';
import { GetGwpListResponse } from './getgwplistresponse';
import { PostGwpAddRequest } from './postgwpaddrequest';
import { PostGwpAddResponse } from './postgwpaddresponse';
import { PostGwpEditRequest } from './postgwpeditrequest';
import { PostGwpEditResponse } from './postgwpeditresponse';
import { GetGwpRequest } from './getgwprequest';
import { GetGwpResponse } from './getgwpresponse';
import { PostGwpDeleteRequest } from './postgwpdeleterequest';
import { PostGwpDeleteResponse } from './postgwpdeleteresponse';
import { GetGwpProductRequest } from './getgwpproductrequest';
import { GetGwpProductResponse } from './getgwpproductresponse';
import { GetSellableProductRequest } from './getsellableproductrequest';
import { GetSellableProductResponse } from './getsellableproductresponse';

@Injectable({
  providedIn: 'root'
})
export class GwpService {
  util: Util = new Util();
  //apiUrl = 'http://34.101.132.80:5080/gwp';
  apiUrl = 'http://localhost:5080/gwp';

  constructor(private httpClient: HttpClient) { }

  getGwpList(brand: string, sku: string, item: string, length: number, pageSize: number, pageIndex: number, getGwpListRequest: GetGwpListRequest): Observable<GetGwpListResponse> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    const params = new HttpParams()
      .set('requestId', this.util.randomString(10))
      .set('requestDate', ((new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1)) + '000')
      .set('email', localStorage.getItem('email'))
      .set('token', localStorage.getItem('token'))
      .set('length', length.toString())
      .set('pageSize', pageSize.toString())
      .set('pageIndex', pageIndex.toString())
      .set('brand', brand)
      .set('sku', sku)
      .set('item', item)
      ;

    return this.httpClient.get<GetGwpListResponse>(`${this.apiUrl}/getgwplist`, { headers, params });
  }

  postGwpAdd(postGwpAddRequest: PostGwpAddRequest): Observable<PostGwpAddResponse> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    postGwpAddRequest.email = localStorage.getItem('email');
    postGwpAddRequest.token = localStorage.getItem('token');
    postGwpAddRequest.requestId = this.util.randomString(10);
    postGwpAddRequest.requestDate = ((new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1)) + '000';

    return this.httpClient.post<PostGwpAddResponse>(`${this.apiUrl}/postgwpadd`, postGwpAddRequest, { headers });
  }

  getGwpProduct(getGwpProductRequest: GetGwpProductRequest): Observable<GetGwpProductResponse> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    const params = new HttpParams()
      .set('requestId', this.util.randomString(10))
      .set('requestDate', ((new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1)) + '000')
      .set('email', localStorage.getItem('email'))
      .set('token', localStorage.getItem('token'));

    return this.httpClient.get<GetGwpProductResponse>(`${this.apiUrl}/getgwpproduct`, { headers, params });
  }

  getSellableProduct(getSellableProductRequest: GetSellableProductRequest): Observable<GetSellableProductResponse> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    const params = new HttpParams()
      .set('requestId', this.util.randomString(10))
      .set('requestDate', ((new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1)) + '000')
      .set('email', localStorage.getItem('email'))
      .set('token', localStorage.getItem('token'));

    return this.httpClient.get<GetSellableProductResponse>(`${this.apiUrl}/getsellableproduct`, { headers, params });
  }

  postGwpEdit(postGwpEditRequest: PostGwpEditRequest): Observable<PostGwpEditResponse> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    postGwpEditRequest.email = localStorage.getItem('email');
    postGwpEditRequest.token = localStorage.getItem('token');
    postGwpEditRequest.requestId = this.util.randomString(10);
    postGwpEditRequest.requestDate = ((new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1)) + '000';

    return this.httpClient.post<PostGwpEditResponse>(`${this.apiUrl}/postgwpedit`, postGwpEditRequest, { headers });
  }

  postGwpDelete(postGwpDeleteRequest: PostGwpDeleteRequest): Observable<PostGwpDeleteResponse> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    postGwpDeleteRequest.email = localStorage.getItem('email');
    postGwpDeleteRequest.token = localStorage.getItem('token');
    postGwpDeleteRequest.requestId = this.util.randomString(10);
    postGwpDeleteRequest.requestDate = ((new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1)) + '000';

    return this.httpClient.post<PostGwpDeleteResponse>(`${this.apiUrl}/postgwpdelete`, postGwpDeleteRequest, { headers });
  }

  getGwp(tbgId: string, getGwpRequest: GetGwpRequest): Observable<GetGwpResponse> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    const params = new HttpParams()
      .set('requestId', this.util.randomString(10))
      .set('requestDate', ((new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1)) + '000')
      .set('email', localStorage.getItem('email'))
      .set('token', localStorage.getItem('token'))
      .set('length', length.toString())
      .set('tbgId', tbgId)
      ;

    return this.httpClient.get<GetGwpResponse>(`${this.apiUrl}/getgwp`, { headers, params });
  }
}
