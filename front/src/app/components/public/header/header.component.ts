import { Component, OnInit } from '@angular/core';
import { LogService } from "../../../services/log.service";
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private logservice: LogService, config: NgbDropdownConfig) {
    config.placement = 'bottom-left';
    config.autoClose = false;
  }

  ngOnInit() {
  }

  logOut() {
    var res = confirm('quieres cerra tu cuenra');
    if (res) {
      this.logservice.logOut();
    }
  }

}
