import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../model/user';
import { Ordencompra } from '../../../model/ordencompra';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
@Component({
  selector: 'app-account-order',
  templateUrl: './account-order.component.html',
  styleUrls: ['./account-order.component.css']
})
export class AccountOrderComponent implements OnInit {

  userorders: Ordencompra[] = [];
  constructor(private  api: UserService,
              private alerts: ToastrService,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.getAllorders();
  }
  getAllorders() {
    this.api.getOdenList().subscribe((res: any) => {
      this.userorders = res; console.log(this.userorders)
    }, err => {
      this.alerts.error('get orders error!');
      this.spinner.hide();
    });
  }
}
