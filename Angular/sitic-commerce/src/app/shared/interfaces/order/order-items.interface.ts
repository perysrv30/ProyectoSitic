export interface OrderItems {
    id: number;
    orderId: number;
    productId: number;
    quantity: number;
    price: number;
    createdAt: Date;
    updatedAt?: Date;
}