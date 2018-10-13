import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { User } from '../../model/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {

  newuser: User;
  confirmpasswd: string;
  checkpasswd = true;
  form: FormGroup;
  errormsg: string;
  private formSubmitAttempt: boolean;
  constructor(private formBuilder: FormBuilder,
              private  userapi: UserService,
              private router: Router) {
    this.form = this.formBuilder.group({
      first_name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      username: [null, [Validators.required]],
      email: [null, [Validators.required]],
      contacto: [null],
      password: [null, [Validators.required]],
      confirmpass: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    this.newuser = new User();
    this.formSubmitAttempt = false;
    this.confirmpasswd = '';
    this.errormsg = null;
  }
  onSubmit() {
    this.formSubmitAttempt = true;
    if (this.newuser.password !== this.confirmpasswd) {
      this.checkpasswd = false;
      return;
    }
    if (this.form.valid) {
      this.userapi.addUser(this.newuser).subscribe(data => {
        localStorage.setItem('token', JSON.stringify(data['token']));
        this.router.navigate(['/login']);
        // this.error = false;
      }, err => {
        // this.error = true;
        this.errormsg = 'Register Failed!';
      });
    }
  }
  isFieldValid(field: string) {
    return (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt);
  }
  inputpass() {
    this.checkpasswd = true;
  }
}
