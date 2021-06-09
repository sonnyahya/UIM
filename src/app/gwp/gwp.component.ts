import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { GetGwpListRequest } from 'app/services/gwp/getgwplistrequest';
import { GetGwpListResponse } from 'app/services/gwp/getgwplistresponse';
import { GwpService } from 'app/services/gwp/gwp.service';
import { Util } from 'app/util';

@Component({
  selector: 'app-gwp',
  templateUrl: './gwp.component.html',
  styleUrls: ['./gwp.component.css']
})
export class GwpComponent implements OnInit {
  clicked = false;
  util: Util = new Util();
  length = 100;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;
  pageDisabled: boolean = false;
  getGwpListRequest: GetGwpListRequest = new GetGwpListRequest();
  getGwpListResponse: GetGwpListResponse = new GetGwpListResponse();
  brand = "";
  sku = "";
  item = "";

  constructor(
    private router: Router,
    private titleService: Title,
    private gwpService: GwpService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('PSM - Gwp');
    this.getGwpList(null);
  }

  getGwpList(pageEvent: PageEvent) {
    this.clicked = !this.clicked;

    this.gwpService.getGwpList(this.brand, this.sku, this.item, pageEvent != null ? pageEvent.length : this.length, pageEvent != null ? pageEvent.pageSize : this.pageSize, pageEvent != null ? pageEvent.pageIndex : this.pageIndex, this.getGwpListRequest)
      .subscribe(
        successResponse => {
          this.clicked = !this.clicked;

          this.getGwpListResponse = successResponse;

          this.length = this.getGwpListResponse.length;

          if (pageEvent != null) {
            this.length = pageEvent.length;
            this.pageSize = pageEvent.pageSize;
            this.pageIndex = pageEvent.pageIndex;
          }          
        },
        errorResponse => {
          this.clicked = !this.clicked;
          
          this.getGwpListResponse = new GetGwpListResponse();
        }
      );
  }

  getPage(pageEvent: PageEvent) {
    this.getGwpList(pageEvent);
  }

  GwpAdd() {
    this.router.navigate(['/gwp-add']);
  }

}
