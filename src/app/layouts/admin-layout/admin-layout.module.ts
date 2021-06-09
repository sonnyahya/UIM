import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { UserLoginComponent } from '../../user-login/user-login.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatPaginatorModule } from '@angular/material/paginator';
import { OrderComponent } from 'app/order/order.component';
import { UploadFileComponent } from 'app/upload-file/upload-file.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OrderAddComponent } from 'app/order-add/order-add.component';
import { OrderEditComponent } from 'app/order-edit/order-edit.component';
import { ProductComponent } from 'app/product/product.component';
import { ProductAddComponent } from 'app/product-add/product-add.component';
import { ProductEditComponent } from 'app/product-edit/product-edit.component';
import { GwpComponent } from 'app/gwp/gwp.component';
import { GwpAddComponent } from 'app/gwp-add/gwp-add.component';
import { GwpEditComponent } from 'app/gwp-edit/gwp-edit.component';
import { OrderPackComponent } from 'app/orderpack/orderpack.component';
import { OrderPackPackingComponent } from 'app/orderpack-packing/orderpack-packing.component';
import { AutoFocusDirective } from 'app/autofocus.directive';
import { OrderPackQcComponent } from 'app/orderpack-qc/orderpack-qc.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    OrderAddComponent,
    ProductAddComponent,
    GwpAddComponent,
    GwpEditComponent,
    OrderEditComponent,
    ProductEditComponent,
    OrderComponent,
    OrderPackComponent,
    OrderPackPackingComponent,
    OrderPackQcComponent,
    ProductComponent,
    GwpComponent,
    UploadFileComponent,
    UserLoginComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    AutoFocusDirective,
  ]
})

export class AdminLayoutModule {}
