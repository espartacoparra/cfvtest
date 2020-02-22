import { Component, OnInit } from '@angular/core';
import { RequestService } from "../../../services/request.service";
@Component({
  selector: 'app-publiccategories',
  templateUrl: './publiccategories.component.html',
  styleUrls: ['./publiccategories.component.css']
})
export class PubliccategoriesComponent implements OnInit {

  categories = [];
  sizes = [];
  products = [];
  cat = [];
  siz = [];
  constructor(private request: RequestService) { }

  ngOnInit() {
    console.log('hola');
    this.getAllCategories();
    this.getAllSizes();
    this.getAllProducts({ query: 0 });
  }
  getAllCategories() {
    this.request.getCategory().subscribe(data => {
      this.categories = data;
      console.log(data);
    });
  }
  getAllSizes() {
    this.request.getSizes().subscribe(data => {
      this.sizes = data;
      console.log(data);
    });
  }
  getAllProducts(query) {
    this.request.getAllForCategories(query).subscribe(data => {
      this.products = data;
      console.log(data);
    });
  }

  generateQuery() {
    var query = { query: 1, categories: this.cat, sizes: this.siz }
    this.getAllProducts(query);
  }

  selectCategory(id) {
    if (this.cat.length > 0) {
      var c = 0;
      this.cat = this.cat.filter(e => {
        if (e.id != id) {
          c++;
          return e;
        } else {
          c--;
        }
      });
      if (c == this.cat.length) {
        this.cat.push({ id: id });
      }
    } else {
      this.cat.push({ id: id });
    }
    this.generateQuery()
    console.log(this.cat);
  }

  selectSize(id) {
    if (this.siz.length > 0) {
      var c = 0;
      this.siz = this.siz.filter(e => {
        if (e.id != id) {
          c++;
          return e;
        } else {
          c--;
        }
      });
      if (c == this.siz.length) {
        this.siz.push({ id: id });
      }
    } else {
      this.siz.push({ id: id });
    }
    this.generateQuery()
    console.log(this.siz);
  }

}
