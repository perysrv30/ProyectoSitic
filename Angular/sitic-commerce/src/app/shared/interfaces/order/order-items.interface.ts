export interface OrderItems {
    id: number;
    OrderId: number;
    productId: number;
    quantity: number;
    price: number;
    createdAt: Date;
    updatedAt?: Date;
}