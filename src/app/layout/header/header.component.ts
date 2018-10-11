import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title = 'CBGB';
  _open = false;
  token = null;
  constructor(private router: Router) { }

  ngOnInit() {
    this.token = localStorage.getItem('token');
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
  logout() {
    localStorage.setItem('token', null);
    this.token = null;
  }
}
