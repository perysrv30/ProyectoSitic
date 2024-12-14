import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CartResponse } from "../interfaces/cart/cart-response.interface";
import { CartItemResponse } from "../interfaces/cart/cart-items-response.interface";
import { Cart } from "../interfaces/cart/cart.interface";
import { CartItems } from "../interfaces/cart/cart-items.interface";
import { lastValueFrom } from "rxjs/internal/lastValueFrom";


// CONFIGURACION
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CartsService {
    private _actionUrlsCart: string;
    private _actionUrlsCartItem: string;
    constructor(public http: HttpClient) {
        this._actionUrlsCart = `${environment.URI_SERVER}/Cart`;
        this._actionUrlsCartItem = `${environment.URI_SERVER}/CartItem`;
    }

    async getByIdCart(id: number): Promise<CartResponse> {
        const response = await lastValueFrom(this.http.get(`${this._actionUrlsCart}/GetById`,
          { params: { id } }));
          return response as CartResponse;
    }

    async addCart(cart: Cart): Promise<CartResponse> {
        const response = await lastValueFrom(this.http.post(`${this._actionUrlsCart}/Insert`, { cart }));
          return response as CartResponse;
    }

    async addCartItem(cartItem: CartItems): Promise<CartItemResponse> {
        const response = await lastValueFrom(this.http.post(`${this._actionUrlsCartItem}/Insert`, { cartItem }));
          return response as CartItemResponse;
    }

    async updateCartItem(cartItem: CartItems): Promise<CartItemResponse> {
        const response = await lastValueFrom(this.http.put(`${this._actionUrlsCartItem}/Update`,
          { cartItem }));
          return response as CartItemResponse;
    }


}