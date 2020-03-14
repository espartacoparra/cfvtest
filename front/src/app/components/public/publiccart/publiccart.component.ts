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
        this.updateTotal()
      }
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
    console.log(this.validateQuantity());
    switch (this.validateQuantity()) {
      case '01':
        this.request.loadOrder(this.items).subscribe(data => {
          console.log(data);
          this.alerts(data);
        });
        break;
      case '02':
        this.toasts.showError('Alerta', 'Lo sentimos, no podemos procesar su orden, alguno de los productos que selecciono ya no peseemos exitencias');
        break;
      case '03':
        this.toasts.showError('Alerta', 'Lo sentimos, la cantidad seleccionada supera las exitencias que peseemos');
        break;
      default:
        this.toasts.showError('Alerta', 'Por favor ingrese cantidades validas para sus productos');
        break;
    }
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
      this.getOferts();
    });
  }

  validateQuantity() {
    var res = '01';
    this.items.map((item: any) => {
      if (item.quantity == null || item.quantity == 0 || item.quantity < 0) {
        return res = '04';
      }
      item.product.sizes.map((size: any) => {
        if (size.id == item.size_id) {

          if (parseInt(size.products_sizes.quantity) < 0) {
            return res = '02';

          } else if (parseInt(size.products_sizes.quantity) < parseInt(item.quantity)) {
            return res = '03';
          }
        }

      });
    });
    return res;
  }

  alerts(data) {
    switch (data) {
      case 'ok':
        this.toasts.showSuccess('Operación exitosa', 'su orden ha sido creada');
        this.router.navigate(['/public/order']);
        break;
      case '03':
        this.toasts.showError('Información', 'actualmente tiene una orden de pago en proceso');
        break;
      case '04':
        this.getCart();
        this.getOferts();
        this.toasts.showError('Alerta', 'Lo sentimos, ya no tenemos exitenciasde uno o varios de los productos que selecciono');
        break;
      default:
        this.toasts.showError('Error', 'Lo sentimos podemos prcesar su orden');
        break;
    }
  }

}
