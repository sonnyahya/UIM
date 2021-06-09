import { Routes } from '@angular/router';

import { AuthGuard } from '../../auth.guard';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserLoginComponent } from '../../user-login/user-login.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',                       component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'user-login',                      component: UserLoginComponent },
    { path: 'table-list',                      component: TableListComponent },
    { path: 'typography',                      component: TypographyComponent },
    { path: 'icons',                           component: IconsComponent },
    { path: 'maps',                            component: MapsComponent },
    { path: 'notifications',                   component: NotificationsComponent },
    { path: 'upgrade',                         component: UpgradeComponent },
];
