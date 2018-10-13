import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { User } from '../../model/user';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ConfigService } from '../../services/config.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  edituser: User;
  form: FormGroup;
  errormsg: string;
  private formSubmitAttempt: boolean;
  constructor(private formBuilder: FormBuilder,
              private  userapi: UserService,
              private  conf: ConfigService,
              private router: Router,
              private alerts: ToastrService) {
    this.form = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      contacto: [''],
      confirmpass: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.edituser = this.conf.getUser();
    this.formSubmitAttempt = false;
  }
  onSubmit() {
    this.formSubmitAttempt = true;
    // if (this.form.valid) {
      this.userapi.updateUser(this.edituser).subscribe(res => {
        this.alerts.success('Update Success!', 'Success!');
       }, err => {
        this.alerts.error('Update Failed!', 'Error!');
      });
    // }
  }
  isFieldValid(field: string) {
    return !this.form.get(field).valid;
  }
}
