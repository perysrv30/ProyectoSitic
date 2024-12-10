import { Component, Input, OnInit } from '@angular/core';

// Interfaces
import { Product } from 'src/app/shared/interfaces/products/product.interface';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  days = null; 
  created = null;
  @Input() product!: Product;
  constructor() { }
  ngOnInit(): void {
    console.log(this.product);
    this.productNew();
 
    console.log('days ' + this.days);
    console.log('created ' + this.created);
  }

  // Funcion para despues de dos días quitar el new
  productNew(): boolean {
    if (!this.product?.createdAt) return false;
    const today = new Date();
    const createdAt = new Date(this.product.createdAt);
    const twoDays = new Date();
    twoDays.setDate(today.getDate() -2);
    this.created = createdAt;
    this.days = twoDays;
    return createdAt >= twoDays;
  }

  

}
