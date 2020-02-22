import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { RequestService } from "src/app/services/request.service";
import { ImageService } from "src/app/services/image.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-registerproducts",
  templateUrl: "./registerproducts.component.html",
  styleUrls: ["./registerproducts.component.css"]
})
export class RegisterproductsComponent implements OnInit {
  formCreateProduct: FormGroup;
  sizeItems: FormArray;

  products = [];
  closeResult: string;
  base64textString = [];
  categories = "";
  sizes = "";
  dataSize = [];
  selectSize = [];
  constructor(
    private router: Router,
    private request: RequestService,
    private formBuilder: FormBuilder,
    private imgService: ImageService
  ) {}

  ngOnInit() {
    this.createBuildForm();
    this.getCategories();
    this.getsizes();
  }

  //forms
  private createBuildForm() {
    this.formCreateProduct = this.formBuilder.group({
      image: [[], [Validators.required]],
      name: ["", [Validators.required, Validators.minLength(6)]],
      price: ["", [Validators.required]],
      description: ["", [Validators.required]],
      categories: ["", [Validators.required]],
      size: this.formBuilder.array([]),
    });
    console.log(this.formCreateProduct);
  }

  /////////////////////////////////////////////////////////////////////

  //methods
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

  createProduct() {
    this.formCreateProduct.value.image = this.base64textString;
    var product = this.formCreateProduct.value;
    product.user_id = this.request.session.id;
    console.log(product);
    this.request.createProducts(product).subscribe(data => {
      console.log(data);
      this.router.navigate(["/admin/products/list"]);
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
    var k = this.formCreateProduct.value.size.map(data => {
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
      this.sizeItems = this.formCreateProduct.get("size") as FormArray;
      console.log(this.sizeItems);
      this.sizeItems.push(this.createSize(size));
      console.log(this.formCreateProduct);
    }
  }

  removeItem(id) {
    this.sizeItems.removeAt(id);
  }

  ////////////////////////////////////////////////
  // load image
  onUploadImage(evt: any) {
    var data = this.imgService.onUploadChange(evt);
    this.base64textString = data;
    console.log(data);
    this.formCreateProduct.value.image = data;
    console.log(this.formCreateProduct);
  }
}
