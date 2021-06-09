import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { GetProductListRequest } from 'app/services/product/getproductlistrequest';
import { GetProductListResponse } from 'app/services/product/getproductlistresponse';
import { ProductService } from 'app/services/product/product.service';
import { Util } from 'app/util';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  clicked = false;
  util: Util = new Util();
  length = 100;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;
  pageDisabled: boolean = false;
  getProductListRequest: GetProductListRequest = new GetProductListRequest();
  getProductListResponse: GetProductListResponse = new GetProductListResponse();
  brand = "";
  sku = "";
  item = "";
  code = "";
  type = "";

  constructor(
    private router: Router,
    private titleService: Title,
    private ProductService: ProductService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('PSM - Product');
    this.getProductList(null);
  }

  getProductList(pageEvent: PageEvent) {
    this.clicked = !this.clicked;

    this.ProductService.getProductList(this.brand, this.sku, this.item, this.code, this.type, pageEvent != null ? pageEvent.length : this.length, pageEvent != null ? pageEvent.pageSize : this.pageSize, pageEvent != null ? pageEvent.pageIndex : this.pageIndex, this.getProductListRequest)
      .subscribe(
        successResponse => {
          this.clicked = !this.clicked;

          this.getProductListResponse = successResponse;

          this.length = this.getProductListResponse.length;

          if (pageEvent != null) {
            this.length = pageEvent.length;
            this.pageSize = pageEvent.pageSize;
            this.pageIndex = pageEvent.pageIndex;
          }          
        },
        errorResponse => {
          this.length = 0;

          this.clicked = !this.clicked;
          
          this.getProductListResponse = new GetProductListResponse();
        }
      );
  }

  getPage(pageEvent: PageEvent) {
    this.getProductList(pageEvent);
  }

  productAdd() {
    this.router.navigate(['/product-add']);
  }

}
