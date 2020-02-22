import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from "../services/request.service";
import { NgxSpinnerService } from "ngx-spinner";
@Injectable({
  providedIn: 'root'
})
export class LogService {
  constructor(private request: RequestService, private router: Router, private spinner: NgxSpinnerService) { }


  SingUser(data) {
    this.spinner.show();
    this.request.SingUser(data).subscribe(data => {
      if (data == 1) {
        console.log("error en las credenciales")
      } else {
        this.request.session = data;
        this.request.token = data.tokens[0].token;
        this.request.id = data.id;
        localStorage.setItem('session', JSON.stringify(data));

        console.log(data);
        if (data.type == 'admin') {
          console.log('admin');
          this.router.navigate(['/admin/dashboard']);
        } else {
          console.log('user');
          this.router.navigate(['/public/index']);
        }
      }
      this.spinner.hide();
    });
  }

  loginUser(data) {
    this.spinner.show();
    this.request.loginUser(data).subscribe(data => {
      if (data == 1) {
        console.log("error en las credenciales")
      } else {
        this.request.session = data;
        this.request.token = data.tokens[0].token;
        this.request.id = data.id;
        localStorage.setItem('session', JSON.stringify(data));
        if (data.type == 'admin') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/public/index']);
        }
      }
      this.spinner.hide();
    });

  }

  loadSession() {
    this.spinner.show();
    var session = JSON.parse(localStorage.getItem('session'));
    console.log(session);
    if (session == null) {
      this.clearSession();
      this.spinner.hide();
    } else {
      this.request.session = session;
      this.request.token = session.tokens[0].token;
      this.request.id = session.id;
      this.request.loadSession(session).subscribe(data => {
        if (data == null || data == 1) {
          this.clearSession();
        } else {
          this.request.session = data;
          this.request.token = data.tokens[0].token;
          this.request.id = data.id;
          localStorage.setItem('session', JSON.stringify(data));
          /* if (data.type == 'admin') {
             this.router.navigate(['/admin/dashboard']);
           } else {
             this.router.navigate(['/public/index']);
           }
 */
        }
        this.spinner.hide();
      });
    }
  }

  clearSession() {
    this.request.session = null;
    this.request.token = null;
    this.request.id = null;
    localStorage.removeItem('session');
    this.router.navigate(['/']);
  }

  logOut() {
    this.spinner.show();
    this.request.logOut().subscribe(data => {
      console.log(data);
      this.clearSession();
      this.spinner.hide();
    });
  }
}
