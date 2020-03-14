import { Component, OnInit, PipeTransform } from '@angular/core';
import { RequestService } from "../../../services/request.service";
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-publicoperation',
  templateUrl: './publicoperation.component.html',
  styleUrls: ['./publicoperation.component.css'],
  providers: [DecimalPipe]
})
export class PublicoperationComponent implements OnInit {

  constructor(private request: RequestService) { }
  orders = [];
  page = 1;
  pageSize = 6;
  collectionSize = "";

  a = [{ id: 55, user_id: 1, quantity: 1, status: "verification" }, { id: 55, user_id: 1, quantity: 1, status: "verification" }, { id: 55, user_id: 1, quantity: 1, status: "verification" }, { id: 55, user_id: 1, quantity: 1, status: "verification" }]

  ngOnInit() {
    this.getOperations();
  }

  getOperations() {
    this.request.getOperations().subscribe(data => {
      console.log(data);
      this.collectionSize = data.length;
      this.orders = data;
    });
  }

  get Orders() {
    return this.orders.map((order, i) => ({ id: i + 1, ...order }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }


}
