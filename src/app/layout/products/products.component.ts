import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ConfigService } from '../../services/config.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Bebida } from '../../model/bebida';
import * as _ from 'lodash';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  bebidagroup: any[] = [];
  editbebida: Bebida;
  categories: any[] = ['VINO', 'CHAMPAGNE', 'WHISKY', 'ESPIRITUOSA', 'CERVEZA', 'ENERGIZANTE',
    'COOLERS', 'AGUA_GASEOSA_GRANADINA', 'FERNET_Y_APERITIVO', 'RON', 'VODKA', 'GIN', 'BOURBON'];
  constructor(private  api: UserService,
              private  conf: ConfigService,
              private router: Router,
              private alerts: ToastrService) { }

  ngOnInit() {
    this.editbebida = new Bebida();
    this.getAllbebida();
  }

  getAllbebida() {
    this.api.getBebidaList().subscribe((res: any) => {
      this.sortbebida(res);
    }, err => {
      this.alerts.error('get bebidas error!', 'Error!');
    });
  }
  sortbebida(data) {
    const group = _.mapValues(_.groupBy(data, 'categoria'),
      clist => clist.map(bebida => _.omit(bebida, 'categoria')));
    this.bebidagroup = Object.keys(group).map(key => ({ key, value: group[key] }));
    console.log(this.bebidagroup)
  }
  pageChanged(event) {

  }
}
