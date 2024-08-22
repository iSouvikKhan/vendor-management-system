import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Vendor } from '../../vendor/entities/vendor.entity';

@Entity()
export class PurchaseOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  poNumber: string;

  @ManyToOne(() => Vendor)
  vendor: Vendor;

  @Column()
  orderDate: Date;

  @Column()
  deliveryDate: Date;

  @Column('json')
  items: any[];

  @Column()
  quantity: number;

  @Column()
  status: string;

  @Column({ nullable: true })
  qualityRating: number;

  @Column()
  issueDate: Date;

  @Column({ nullable: true })
  acknowledgmentDate: Date;
}
