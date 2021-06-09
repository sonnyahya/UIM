import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from 'app/confirm-dialog/confirm-dialog.component';
import { GetProductRequest } from 'app/services/product/getproductrequest';
import { GetProductResponse } from 'app/services/product/getproductresponse';
import { ProductService } from 'app/services/product/product.service';
import { PostProductDeleteRequest } from 'app/services/product/postproductdeleterequest';
import { PostProductDeleteResponse } from 'app/services/product/postproductdeleteresponse';
import { PostProductEditRequest } from 'app/services/product/postproducteditrequest';
import { PostProductEditResponse } from 'app/services/product/postproducteditresponse';
import { Util } from 'app/util';
import { GetBrandRequest } from 'app/services/product/getbrandrequest';
import { GetBrandResponse } from 'app/services/product/getbrandresponse';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  clicked = false;
  util: Util = new Util();
  postProductEditRequest: PostProductEditRequest = new PostProductEditRequest();
  postProductEditResponse: PostProductEditResponse = new PostProductEditResponse();
  postProductDeleteRequest: PostProductDeleteRequest = new PostProductDeleteRequest();
  postProductDeleteResponse: PostProductDeleteResponse = new PostProductDeleteResponse();
  getProductRequest: GetProductRequest = new GetProductRequest();
  getProductResponse: GetProductResponse = new GetProductResponse();
  getBrandRequest: GetBrandRequest = new GetBrandRequest();
  getBrandResponse: GetBrandResponse = new GetBrandResponse();

  constructor(
    private router: Router,
    private titleService: Title,
    private route: ActivatedRoute,
    private productService: ProductService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.titleService.setTitle('PSM - Product Edit');

    this.route.paramMap.subscribe(params => {
      this.postProductEditRequest.tbpId = params.get('tbpId') == null ? '0' : params.get('tbpId');

      this.getProduct(this.postProductEditRequest.tbpId);
    });
  }

  save() {
    this.clicked = !this.clicked;

    this.productService.postProductEdit(this.postProductEditRequest)
      .subscribe(
        successResponse => {
          this.clicked = !this.clicked;

          this.postProductEditResponse = successResponse;

          this.util.showNotification('info', 'top', 'center', this.postProductEditResponse.message);
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
        message: 'Are you sure, you want to delete Product : ' + this.postProductEditRequest.tbpItem + ' Sku : ' + this.postProductEditRequest.tbpSku
      }
    });
    
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.productService.postProductDelete(this.postProductDeleteRequest)
          .subscribe(
            successResponse => {
              this.clicked = !this.clicked;

              this.postProductDeleteResponse = successResponse;

              this.util.showNotification('info', 'top', 'center', this.postProductDeleteResponse.message);

              this.router.navigate(['/product']);
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

  getProduct(tbpId: string) {
    this.clicked = !this.clicked;

    this.productService.getProduct(tbpId, this.getProductRequest)
      .subscribe(
        successResponse => {
          this.clicked = !this.clicked;

          this.getProductResponse = successResponse;

          this.postProductEditRequest.tbpId = this.getProductResponse.tbProduct.tbpId;
          this.postProductEditRequest.tbbBrandId = this.getProductResponse.tbProduct.tbbBrandId;
          this.postProductEditRequest.tbpSku = this.getProductResponse.tbProduct.tbpSku;
          this.postProductEditRequest.tbpItem = this.getProductResponse.tbProduct.tbpItem;
          this.postProductEditRequest.tbpCode = this.getProductResponse.tbProduct.tbpCode;
          this.postProductEditRequest.tbpLoc = this.getProductResponse.tbProduct.tbpLoc;
          this.postProductEditRequest.tbpQty = this.getProductResponse.tbProduct.tbpQty;
          this.postProductEditRequest.tbpUnitPrice = this.getProductResponse.tbProduct.tbpUnitPrice;
          this.postProductEditRequest.tbpType = this.getProductResponse.tbProduct.tbpType;

          this.postProductDeleteRequest.tbpId = this.getProductResponse.tbProduct.tbpId;

          this.productService.getBrand(this.getBrandRequest)
            .subscribe(
              successResponse => {
                this.getBrandResponse = successResponse;
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
    this.router.navigate(['/product']);
  }
}
