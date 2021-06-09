import { Routes } from '@angular/router';

import { AuthGuard } from '../../auth.guard';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { UserLoginComponent } from '../../user-login/user-login.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { OrderComponent } from 'app/order/order.component';
import { UploadFileComponent } from 'app/upload-file/upload-file.component';
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
import { OrderPackQcComponent } from 'app/orderpack-qc/orderpack-qc.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',                       component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'user-profile',                    component: UserProfileComponent, canActivate: [AuthGuard] },
    { path: 'order-edit/:tboId',               component: OrderEditComponent, canActivate: [AuthGuard] },
    { path: 'order-edit',                      component: OrderEditComponent, canActivate: [AuthGuard] },
    { path: 'product-edit/:tbpId',             component: ProductEditComponent, canActivate: [AuthGuard] },
    { path: 'product-edit',                    component: ProductEditComponent, canActivate: [AuthGuard] },
    { path: 'order-add',                       component: OrderAddComponent, canActivate: [AuthGuard] },
    { path: 'product-add',                     component: ProductAddComponent, canActivate: [AuthGuard] },
    { path: 'order',                           component: OrderComponent, canActivate: [AuthGuard] },
    { path: 'orderpack',                       component: OrderPackComponent, canActivate: [AuthGuard] },    
    { path: 'orderpack-packing/:tbopOrderNo',  component: OrderPackPackingComponent, canActivate: [AuthGuard] },
    { path: 'orderpack-packing',               component: OrderPackPackingComponent, canActivate: [AuthGuard] },
    { path: 'orderpack-qc/:tbopOrderNo',       component: OrderPackQcComponent, canActivate: [AuthGuard] },
    { path: 'orderpack-qc',                    component: OrderPackQcComponent, canActivate: [AuthGuard] },
    { path: 'product',                         component: ProductComponent, canActivate: [AuthGuard] },
    { path: 'gwp',                             component: GwpComponent, canActivate: [AuthGuard] },
    { path: 'gwp-add',                         component: GwpAddComponent, canActivate: [AuthGuard] },
    { path: 'gwp-edit/:tbgId',                 component: GwpEditComponent, canActivate: [AuthGuard] },
    { path: 'gwp-edit',                        component: GwpEditComponent, canActivate: [AuthGuard] },
    { path: 'upload-file',                     component: UploadFileComponent, canActivate: [AuthGuard] },
    { path: 'user-login',                      component: UserLoginComponent },
    { path: 'table-list',                      component: TableListComponent },
    { path: 'typography',                      component: TypographyComponent },
    { path: 'icons',                           component: IconsComponent },
    { path: 'maps',                            component: MapsComponent },
    { path: 'notifications',                   component: NotificationsComponent },
    { path: 'upgrade',                         component: UpgradeComponent },
];
