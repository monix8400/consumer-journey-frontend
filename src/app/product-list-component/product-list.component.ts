import { Component, OnInit } from '@angular/core';

interface Product {
  name: string;
  description: string;
}

@Component({
  selector: 'app-product-list-component',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [
    { name: 'Product 1', description: 'Description of Product 1' },
    { name: 'Product 2', description: 'Description of Product 2' },
    { name: 'Product 3', description: 'Description of Product 3' }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
