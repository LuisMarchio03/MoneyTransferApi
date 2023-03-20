export type HttpRequestInterface = {
  name: string;
  email: string;
  password: string;
  balance: number;
  cpfCnpj: string;
  type: 'common' | 'shopkeeper';
}
