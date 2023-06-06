import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'consumer-journey-frontend';

  constructor(private router:Router) { }
  goToCurrentPage() {
    this.router.navigate(['product-list']);
  }

  goToMainPage() {
    this.router.navigate(['']);
  }
}
