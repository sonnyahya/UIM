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
import { PostOrderPackingRequest } from 'app/services/order/postorderpackingrequest';
import { PostOrderPackingResponse } from 'app/services/order/postorderpackingresponse';
import { TbOrderPack } from 'app/services/order/tborderpack';
import { Util } from 'app/util';

@Component({
  selector: 'app-orderpack-packing',
  templateUrl: './orderpack-packing.component.html',
  styleUrls: ['./orderpack-packing.component.css']
})
export class OrderPackPackingComponent implements OnInit {
  clicked = false;
  util: Util = new Util();
  postOrderPackingRequest: PostOrderPackingRequest = new PostOrderPackingRequest();
  postOrderPackingResponse: PostOrderPackingResponse = new PostOrderPackingResponse();
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
    this.titleService.setTitle('PSM - Order Packing');

    this.getOrderPackResponse.tbOrderPack = new TbOrderPack();

    this.route.paramMap.subscribe(params => {
      this.postOrderPackingRequest.tbopOrderNo = params.get('tbopOrderNo') == null ? '0' : params.get('tbopOrderNo');

      this.getOrderPack(this.postOrderPackingRequest.tbopOrderNo);
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      document.getElementById('tbopdCodeScan0').focus();
    }, 200);
  }

  scan(i: number) {
    if (this.postOrderPackingRequest.lstTbOrderPackDetail[i].tbopdCode == this.postOrderPackingRequest.lstTbOrderPackDetail[i].tbopdCodeScan) {
      this.postOrderPackingRequest.lstTbOrderPackDetail[i].tbopdStatusScan = 'OK';      
    } else {
      this.postOrderPackingRequest.lstTbOrderPackDetail[i].tbopdStatusScan = 'NOT OK';
    }
    
    if (i < (this.postOrderPackingRequest.lstTbOrderPackDetail.length - 1)) {
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
        message: 'Are you sure, you want to finish Picking order no ' + this.postOrderPackingRequest.tbopOrderNo
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.orderService.postOrderPacking(this.postOrderPackingRequest)
          .subscribe(
            successResponse => {
              this.clicked = !this.clicked;

              this.postOrderPackingResponse = successResponse;

              this.util.showNotification('info', 'top', 'center', this.postOrderPackingResponse.message);

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

          this.postOrderPackingRequest.tbopOrderNo = this.getOrderPackResponse.tbOrderPack.tbopOrderNo;

          this.postOrderPackingRequest.lstTbOrderPackDetail = this.getOrderPackResponse.lstTbOrderPackDetail;
          this.postOrderPackingRequest.lstTbOrderPackDetail.forEach((element) => {
            element.tbopdItem = element.tbopdItem.length > 30 ? element.tbopdItem.substr(0, 30) + "..." : element.tbopdItem;
          });
          
          this.postOrderPackingRequest.lstTbOrder = this.getOrderPackResponse.lstTbOrder;
          this.postOrderPackingRequest.lstTbOrder.forEach((element) => {
            element.tboItem = element.tboItem.length > 30 ? element.tboItem.substr(0, 30) + "..." : element.tboItem;
          });
          this.postOrderPackingRequest.lstTbOrder.forEach((element) => {
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
