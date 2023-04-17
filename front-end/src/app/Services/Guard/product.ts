export interface AddProduct {
  length: any;
  userId: string;
  _id:number;
  show:true;
  category:string;
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
