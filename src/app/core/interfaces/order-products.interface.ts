import { ICartProduct } from "./id-product.interface";

export interface IOrderProducts {
    userId: number;
    products: ICartProduct[];
}
