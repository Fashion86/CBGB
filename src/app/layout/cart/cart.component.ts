import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { Ordencompra } from '../../model/ordencompra';
import * as _ from 'lodash';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';
import {UserService} from '../../services/user.service';
import * as emailjs from 'emailjs-com';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  currentuser: any;
  cartproducts: any[] = [];
  totalprice: number;
  orderdata: any;
  items: any[] = [];
  subscription: Subscription;
  constructor(private  conf: ConfigService,
              public modalService: NgxSmartModalService,
              private alerts: ToastrService,
              private  userapi: UserService,
              private router: Router) { }

  ngOnInit() {
    this.currentuser = this.conf.getUser();
    if (this.conf.getCart()) {
      this.cartproducts = this.conf.getCart();
    }
    this.setTotal();
    this.orderdata = new Ordencompra();
  }
  setTotal() {
    this.totalprice = 0.0;
    this.cartproducts.forEach( p => {
      this.totalprice = this.totalprice + (p.precio_unidad * p.count);
    });
  }
  remove(product) {
    this.cartproducts = _.filter(this.cartproducts, p => p.codigo !== product.codigo);
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
  updateCount(product, count) {
    product.count = count;
    this.setTotal();
    this.conf.updateCart(this.cartproducts);
  }
  order() {
    this.modalService.getModal('confirm').close();
    if (this.conf.getUser()) {
        this.items = [];
        this.cartproducts.forEach( p => {
          this.items.push({
              cantidad: p.count,
              bebida: p.codigo
          });
        });
      this.orderdata = {
        usuario: this.conf.getUser().username,
        total: this.totalprice,
        items: this.items,
        status: 'ENVIADA'
      };
      this.userapi.addOden(this.orderdata).subscribe(data => {
        const emailbody = document.getElementById('order-data');
        const messageBody  = {
          'reply_to': this.currentuser.email,
          'from_name': this.currentuser.username,
          'to_name': 'CBGB',
          'subject': 'Product Order from ' + this.currentuser.username,
          'attach': {
            data: emailbody, alternative: true
          }
        };
        emailjs.send('gmail', 'template_hc86m4E3', messageBody,  'user_L4WqeuVWonx60Ytaxv6jS')
          .then((response) => {
            this.alerts.success('Success Order!');
          }, (err) => {
            this.alerts.error('Failed send message!');
          });
        localStorage.removeItem('cart');
        this.router.navigate(['/account-order']);
      }, err => {
        this.alerts.error('Failed Order!');
      });
    } else {
      this.router.navigate(['/login', 'fromcart']);
    }
  }
}
