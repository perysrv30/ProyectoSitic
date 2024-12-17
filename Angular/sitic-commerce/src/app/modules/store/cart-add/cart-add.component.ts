import { Component, OnInit } from '@angular/core';
import { CartItemResponse } from 'src/app/shared/interfaces/cart/cart-items-response.interface';
import { CartItemDetails, CartItems } from 'src/app/shared/interfaces/cart/cart-items.interface';

import { CartsService } from 'src/app/shared/services/carts.service';
import { ProductsService } from 'src/app/shared/services/products.service';

import { eErrorType } from 'src/app/shared/interfaces/comun/enums.interface';
import { Product } from 'src/app/shared/interfaces/products/product.interface';
import { ProductsResponse } from 'src/app/shared/interfaces/products/products-response.interface';


@Component({
  selector: 'app-cart-add',
  templateUrl: './cart-add.component.html',
  styleUrls: ['./cart-add.component.scss']
})
export class CartAddComponent implements OnInit {

  cartItemsDetail: CartItemDetails[] = [];
  product: Product;
  displayedColumns: string[] = [ 'name', 'price', 'quantity'];
  constructor( private cartService: CartsService,
      private productsService: ProductsService
    ) { }

  ngOnInit(): void {
    console.log('El componente CartAdd se está inicializando');
    this.loadCart();
  }

  async loadCart() {
    const allCartsItems = await this.getAllCartItems();
    const cartItems = allCartsItems.filter( item => item.cartId === parseInt('4')) //cartid 

    const detailedCartItems = await Promise.all(cartItems.map(async (item) => {
      const product = await this.getById(item.productId); 
      if (product) {
        return {
          id: item.id,            
          productId: item.productId, 
          name: product.name,        
          price: product.price,      
          quantity: item.quantity,    
        };
      } else {
        
        return {
          id: item.id,              
          productId: item.productId, 
          name: 'Producto no disponible', 
          price: 0,                  
          quantity: item.quantity, 
        };
      }
    }));
  
    this.cartItemsDetail = detailedCartItems;

    //this.cartItems = cartItems;
    console.log('Productos en el carrito:', this.cartItemsDetail);
  }

   async getAllCartItems(): Promise<CartItems[]> {
      try {
        const resp: CartItemResponse = await this.cartService.getAllCartItems();
    
        if (resp.error && resp.error.errorType !== eErrorType.None) {
          console.error(resp.error);
          return [];
        }
    
        return resp.cartItems;
      } catch (err) {
        console.error(err);
        return [];
      }
    }

    async getById(id: number): Promise<Product | null> { 
      try {
        const resp: ProductsResponse = await this.productsService.getById(id);
    
        if (resp.error && resp.error.errorType !== eErrorType.None) {
          console.error(resp.error);
          return null;  
        }
    
        return resp.product;  
      } catch (err) {
        console.error(err);
        return null;  
      }
    }

}
