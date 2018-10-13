import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ConfigService } from '../../services/config.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  errormsg: string;
  username = '';
  password = '';
  private formSubmitAttempt: boolean;
  constructor(private formBuilder: FormBuilder,
              private  userapi: UserService,
              private  conf: ConfigService,
              private router: Router,
              private alerts: ToastrService) {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.username = '';
    this.password = '';
    this.errormsg = null;
    this.formSubmitAttempt = false;

    // this.alerts.setMessage('Configurations saved successfully!', 'success');
    // this.alerts.setMessage('Please save all the changes before closing', 'warn');
    // if (this.auth.canAutoLogin()) {
    //   this.loaderService.display(false);
    //   this.router.navigate(['admin/dashboard']);
    // }
  }

  onSubmit() {
    this.formSubmitAttempt = true;
    if (this.form.valid) {
      const userdata = {username: this.username, password: this.password};
      this.userapi.login(userdata).subscribe(data => {
        this.conf.setToken(data['token']);
        this.setUser();
      }, err => {
        this.alerts.error('Unknown User!', 'Error!');
      });
    }

  }
  setUser() {
    this.userapi.getUser().subscribe(data => {
      this.conf.setUser(JSON.stringify(data));
      this.alerts.success('Login Success!', 'Success!');
      this.router.navigate(['/home']);
    }, err => {
      this.alerts.error('Unknown User!', 'Error!');
    });
  }
  isFieldValid(field: string) {
    return (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt);
  }
}
