import { Component, OnInit } from '@angular/core';

// Servicios
import { ProductsService } from 'src/app/shared/services/products.service';

// Interfaces
import { Product } from 'src/app/shared/interfaces/products/product.interface';
import { ProductsResponse } from 'src/app/shared/interfaces/products/products-response.interface';
import { eErrorType } from 'src/app/shared/interfaces/comun/enums.interface';
import { CartResponse } from 'src/app/shared/interfaces/cart/cart-response.interface';
import { CartItemResponse } from 'src/app/shared/interfaces/cart/cart-items-response.interface';
import { CartsService } from 'src/app/shared/services/carts.service';
import { Cart } from 'src/app/shared/interfaces/cart/cart.interface';
import { CartItems } from 'src/app/shared/interfaces/cart/cart-items.interface';
import { SharedService } from 'src/app/shared/services/shared.service';
import { parse } from 'path';
@Component({
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
    let cartId = localStorage.getItem('cartId') || '4' 
    console.log(`CartId: ${cartId}`);
    try {
       if (cartId) {
        // Recuperar carrito existente - /Cart/GetById
        await this.getByIdCart(parseInt(cartId));
        console.log('Carrito existente');
      } else {
        // Crear un nuevo carrito - /Cart/Insert
        const newCart: Cart = {
          id: 0, 
          totalPrice: 100, 
          createdAt: new Date(),
          updatedAt: new Date()
        };
        const newCartResp = await this.addCart(newCart);

        cartId = newCartResp.id.toString();

        this.sharedService.getItemLocalStorage(cartId)
        console.log(' se crea nuevo carrito');
      }
      console.log('busquda de  items');
      const allCartItems = await this.getAllCartItems();
      const cartItems = allCartItems.filter( item => item.cartId === parseInt(cartId)) 
      // Verificar si el producto ya está en el carrito
      const existingItem = cartItems.find(item => item.productId === product.id); // aqui mandan llamar su servicio que obtiene los elementos del carrito

      if (existingItem) {
        // Actualizar cantidad /CartItem/Update
        // existingItem.quantity++;
        console.log('Producto existente ');
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
        console.log('CartItem actualizado');
      } else {
        // Agregar nuevo producto al carrito - /CartItem/Insert

        console.log('agregando al carrito no exitse el producto');

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
        console.log('nuevo producto ');
      };
      this.getAllProducts();
    } catch (error) {
      console.error('Error al agregar producto al carrito: ', error);
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
  
      //this.dialogRef.close({ refreshProducts: true, product: this.product });
      console.log('se agrego nuevo carrito item')
  
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
          throw new Error('Error al crear carrito'); // Lanza un error explícito
        }
  
        console.log('Carrito creado con éxito:', resp.cart);
        return resp.cart; // Retorna el carrito creado con su ID
      })
      .catch((err) => {
        this.loading = false;
        console.error('Error al agregar carrito:', err);
        throw err; // Propaga el error para manejarlo arriba
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
      console.log('se actualizo carrito Items')
      //this.dialogRef.close({ refreshProducts: true, product: this.product });
  
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
}
