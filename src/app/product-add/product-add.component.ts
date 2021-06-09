import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'app/services/product/product.service';
import { PostProductAddRequest } from 'app/services/product/postproductaddrequest';
import { PostProductAddResponse } from 'app/services/product/postproductaddresponse';
import { GetBrandRequest } from 'app/services/product/getbrandrequest';
import { GetBrandResponse } from 'app/services/product/getbrandresponse';
import { Util } from 'app/util';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  clicked = false;
  util: Util = new Util();
  postProductAddRequest: PostProductAddRequest = new PostProductAddRequest();
  postProductAddResponse: PostProductAddResponse = new PostProductAddResponse();
  getBrandRequest: GetBrandRequest = new GetBrandRequest();
  getBrandResponse: GetBrandResponse = new GetBrandResponse();

  constructor(
    private router: Router,
    private titleService: Title,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('PSM - Product Add');

    this.productService.getBrand(this.getBrandRequest)
      .subscribe(
        successResponse => {
          this.getBrandResponse = successResponse;
        },
        errorResponse => {
          this.util.showNotification('danger', 'top', 'center', errorResponse.error.error + '<br>' + errorResponse.error.message);
          this.router.navigate(['/user-login']);
        }
      );
  }

  save() {
    this.clicked = !this.clicked;

    this.productService.postProductAdd(this.postProductAddRequest)
      .subscribe(
        successResponse => {
          this.clicked = !this.clicked;

          this.postProductAddResponse = successResponse;

          this.util.showNotification('info', 'top', 'center', this.postProductAddResponse.message);

          this.postProductAddRequest = new PostProductAddRequest();
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
    this.router.navigate(['/product']);
  }
}
