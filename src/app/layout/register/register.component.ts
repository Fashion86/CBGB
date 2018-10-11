import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { User } from '../../model/user';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  newuser: User;
  confirmpasswd: string;
  checkpasswd = true;
  form: FormGroup;
  private formSubmitAttempt: boolean;
  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      first_name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      username: [null, [Validators.required]],
      email: [null, [Validators.required]],
      contacto: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirmpass: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    this.newuser = new User();
    this.formSubmitAttempt = false;
    this.confirmpasswd = '';
  }
  onSubmit() {
    this.formSubmitAttempt = true;
    if (this.newuser.password != null && this.newuser.password !== this.confirmpasswd) {
      this.checkpasswd = false;
      return;
    }
    console.log('ssss')
  }
  isFieldValid(field: string) {
    return (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt);
  }
  inputpass() {
    this.checkpasswd = true;
  }
}
