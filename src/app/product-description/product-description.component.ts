import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";

interface HoneyProduct {
  name: string;
  description: string;
  imageUrl: string;
}

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.css']
})
export class ProductDescriptionComponent implements OnInit {

  productTitle: string | undefined;
  product: HoneyProduct | undefined;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productTitle = params['productName'];
      this.getProductByName(this.productTitle);
    });
  }

  getProductByName(productName: string | undefined) {
    const url = `http://localhost:8080/personalisedProduct?productName=${productName}`;
    this.http.get<HoneyProduct>(url).subscribe((product) => {
      this.product = product;
    });
  }

}
