import { ComunResponse } from "../comun/comun-response.interface";
import { OrderItems } from "./order-items.interface";

export interface OrderItemsResponse extends ComunResponse {
    orderItem: OrderItems;
    orderItems: OrderItems[];
}
