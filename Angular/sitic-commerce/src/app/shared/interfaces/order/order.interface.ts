export interface Order {
    id: number;
    totalPrice: number;
    status: string;
    createdAt: Date;
    updatedAt?: Date;
}
export interface DisplayedOrder {
    date: Date;
    total: number;
    products: {
      name: string;
      quantity: number;
      price: number;
      imgPath: string;
    }[];
  }