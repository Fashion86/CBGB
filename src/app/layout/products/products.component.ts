import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ConfigService } from '../../services/config.service';
import { Router, ActivatedRoute } from '@angular/router';
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
  checkcategory: string;
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
              private spinner: NgxSpinnerService,
              private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.checkcategory = null;
    this.route.params.subscribe(params => {
      this.checkcategory = params['item'];
    });
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
    let shorgroup: any[] = [];
    const group = _.mapValues(_.groupBy(data, 'categoria'),
      clist => clist.map(bebida => _.omit(bebida, 'categoria')));
    shorgroup = Object.keys(group).map(key => ({ key, value: group[key] }));
    shorgroup.forEach(bgroup => {
      bgroup.value = _.orderBy(bgroup.value, ['precio_unidad'], ['asc']);
    });

    let newgroup: any[] = [];
    if (this.checkcategory) {
      if (this.checkcategory === 'Vinos') {
        newgroup.push(shorgroup.find(t => t.key === 'VINO'));
        newgroup.push(shorgroup.find(t => t.key === 'WHISKY'));
      }
    } else {
      newgroup = shorgroup;
    }
    this.setmenu(newgroup);
    this.spinner.hide();

  }
  setmenu(alldata) {
    alldata.forEach(d => {
      const newgroup = _(d.value)
        .groupBy(x => x.marca)
        .map((value, key) => ({marca: key, datas: value}))
        .value();
      this.origngroup.push({key: d.key, datas: newgroup});
      const submenu: any[] = [];
      newgroup.forEach(dd => {
        submenu.push({text: dd.marca, value: dd.marca});
      });
      this.menuitems.push(new TreeviewItem({
        text: d.key, value: d.key, children: submenu
      }));
    });
    this.bebidagroup = this.origngroup;
  }
  order(flag) {
    this.spinner.show();
    if (flag) {
      this.bebidagroup.forEach(bgroup => {
        bgroup.datas.forEach(group => {
          group.datas = _.orderBy(group.datas, ['precio_unidad'], ['asc']);
        });
      });
      this.spinner.hide();
    } else {
      this.bebidagroup.forEach(bgroup => {
        bgroup.datas.forEach(group => {
          group.datas = _.orderBy(group.datas, ['precio_unidad'], ['desc']);
        });
      });
      this.spinner.hide();
    }
  }

  onSelectedMenuChange(groups) {
    this.bebidagroup = [];
    const newdatas: any[] = [];
    groups.forEach(pp => {
      this.origngroup.forEach(bgroup => {
        const item = _.find(bgroup.datas, p => p['marca'] === pp);
        if (item !== -1 && item !== undefined) {
          newdatas.push({key: bgroup.key, datas: item});
        }
      });
    });
    const group = _.mapValues(_.groupBy(newdatas, 'key'),
      clist => clist.map(bebida => _.omit(bebida.datas)));
    this.bebidagroup = Object.keys(group).map(key => ({ key: key, datas: group[key] }));
  }
  pageChanged(event) {

  }
}
