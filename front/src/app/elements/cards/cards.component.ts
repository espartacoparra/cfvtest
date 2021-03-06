import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RequestService } from "../../services/request.service";
import { ToastsService } from "../../services/toasts.service";
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  @Input('product') product: { id: "", images: [{ url: "" }], name: "", sizes: [], price: "" };
  @Output() reloadCart = new EventEmitter<string>();
  sizeSelected = "";
  images = ["http://localhost:4200/assets/imagesfront/val3.jpeg", "http://localhost:4200/assets/imagesfront/val3.jpeg", "http://localhost:4200/assets/imagesfront/val3.jpeg", "http://localhost:4200/assets/imagesfront/val3.jpeg", "http://localhost:4200/assets/imagesfront/val3.jpeg", "http://localhost:4200/assets/imagesfront/val3.jpeg"];
  constructor(private request: RequestService, private toasts: ToastsService) { }
  ngOnInit() {
    console.log(this.product);
  }
  addToCart() {
    var product = {
      product: this.product,
      request: { size: this.sizeSelected, quantity: 1 }
    };
    console.log(product);
    this.request.addToCart(product).subscribe(data => {
      console.log(data);
      switch (data) {
        case '01':
          this.toasts.showSuccess('Agregado al Carrito', 'Su producto ha sido agregado al su carrito ');
          break;
        case '02':
          this.toasts.showSuccess('Operación exitosa', 'El producto ya se encuentra en su carrito');
          break;
        case '03':
          this.toasts.showError('Información', 'ya no nos queda stock del producto');
          break;
        default:
          this.toasts.showError('Error', 'Lo sentimos su producto no pudo ser agregado al carrito');
          break;
      }
      this.reloadCart.emit();
    });
    this.sizeSelected = "";
  }

}
