export interface IResponseOrders {
  id: string,
  userId: number,
  price: number,
  purchaseDate: string;
  products: [
    {
      id: string,
      orderId: string,
      amount: number,
      productId: string,
      productPrice: number,
      productName: string,
      productType: string
    }
  ]
}
