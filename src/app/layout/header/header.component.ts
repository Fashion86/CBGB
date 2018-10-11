import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title = 'CBGB';
  _open = false;
  constructor(public el: ElementRef) { }

  ngOnInit() {
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
}
