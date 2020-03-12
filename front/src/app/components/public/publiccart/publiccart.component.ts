import { Component, OnInit } from "@angular/core";
import { RequestService } from "../../../services/request.service";
import { Router } from '@angular/router';
import { ToastsService } from 'src/app/services/toasts.service';

@Component({
  selector: "app-publiccart",
  templateUrl: "./publiccart.component.html",
  styleUrls: ["./publiccart.component.css"]
})
export class PubliccartComponent implements OnInit {
  cart = "ok"
  items: [] = [];
  selects: any[] = [];
  quantity = "";
  total;
  oferts: any[];
  constructor(private request: RequestService, private router: Router, private toasts: ToastsService) { }

  ngOnInit() {
    this.getCart();
    this.getOferts();

  }

  getCart() {
    this.request.getCart().subscribe(data => {
      console.log(data);
      if (data == "empy" || data.items.length == 0) {
        this.cart = "empy";
      } else {
        this.cart = "ok";
        this.items = data.items;
        this.loadSelects();
        console.log(this.selects);
        this.updateTotal()
      }
    });
  }

  loadSelects() {
    this.items.map((item: any): void => {
      var selectedSize = item.product.sizes.filter((size: any) => {
        return size.id == item.size_id;
      });
      var setLength = selectedSize[0].products_sizes.quantity;
      var units = [];
      for (let index = 1; index <= setLength; index++) {
        units.push(index);
      }
      this.selects.push(units);
    });
  }

  getOferts() {
    this.request.getProductsOferts().subscribe(data => {
      console.log(data);
      this.oferts = data;
    });
  }

  LoadOder() {
    console.log(this.items);
    this.request.loadOrder(this.items).subscribe(data => {
      console.log(data);
      if (data == 'ok') {
        this.toasts.showSuccess('Operación exitosa', 'su orden ha sido creada');
        this.router.navigate(['/public/order']);
      } if (data == '03') {
        this.toasts.showError('Información', 'actualmente tiene un pedido en proceso');
      } else {
        this.toasts.showError('Error', 'Lo sentimos podemos prcesar su orden');
      }

    });
  }

  updateTotal() {
    var total = 0;
    this.total = this.items.map((item: any): void => {
      item.product.sizes.map((size): void => {
        if (item.size_id == size.id) {
          total += item.quantity * item.price;
        }
      });
    });
    this.total = total;
  }

  deletoToCart(id) {
    this.request.deletoToCart(id).subscribe(data => {
      console.log(data);
      this.getCart();
    });
  }

}
