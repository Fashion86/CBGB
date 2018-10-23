import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ConfigService } from '../../services/config.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-passwd',
  templateUrl: './forgot-passwd.component.html',
  styleUrls: ['./forgot-passwd.component.css']
})
export class ForgotPasswdComponent implements OnInit {

  form: FormGroup;
  email = '';
  private formSubmitAttempt: boolean;
  constructor(private formBuilder: FormBuilder,
              private  userapi: UserService,
              private  conf: ConfigService,
              private router: Router,
              private alerts: ToastrService) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.email = '';
    this.formSubmitAttempt = false;
  }

  onSubmit() {
    this.formSubmitAttempt = true;
    if (this.form.valid) {
      const email = {email: this.email};
      this.userapi.forgotpass(email).subscribe(data => {
      }, err => {
        this.alerts.error('Failid request!');
      });
    }

  }
  isFieldValid(field: string) {
    return (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt);
  }

}
