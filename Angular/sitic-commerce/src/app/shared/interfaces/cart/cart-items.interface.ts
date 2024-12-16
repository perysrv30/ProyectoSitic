export interface CartItems {
    id: number;
    cartId: number;
    productId: number;
    quantity: number;
    price: number;
    createdAt: Date;
    updatedAt?: Date;
}