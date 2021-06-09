import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../services/auth/auth.service';
import { AuthGenerateRequest } from '../services/auth/authgeneraterequest';
import { AuthGenerateResponse } from '../services/auth/authgenerateresponse';
import { Util } from '../util';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  test: Date = new Date();
  clicked = false;
  util: Util = new Util();
  latitude: number;
  longitude: number;
  authGenerateRequest: AuthGenerateRequest = new AuthGenerateRequest();
  authGenerateResponse: AuthGenerateResponse = new AuthGenerateResponse();

  constructor(    
    private titleService: Title,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('PSM - Login');
    this.setCurrentLocation();
    this.authGenerateRequest.tbaEmail = 'achmad.amri@gmail.com';
    this.authGenerateRequest.tbaPassword = '123';
  }

  setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;

        this.util.setLonglat(this.longitude, this.latitude);
      });
    }
  }

  login() {
    this.clicked = !this.clicked;

    this.authGenerateRequest.tbaIdLogin = this.authGenerateRequest.tbaEmail;

    this.authService.postGenerate(this.authGenerateRequest)
      .subscribe(
        successResponse => {
          this.clicked = !this.clicked;

          this.authGenerateResponse = successResponse;

          this.util.setSession(this.authGenerateResponse);

          window.location.href = '/';
        },
        errorResponse => {
          this.clicked = !this.clicked;

          this.util.showNotification('danger', 'top', 'center', errorResponse.error.error + '<br>' + errorResponse.error.message);
        }
      );
  }

}
