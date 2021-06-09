import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GwpService } from 'app/services/gwp/gwp.service';
import { PostGwpAddRequest } from 'app/services/gwp/postgwpaddrequest';
import { PostGwpAddResponse } from 'app/services/gwp/postgwpaddresponse';
import { GetGwpProductRequest } from 'app/services/gwp/getgwpproductrequest';
import { GetGwpProductResponse } from 'app/services/gwp/getgwpproductresponse';
import { Util } from 'app/util';
import { GetSellableProductRequest } from 'app/services/gwp/getsellableproductrequest';
import { GetSellableProductResponse } from 'app/services/gwp/getsellableproductresponse';
import { TbGwpSku } from 'app/services/gwp/tbgwpsku';
import { Title } from '@angular/platform-browser';

export interface Country {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-gwp-add',
  templateUrl: './gwp-add.component.html',
  styleUrls: ['./gwp-add.component.css']
})
export class GwpAddComponent implements OnInit {
  clicked = false;
  util: Util = new Util();
  postGwpAddRequest: PostGwpAddRequest = new PostGwpAddRequest();
  postGwpAddResponse: PostGwpAddResponse = new PostGwpAddResponse();
  getGwpProductRequest: GetGwpProductRequest = new GetGwpProductRequest();
  getGwpProductResponse: GetGwpProductResponse = new GetGwpProductResponse();
  getSellableProductRequest: GetSellableProductRequest = new GetGwpProductRequest();
  getSellableProductResponse: GetSellableProductResponse = new GetGwpProductResponse();  

  constructor(
    private router: Router,
    private titleService: Title,
    private gwpService: GwpService
  ) { }

  addFieldValue() {
    this.postGwpAddRequest.tbGwpSku.push(new TbGwpSku())
  }

  deleteFieldValue(index) {
    this.postGwpAddRequest.tbGwpSku.splice(index, 1);
  }

  ngOnInit() {
    this.titleService.setTitle('PSM - Gwp Add');

    this.gwpService.getGwpProduct(this.getGwpProductRequest)
      .subscribe(
        successResponse => {
          this.getGwpProductResponse = successResponse;
        },
        errorResponse => {
          this.util.showNotification('danger', 'top', 'center', errorResponse.error.error + '<br>' + errorResponse.error.message);
          this.router.navigate(['/user-login']);
        }
      );
      
    this.gwpService.getSellableProduct(this.getSellableProductRequest)
      .subscribe(
        successResponse => {
          this.getSellableProductResponse = successResponse;
        },
        errorResponse => {
          this.util.showNotification('danger', 'top', 'center', errorResponse.error.error + '<br>' + errorResponse.error.message);
          this.router.navigate(['/user-login']);
        }
      );
  }

  save() {
    this.clicked = !this.clicked;

    this.gwpService.postGwpAdd(this.postGwpAddRequest)
      .subscribe(
        successResponse => {
          this.clicked = !this.clicked;

          this.postGwpAddResponse = successResponse;

          this.util.showNotification('info', 'top', 'center', this.postGwpAddResponse.message);

          this.postGwpAddRequest = new PostGwpAddRequest();
        },
        errorResponse => {
          this.clicked = !this.clicked;

          if (errorResponse.error.status === 400) {
            let message = "";

            for (let i = 0; i < errorResponse.error.errors.length; i++) {
              message = message + errorResponse.error.errors[i].defaultMessage + "<br>";
            }           

            this.util.showNotification('danger', 'top', 'center', message);
          } else if (errorResponse.error.status === 403) {
            this.util.showNotification('danger', 'top', 'center', errorResponse.error.error + '<br>' + errorResponse.error.message);

            this.router.navigate(['/user-login']);
          } else {
            this.util.showNotification('danger', 'top', 'center', errorResponse.error.message);
          }
        }
      );
  }

  back() {
    this.router.navigate(['/gwp']);
  }
}
