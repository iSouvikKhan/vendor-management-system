import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Vendor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  contactDetails: string;

  @Column()
  address: string;

  @Column({ unique: true })
  vendorCode: string;

  @Column({ type: 'float', default: 0 })
  onTimeDeliveryRate: number;

  @Column({ type: 'float', default: 0 })
  qualityRatingAvg: number;

  @Column({ type: 'float', default: 0 })
  averageResponseTime: number;

  @Column({ type: 'float', default: 0 })
  fulfillmentRate: number;
}
