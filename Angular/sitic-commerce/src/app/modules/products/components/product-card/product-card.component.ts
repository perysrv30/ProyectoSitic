import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

// Interfaces
import { Product } from 'src/app/shared/interfaces/products/product.interface';
import { Cart } from 'src/app/shared/interfaces/cart/cart.interface';
import { CartItems } from 'src/app/shared/interfaces/cart/cart-items.interface';
@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  days = null; 
  created = null;
  cartItems: CartItems[]=[];

  @Input() product!: Product;
  @Output() addToCart: EventEmitter<any> = new EventEmitter();
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


  onAddToCart() {
    this.addToCart.emit(this.product);  //emitir del padre 
  }
  
  // addCart(product) {
  //   const storedCart = sessionStorage.getItem('cart');
  //   this.cartItems = storedCart ? JSON.parse(storedCart) : [];

  //   si ya existe
  //   const existingProduct = this.cartItems.find(item => item.Id === product.id);


  //   if (existingProduct) {
  //     Incrementar la cantidad si ya existe
  //     existingProduct.Quantity++;
  //   } else {
  //     Agregar un nuevo producto al carrito
  //     this.cartItems.push({
  //       ProductId: product.id,
  //       Price: product.price,
  //       Quantity: 1,
  //       Id: 0,
  //       createdAt: new(Date),
  //       updatedAt: null,
  //       CartId: 0
  //     });
  //   }

  //   sessionStorage.setItem('cart Items', JSON.stringify(this.cartItems));
  //   console.log(`${product.name} se agregó al carrito.`);
  // }
  

}
