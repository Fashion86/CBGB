import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { User } from '../../model/user';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ConfigService } from '../../services/config.service';

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
              private router: Router) {
    this.form = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      contacto: ['', [Validators.required]],
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
        console.log(res);
       }, err => {
        // this.error = true;
        this.errormsg = 'Update Failed!';
      });
    // }
  }
  isFieldValid(field: string) {
    return !this.form.get(field).valid;
  }
}
