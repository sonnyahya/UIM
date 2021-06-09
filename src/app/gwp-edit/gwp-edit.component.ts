import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from 'app/confirm-dialog/confirm-dialog.component';
import { GetGwpRequest } from 'app/services/gwp/getgwprequest';
import { GetGwpResponse } from 'app/services/gwp/getgwpresponse';
import { GwpService } from 'app/services/gwp/gwp.service';
import { PostGwpDeleteRequest } from 'app/services/gwp/postgwpdeleterequest';
import { PostGwpDeleteResponse } from 'app/services/gwp/postgwpdeleteresponse';
import { PostGwpEditRequest } from 'app/services/gwp/postgwpeditrequest';
import { PostGwpEditResponse } from 'app/services/gwp/postgwpeditresponse';
import { Util } from 'app/util';
import { GetGwpProductRequest } from 'app/services/gwp/getgwpproductrequest';
import { GetGwpProductResponse } from 'app/services/gwp/getgwpproductresponse';
import { GetSellableProductRequest } from 'app/services/gwp/getsellableproductrequest';
import { GetSellableProductResponse } from 'app/services/gwp/getsellableproductresponse';
import { TbGwpSku } from 'app/services/gwp/tbgwpsku';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-gwp-edit',
  templateUrl: './gwp-edit.component.html',
  styleUrls: ['./gwp-edit.component.css']
})
export class GwpEditComponent implements OnInit {
  clicked = false;
  util: Util = new Util();
  postGwpEditRequest: PostGwpEditRequest = new PostGwpEditRequest();
  postGwpEditResponse: PostGwpEditResponse = new PostGwpEditResponse();
  postGwpDeleteRequest: PostGwpDeleteRequest = new PostGwpDeleteRequest();
  postGwpDeleteResponse: PostGwpDeleteResponse = new PostGwpDeleteResponse();
  getGwpRequest: GetGwpRequest = new GetGwpRequest();
  getGwpResponse: GetGwpResponse = new GetGwpResponse();
  getGwpProductRequest: GetGwpProductRequest = new GetGwpProductRequest();
  getGwpProductResponse: GetGwpProductResponse = new GetGwpProductResponse();
  getSellableProductRequest: GetSellableProductRequest = new GetGwpProductRequest();
  getSellableProductResponse: GetSellableProductResponse = new GetGwpProductResponse();  

  constructor(
    private router: Router,
    private titleService: Title,
    private route: ActivatedRoute,
    private gwpService: GwpService,
    private dialog: MatDialog
  ) { }

  addFieldValue() {
    this.postGwpEditRequest.tbGwpSku.push(new TbGwpSku())
  }

  deleteFieldValue(index) {
    this.postGwpEditRequest.tbGwpSku.splice(index, 1);
  }

  ngOnInit() {
    this.titleService.setTitle('PSM - Gwp Edit');

    this.route.paramMap.subscribe(params => {
      this.postGwpEditRequest.tbgId = params.get('tbgId') == null ? '0' : params.get('tbgId');

      this.getGwp(this.postGwpEditRequest.tbgId);
    });
  }

  save() {
    this.clicked = !this.clicked;

    this.gwpService.postGwpEdit(this.postGwpEditRequest)
      .subscribe(
        successResponse => {
          this.clicked = !this.clicked;

          this.postGwpEditResponse = successResponse;

          this.util.showNotification('info', 'top', 'center', this.postGwpEditResponse.message);
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
        message: 'Are you sure, you want to delete Sku : ' + this.postGwpEditRequest.tbgSku
      }
    });
    
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.gwpService.postGwpDelete(this.postGwpDeleteRequest)
          .subscribe(
            successResponse => {
              this.clicked = !this.clicked;

              this.postGwpDeleteResponse = successResponse;

              this.util.showNotification('info', 'top', 'center', this.postGwpDeleteResponse.message);

              this.router.navigate(['/gwp']);
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

  getGwp(tbpId: string) {
    this.clicked = !this.clicked;

    this.gwpService.getGwp(tbpId, this.getGwpRequest)
      .subscribe(
        successResponse => {
          this.clicked = !this.clicked;

          this.getGwpResponse = successResponse;

          this.postGwpEditRequest.tbgId = this.getGwpResponse.tbGwp.tbgId;          
          this.postGwpEditRequest.tbgSku = this.getGwpResponse.tbGwp.tbgSku;

          this.postGwpEditRequest.tbGwpSku = this.getGwpResponse.lstTbGwpSku;

          this.postGwpDeleteRequest.tbgId = this.getGwpResponse.tbGwp.tbgId;

          this.gwpService.getGwpProduct(this.getGwpProductRequest)
            .subscribe(
              successResponse => {
                this.getGwpProductResponse = successResponse;
              },
              errorResponse => {
                this.util.showNotification('danger', 'top', 'center', errorResponse.error.error + '<br>' + errorResponse.error.message);
                this.router.navigate(['/user-login']);
              }
            );
      
          this.gwpService.getSellableProduct(this.getSellableProductRequest)
            .subscribe(
              successResponse => {
                this.getSellableProductResponse = successResponse;
              },
              errorResponse => {
                this.util.showNotification('danger', 'top', 'center', errorResponse.error.error + '<br>' + errorResponse.error.message);
                this.router.navigate(['/user-login']);
              }
            );
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
    this.router.navigate(['/gwp']);
  }
}
