export interface CartItems {
    id: number;
    cartId: number;
    productId: number;
    quantity: number;
    price: number;
    createdAt: Date;
    updatedAt?: Date;
}

export interface CartItemDetails {
    id: number;
    productId: number;
    name: string;
    price: number;
    quantity: number;
  }