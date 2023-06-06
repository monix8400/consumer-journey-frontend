import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {last} from "rxjs";

interface Product {
  name: string;
  description: string;
  imageUrl: string
}

@Component({
  selector: 'app-product-list-component',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.fetchHoneyList();
  }

  fetchHoneyList(): void {
    this.http.get<Product[]>('http://localhost:8080/productList').subscribe(
      (response: Product[]) => {
        this.products = response;
        console.log(this.products)
      },
      (error: any) => {
        console.error('Failed to fetch honey list:', error);
      }
    );
  }

}
