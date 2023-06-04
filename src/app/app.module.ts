import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatStepperModule} from "@angular/material/stepper";
import {MatIconModule} from "@angular/material/icon";

import {AppComponent} from './app.component';
import {DmnEvaluationComponent} from './dmn-evaluation/dmn-evaluation.component';
import {MatSelectModule} from "@angular/material/select";
import { Faq } from './faq/faq';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";


@NgModule({
  declarations: [
    AppComponent,
    DmnEvaluationComponent,
    Faq
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
