import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthCheckRequest } from './authcheckrequest';
import { AuthCheckResponse } from './authcheckresponse';
import { AuthGenerateRequest } from './authgeneraterequest';
import { AuthGenerateResponse } from './authgenerateresponse';
import { Observable } from 'rxjs';
import { Util } from 'app/util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  util: Util = new Util();
  apiUrl = 'http://34.101.132.80:7080/auth';
  //apiUrl = 'http://localhost:7080/auth';

  constructor(private httpClient: HttpClient) { }

  postCheck(authCheckRequest: AuthCheckRequest): Observable<AuthCheckResponse> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    authCheckRequest.requestId = this.util.randomString(10);
    authCheckRequest.requestDate = ((new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1)) + '000';

    return this.httpClient.post<AuthCheckResponse>(`${this.apiUrl}/postcheck`, authCheckRequest, { headers });
  }

  postGenerate(authGenerateRequest: AuthGenerateRequest): Observable<AuthGenerateResponse> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');;

    authGenerateRequest.requestId = this.util.randomString(10);
    authGenerateRequest.requestDate = ((new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000))).toISOString().slice(0, -1)) + '000';

    return this.httpClient.post<AuthGenerateResponse>(`${this.apiUrl}/postgenerate`, authGenerateRequest, { headers });
  }
}
