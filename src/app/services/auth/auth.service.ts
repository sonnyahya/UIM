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

  constructor(private httpClient: HttpClient) { }

  postGenerate(authGenerateRequest: AuthGenerateRequest): Observable<AuthGenerateResponse> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    authGenerateRequest.userId = 'I816';
    authGenerateRequest.password = 'eyJpdiI6IjQzK2N6NXpxVTFiTEJ0ajR0WVwva2tnPT0iLCJ2YWx1ZSI6InlyeEU4M1BibHNNTXg1XC9xU3NwS3NBUjBMXC9jdUtwejBQc0hoQU1WdnB0ST0iLCJtYWMiOiIzNDdiY2Q5MGFmZjViNGY0YWVmNDNiNzNkN2EyZmMwYzc0NzdlMjUzODRmMDlkOGM4ZDVlZWVhMGY0MGNlODA0In0=';
    authGenerateRequest.appid = '148';

    return this.httpClient.post<AuthGenerateResponse>('http://10.6.226.199:3000/api/login', authGenerateRequest, { headers });
  }
}
