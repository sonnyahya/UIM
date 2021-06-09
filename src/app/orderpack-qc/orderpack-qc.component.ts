import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from 'app/confirm-dialog/confirm-dialog.component';
import { GetOrderPackRequest } from 'app/services/order/getorderpackrequest';
import { GetOrderPackResponse } from 'app/services/order/getorderpackresponse';
import { GetOrderRequest } from 'app/services/order/getorderrequest';
import { GetOrderResponse } from 'app/services/order/getorderresponse';
import { OrderService } from 'app/services/order/order.service';
import { PostOrderDeleteRequest } from 'app/services/order/postorderdeleterequest';
import { PostOrderDeleteResponse } from 'app/services/order/postorderdeleteresponse';
import { PostOrderQcRequest } from 'app/services/order/postorderqcrequest';
import { PostOrderQcResponse } from 'app/services/order/postorderqcresponse';
import { TbOrderPack } from 'app/services/order/tborderpack';
import { Util } from 'app/util';

@Component({
  selector: 'app-orderpack-qc',
  templateUrl: './orderpack-qc.component.html',
  styleUrls: ['./orderpack-qc.component.css']
})
export class OrderPackQcComponent implements OnInit {
  clicked = false;
  util: Util = new Util();
  postOrderQcRequest: PostOrderQcRequest = new PostOrderQcRequest();
  postOrderQcResponse: PostOrderQcResponse = new PostOrderQcResponse();
  // postOrderDeleteRequest: PostOrderDeleteRequest = new PostOrderDeleteRequest();
  // postOrderDeleteResponse: PostOrderDeleteResponse = new PostOrderDeleteResponse();
  getOrderPackRequest: GetOrderPackRequest = new GetOrderPackRequest();
  getOrderPackResponse: GetOrderPackResponse = new GetOrderPackResponse();

  constructor(
    private router: Router,    
    private titleService: Title,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.titleService.setTitle('PSM - Order Qc');

    this.getOrderPackResponse.tbOrderPack = new TbOrderPack();

    this.route.paramMap.subscribe(params => {
      this.postOrderQcRequest.tbopOrderNo = params.get('tbopOrderNo') == null ? '0' : params.get('tbopOrderNo');

      this.getOrderPack(this.postOrderQcRequest.tbopOrderNo);
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      document.getElementById('tbopdCodeScan0').focus();
    }, 200);
  }

  scan(i: number) {
    if (this.postOrderQcRequest.lstTbOrderPackDetail[i].tbopdCode == this.postOrderQcRequest.lstTbOrderPackDetail[i].tbopdCodeScan) {
      this.postOrderQcRequest.lstTbOrderPackDetail[i].tbopdStatusScan = this.postOrderQcRequest.lstTbOrderPackDetail[i].tbopdStatusScan + ' OK';
    } else {
      this.postOrderQcRequest.lstTbOrderPackDetail[i].tbopdStatusScan = this.postOrderQcRequest.lstTbOrderPackDetail[i].tbopdStatusScan + ' NOT OK';
    }
    
    if (i < (this.postOrderQcRequest.lstTbOrderPackDetail.length - 1)) {
      document.getElementById('tbopdCodeScan' + (i + 1)).focus();
    } else {
      this.save();
    }
  }

  save() {
    this.clicked = !this.clicked;

    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Picking',
        message: 'Are you sure, you want to finish QC order no ' + this.postOrderQcRequest.tbopOrderNo
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.orderService.postOrderQc(this.postOrderQcRequest)
          .subscribe(
            successResponse => {
              this.clicked = !this.clicked;

              this.postOrderQcResponse = successResponse;

              this.util.showNotification('info', 'top', 'center', this.postOrderQcResponse.message);

              this.router.navigate(['/orderpack']);
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

  getOrderPack(tbopOrderNo: string) {
    this.clicked = !this.clicked;

    this.orderService.getOrderPack(tbopOrderNo, this.getOrderPackRequest)
      .subscribe(
        successResponse => {
          this.clicked = !this.clicked;

          this.getOrderPackResponse = successResponse;

          this.postOrderQcRequest.tbopOrderNo = this.getOrderPackResponse.tbOrderPack.tbopOrderNo;

          this.postOrderQcRequest.lstTbOrderPackDetail = this.getOrderPackResponse.lstTbOrderPackDetail;
          this.postOrderQcRequest.lstTbOrderPackDetail.forEach((element) => {
            element.tbopdItem = element.tbopdItem.length > 30 ? element.tbopdItem.substr(0, 30) + "..." : element.tbopdItem;
          });
          
          this.postOrderQcRequest.lstTbOrder = this.getOrderPackResponse.lstTbOrder;
          this.postOrderQcRequest.lstTbOrder.forEach((element) => {
            element.tboItem = element.tboItem.length > 30 ? element.tboItem.substr(0, 30) + "..." : element.tboItem;
          });
          this.postOrderQcRequest.lstTbOrder.forEach((element) => {
            element.tboName = element.tboName.length > 30 ? element.tboName.substr(0, 30) + "..." : element.tboName;
          });

          // this.postOrderPackDeleteRequest.tboId = this.getOrderResponse.tbOrder.tboId;
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
    this.router.navigate(['/orderpack']);
  }
}
