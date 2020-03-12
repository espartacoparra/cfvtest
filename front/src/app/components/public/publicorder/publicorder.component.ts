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
  val = "ok"
  order = { id: '' };
  items: [] = [];
  selects: any[] = [];
  quantity = "";
  total = "";
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
        this.order = data;
        this.total = data.total;
        this.items = data.items;
      }
    });
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
      this.getOrder();
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
    });
  }
}
