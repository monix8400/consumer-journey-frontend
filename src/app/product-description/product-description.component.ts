import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.css']
})
export class ProductDescriptionComponent implements OnInit {

  productTitle: string | undefined;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productTitle = params['productName'];
      // Do something with the productId, such as fetching data or setting component properties
    });
  }

}
