import { Component, OnInit } from '@angular/core';
import { RequestService } from "../../../services/request.service";
import { Router } from '@angular/router';
import { ToastsService } from 'src/app/services/toasts.service';
@Component({
  selector: 'app-publicorder',
  templateUrl: './publicorder.component.html',
  styleUrls: ['./publicorder.component.css']
})
export class PublicorderComponent implements OnInit {
  val = "ok"
  order = {};
  items: [] = [];
  selects: any[] = [];
  quantity = "";
  total;
  oferts: any[];
  fill = "fill";
  constructor(private request: RequestService, private router: Router, private toasts: ToastsService, ) { }

  ngOnInit() {
    this.getOrder();
    this.getOferts();
  }

  getOrder() {
    this.request.getOrder().subscribe(data => {
      console.log(data);
      if (data == 'empy') {
        this.val = 'empy';
      } else {
        this.order = data;
        this.items = data.items;
      }
    });
  }

  getOferts() {
    this.request.getProductsOferts().subscribe(data => {
      console.log(data);
      this.oferts = data;
    });
  }
}
