import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  currentuser: any;
  constructor(private  conf: ConfigService) { }

  ngOnInit() {
    this.currentuser = this.conf.getUser();
  }
  order() {

  }
}
