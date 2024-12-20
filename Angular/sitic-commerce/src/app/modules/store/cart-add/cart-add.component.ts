import { Component, OnInit } from '@angular/core';
import { CartItemResponse } from 'src/app/shared/interfaces/cart/cart-items-response.interface';
import { CartItemDetails, CartItems } from 'src/app/shared/interfaces/cart/cart-items.interface';

import { CartsService } from 'src/app/shared/services/carts.service';
import { ProductsService } from 'src/app/shared/services/products.service';
import { OrderService } from 'src/app/shared/services/order.services';
import { SharedService } from 'src/app/shared/services/shared.service'; 

import { eErrorType } from 'src/app/shared/interfaces/comun/enums.interface';
import { Product } from 'src/app/shared/interfaces/products/product.interface';
import { ProductsResponse } from 'src/app/shared/interfaces/products/products-response.interface';
import { Cart } from 'src/app/shared/interfaces/cart/cart.interface';
import { CartResponse } from 'src/app/shared/interfaces/cart/cart-response.interface';
import { Order } from 'src/app/shared/interfaces/order/order.interface';
import { OrderItems } from 'src/app/shared/interfaces/order/order-items.interface';
import { OrderResponse } from 'src/app/shared/interfaces/order/order-response.interface';
import { OrderItemsResponse } from 'src/app/shared/interfaces/order/order-items.response.interface';

import { MatSnackBar } from '@angular/material/snack-bar';


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
    private orderService: OrderService, 
    private sharedService: SharedService, 
    private snackbar: MatSnackBar,
  ) { }


  ngOnInit(): void {
    this.loadCart();
  }

  async loadCart() {
    let cartId = localStorage.getItem('cartId');
    if (cartId != null) {
      const allCartsItems = await this.getAllCartItems();
      const cartItems = allCartsItems.filter(item => item.cartId === parseInt(cartId)) 
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
            imagePath: product.imagepath || 'https://via.placeholder.com/150',
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
    }
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

    if (!this.cartItemsDetail || this.cartItemsDetail.length === 0) {
      return;
    }

    try {
      const newOrder: Order = {
        id: 0,
        totalPrice: this.cartItemsDetail[0].Total || 0,
        status: 'act',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const orderRes = await this.addOrder(newOrder);
      const getOrdes = await this.getAllOrders();
      const maxOrderId = getOrdes.length > 0 ? Math.max(...getOrdes.map(item => item.id)) : null;

      for (const item of this.cartItemsDetail) {
        const orderItem: OrderItems = {
          id: 0,
          orderId: maxOrderId,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        const orderItemRes = await this.orderService.addOrderItems(orderItem);
      }

      this.cartItemsDetail = [];
      this.totalPrice = 0;

      localStorage.removeItem('cartId');
      this.sharedService.showSnackBar(this.snackbar, 'La orden se ha generado correctamente.');

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
      console.error('Error al agregar la orden Item:', err);
      throw err;
    }
  }

  async getAllOrders(): Promise<Order[]> {
    try {
      const resp: OrderResponse = await this.orderService.getAllOrder();
      if (resp.error && resp.error.errorType !== eErrorType.None) {
        console.error(resp.error);
        return [];
      }

      return resp.orders;
    } catch (err) {
      console.error(err);
      return [];
    }
  }



}
