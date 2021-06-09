import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { OrderService } from 'app/services/order/order.service';
import { PostUploadOrderRequest } from 'app/services/order/postuploadorderrequest';
import { PostUploadOrderResponse } from 'app/services/order/postuploadorderresponse';
import { Util } from 'app/util';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {
  clicked = false;
  util: Util = new Util();
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;
  pageDisabled: boolean = false;
  selectedFile: File;
  postUploadOrderRequest: PostUploadOrderRequest = new PostUploadOrderRequest();
  postUploadOrderResponse: PostUploadOrderResponse = new PostUploadOrderResponse();

  constructor(
    private router: Router,
    private titleService: Title,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('PSM - Upload File');
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  upload() {
    this.clicked = !this.clicked;

    if (this.selectedFile == null) {
      this.clicked = !this.clicked;

      this.util.showNotification('info', 'top', 'center', 'No file selected');      
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
  
      this.util.showNotification('info', 'top', 'center', 'Uploading ' + this.selectedFile.name);
  
      this.orderService.postUploadOrder(this.postUploadOrderRequest, this.selectedFile)
        .subscribe(
          successResponse => {
            this.clicked = !this.clicked;
  
            this.postUploadOrderResponse = successResponse;
  
            this.util.showNotification('info', 'top', 'center', this.postUploadOrderResponse.message);
          },
          errorResponse => {
            this.clicked = !this.clicked;
  
            this.util.showNotification('danger', 'top', 'center', errorResponse.error.message);
  
            if (errorResponse.error.status === 403) {
              this.router.navigate(['/user-login']);
            }
          }
        );
    }
  }

  back() {
    this.router.navigate(['/order']);
  }

}
