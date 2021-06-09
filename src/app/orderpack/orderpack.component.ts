import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { GetOrderPackListRequest } from 'app/services/order/getorderpacklistrequest';
import { GetOrderPackListResponse } from 'app/services/order/getorderpacklistresponse';
import { OrderService } from 'app/services/order/order.service';
import { Util } from 'app/util';

@Component({
  selector: 'app-orderpack',
  templateUrl: './orderpack.component.html',
  styleUrls: ['./orderpack.component.css']
})
export class OrderPackComponent implements OnInit {
  clicked = false;
  util: Util = new Util();
  length = 100;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;
  pageDisabled: boolean = false;
  getOrderPackListRequest: GetOrderPackListRequest = new GetOrderPackListRequest();
  getOrderPackListResponse: GetOrderPackListResponse = new GetOrderPackListResponse();
  brand = "";
  market = "";
  orderNo = "";
  sku = "";
  item = "";
  name = "";
  hp = "";
  awb = "";
  status = "";

  constructor(
    private router: Router,
    private titleService: Title,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('PSM - Order Pack');
    this.getOrderPackList(null);
  }

  getOrderPackList(pageEvent: PageEvent) {
    this.clicked = !this.clicked;
    
    this.orderService.getOrderPackList(this.brand, this.market, this.orderNo, this.name, this.hp, this.awb, this.status, pageEvent != null ? pageEvent.length : this.length, pageEvent != null ? pageEvent.pageSize : this.pageSize, pageEvent != null ? pageEvent.pageIndex : this.pageIndex, this.getOrderPackListRequest)
      .subscribe(
        successResponse => {
          this.clicked = !this.clicked;

          this.getOrderPackListResponse = successResponse;

          this.getOrderPackListResponse.lstViewOrderPack.forEach((element) => {
            element.tboNameShort = element.tboName.length > 30 ? element.tboName.substr(0, 30) + "..." : element.tboName;
          });

          this.length = this.getOrderPackListResponse.length;

          if (pageEvent != null) {
            this.length = pageEvent.length;
            this.pageSize = pageEvent.pageSize;
            this.pageIndex = pageEvent.pageIndex;
          }          
        },
        errorResponse => {
          this.length = 0;

          this.clicked = !this.clicked;
          
          this.getOrderPackListResponse = new GetOrderPackListResponse();
        }
      );
  }

  getPage(pageEvent: PageEvent) {
    this.getOrderPackList(pageEvent);
  }

  uploadFile() {
    this.router.navigate(['/upload-file']);
  }

  orderAdd() {
    this.router.navigate(['/order-add']);
  }

}
