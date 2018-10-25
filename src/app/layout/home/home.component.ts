import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  imageUrlArray: any[] = [];
  constructor() { }

  ngOnInit() {
    this.imageUrlArray.push('assets/img/slide.jpg');
    this.imageUrlArray.push('assets/img/slide-m.jpg');
  }

}
