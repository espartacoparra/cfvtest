import { Component, OnInit } from '@angular/core';
import { RequestService } from "../../../../services/request.service";
import { ImageService } from "../../../../services/image.service";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-productslist',
  templateUrl: './productslist.component.html',
  styleUrls: ['./productslist.component.css']
})
export class ProductslistComponent implements OnInit {
  formCreateProduct: FormGroup;
  formUpdateProduct: FormGroup;
  products = [];
  closeResult: string;
  base64textString = [];
  categories = [];

  constructor(private request: RequestService, private modalService: NgbModal, private formBuilder: FormBuilder, private imgService: ImageService) { }

  ngOnInit() {
    this.getProducts();
    this.getCategories()
  }
  //forms
  private createBuildForm() {
    this.formCreateProduct = this.formBuilder.group({
      image: [[], [Validators.required]],
      name: ["", [Validators.required, Validators.minLength(6)]],
      price: ["", [Validators.required]],
      description: ["", [Validators.required]],
      quantity: ["", [Validators.required]],
      categories: ["", [Validators.required]]
    });
    console.log(this.formCreateProduct);
  }

  private updateBuildForm(product) {
    console.log(product);
    var p = product.categories.map(cat => {
      return cat.id;
    });
    this.formUpdateProduct = this.formBuilder.group({
      name: [product.name, [Validators.required, Validators.minLength(6)]],
      price: [product.price, [Validators.required]],
      description: [product.description, [Validators.required]],
      quantity: [product.quantity, [Validators.required]],
      categories: [p, [Validators.required]]
    });
    console.log(this.formUpdateProduct);
  }
  /////////////////////////////////////////////////////////////////////

  //methods
  getProducts() {
    this.request.getProducts().subscribe(data => {
      this.products = data;
      console.log(data);
    });
  }

  getCategories() {
    this.request.getCategory().subscribe(data => {
      console.log(data);
      this.categories = data;
    });
  }


  createProduct() {
    this.formCreateProduct.value.image = this.base64textString;
    var product = this.formCreateProduct.value;
    product.user_id = this.request.session.id;
    this.request.createProducts(product).subscribe(data => {
      console.log(data);
      this.getProducts();
    });
  }

  deleteProduct(product) {
    this.request.deleteProducts(product).subscribe(data => {
      console.log(data);
      this.getProducts();
    });
  }

  updateProduct(p) {
    var product = this.formUpdateProduct.value;
    product.user_id = this.request.session.id;
    product.id = p.id;
    console.log(product);
    this.request.updateProducts(product).subscribe(data => {
      console.log(data);
      this.getProducts();
    }
    );
  }

  /////////////////////////////////////////////////////////////////////

  //modals
  open(content, operation, product) {
    if (product == '') {
      this.createBuildForm();
      console.log('create');
    } else {
      this.updateBuildForm(product);
      console.log('update');
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      switch (operation) {
        case "create":
          this.createProduct();
          break;
        case "update":
          this.updateProduct(product);
          break;

        default:
          break;
      }
    }, (reason) => {

    });
  }
  //////////////////////////////////////////////////////////////////////

  // load image
  onUploadImage(evt: any) {
    var data = this.imgService.onUploadChange(evt);
    this.base64textString = data;
    console.log(data);
    this.formCreateProduct.value.image = data;
    console.log(this.formCreateProduct);
  }



}
