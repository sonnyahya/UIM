import { Component, OnInit } from '@angular/core';
import { Util } from 'app/util';
import * as moment from 'moment';

declare const $: any;

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menu = false;
  util: Util = new Util();
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);

    if (this.isLoggedIn()) this.menu = true;
  }

  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  logout() {
    this.util.logout();

    window.location.href = '/';
  }

  isLoggedIn() {
    const day = moment.unix(Number(localStorage.getItem('exp')));
    return moment().isBefore(day);
  }
}
