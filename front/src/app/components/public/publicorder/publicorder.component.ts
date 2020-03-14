import { Component, OnInit } from '@angular/core';
import { RequestService } from "../../../services/request.service";
import { Router } from '@angular/router';
import { ToastsService } from 'src/app/services/toasts.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-publicorder',
  templateUrl: './publicorder.component.html',
  styleUrls: ['./publicorder.component.css']
})
export class PublicorderComponent implements OnInit {
  formCreatePay: FormGroup;
  val = "empy"
  order = { id: '', total: 0, items: [] };
  items: [] = [];
  selects: any[] = [];
  quantity = "";
  total = 0;
  oferts: any[];
  fill = "fill";
  base64textString: any[];
  imgName = "";
  constructor(private imgService: ImageService, private request: RequestService, private router: Router, private toasts: ToastsService, private modalService: NgbModal, private formBuilder: FormBuilder, ) { }

  ngOnInit() {
    this.getOrder();
    this.getOferts();
    this.createBuildForm();
  }
  //form

  createBuildForm() {
    this.formCreatePay = this.formBuilder.group({
      name: ["", [Validators.required]],
      ref: ["", [Validators.required]],
      address: ["", [Validators.required]],
      image: ["", [Validators.required]]
    });
  }

  //end form

  getOrder() {
    this.request.getOrder().subscribe(data => {
      console.log(data);
      if (data == 'empy') {
        this.val = 'empy';
      } else {
        this.val = 'ok';
        this.order = data;
        this.total = this.getTotal(data);
        this.items = data.items;
      }
    });
  }

  getTotal(data) {
    var total = 0;
    this.order.items.map((item: any) => {
      item.price = item.product.price;
      total += item.product.price * item.quantity;
      return item;
    });
    console.log(this.order);
    this.order.total = total;
    return total;

  }

  getOferts() {
    this.request.getProductsOferts().subscribe(data => {
      console.log(data);
      this.oferts = data;
    });
  }

  deleteOrder() {
    this.request.deleteOrder(this.order).subscribe(data => {
      console.log(data);
      this.val = 'empy';
      this.getOrder();
      this.getOferts();
    });
  }
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      console.log(this.request.session);
      this.deleteOrder();
    }, (reason) => {
      console.log(reason);
    });
  }

  onUploadImage(evt: any) {
    console.log(evt);
    this.imgName = evt.target.files[0].name;
    var data = this.imgService.onUploadChange(evt);
    this.base64textString = data;
    this.formCreatePay.value.image = data;
  }

  payOrder() {
    this.formCreatePay.value.order_id = this.order.id;
    console.log(this.formCreatePay.value);
    this.request.payOrder(this.formCreatePay.value).subscribe(data => {
      console.log(data);
      this.getOrder();
      this.getOferts();
      this.createBuildForm();
      this.imgName = "";
    });
  }
}
