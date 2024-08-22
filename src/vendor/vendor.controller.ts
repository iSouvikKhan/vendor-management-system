import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { CreateVendorDto } from './dto/create-vendor.dto';

@Controller('vendor')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Post()
  create(@Body() createVendorDto: CreateVendorDto) {
    return this.vendorService.create(createVendorDto);
  }

  @Get()
  findAll() {
    return this.vendorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vendorService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateVendorDto: Partial<CreateVendorDto>) {
    return this.vendorService.update(id, updateVendorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vendorService.remove(id);
  }
}
