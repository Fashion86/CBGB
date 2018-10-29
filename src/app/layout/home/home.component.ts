import { Component, OnInit } from '@angular/core';
import * as emailjs from 'emailjs-com';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import { Message } from '../../model/message';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  imageUrlArray: any[] = [];
  msg: Message;
  slide_hight = '600px';
  constructor(private alerts: ToastrService,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.msg = new Message();
    this.imageUrlArray = [];
    if (window.screen.width > 767) {
      this.imageUrlArray.push('assets/img/slide.jpg');
      this.imageUrlArray.push('assets/img/slide.jpg');
      this.slide_hight = '680px';
    } else {
      this.imageUrlArray.push('assets/img/slide-m.jpg');
      this.imageUrlArray.push('assets/img/slide-m.jpg');
      this.slide_hight = '200px';
    }
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

}
