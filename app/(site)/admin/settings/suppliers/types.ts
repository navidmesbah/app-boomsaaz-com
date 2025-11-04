export interface User {
  id: string;
  email: string | null;
  phone: string;
  password: string | null;
  otp: string | null;
  createdAt: Date;
  otpCreatedAt: Date;
}

export interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  managerId: string | null;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}

export type SupplierWithManager = Supplier & { manager: User | null }; 