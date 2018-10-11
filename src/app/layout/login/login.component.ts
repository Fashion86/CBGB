import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  username = '';
  password = '';
  private formSubmitAttempt: boolean;
  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    this.username = '';
    this.password = '';
    this.formSubmitAttempt = false;
  }

  onSubmit() {
    this.formSubmitAttempt = true;
    if (this.password != null || this.username !== null) {
      return;
    }

  }
  isFieldValid(field: string) {
    return (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt);
  }
}
