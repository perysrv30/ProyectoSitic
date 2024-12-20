import { Component, OnInit } from '@angular/core';

import { OrderService } from 'src/app/shared/services/order.services';
import { ProductsService } from 'src/app/shared/services/products.service';

import { OrderItems } from 'src/app/shared/interfaces/order/order-items.interface';
import { DisplayedOrder, Order } from 'src/app/shared/interfaces/order/order.interface';
import { OrderResponse } from 'src/app/shared/interfaces/order/order-response.interface';

import { eErrorType } from 'src/app/shared/interfaces/comun/enums.interface';
import { OrderItemsResponse } from 'src/app/shared/interfaces/order/order-items.response.interface';
import { ProductsResponse } from 'src/app/shared/interfaces/products/products-response.interface';
import { Product } from 'src/app/shared/interfaces/products/product.interface';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  displayedColumns: DisplayedOrder[] = [];
  loading: boolean = false;

  constructor(private orderService: OrderService,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.getAllOrdersActive();
  }


  async getAllOrdersActive() {
      try {
        this.loading = true;
        const allOrders = await this.getAllOrders();
    
        const activeOrders = allOrders.filter(order => order.status === 'act');
    
        const displayedColumns = await Promise.all(
          activeOrders.map(async (order) => {
            const orderItems = await this.getAllOrderItems();
    
            const relatedItems = orderItems.filter(item => item.orderId === order.id);
            return {
              date: order.updatedAt,
              total: order.totalPrice,
              products: await Promise.all(
                relatedItems.map(async (item) => {
                  const product = await this.getById(item.productId); 
                  return {
                    name: product.name,
                    quantity: item.quantity,
                    price: item.price,
                    imgPath: product.imagePath || 'https://via.placeholder.com/150',
                  };
                })
              ),
            };
          })
        );
    
        this.displayedColumns = displayedColumns;
        this.loading = false;
      } catch (error) {
        console.error('Error al obtener las órdenes activas:', error);
        this.loading = false;
      }
  }
  
  async getAllOrders(): Promise<Order []> {
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

  async getAllOrderItems(): Promise<OrderItems[]> {
    try {
      const resp: OrderItemsResponse = await this.orderService.getAllOrderItems();
      if (resp.error && resp.error.errorType !== eErrorType.None) {
        console.error(resp.error);
        return [];
      }

      return resp.orderItems;
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

    async getAllOrdesUpdt (){
      await this.getAllOrdersActive();
    }

    applySearch(event: Event): void{
      const inputElement = event.target as HTMLInputElement; 
      const query = inputElement.value.trim().toLowerCase(); 
      this.displayedColumns = this.displayedColumns.filter(order => {
        return order.products.some(product =>
          product.name.toLowerCase().includes(query) ||
          product.price.toString().includes(query)
        );
      });
    }

}
