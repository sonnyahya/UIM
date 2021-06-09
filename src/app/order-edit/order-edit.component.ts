import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from 'app/confirm-dialog/confirm-dialog.component';
import { GetOrderRequest } from 'app/services/order/getorderrequest';
import { GetOrderResponse } from 'app/services/order/getorderresponse';
import { OrderService } from 'app/services/order/order.service';
import { PostOrderDeleteRequest } from 'app/services/order/postorderdeleterequest';
import { PostOrderDeleteResponse } from 'app/services/order/postorderdeleteresponse';
import { PostOrderEditRequest } from 'app/services/order/postordereditrequest';
import { PostOrderEditResponse } from 'app/services/order/postordereditresponse';
import { Util } from 'app/util';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css']
})
export class OrderEditComponent implements OnInit {
  clicked = false;
  util: Util = new Util();
  postOrderEditRequest: PostOrderEditRequest = new PostOrderEditRequest();
  postOrderEditResponse: PostOrderEditResponse = new PostOrderEditResponse();
  postOrderDeleteRequest: PostOrderDeleteRequest = new PostOrderDeleteRequest();
  postOrderDeleteResponse: PostOrderDeleteResponse = new PostOrderDeleteResponse();
  getOrderRequest: GetOrderRequest = new GetOrderRequest();
  getOrderResponse: GetOrderResponse = new GetOrderResponse();

  constructor(
    private router: Router,
    private titleService: Title,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.titleService.setTitle('PSM - Order Edit');

    this.route.paramMap.subscribe(params => {
      this.postOrderEditRequest.tboId = params.get('tboId') == null ? '0' : params.get('tboId');

      this.getOrder(this.postOrderEditRequest.tboId);
    });
  }

  save() {
    this.clicked = !this.clicked;

    this.orderService.postOrderEdit(this.postOrderEditRequest)
      .subscribe(
        successResponse => {
          this.clicked = !this.clicked;

          this.postOrderEditResponse = successResponse;

          this.util.showNotification('info', 'top', 'center', this.postOrderEditResponse.message);
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

  delete() {
    this.clicked = !this.clicked;

    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Delete',
        message: 'Are you sure, you want to delete Order No: ' + this.postOrderEditRequest.tboOrderNo
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.orderService.postOrderDelete(this.postOrderDeleteRequest)
          .subscribe(
            successResponse => {
              this.clicked = !this.clicked;

              this.postOrderDeleteResponse = successResponse;

              this.util.showNotification('info', 'top', 'center', this.postOrderDeleteResponse.message);

              this.router.navigate(['/order']);
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
      } else {
        this.clicked = !this.clicked;
      }
    });
  }

  getOrder(tboId: string) {
    this.clicked = !this.clicked;

    this.orderService.getOrder(tboId, this.getOrderRequest)
      .subscribe(
        successResponse => {
          this.clicked = !this.clicked;

          this.getOrderResponse = successResponse;

          this.postOrderEditRequest.tboId = this.getOrderResponse.tbOrder.tboId;
          this.postOrderEditRequest.tboAddress1 = this.getOrderResponse.tbOrder.tboAddress1;
          this.postOrderEditRequest.tboAddress2 = this.getOrderResponse.tbOrder.tboAddress2;
          this.postOrderEditRequest.tboAddress3 = this.getOrderResponse.tbOrder.tboAddress3;
          this.postOrderEditRequest.tboAddress4 = this.getOrderResponse.tbOrder.tboAddress4;
          this.postOrderEditRequest.tboAddress5 = this.getOrderResponse.tbOrder.tboAddress5;
          this.postOrderEditRequest.tboAwb = this.getOrderResponse.tbOrder.tboAwb;
          this.postOrderEditRequest.tboBrand = this.getOrderResponse.tbOrder.tboBrand;
          this.postOrderEditRequest.tboCode = this.getOrderResponse.tbOrder.tboCode;
          this.postOrderEditRequest.tboDiskonFromMarket = this.getOrderResponse.tbOrder.tboDiskonFromMarket;
          this.postOrderEditRequest.tboDiskonTotal = this.getOrderResponse.tbOrder.tboDiskonTotal;
          this.postOrderEditRequest.tboHp = this.getOrderResponse.tbOrder.tboHp;
          this.postOrderEditRequest.tboItem = this.getOrderResponse.tbOrder.tboItem;
          this.postOrderEditRequest.tboLoc = this.getOrderResponse.tbOrder.tboLoc;
          this.postOrderEditRequest.tboMarket = this.getOrderResponse.tbOrder.tboMarket;
          this.postOrderEditRequest.tboMaxSeq = this.getOrderResponse.tbOrder.tboMaxSeq;
          this.postOrderEditRequest.tboName = this.getOrderResponse.tbOrder.tboName;
          this.postOrderEditRequest.tboOrderNo = this.getOrderResponse.tbOrder.tboOrderNo;
          this.postOrderEditRequest.tboOrderSq = this.getOrderResponse.tbOrder.tboOrderSq;
          this.postOrderEditRequest.tboOrderSum = this.getOrderResponse.tbOrder.tboOrderSum;
          this.postOrderEditRequest.tboPaidTotal = this.getOrderResponse.tbOrder.tboPaidTotal;
          this.postOrderEditRequest.tboQcId = this.getOrderResponse.tbOrder.tboQcId;
          this.postOrderEditRequest.tboQty = this.getOrderResponse.tbOrder.tboQty;
          this.postOrderEditRequest.tboRow = this.getOrderResponse.tbOrder.tboRow;
          this.postOrderEditRequest.tboSeq = this.getOrderResponse.tbOrder.tboSeq;
          this.postOrderEditRequest.tboSku = this.getOrderResponse.tbOrder.tboSku;
          this.postOrderEditRequest.tboUnitPrice = this.getOrderResponse.tbOrder.tboUnitPrice;

          this.postOrderDeleteRequest.tboId = this.getOrderResponse.tbOrder.tboId;
        },
        errorResponse => {
          this.clicked = !this.clicked;

          if (errorResponse.error.status === 403) {
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
