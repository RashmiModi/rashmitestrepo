export type ForminputPost={
    category:string
    catid:string
}

// types/index.ts or anywhere appropriate
export interface Product {
    id: number;
    productname: string;
    description: string;
    color: string;
    size: string;
    price: number;
    catid: number; // This field must exist
    productimageUrl: string;
  }
  
  type Transaction = {
    id: string;
    amount: number;
    status: string;
    method: string;
    customer_id?: string;
    customer_details?: {
      name?: string;
      email?: string;
      contact?: string;
    };
  };