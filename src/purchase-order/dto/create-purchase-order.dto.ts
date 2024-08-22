export class CreatePurchaseOrderDto {
  poNumber: string;
  vendorId: string;
  orderDate: Date;
  deliveryDate: Date;
  items: any[];
  quantity: number;
  status: string;
  issueDate: Date;
}
