import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UserAddRequest } from './useraddrequest';
import { UserAddResponse } from './useraddresponse';
import { UserNotifyRequest } from './usernotifyrequest';
import { UserNotifyResponse } from './usernotifyresponse';
import { UserConfirmationRequest } from './userconfirmationrequest';
import { UserConfirmationResponse } from './userconfirmationresponse';
import { UserGetRequest } from './usergetrequest';
import { UserGetResponse } from './usergetresponse';
import { Observable } from 'rxjs';
import { Util } from 'app/util';
import { UserUpdateRequest } from './userupdaterequest';
import { UserUpdateResponse } from './userupdateresponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  util: Util = new Util();
  apiUrl = 'http://34.101.132.80:6080/user';
  //apiUrl = 'http://localhost:6080/user';

  constructor(private httpClient: HttpClient) { }

  postAdd(userAddRequest: UserAddRequest): Observable<UserAddResponse> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    userAddRequest.requestId = this.util.randomString(10);
    userAddRequest.requestDate = ((new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1)) + '000';

    return this.httpClient.post<UserAddResponse>(`${this.apiUrl}/postadd`, userAddRequest, { headers });
  }

  postNotify(userNotifyRequest: UserNotifyRequest): Observable<UserNotifyResponse> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    userNotifyRequest.requestId = this.util.randomString(10);
    userNotifyRequest.requestDate = ((new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1)) + '000';

    return this.httpClient.post<UserNotifyResponse>(`${this.apiUrl}/postnotify`, userNotifyRequest, { headers });
  }

  postConfirmation(userConfirmationRequest: UserConfirmationRequest): Observable<UserConfirmationResponse> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    userConfirmationRequest.requestId = this.util.randomString(10);
    userConfirmationRequest.requestDate = ((new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1)) + '000';

    return this.httpClient.post<UserConfirmationResponse>(`${this.apiUrl}/postconfirmation`, userConfirmationRequest, { headers });
  }

  getUser(userGetRequest: UserGetRequest): Observable<UserGetResponse> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    const params = new HttpParams()
      .set('requestId', this.util.randomString(10))
      .set('requestDate', ((new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1)) + '000')
      .set('email', localStorage.getItem('email'))
      .set('token', localStorage.getItem('token'));

    return this.httpClient.get<UserGetResponse>(`${this.apiUrl}/getuser`, { headers, params });
  }

  postUpdate(userUpdateRequest: UserUpdateRequest): Observable<UserUpdateResponse> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    userUpdateRequest.email = localStorage.getItem('email');
    userUpdateRequest.token = localStorage.getItem('token');
    userUpdateRequest.requestId = this.util.randomString(10);
    userUpdateRequest.requestDate = ((new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1)) + '000';

    return this.httpClient.put<UserUpdateResponse>(`${this.apiUrl}/putupdate`, userUpdateRequest, { headers });
  }
}
