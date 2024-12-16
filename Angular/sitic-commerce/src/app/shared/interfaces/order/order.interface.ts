export interface Order {
    id: number;
    totalPrice: number;
    status: string;
    createdAt: Date;
    updatedAt?: Date;
}