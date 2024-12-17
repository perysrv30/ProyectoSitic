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
export class ProductsService {

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

    async getAllProductsOrder(): Promise<OrderResponse> {
        const response = await lastValueFrom(this.http.get(`${this._actionUrlsOrder}/GetAll`, { }));
          return response as OrderResponse;
    }

    async addProductOrder(order: Order): Promise<OrderResponse> {
        const response = await lastValueFrom(this.http.post(`${this._actionUrlsOrder}/Insert`, { order }));
          return response as OrderResponse;
    }

    async updateProductOrder(order: Order): Promise<OrderResponse> {
        const response = await lastValueFrom(this.http.put(`${this._actionUrlsOrder}/Update`,
          { order }));
          return response as OrderResponse;
    }

    async deleteProductOrder(id: number): Promise<OrderResponse> {
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

    async getAllProductsOrderItems(): Promise<OrderItemsResponse> {
        const response = await lastValueFrom(this.http.get(`${this._actionUrlsOrderItems}/GetAll`, { }));
          return response as OrderItemsResponse;
    }

    async addProductOrderItems(orderItems: OrderItems): Promise<OrderItemsResponse> {
        const response = await lastValueFrom(this.http.post(`${this._actionUrlsOrder}/Insert`, { orderItems }));
          return response as OrderItemsResponse;
    }

    async updateProductOrderItems(orderItems: OrderItems): Promise<OrderItemsResponse> {
        const response = await lastValueFrom(this.http.put(`${this._actionUrlsOrderItems}/Update`,
          { orderItems }));
          return response as OrderItemsResponse;
    }

    async deleteProductOrderItems(id: number): Promise<OrderItemsResponse> {
        const response = await lastValueFrom(this.http.delete(`${this._actionUrlsOrderItems}/Delete`,
          { params: { id } }));
          return response as OrderItemsResponse;
    }
}