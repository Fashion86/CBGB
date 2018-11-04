import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ConfigService } from '../../services/config.service';
import { Router, ActivatedRoute  } from '@angular/router';
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
  param = null;
  private formSubmitAttempt: boolean;
  constructor(private formBuilder: FormBuilder,
              private  userapi: UserService,
              private  conf: ConfigService,
              private router: Router,
              private route: ActivatedRoute ,
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
    this.route.params.subscribe(params => {
      this.param = params['item'];
    });
  }

  onSubmit() {
    this.formSubmitAttempt = true;
    if (this.form.valid) {
      const userdata = {username: this.username, password: this.password};
      this.userapi.login(userdata).subscribe(data => {
        this.conf.setToken(data['token']);
        this.setUser();
      }, err => {
        this.alerts.error('Unknown User!');
      });
    }

  }
  setUser() {
    this.userapi.getUser().subscribe(data => {
      this.conf.setUser(JSON.stringify(data));
      this.alerts.success( 'Success Login');
      if (this.param === 'fromcart') {
        this.router.navigate(['/cart']);
      } else {
        this.router.navigate(['/home']);
      }
    }, err => {
      this.alerts.error('Unknown User!');
    });
  }
  isFieldValid(field: string) {
    return (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt);
  }
}
