import { Controller, Get, Param } from '@nestjs/common';
import { PerformanceService } from './performance.service';

@Controller('vendors/:vendorId/performance')
export class PerformanceController {
  constructor(private readonly performanceService: PerformanceService) {}

  @Get()
  getPerformance(@Param('vendorId') vendorId: string) {
    return this.performanceService.getPerformance(vendorId);
  }
}
