import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { RequestService } from "src/app/services/request.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastsService } from "../../../services/toasts.service";
import { Location } from "@angular/common";
@Component({
  selector: "app-publicproduct",
  templateUrl: "./publicproduct.component.html",
  styleUrls: ["./publicproduct.component.css"]
})
export class PublicproductComponent implements OnInit {
  id: number;
  product = { id: "", images: [{ url: "" }], name: "", sizes: [], price: "", description: "" };
  related = [];
  formToAddCart: FormGroup;
  constructor(
    private activeroute: ActivatedRoute,
    private request: RequestService,
    private router: Router,
    private _location: Location,
    private formBuilder: FormBuilder,
    private toasts: ToastsService,
  ) {
    this.id = this.activeroute.snapshot.params.id;
    router.events.subscribe(val => {
      console.log(val);
      this.id = this.activeroute.snapshot.params.id;
      //this.getProduct();
      console.log(this.product);
    });
  }

  ngOnInit() {
    this.getProduct();
    this.createForm();
    console.log(this.formToAddCart);
  }

  createForm() {
    this.formToAddCart = this.formBuilder.group({
      size: ["", [Validators.required]],
      quantity: [1, [Validators.required, Validators.min(1)]]
    });
  }

  getProduct() {
    window.scroll(0, 0);
    this.request.getOneProduct(this.id).subscribe(data => {
      this.product = data;
      console.log(data);
      this.getRelated(data.categories[0]);
    });
  }

  getRelated(data) {
    this.request.getRelated(data).subscribe(data => {
      this.related = data;
      console.log(data);
    });
  }

  goBack() {
    this._location.back();
  }

  addToCart() {
    var validateSizes = this.product.sizes.filter(siz => {
      return siz.id == this.formToAddCart.value.size;
    });
    console.log(validateSizes);
    if (
      validateSizes[0].products_sizes.quantity >=
      this.formToAddCart.value.quantity
    ) {
      var product = {
        product: this.product,
        request: this.formToAddCart.value
      };
      console.log(product);
      this.request.addToCart(product).subscribe(data => {
        console.log(data);
        if (data == "01") {
          this.toasts.showSuccess('Agregado al Carrito', 'Su producto ha sido agregado al su carrito ');
        } else if (data == "02") {
          this.toasts.showSuccess('Operación exitosa', 'El producto ya se encuentra en su carrito');
        } else {
          this.toasts.showError('Error', 'Lo sentimos su producto no pudo ser agregado al carrito');
        }
      });
    } else {
      console.log("cantidad mayor que la existencia");
    }
  }
}
