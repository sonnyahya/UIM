import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Util } from 'app/util';
import { PostUploadOrderRequest } from './postuploadorderrequest';
import { PostUploadOrderResponse } from './postuploadorderresponse';
import { GetOrderListRequest } from './getorderlistrequest';
import { GetOrderListResponse } from './getorderlistresponse';
import { PostOrderAddRequest } from './postorderaddrequest';
import { PostOrderAddResponse } from './postorderaddresponse';
import { PostOrderEditRequest } from './postordereditrequest';
import { PostOrderEditResponse } from './postordereditresponse';
import { GetOrderRequest } from './getorderrequest';
import { GetOrderResponse } from './getorderresponse';
import { PostOrderDeleteRequest } from './postorderdeleterequest';
import { PostOrderDeleteResponse } from './postorderdeleteresponse';
import { GetOrderPackListRequest } from './getorderpacklistrequest';
import { GetOrderPackListResponse } from './getorderpacklistresponse';
import { GetOrderPackRequest } from './getorderpackrequest';
import { GetOrderPackResponse } from './getorderpackresponse';
import { PostOrderPackingRequest } from './postorderpackingrequest';
import { PostOrderPackingResponse } from './postorderpackingresponse';
import { PostOrderQcRequest } from './postorderqcrequest';
import { PostOrderQcResponse } from './postorderqcresponse';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  util: Util = new Util();
  apiUrl = 'http://34.101.132.80:9080/order';
  //apiUrl = 'http://localhost:9080/order';

  constructor(private httpClient: HttpClient) { }  

  postUploadOrder(PostUploadOrderRequest: PostUploadOrderRequest, selectedFile: File): Observable<PostUploadOrderResponse> {
    const headers = new HttpHeaders()
      .set('asd', 'asd');

    const params = new HttpParams()
      .set('requestId', this.util.randomString(10))
      .set('requestDate', ((new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1)) + '000')
      .set('email', localStorage.getItem('email'))
      .set('token', localStorage.getItem('token'));

    const formData = new FormData();
    formData.append('file', selectedFile, selectedFile.name);

    return this.httpClient.post<PostUploadOrderResponse>(`${this.apiUrl}/postuploadorder`, formData, { headers, params });
  }

  getOrderList(brand: string, market: string, orderNo: string, sku: string, item: string, name: string, hp: string, awb: string, length: number, pageSize: number, pageIndex: number, getOrderListRequest: GetOrderListRequest): Observable<GetOrderListResponse> {
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
      .set('market', market)
      .set('orderNo', orderNo)
      .set('sku', sku)
      .set('item', item)
      .set('name', name)
      .set('hp', hp)
      .set('awb', awb)
      ;

    return this.httpClient.get<GetOrderListResponse>(`${this.apiUrl}/getorderlist`, { headers, params });
  }

  getOrderPackList(brand: string, market: string, orderNo: string, name: string, hp: string, awb: string, status: string, length: number, pageSize: number, pageIndex: number, getOrderListRequest: GetOrderPackListRequest): Observable<GetOrderPackListResponse> {
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
      .set('status', status)
      .set('brand', brand)
      .set('market', market)
      .set('orderNo', orderNo)
      .set('name', name)
      .set('hp', hp)
      .set('awb', awb)
      ;

    return this.httpClient.get<GetOrderPackListResponse>(`${this.apiUrl}/getorderpacklist`, { headers, params });
  }

  postOrderAdd(postOrderAddRequest: PostOrderAddRequest): Observable<PostOrderAddResponse> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    postOrderAddRequest.email = localStorage.getItem('email');
    postOrderAddRequest.token = localStorage.getItem('token');
    postOrderAddRequest.requestId = this.util.randomString(10);
    postOrderAddRequest.requestDate = ((new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1)) + '000';

    return this.httpClient.post<PostOrderAddResponse>(`${this.apiUrl}/postorderadd`, postOrderAddRequest, { headers });
  }

  postOrderPacking(postOrderPackingRequest: PostOrderPackingRequest): Observable<PostOrderPackingResponse> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    postOrderPackingRequest.email = localStorage.getItem('email');
    postOrderPackingRequest.token = localStorage.getItem('token');
    postOrderPackingRequest.requestId = this.util.randomString(10);
    postOrderPackingRequest.requestDate = ((new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1)) + '000';

    return this.httpClient.post<PostOrderPackingResponse>(`${this.apiUrl}/postorderpacking`, postOrderPackingRequest, { headers });
  }

  postOrderQc(postOrderQcRequest: PostOrderQcRequest): Observable<PostOrderQcResponse> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    postOrderQcRequest.email = localStorage.getItem('email');
    postOrderQcRequest.token = localStorage.getItem('token');
    postOrderQcRequest.requestId = this.util.randomString(10);
    postOrderQcRequest.requestDate = ((new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1)) + '000';

    return this.httpClient.post<PostOrderQcResponse>(`${this.apiUrl}/postorderqc`, postOrderQcRequest, { headers });
  }

  postOrderEdit(postOrderEditRequest: PostOrderEditRequest): Observable<PostOrderEditResponse> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    postOrderEditRequest.email = localStorage.getItem('email');
    postOrderEditRequest.token = localStorage.getItem('token');
    postOrderEditRequest.requestId = this.util.randomString(10);
    postOrderEditRequest.requestDate = ((new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1)) + '000';

    return this.httpClient.post<PostOrderEditResponse>(`${this.apiUrl}/postorderedit`, postOrderEditRequest, { headers });
  }

  postOrderDelete(postOrderDeleteRequest: PostOrderDeleteRequest): Observable<PostOrderDeleteResponse> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    postOrderDeleteRequest.email = localStorage.getItem('email');
    postOrderDeleteRequest.token = localStorage.getItem('token');
    postOrderDeleteRequest.requestId = this.util.randomString(10);
    postOrderDeleteRequest.requestDate = ((new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1)) + '000';

    return this.httpClient.post<PostOrderDeleteResponse>(`${this.apiUrl}/postorderdelete`, postOrderDeleteRequest, { headers });
  }

  getOrder(tboId: string, getOrderRequest: GetOrderRequest): Observable<GetOrderResponse> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    const params = new HttpParams()
      .set('requestId', this.util.randomString(10))
      .set('requestDate', ((new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1)) + '000')
      .set('email', localStorage.getItem('email'))
      .set('token', localStorage.getItem('token'))
      .set('length', length.toString())
      .set('tboId', tboId)
      ;

    return this.httpClient.get<GetOrderResponse>(`${this.apiUrl}/getorder`, { headers, params });
  }

  getOrderPack(tbopOrderNo: string, getOrderPackRequest: GetOrderPackRequest): Observable<GetOrderPackResponse> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    const params = new HttpParams()
      .set('requestId', this.util.randomString(10))
      .set('requestDate', ((new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1)) + '000')
      .set('email', localStorage.getItem('email'))
      .set('token', localStorage.getItem('token'))
      .set('length', length.toString())
      .set('tbopOrderNo', tbopOrderNo)
      ;

    return this.httpClient.get<GetOrderPackResponse>(`${this.apiUrl}/getorderpack`, { headers, params });
  }
}
