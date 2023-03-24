export interface AddProduct {
  length: any;
  userId: string;
  _id:number;
  id: number;
  show:true;
  productName: string;
  productType: string;
  productPrice: number;
  productImage: string;
  deliveryStatus: string;
  quantity:number;
  total:number;
}

export interface errorMessage{
  status:number;
  name:string;
}
