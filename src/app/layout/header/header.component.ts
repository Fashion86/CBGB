import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '../../services/config.service';
import { Subscription } from 'rxjs';
import { MessagingService } from '../../services/messaging.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title = 'CBGB';
  _open = false;
  token = null;
  products: any[] = [];
  totalCount: number;
  subscription: Subscription;
  isDesktopDevice = true;
  currenturl = '';
  message;
  constructor(private router: Router,
              private  conf: ConfigService,
              private deviceService: DeviceDetectorService,
              private msgService: MessagingService
  ) { }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    if (this.token) {
      const userid = this.token.split('.')[0];
      this.msgService.requestPermission(userid);
      this.msgService.receiveMessage();
      this.message = this.msgService.currentMessage;
    }
    this.currenturl = this.router.url;
    this.isDesktopDevice = this.deviceService.isDesktop();
    this.products = this.conf.getCart();
    this.setTotal(this.products);
    this.subscription = this.conf.getCartsync().subscribe(data => {
      this.products = data;
      this.setTotal(this.products);
    });
  }

  setTotal(products) {
    this.totalCount = 0;
    if (products) {
      products.forEach( p => {
        this.totalCount += p.count;
      });
    }
  }
  openSidebar() {
    // const sidevar = this.el.nativeElement.ge('mySidenav');
    // console.log(sidevar)
    document.getElementById('mySidenav').style.width = (window.screen.width) + 'px';
    document.body.classList.add('locked');
    this._open = !this._open;
  }

  closeSidebar() {
    document.getElementById('mySidenav').style.width = '0px';
    document.body.classList.remove('locked');
    this._open = !this._open;
  }
  filterDialog() {
    document.getElementById('products-options').style.opacity = '1';
    document.body.classList.add('locked');
    document.getElementById('products-options').classList.remove('locked');
  }
  openmsg() {

  }
  logout() {
    this.token = null;
    this.closeSidebar();
    this.conf.forget();
  }
}
