import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { MatFormFieldModule } from '@angular/material/form-field';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { DishService } from './services/dish.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { PromotionService } from './services/promotion.service';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import { DemoMaterialModule } from './shared/material.module';
import { GridListComponent } from './material-example/grid-list/grid-list/grid-list.component';
import { MenuComponent } from './menu/menu.component';
import { Menu2Component } from './menu2/menu2.component';
import { HttpClientModule } from '@angular/common/http'; 
import { baseURL } from './shared/baseurl';
import { ProcessHttpMsgService } from './services/process-http-msg.service';
import { HighlightDirective } from './directives/highlight.directive';


@NgModule({
  imports: [
    DemoMaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    /*MatSliderModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,*/
    FontAwesomeModule,    
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  exports: [
     
  ],
  declarations: [
    AppComponent,
    DishdetailComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    GridListComponent,
    MenuComponent,
    Menu2Component,
    HighlightDirective,
    
  ],
  
  entryComponents: [
    LoginComponent
  ],
  
  providers:
            [DishService,
              PromotionService,
              ProcessHttpMsgService,
              //{provide: 'BaseURL', useValue: baseURL},
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
