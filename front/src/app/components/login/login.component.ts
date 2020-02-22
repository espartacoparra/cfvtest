import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LogService } from "../../services/log.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLoginUser: FormGroup;

  constructor(private logservice: LogService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createBuilderForm();
  }

  private createBuilderForm() {
    this.formLoginUser = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });
  }

  login() {
    var user = this.formLoginUser.value
    this.logservice.loginUser(user);
  }

}
