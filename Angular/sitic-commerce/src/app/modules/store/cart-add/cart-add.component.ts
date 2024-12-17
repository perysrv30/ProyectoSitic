import { Component, OnInit } from '@angular/core';
import { CartItemResponse } from 'src/app/shared/interfaces/cart/cart-items-response.interface';
import { CartItemDetails, CartItems } from 'src/app/shared/interfaces/cart/cart-items.interface';
import { ChangeDetectorRef } from '@angular/core';

import { CartsService } from 'src/app/shared/services/carts.service';
import { ProductsService } from 'src/app/shared/services/products.service';

import { eErrorType } from 'src/app/shared/interfaces/comun/enums.interface';
import { Product } from 'src/app/shared/interfaces/products/product.interface';
import { ProductsResponse } from 'src/app/shared/interfaces/products/products-response.interface';
import { Cart } from 'src/app/shared/interfaces/cart/cart.interface';
import { CartResponse } from 'src/app/shared/interfaces/cart/cart-response.interface';


@Component({
  selector: 'app-cart-add',
  templateUrl: './cart-add.component.html',
  styleUrls: ['./cart-add.component.scss']
})
export class CartAddComponent implements OnInit {

  cartItemsDetail: CartItemDetails[] = [];
  selectedItem: CartItemDetails[] | null = null;
  product: Product;
  cart : Cart;
  totalPrice: number = 0;

  displayedColumns: string[] = [ 'name', 'price', 'quantity'];
  constructor( private cartService: CartsService,
      private productsService: ProductsService,
      private cdRef: ChangeDetectorRef
    ) { }

  
  ngOnInit(): void {
    console.log('El componente CartAdd se está inicializando');
    this.loadCart();
  }

  async loadCart() {
    //this.updateCart();
    const allCartsItems = await this.getAllCartItems();
    const cartId = '4';
    const cartItems = allCartsItems.filter( item => item.cartId === parseInt(cartId)) //cartid 
    const carts = await this.getByIdCart(parseInt(cartId));

    if (carts && carts.totalPrice !== null && carts.totalPrice !== undefined) {
      this.totalPrice = carts.totalPrice;
    } else {
      this.totalPrice = 0;
    }
    const detailedCartItems = await Promise.all(cartItems.map(async (item) => {
      const product = await this.getById(item.productId); 
      if (product) {
        return {
          id: item.id,            
          productId: item.productId, 
          name: product.name,        
          price: product.price,      
          quantity: item.quantity,
          imagePath: product.imagePath, 
          Total: carts.totalPrice    
        };
      } else {
        
        return {
          id: item.id,              
          productId: item.productId, 
          name: 'Producto no disponible', 
          price: 0,                  
          quantity: item.quantity, 
          imagePath: null,
          Total: 0
        };
      }
    }));
  
    this.cartItemsDetail = detailedCartItems;
    
    //this.cartItems = cartItems;
    console.log('Productos en el carrito:', this.cartItemsDetail);
  }
  updateCart(){
    this.loadCart();
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

    async getByIdCart(id: number): Promise<Cart | null> {
      try {
        const resp: CartResponse = await this.cartService.getByIdCart(id);
        
        if (resp.error && resp.error.errorType !== eErrorType.None) {
          console.error(resp.error);
          return null; 
        }
    
        this.cart = resp.cart; 
        return resp.cart; 
    
      } catch (err) {
        console.error(err);
        return null; 
      }
    }

    selectItem(item: CartItemDetails): void {
      this.selectedItem = this.cartItemsDetail;
    }

    async ConfirmOrder(): Promise<void>{
      console.log('ítem:', this.cartItemsDetail);
      if (this.cartItemsDetail) {
        console.log('Orden confirmada para el ítem:', this.cartItemsDetail);
      } else {
        console.log('No se seleccionó ningún ítem');
      }
    }


}
