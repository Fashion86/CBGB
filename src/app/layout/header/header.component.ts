import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '../../services/config.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title = 'CBGB';
  _open = false;
  token = null;
  usercart: any[] = [];
  subscription: Subscription;
  constructor(private router: Router,
              private  conf: ConfigService) { }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.usercart = this.conf.getCart();
    this.subscription = this.conf.getCartsync().subscribe(data => {
      this.usercart = data;
    });
  }

  openSidebar() {
    // const sidevar = this.el.nativeElement.ge('mySidenav');
    // console.log(sidevar)
    document.getElementById('mySidenav').style.width = (window.screen.width) + 'px';
    // document.body.classList.add('locked');
    this._open = !this._open;
  }

  closeSidebar() {
    document.getElementById('mySidenav').style.width = '0px';
    // document.body.classList.remove('locked');
    this._open = !this._open;
  }
  logout() {
    this.token = null;
    this.closeSidebar();
    this.conf.forget();
  }
}
