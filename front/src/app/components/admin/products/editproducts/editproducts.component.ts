import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder, FormGroup, FormArray } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { RequestService } from "src/app/services/request.service";

@Component({
  selector: "app-editproducts",
  templateUrl: "./editproducts.component.html",
  styleUrls: ["./editproducts.component.css"]
})
export class EditproductsComponent implements OnInit {
  formUpdateProduct: FormGroup;
  sizeItems: FormArray;

  id: BigInteger;
  products = [];
  closeResult: string;
  base64textString = [];
  categories = "";
  sizes = [];
  colorId = 0;
  constructor(
    private router: Router,
    private request: RequestService,
    private formBuilder: FormBuilder,
    private activeroute: ActivatedRoute
  ) {
    this.id = this.activeroute.snapshot.params.id;
    //this.getOneProduct();
  }

  ngOnInit() {
    this.initForm();
    this.getOneProduct();
    this.getCategories();
    this.getsizes();
  }

  //forms
  private initForm() {
    this.formUpdateProduct = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      price: ["", [Validators.required]],
      quantity: ["", [Validators.required]],
      description: ["", [Validators.required]],
      categories: ["", [Validators.required]],
      color1: ["", [Validators.required]],
      color2: ["", [Validators.required]],
      color3: ["", [Validators.required]],
      size: ["", [Validators.required]]
    });
    console.log(this.formUpdateProduct);
  }

  private createBuildForm(data) {
    console.log(data);
    var cat = data.categories.map(cat => {
      return cat.id;
    });
    var siz = data.sizes.map(siz => {
      return {
        name: siz.size,
        sizeId: siz.products_sizes.size_id,
        quantity: siz.products_sizes.quantity
      };
    });
    console.log(siz);
    this.formUpdateProduct = this.formBuilder.group({
      name: [data.name, [Validators.required, Validators.minLength(3)]],
      price: [data.price, [Validators.required]],
      description: [data.description, [Validators.required]],
      categories: [cat, [Validators.required]],
      size: this.formBuilder.array([])
    });

    this.setSize(siz);

    console.log(this.formUpdateProduct);
  }

  /////////////////////////////////////////////////////////////////////

  //methods
  getOneProduct() {
    this.request.getOneProduct(this.id).subscribe(data => {
      console.log(data);
      this.createBuildForm(data);
      //this.categories = data;
    });
  }
  getCategories() {
    this.request.getCategory().subscribe(data => {
      console.log(data);
      this.categories = data;
    });
  }
  getsizes() {
    console.log("a");
    this.request.getSizes().subscribe(data => {
      console.log(data);
      this.sizes = data;
    });
  }

  setSize(size) {
    console.log(size);
    size.map(size => {
      this.sizeItems = this.formUpdateProduct.get("size") as FormArray;
      this.sizeItems.push(this.setCreateSize(size));
    });
  }

  setCreateSize(size): FormGroup {
    console.log(size);
    return this.formBuilder.group({
      name: size.name,
      sizeId: size.sizeId,
      quantity: [size.quantity, Validators.required]
    });
  }

  createSize(size): FormGroup {
    return this.formBuilder.group({
      name: size.size,
      sizeId: size.id,
      quantity: ["", Validators.required]
    });
  }

  addItem(size): void {
    var c = 0;
    var k = this.formUpdateProduct.value.size.map(data => {
      if (data.sizeId != size.id) {
        console.log(data);
        console.log(size.id);
        console.log("diferentes");
        return data;
      } else {
        console.log("repetido");
        c++;
      }
    });
    if (c == 0) {
      this.sizeItems = this.formUpdateProduct.get("size") as FormArray;
      console.log(this.sizeItems);
      this.sizeItems.push(this.createSize(size));
      console.log(this.formUpdateProduct);
    }
  }

  removeItem(id) {
    this.sizeItems.removeAt(id);
  }

  updateProduct() {
    var product = this.formUpdateProduct.value;
    product.user_id = this.request.session.id;
    product.id = this.id;
    console.log(product);
    this.request.updateProducts(product).subscribe(data => {
      console.log(data);
      this.router.navigate(["/admin/products/list"]);
    });
  }
  ////////////////////////////////////////////////
}
