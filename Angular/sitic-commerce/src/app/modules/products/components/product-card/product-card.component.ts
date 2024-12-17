import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

import { ProductsService } from 'src/app/shared/services/products.service';

// Interfaces
import { Product } from 'src/app/shared/interfaces/products/product.interface';
import { ProductsResponse } from 'src/app/shared/interfaces/products/products-response.interface';
import { Cart } from 'src/app/shared/interfaces/cart/cart.interface';
import { CartItems } from 'src/app/shared/interfaces/cart/cart-items.interface';
import { eErrorType, eScreenStatus } from 'src/app/shared/interfaces/comun/enums.interface';
@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  days = null; 
  created = null;
  cartItems: CartItems[]=[];
  loading: boolean = false;

  @Input() product!: Product;
  @Output() addToCart: EventEmitter<any> = new EventEmitter();

  products: Product[] = [];

  constructor( private productsService: ProductsService) { }
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


  onAddToCart() {
    this.loading = true;
    this.addToCart.emit(this.product);  //emitir del padre 
    this.loading = false;
  }
  

  async getAllProducts() {
      this.loading = true;
      await this.productsService.getAllProducts().then((resp: ProductsResponse) => {
        this.loading = false;
        if (resp.error && resp.error.errorType !== eErrorType.None) {
          console.error(resp.error);
          return;
        }
  
        this.products = resp.products;  // Aquí actualizas el arreglo de productos
        console.log(this.products);
      }).catch((err) => {
        this.loading = false;
        console.error(err);
      });
    }

}
