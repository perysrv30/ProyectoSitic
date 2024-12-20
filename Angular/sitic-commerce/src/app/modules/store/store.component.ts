import { Component, OnInit } from '@angular/core';

import { ProductsService } from 'src/app/shared/services/products.service';
import { CartsService } from 'src/app/shared/services/carts.service';

import { Product } from 'src/app/shared/interfaces/products/product.interface';
import { ProductsResponse } from 'src/app/shared/interfaces/products/products-response.interface';
import { eErrorType } from 'src/app/shared/interfaces/comun/enums.interface';
import { CartResponse } from 'src/app/shared/interfaces/cart/cart-response.interface';
import { CartItemResponse } from 'src/app/shared/interfaces/cart/cart-items-response.interface';
import { Cart } from 'src/app/shared/interfaces/cart/cart.interface';
import { CartItems } from 'src/app/shared/interfaces/cart/cart-items.interface';
import { SharedService } from 'src/app/shared/services/shared.service';@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  loading: boolean = false;
  productList: Product[] = [];
  cart: Cart;
  listCartItems: CartItems[] = [];
  constructor(private productsService: ProductsService, private cartService: CartsService,
    private sharedService: SharedService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getAllProducts();
  }

  async getAllProducts() {
    this.loading = true;
    await this.productsService.getAllProducts().then((resp: ProductsResponse) => {
      this.loading = false;
      if (resp.error && resp.error.errorType !== eErrorType.None) {
        console.error(resp.error);
        return;
      }

      this.productList = resp.products;
    }).catch((err) => {
      this.loading = false;
      console.error(err);
    });
  }

  updateProductList(product: Product) {
    this.getAllProducts(); 
  }

   async addToCart(product: Product) {
    let cartId = localStorage.getItem('cartId'); 
    try {
       if (cartId) {
        await this.getByIdCart(parseInt(cartId));
      } else {
        const newCart: Cart = {
          id: 0, 
          totalPrice: 0, 
          createdAt: new Date(),
          updatedAt: new Date()
        };
        await this.addCart(newCart);
        const getCarts = await this.getAllCart();
        const newCartMax = getCarts.length > 0 ? Math.max(...getCarts.map(item => item.id)) : null;
        cartId = newCartMax.toString();
        localStorage.setItem('cartId', cartId); 
      }
      const allCartItems = await this.getAllCartItems();
      const cartItems = allCartItems.filter( item => item.cartId === parseInt(cartId)) 
      const existingItem = cartItems.find(item => item.productId === product.id); 

      if (existingItem) {
        const updatedCartItem: CartItems = {
          id: existingItem.id,
          cartId: existingItem.cartId,
          productId: existingItem.productId,
          quantity: existingItem.quantity + 1, 
          price: existingItem.price,          
          createdAt: existingItem.createdAt,  
          updatedAt: new Date()               
        };

        await this.cartService.updateCartItem(updatedCartItem);
      } else {
        const newCartItem: CartItems = {
          id: 0,                            
          cartId: parseInt(cartId),
          productId: product.id,
          quantity: 1,                       
          price: product.price,              
          createdAt: new Date(),
          updatedAt: new Date()
        }; 

        await this.cartService.addCartItem(newCartItem);
      };
      this.getAllProducts();
    } catch (error) {
    }
    
  }

  async getByIdCart(id: number) {
    this.loading = true;
    await this.cartService.getByIdCart(id).then((resp: CartResponse) => {
      this.loading = false;
      if (resp.error && resp.error.errorType !== eErrorType.None) {
        console.error(resp.error);
        return;
      }
  
      this.cart = resp.cart;

    }).catch((err) => {
      this.loading = false;
      console.error(err);
    });
  }

  async addCratItem(cartItem : CartItems) {
    this.loading = true;
    this.cartService.addCartItem(cartItem).then((resp: CartItemResponse) => {
      this.loading = false;
      if (resp.error && resp.error.errorType !== eErrorType.None) {
        console.error(resp.error);
        return;
      }
  
    }).catch((err) => {
      console.error(err);
    });
  }

  async addCart(cart: Cart): Promise<Cart> {
    this.loading = true;
    return this.cartService.addCart(cart)
      .then((resp: CartResponse) => {
        this.loading = false;
  
        if (resp.error && resp.error.errorType !== eErrorType.None) {
          console.error('Error al crear carrito:', resp.error);
          throw new Error('Error al crear carrito'); 
        }
        return resp.cart; 
      })
      .catch((err) => {
        this.loading = false;
        console.error('Error al agregar carrito:', err);
        throw err;
      });
  }

  async updateCartItem(cartItem: CartItems) {
    this.loading = true;
    this.cartService.updateCartItem(cartItem).then((resp: CartItemResponse) => {
      this.loading = false;
      if (resp.error && resp.error.errorType !== eErrorType.None) {
        console.error(resp.error);
        return;
      }
  
    }).catch((err) => {
      console.error(err);
    });
  }

  async getAllCartItems(): Promise<CartItems[]> {
    this.loading = true;
    try {
      const resp: CartItemResponse = await this.cartService.getAllCartItems();
      this.loading = false;
  
      if (resp.error && resp.error.errorType !== eErrorType.None) {
        console.error(resp.error);
        return [];
      }
  
      return resp.cartItems;
    } catch (err) {
      this.loading = false;
      console.error(err);
      return [];
    }
  }

  sendIdLocal(id: string){
    return this.sharedService.getItemLocalStorage(id);
  }

  async getAllCart(): Promise<Cart []> {
      try {
        const resp: CartResponse = await this.cartService.getAllCart();
        if (resp.error && resp.error.errorType !== eErrorType.None) {
          console.error(resp.error);
          return [];
        }
  
        return resp.carts;
      } catch (err) {
        console.error(err);
        return [];
      }
    }
}
