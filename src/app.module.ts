import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VendorModule } from './vendor/vendor.module';
import { PerformanceModule } from './performance/performance.module';
import { PurchaseOrderModule } from './purchase-order/purchase-order.module';
import { VendorModule } from './vendor/vendor.module';

@Module({
  imports: [VendorModule, PurchaseOrderModule, PerformanceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
