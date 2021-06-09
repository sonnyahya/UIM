import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { OrderService } from 'app/services/order/order.service';
import { PostOrderAddRequest } from 'app/services/order/postorderaddrequest';
import { PostOrderAddResponse } from 'app/services/order/postorderaddresponse';
import { Util } from 'app/util';

@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.css']
})
export class OrderAddComponent implements OnInit {
  clicked = false;
  util: Util = new Util();
  postOrderAddRequest: PostOrderAddRequest = new PostOrderAddRequest();
  postOrderAddResponse: PostOrderAddResponse = new PostOrderAddResponse();

  constructor(
    private router: Router,
    private titleService: Title,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('PSM - Order Add');
  }

  save() {
    this.clicked = !this.clicked;

    this.orderService.postOrderAdd(this.postOrderAddRequest)
      .subscribe(
        successResponse => {
          this.clicked = !this.clicked;

          this.postOrderAddResponse = successResponse;

          this.util.showNotification('info', 'top', 'center', this.postOrderAddResponse.message);

          this.postOrderAddRequest = new PostOrderAddRequest();
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
    this.router.navigate(['/order']);
  }
}
