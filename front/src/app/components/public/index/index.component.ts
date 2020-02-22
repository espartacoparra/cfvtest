import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  urlFrontimagesfront = environment.urlFrontImages;
  images = ["http://localhost:4200/assets/imagesfront/val9.jpeg", "http://localhost:4200/assets/imagesfront/val3.jpeg", "http://localhost:4200/assets/imagesfront/val4.jpeg", "http://localhost:4200/assets/imagesfront/val5.jpeg", "http://localhost:4200/assets/imagesfront/val7.jpeg", "http://localhost:4200/assets/imagesfront/val8.jpeg"];
  products = [];
  constructor(private request: RequestService) {

  }

  ngOnInit() {
    this.getProductsPopulars();
  }

  getProductsPopulars() {
    this.request.getProductsPopular().subscribe(data => {
      console.log(data);
      this.products = data;
    });
  }
}
