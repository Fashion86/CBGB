import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '../../services/config.service';
import { Subscription } from 'rxjs';
// import { MessagingService } from '../../services/messaging.service';

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
  message;
  constructor(private router: Router,
              private  conf: ConfigService
              // private messagingService: MessagingService
  ) { }

  ngOnInit() {
    // const userId = 'user001';
    // this.messagingService.requestPermission(userId);
    // this.messagingService.receiveMessage();
    // this.message = this.messagingService.currentMessage;


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
