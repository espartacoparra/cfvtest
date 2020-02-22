import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { RequestService } from "../services/request.service";


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private request: RequestService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.request.session == null) {
      this.router.navigate(['/login']);
      return false;
    } else {
      console.log('loginguard');
      return true;
    }
  }
}
