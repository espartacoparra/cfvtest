import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageService } from 'src/app/services/image.service';
@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {
  product = { id: '' ,name:"",images:[]};
  formCreateImage: FormGroup;
  formUpdateImage: FormGroup;
  base64textString: any;
  constructor(private activedroute: ActivatedRoute, private imgService: ImageService, private request: RequestService, private modalService: NgbModal, private formBuilder: FormBuilder) {
    var id = this.activedroute.snapshot.paramMap.get('product');
    this.getProduct(id);
  }
  ngOnInit() {
  }
  //forms
  private createBuildForm() {
    this.formCreateImage = this.formBuilder.group({
      image: [[], [Validators.required, Validators.minLength(6)]]
    });
    console.log(this.formCreateImage);
  }
  private updateBuildForm(category) {
    console.log(category);
    this.formUpdateImage = this.formBuilder.group({
      image: [[], [Validators.required, Validators.minLength(6)]]
    });
    console.log(this.formUpdateImage);
  }
  /////////////////////////////////////////////////////////////////////
  //methods
  getProduct(id) {
    this.request.getProductsGalery(id).subscribe(data => {
      this.product = data;
      console.log(data);
    });
  }
  createImage() {
    var product = { product_id: this.product.id, image: this.formCreateImage.value.image };
    console.log(product);
    this.request.createProductsGalery(product).subscribe(data => {
      console.log(data);
      this.getProduct(this.product.id);
    });
  }
  updateImage(image) {
    var product = { old: image, product_id: this.product.id, image: this.formUpdateImage.value.image };
    this.request.updateProductsGalery(product).subscribe(data => {
      console.log(data);
      this.getProduct(this.product.id);
    });
  }
  deleteImage(image) {
    this.request.deleteProductsGalery(image).subscribe(data => {
      console.log(data);
      this.getProduct(this.product.id);
    });
  }
  /////////////////////////////////////////////////////////////////////
  //modals
  open(content, operation, image) {
    if (image == '') {
      this.createBuildForm();
      console.log('create');
    } else {
      this.updateBuildForm(image);
      console.log('update');
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      switch (operation) {
        case "create":
          this.createImage();
          break;
        case "update":
          this.updateImage(image);
          break;

        default:
          break;
      }
    }, (reason) => {

    });
  }
  //////////////////////////////////////////////////////////////////////
  // load image
  onUploadImage(evt: any, type) {
    var data = this.imgService.onUploadChange(evt);
    this.base64textString = data;
    console.log(data);
    if (type == 'create')
      this.formCreateImage.value.image = data;
    else
      this.formUpdateImage.value.image = data;

  }
  /////////////////////////////////////////////////////////
}
