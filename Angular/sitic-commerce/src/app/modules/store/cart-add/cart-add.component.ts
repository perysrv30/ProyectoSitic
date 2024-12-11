import { Component, OnInit } from '@angular/core';
import { CartItems } from 'src/app/shared/interfaces/cart/cart-items.interface';

@Component({
  selector: 'app-cart-add',
  templateUrl: './cart-add.component.html',
  styleUrls: ['./cart-add.component.scss']
})
export class CartAddComponent implements OnInit {

  cartItems: CartItems[] = [];

  ngOnInit(): void {
    console.log('El componente CartAdd se está inicializando');
    this.loadCart();
  }

  loadCart() {
    const storedCart = sessionStorage.getItem('cart');
    this.cartItems = storedCart ? JSON.parse(storedCart) : [];
    console.log('Productos en el carrito:', this.cartItems);
  }

}
