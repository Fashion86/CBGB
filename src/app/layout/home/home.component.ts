import { Component, OnInit } from '@angular/core';
import * as emailjs from 'emailjs-com';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import { Message } from '../../model/message';
import { NguCarouselConfig } from '@ngu/carousel';
import {ConfigService} from '../../services/config.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  imageUrlArray: any[] = [];
  msg: Message;
  slide_hight = '600px';
  imgags = [
    {id: 1270, img: 'assets/img/home-feat-item.png'},
    {id: 1271, img: 'assets/img/home-feat-item-3.png'},
    {id: 420, img: 'assets/img/home-feat-item-4.png'},
    {id: 400, img: 'assets/img/home-feat-item-2.png'},
    {id: 7610, img: 'assets/img/home-feat-item.png'},
    {id: 7616, img: 'assets/img/home-feat-item-3.png'},
    {id: 527, img: 'assets/img/home-feat-item-4.png'},
    {id: 2001, img: 'assets/img/home-feat-item-2.png'}
  ];
  productidlist = [1270, 1271, 420, 400, 7610, 7616, 527, 2001];
  imagedata = {};
  public carouselTile: NguCarouselConfig = {
    grid: { xs: 1, sm: 1, md: 4, lg: 4, all: 0 },
    speed: 250,
    point: {
      visible: true
    },
    load: 2,
    velocity: 0,
    touch: true,
    loop: true,
    easing: 'cubic-bezier(0, 0, 0.2, 1)'
  };
  constructor(private alerts: ToastrService,
              private spinner: NgxSpinnerService,
              private  conf: ConfigService,
              private  userapi: UserService) { }

  ngOnInit() {
    this.msg = new Message();
    this.imageUrlArray = [];
    this.spinner.show();
    if (window.screen.width > 767) {
      this.imageUrlArray.push('assets/img/slide.jpg');
      this.imageUrlArray.push('assets/img/slide.jpg');
      this.slide_hight = '680px';
    } else {
      this.imageUrlArray.push('assets/img/slide-m.jpg');
      this.imageUrlArray.push('assets/img/slide-m.jpg');
      this.slide_hight = '200px';
    }
    this.productidlist.forEach( index => {
      this.userapi.getBebida(index).subscribe(data => {
        this.imagedata[index] = data;
        this.spinner.hide();
      }, err => {
        this.alerts.error('Get bebida error!');
        this.spinner.hide();
      });
    });
  }

  onsendMail() {
    this.spinner.show();
    const messageBody  = {
      'reply_to': this.msg.email,
      'from_name': this.msg.name,
      'to_name': 'CBGB',
      'message_html': this.msg.message
    };
    emailjs.send('gmail', 'template_hc86m4E3', messageBody, 'user_L4WqeuVWonx60Ytaxv6jS')
      .then((response) => {
        this.spinner.hide();
        this.alerts.success( 'Mensaje éxito');
      }, (err) => {
        this.spinner.hide();
        this.alerts.error('FAILED...', err);
      });
  }

  onproduct(item) {
    console.log(item)
  }
}
