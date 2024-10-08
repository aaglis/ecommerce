export interface IUserRegister {
  id?: number;
  name: string;
  alias: string;
  cpf: string;
  dateOfBirth: string;
  phone: string;
  password: string;
  cep?: string;
  streetName?: string;
  city?: string;
  residenceNumber?: string;
}
