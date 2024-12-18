import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { OrderResponse } from "../interfaces/order/order-response.interface"; 
import { OrderItemsResponse } from "../interfaces/order/order-items.response.interface";
import { Order } from "../interfaces/order/order.interface";
import { OrderItems } from "../interfaces/order/order-items.interface";
import { lastValueFrom } from "rxjs/internal/lastValueFrom";

// CONFIGURACION
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    private _actionUrlsOrder: string;
    private _actionUrlsOrderItems: string;
    constructor(public http: HttpClient) {
        this._actionUrlsOrder = `${environment.URI_SERVER}/Order`;
        this._actionUrlsOrderItems = `${environment.URI_SERVER}/OrderItems`;
    }

    async getByIdOrder(id: number): Promise<OrderResponse> {
        const response = await lastValueFrom(this.http.get(`${this._actionUrlsOrder}/GetById`,
          { params: { id } }));
          return response as OrderResponse;
    }

    async getAllOrder(): Promise<OrderResponse> {
        const response = await lastValueFrom(this.http.get(`${this._actionUrlsOrder}/GetAll`, { }));
          return response as OrderResponse;
    }

    async addOrder(order: Order): Promise<OrderResponse> {
        const response = await lastValueFrom(this.http.post(`${this._actionUrlsOrder}/Insert`, { order }));
          return response as OrderResponse;
    }

    async updateOrder(order: Order): Promise<OrderResponse> {
        const response = await lastValueFrom(this.http.put(`${this._actionUrlsOrder}/Update`,
          { order }));
          return response as OrderResponse;
    }

    async deleteOrder(id: number): Promise<OrderResponse> {
        const response = await lastValueFrom(this.http.delete(`${this._actionUrlsOrder}/Delete`,
          { params: { id } }));
          return response as OrderResponse;
    }
    // ORDER ITEMS
    async getByIdOrderItems(id: number): Promise<OrderItemsResponse> {
        const response = await lastValueFrom(this.http.get(`${this._actionUrlsOrderItems}/GetById`,
          { params: { id } }));
          return response as OrderItemsResponse;
    }

    async getAllOrderItems(): Promise<OrderItemsResponse> {
        const response = await lastValueFrom(this.http.get(`${this._actionUrlsOrderItems}/GetAll`, { }));
          return response as OrderItemsResponse;
    }

    async addOrderItems(orderItems: OrderItems): Promise<OrderItemsResponse> {
        const response = await lastValueFrom(this.http.post(`${this._actionUrlsOrder}/Insert`, { orderItems }));
          return response as OrderItemsResponse;
    }

    async updateOrderItems(orderItems: OrderItems): Promise<OrderItemsResponse> {
        const response = await lastValueFrom(this.http.put(`${this._actionUrlsOrderItems}/Update`,
          { orderItems }));
          return response as OrderItemsResponse;
    }

    async deleteOrderItems(id: number): Promise<OrderItemsResponse> {
        const response = await lastValueFrom(this.http.delete(`${this._actionUrlsOrderItems}/Delete`,
          { params: { id } }));
          return response as OrderItemsResponse;
    }
}