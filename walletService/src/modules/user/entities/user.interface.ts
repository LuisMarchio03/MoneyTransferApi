export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  balance: number;
  cpfCnpj: string;
  type: 'common' | 'shopkeeper';
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
} 