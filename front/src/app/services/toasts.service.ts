import { Injectable, TemplateRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class ToastsService {

  constructor(private toastr: ToastrService) { }
  toasts: any[] = [];

  showSuccess(title,message) {
    this.toastr.success(message, title);
  }
  showError(title,message) {
    this.toastr.error(message, title);
  }


}
