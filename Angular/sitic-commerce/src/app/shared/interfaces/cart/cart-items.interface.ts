export interface CartItems {
    Id: number;
    CartId: number;
    ProductId: number;
    Quantity: number;
    Price: number;
    createdAt: Date;
    updatedAt?: Date;
}