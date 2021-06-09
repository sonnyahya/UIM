import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { GetOrderListRequest } from 'app/services/order/getorderlistrequest';
import { GetOrderListResponse } from 'app/services/order/getorderlistresponse';
import { OrderService } from 'app/services/order/order.service';
import { Util } from 'app/util';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  clicked = false;
  util: Util = new Util();
  length = 100;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;
  pageDisabled: boolean = false;
  getOrderListRequest: GetOrderListRequest = new GetOrderListRequest();
  getOrderListResponse: GetOrderListResponse = new GetOrderListResponse();
  brand = "";
  market = "";
  orderNo = "";
  sku = "";
  item = "";
  name = "";
  hp = "";
  awb = "";

  constructor(
    private router: Router,
    private titleService: Title,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('PSM - Order');
    this.getOrderList(null);
  }

  getOrderList(pageEvent: PageEvent) {
    this.clicked = !this.clicked;
    
    this.orderService.getOrderList(this.brand, this.market, this.orderNo, this.sku, this.item, this.name, this.hp, this.awb, pageEvent != null ? pageEvent.length : this.length, pageEvent != null ? pageEvent.pageSize : this.pageSize, pageEvent != null ? pageEvent.pageIndex : this.pageIndex, this.getOrderListRequest)
      .subscribe(
        successResponse => {
          this.clicked = !this.clicked;

          this.getOrderListResponse = successResponse;

          this.getOrderListResponse.lstTbOrder.forEach((element) => {
            element.tboItemShort = element.tboItem.length > 30 ? element.tboItem.substr(0, 30) + "..." : element.tboItem;
            element.tboNameShort = element.tboName.length > 30 ? element.tboName.substr(0, 30) + "..." : element.tboName;
          });

          this.length = this.getOrderListResponse.length;

          if (pageEvent != null) {
            this.length = pageEvent.length;
            this.pageSize = pageEvent.pageSize;
            this.pageIndex = pageEvent.pageIndex;
          }          
        },
        errorResponse => {
          this.clicked = !this.clicked;
          
          this.getOrderListResponse = new GetOrderListResponse();
        }
      );
  }

  getPage(pageEvent: PageEvent) {
    this.getOrderList(pageEvent);
  }

  uploadFile() {
    this.router.navigate(['/upload-file']);
  }

  orderAdd() {
    this.router.navigate(['/order-add']);
  }

}
