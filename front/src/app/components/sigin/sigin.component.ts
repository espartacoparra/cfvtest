import { Component, OnInit } from '@angular/core';
import { LogService } from "../../services/log.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-sigin',
  templateUrl: './sigin.component.html',
  styleUrls: ['./sigin.component.css']
})
export class SiginComponent implements OnInit {

  formCreateUser: FormGroup;

  ;

  constructor(private logservice: LogService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createBuildForm();
  }

  private createBuildForm() {
    this.formCreateUser = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      name: ["", [Validators.required, Validators.minLength(3)]],
      lastname: ["", [Validators.required, Validators.minLength(3)]],
      cedula: ["", [Validators.required, Validators.minLength(6)]],
      password: ["", [Validators.required]],
    });
    console.log(this.formCreateUser);
  }

  createUser() {
    var user = this.formCreateUser.value;
    this.logservice.SingUser(user);
  }

}
