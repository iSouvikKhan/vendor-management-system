import { Injectable } from '@nestjs/common';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { Vendor } from './entities/vendor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VendorService {
    constructor(
        @InjectRepository(Vendor)
        private vendorRepository: Repository<Vendor>,
    ) { }

    create(createVendorDto: CreateVendorDto) {
        const vendor = this.vendorRepository.create(createVendorDto);
        return this.vendorRepository.save(vendor);
    }

    findAll() {
        return this.vendorRepository.find();
    }

    findOne(id: string) {
        return this.vendorRepository.findOne(id);
    }

    update(id: string, updateVendorDto: Partial<CreateVendorDto>) {
        return this.vendorRepository.update(id, updateVendorDto);
    }

    remove(id: string) {
        return this.vendorRepository.delete(id);
    }
}