import { ComunResponse } from "../comun/comun-response.interface";
import { CartItems } from "./cart-items.interface";

export interface CartItemResponse extends ComunResponse {
    cartItem: CartItems;
    cartItems: CartItems[];
}