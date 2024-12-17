import { ComunResponse } from "../comun/comun-response.interface";
import { CartItemDetails, CartItems } from "./cart-items.interface";

export interface CartItemResponse extends ComunResponse {
    cartItem: CartItems;
    cartItems: CartItems[];
    cartItemsDetail: CartItemDetails[];
}