import { Component, OnInit } from '@angular/core';
import { CartItemResponse } from 'src/app/shared/interfaces/cart/cart-items-response.interface';
import { CartItemDetails, CartItems } from 'src/app/shared/interfaces/cart/cart-items.interface';
import { ChangeDetectorRef } from '@angular/core';

import { CartsService } from 'src/app/shared/services/carts.service';
import { ProductsService } from 'src/app/shared/services/products.service';
import { OrderService } from 'src/app/shared/services/order.services';

import { eErrorType } from 'src/app/shared/interfaces/comun/enums.interface';
import { Product } from 'src/app/shared/interfaces/products/product.interface';
import { ProductsResponse } from 'src/app/shared/interfaces/products/products-response.interface';
import { Cart } from 'src/app/shared/interfaces/cart/cart.interface';
import { CartResponse } from 'src/app/shared/interfaces/cart/cart-response.interface';
import { Order } from 'src/app/shared/interfaces/order/order.interface';
import { OrderItems } from 'src/app/shared/interfaces/order/order-items.interface';
import { OrderResponse } from 'src/app/shared/interfaces/order/order-response.interface';
import { OrderItemsResponse } from 'src/app/shared/interfaces/order/order-items.response.interface';


@Component({
  selector: 'app-cart-add',
  templateUrl: './cart-add.component.html',
  styleUrls: ['./cart-add.component.scss']
})
export class CartAddComponent implements OnInit {

  cartItemsDetail: CartItemDetails[] = [];
  selectedItem: CartItemDetails[] | null = null;
  product: Product;
  cart: Cart;
  totalPrice: number = 0;
  order: Order;
  orderItems: OrderItems[] = [];

  displayedColumns: string[] = ['name', 'price', 'quantity'];
  constructor(private cartService: CartsService,
    private productsService: ProductsService,
    private orderService: OrderService
  ) { }


  ngOnInit(): void {
    console.log('El componente CartAdd se está inicializando');
    this.loadCart();
  }

  async loadCart() {
    //this.updateCart();
    const allCartsItems = await this.getAllCartItems();
    const cartId = '4';
    const cartItems = allCartsItems.filter(item => item.cartId === parseInt(cartId)) //cartid
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
  updateCart() {
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

  async ConfirmOrder(): Promise<void> {

    // una vez confirmada la orden que se resete el cartId
    // console.log('ítem:', this.cartItemsDetail);
    // if (this.cartItemsDetail) {
    //   console.log('Orden confirmada para el ítem:', this.cartItemsDetail);
    // } else {
    //   console.log('No se seleccionó ningún ítem');
    // }
    if (!this.cartItemsDetail || this.cartItemsDetail.length === 0) {
      console.log('No se seleccionó ningún ítem');
      return;
    }

    try {
      // se crea nueva orden 
      const newOrder: Order = {
        id: 0,
        totalPrice: this.cartItemsDetail[0].Total || 0,
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const orderRes = await this.addOrder(newOrder);

      const orderId = orderRes.createdAt;
      console.log('Orden creada con ID:', orderId);
      // se crea nuevos order items
      // for (const item of this.cartItemsDetail) {
      //   const orderItem: OrderItems = {
      //     id: 0,
      //     OrderId: orderId,
      //     productId: item.productId,
      //     quantity: item.quantity,
      //     price: item.price,
      //     createdAt: new Date(),
      //     updatedAt: new Date(),
      //   };
      //   const orderItemRes = await this.orderService.addOrderItems(orderItem);
      //   console.log('Ítem agregado a la orden:', orderItemRes);
      // }

    } catch (error) {
      console.error('Error al confirmar la orden:', error);
    }

  }

  async addOrder(order: Order): Promise<Order> {
    try {
      const resp: OrderResponse = await this.orderService.addOrder(order);
      if (resp.error && resp.error.errorType !== eErrorType.None) {
        console.error('Error en la respuesta del servidor:', resp.error);
        throw new Error(resp.error.message);
      }
      return resp.order;
    } catch (err) {
      console.error('Error al agregar la orden:', err);
      throw err;
    }
  }

  async addOrderItems(orderItem: OrderItems): Promise<OrderItems> {
    try {
      const resp: OrderItemsResponse = await this.orderService.addOrderItems(orderItem);
      if (resp.error && resp.error.errorType !== eErrorType.None) {
        console.error('Error en la respuesta del servidor:', resp.error);
        throw new Error(resp.error.message);
      }
      return resp.orderItem;
    } catch (err) {
      console.error('Error al agregar la orden:', err);
      throw err;
    }
  }



}
