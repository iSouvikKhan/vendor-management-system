import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PurchaseOrderService } from './purchase-order.service';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';

@Controller('purchase-order')
export class PurchaseOrderController {
  constructor(private readonly poService: PurchaseOrderService) {}

  @Post()
  create(@Body() createPoDto: CreatePurchaseOrderDto) {
    return this.poService.create(createPoDto);
  }

  @Get()
  findAll() {
    return this.poService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.poService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePoDto: Partial<CreatePurchaseOrderDto>) {
    return this.poService.update(id, updatePoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.poService.remove(id);
  }
  
}
