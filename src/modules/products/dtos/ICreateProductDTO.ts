export default interface ICreateProductDTO {
  description: string;
  internal_code: string;
  number_code: string;
  specific_code: string;
  observation: string;
  sector: string;
  company: string;
  isActive?: boolean;
  quantity: number;
}
