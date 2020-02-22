import { Component, OnInit } from '@angular/core';
import { RequestService } from "../../../services/request.service";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  formCreateCategory: FormGroup;
  formUpdateCategory: FormGroup;
  categories = [];
  closeResult: string;

  constructor(private request: RequestService, private modalService: NgbModal, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getCategories();
  }

  //forms
  private createBuildForm() {
    this.formCreateCategory = this.formBuilder.group({
      category: ["", [Validators.required, Validators.minLength(6)]]
    });
    console.log(this.formCreateCategory);
  }

  private updateBuildForm(category) {
    console.log(category);
    this.formUpdateCategory = this.formBuilder.group({
      category: [category.category, [Validators.required, Validators.minLength(6)]]
    });
    console.log(this.formUpdateCategory);
  }
  /////////////////////////////////////////////////////////////////////

  //methods
  getCategories() {
    this.request.getCategory().subscribe(data => {
      this.categories = data;
      console.log(data);
    });
  }

  createCategory() {
    var category = this.formCreateCategory.value;
    console.log(category);
    this.request.createCategory(category).subscribe(data => {
      console.log(data);
      this.getCategories();
    });
  }

  updateCategory(category) {
    var cat = this.formUpdateCategory.value;
    cat.id = category.id;
    console.log(cat);
    this.request.updateCategory(cat).subscribe(data => {
      console.log(data);
      this.getCategories();
    });
  }

  deleteProduct(category){
    
  }

  /////////////////////////////////////////////////////////////////////
  //modals
  open(content, operation, category) {
    if (category == '') {
      this.createBuildForm();
      console.log('create');
    } else {
      this.updateBuildForm(category);
      console.log('update');
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      switch (operation) {
        case "create":
          this.createCategory();
          break;
        case "update":
          this.updateCategory(category);
          break;

        default:
          break;
      }
    }, (reason) => {

    });
  }
  //////////////////////////////////////////////////////////////////////

}
