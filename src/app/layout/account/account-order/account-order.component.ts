import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../model/user';
import { Ordencompra } from '../../../model/ordencompra';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import {NgxSmartModalService} from 'ngx-smart-modal';
@Component({
  selector: 'app-account-order',
  templateUrl: './account-order.component.html',
  styleUrls: ['./account-order.component.css']
})
export class AccountOrderComponent implements OnInit {

  userorders: Ordencompra[] = [];
  editorder: any;
  totalprice: number;
  constructor(private  api: UserService,
              private alerts: ToastrService,
              private spinner: NgxSpinnerService,
              public modalService: NgxSmartModalService) { }

  ngOnInit() {
    this.spinner.show();
    this.getAllorders();
  }
  getAllorders() {
    this.api.getOdenList().subscribe((res: any) => {
      this.userorders = res;
      this.spinner.hide();
    }, err => {
      this.alerts.error('Get orders error!');
      this.spinner.hide();
    });
  }
  openorderDialog(order) {
    this.editorder = order;
    this.totalprice = this.editorder.total;
    this.modalService.getModal('myModal').open();
  }
  updateorder() {
    this.modalService.getModal('myModal').close();
  }
  remove(product) {

  }
}
