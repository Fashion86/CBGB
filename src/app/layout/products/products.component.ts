import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ConfigService } from '../../services/config.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Bebida } from '../../model/bebida';
import { NgxSpinnerService } from 'ngx-spinner';
import { TreeviewItem } from 'ngx-treeview';
import * as _ from 'lodash';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  bebidagroup: any[] = [];
  origngroup: any[] = [];
  editbebida: Bebida;
  odervalue = true;
  categories: any[] = ['VINO', 'CHAMPAGNE', 'WHISKY', 'ESPIRITUOSA', 'CERVEZA', 'ENERGIZANTE',
    'COOLERS', 'AGUA_GASEOSA_GRANADINA', 'FERNET_Y_APERITIVO', 'RON', 'VODKA', 'GIN', 'BOURBON'];
  menuconfig = {
    hasAllCheckBox: true,
    hasFilter: false,
    hasCollapseExpand: true,
    decoupleChildFromParent: false,
    maxHeight: 400
  };
  menuitems: TreeviewItem[] = [];
  constructor(private  api: UserService,
              private  conf: ConfigService,
              private router: Router,
              private alerts: ToastrService,
              private spinner: NgxSpinnerService) {
    // this.menuitems.push(new TreeviewItem({
    //   text: 'IT', value: 'ggg', children: [
    //     {
    //       text: 'Networking', value: 'Networking'
    //     },
    //     {
    //       text: 'Network', value: 'Network'
    //     }
    //   ]
    // }));
    // this.menuitems.push(new TreeviewItem({
    //   text: 'net', value: 'ggg'
    // }));
  }

  ngOnInit() {
    this.editbebida = new Bebida();
    this.spinner.show();
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
    this.bebidagroup.forEach(bgroup => {
      bgroup.value = _.orderBy(bgroup.value, ['precio_unidad'], ['asc']);
    });
    this.origngroup = this.bebidagroup;
    this.setmenu(this.origngroup);
    this.spinner.hide();

  }
  setmenu(alldata) {
    alldata.forEach(d => {
      this.menuitems.push(new TreeviewItem({
        text: d.key, value: d.key
      }));
    });
  }
  order(flag) {
    this.spinner.show();
    if (flag) {
      this.bebidagroup.forEach(bgroup => {
        bgroup.value = _.orderBy(bgroup.value, ['precio_unidad'], ['asc']);
      });
      this.spinner.hide();
    } else {
      this.bebidagroup.forEach(bgroup => {
        bgroup.value = _.orderBy(bgroup.value, ['precio_unidad'], ['desc']);
      });
      this.spinner.hide();
    }
  }
  slectgroup(groupkey) {
    const group = _.find(this.origngroup, pp => pp.key === groupkey);
    this.bebidagroup = [];
    this.bebidagroup.push(group);
  }
  onSelectedChange(groups) {
    this.bebidagroup = [];
    groups.forEach(key => {
      const group = _.find(this.origngroup, d => d.key === key);
      this.bebidagroup.push(group);
    });
  }
  pageChanged(event) {

  }
}
