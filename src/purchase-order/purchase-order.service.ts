import { Injectable } from '@nestjs/common';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { Vendor } from 'src/vendor/entities/vendor.entity';
import { Repository } from 'typeorm';
import { PurchaseOrder } from './entities/purchase-order.entity';

@Injectable()
export class PurchaseOrderService {
    constructor(
        @InjectRepository(PurchaseOrder)
        private poRepository: Repository<PurchaseOrder>,
        @InjectRepository(Vendor)
        private vendorRepository: Repository<Vendor>,
      ) {}
    
      async create(createPurchaseOrderDto: CreatePurchaseOrderDto) {
        const vendor = await this.vendorRepository.findOne(createPurchaseOrderDto.vendorId);
        const po = this.poRepository.create({
          ...createPurchaseOrderDto,
          vendor,
        });
        return this.poRepository.save(po);
      }
    
      findAll() {
        return this.poRepository.find({ relations: ['vendor'] });
      }
    
      findOne(id: string) {
        return this.poRepository.findOne(id, { relations: ['vendor'] });
      }
    
      update(id: string, updatePoDto: Partial<CreatePurchaseOrderDto>) {
        return this.poRepository.update(id, updatePoDto);
      }
    
      remove(id: string) {
        return this.poRepository.delete(id);
      }
}
