import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { Ordencompra } from '../../model/ordencompra';
import { Item } from '../../model/item';
import * as _ from 'lodash';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  currentuser: any;
  cartproducts: any[] = [];
  totalprice: number;
  orderdata: Ordencompra;
  items: Item[] = [];
  subscription: Subscription;
  constructor(private  conf: ConfigService,
              public modalService: NgxSmartModalService,
              private alerts: ToastrService,
              private router: Router) { }

  ngOnInit() {
    this.currentuser = this.conf.getUser();
    this.cartproducts = this.conf.getCart();
    this.setTotal();
    this.orderdata = new Ordencompra();
  }
  setTotal() {
    this.totalprice = 0.0;
    this.cartproducts.forEach( p => {
      this.totalprice = this.totalprice + p.precio_unidad;
    });
  }
  remove(product) {
    this.cartproducts = _.filter(this.cartproducts, p => p !== product);
    this.setTotal();
    this.conf.updateCart(this.cartproducts);
  }
  confirmorder() {
    if (this.cartproducts.length > 0) {
      this.modalService.getModal('confirm').open();
    } else {
      this.alerts.warning('You have no any product cart!');
    }

  }
  order() {
    this.modalService.getModal('confirm').close();
    if (this.conf.getUser()) {
        this.items = [];
      const result = _.countBy(this.cartproducts, 'descripcion');
      console.log(result)
    } else {
      this.router.navigate(['/login']);
    }
  }
}
