import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';

import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatStepperModule} from "@angular/material/stepper";
import {MatIconModule} from "@angular/material/icon";

import {AppComponent} from './app.component';
import {DmnEvaluationComponent} from './dmn-evaluation/dmn-evaluation.component';
import {MatSelectModule} from "@angular/material/select";
import {Faq} from './faq/faq';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {ProductDescriptionComponent} from './product-description/product-description.component';
import {MainPageComponent} from './main-page/main-page.component';
import {ProductListComponent} from './product-list-component/product-list.component';
import {MatListModule} from "@angular/material/list";


@NgModule({
  declarations: [
    AppComponent,
    DmnEvaluationComponent,
    Faq,
    ProductDescriptionComponent,
    MainPageComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatStepperModule,
    MatSelectModule,
    MatExpansionModule,
    MatCardModule,
    MatToolbarModule,
    AppRoutingModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
