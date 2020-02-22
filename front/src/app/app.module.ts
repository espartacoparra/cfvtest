import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//providers
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

//localServices
import { RequestService } from "./services/request.service";
import { ImageService } from "./services/image.service";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//imports
//import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './components/public/header/header.component';
import { FooterComponent } from './components/public/footer/footer.component';
import { CarouselComponent } from './components/public/carousel/carousel.component';
import { IndexComponent } from './components/public/index/index.component';
import { NavbaradminComponent } from './components/admin/structure/navbaradmin/navbaradmin.component';
import { SiderbaradminComponent } from './components/admin/structure/siderbaradmin/siderbaradmin.component';
import { FooteradminComponent } from './components/admin/structure/footeradmin/footeradmin.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { ProductslistComponent } from './components/admin/products/productslist/productslist.component';

//modulos para formularios
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { CategoryComponent } from './components/admin/category/category.component';
import { SiginComponent } from './components/sigin/sigin.component';
import { ImagesComponent } from './components/admin/images/images.component';
import { PublicComponent } from './components/public/public.component';
import { CardsComponent } from './elements/cards/cards.component';
import { PublicproductComponent } from './components/public/publicproduct/publicproduct.component';
import { PubliccategoriesComponent } from './components/public/publiccategories/publiccategories.component';
import { RegisterproductsComponent } from './components/admin/products/registerproducts/registerproducts.component';
import { EditproductsComponent } from './components/admin/products/editproducts/editproducts.component';
import { PubliccartComponent } from './components/public/publiccart/publiccart.component';
import { ProductComponent } from "./components/public/product/product.component";
import { PublicorderComponent } from './components/public/publicorder/publicorder.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CarouselComponent,
    IndexComponent,
    NavbaradminComponent,
    SiderbaradminComponent,
    FooteradminComponent,
    DashboardComponent,
    ProductslistComponent,
    LoginComponent,
    AdminComponent,
    CategoryComponent,
    SiginComponent,
    ImagesComponent,
    PublicComponent,
    CardsComponent,
    PublicproductComponent,
    PubliccategoriesComponent,
    RegisterproductsComponent,
    EditproductsComponent,
    PubliccartComponent,
    ProductComponent,
    PublicorderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //FontAwesomeModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot()
  ],
  providers: [RequestService, ImageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
