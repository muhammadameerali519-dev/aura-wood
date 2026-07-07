export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  woodType: string;
  dimensions: string;
  finish: string;
  priceEstimate?: string;
  features: string[];
}

export interface Inquiry {
  id?: string;
  fullName: string;
  phoneNumber: string;
  city: string;
  productName: string;
  quantity?: string;
  budget?: string;
  message: string;
  timestamp: string;
  status: 'New' | 'In Progress' | 'Contacted' | 'Completed';
}
