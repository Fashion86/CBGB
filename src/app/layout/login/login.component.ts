import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ConfigService } from '../../services/config.service';
import { Router } from '@angular/router';

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
              private router: Router) {
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
        // this.error = true;
        this.errormsg = 'Login Failed!';
      });
    }

  }
  setUser() {
    this.userapi.getUser().subscribe(data => {
      this.conf.setUser(JSON.stringify(data));
      this.router.navigate(['/home']);
    }, err => {
      this.errormsg = 'Login Failed!';
    });
  }
  isFieldValid(field: string) {
    return (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt);
  }
}
