

export type FullName = {
  firstName: string;
  lastName: string;
};
export type Address = {
  state: string;
  city: string;
  country: string;
};
export type Order = {
  productName: string;
  price: number;
  quantity: number;
};

export type Customer = {
  id: string;
  userName: string;
  fullName: FullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: Address;
  order: Order[];
};
