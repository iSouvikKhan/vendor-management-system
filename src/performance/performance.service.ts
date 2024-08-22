import { Injectable } from "@nestjs/common";
import { PurchaseOrder } from "src/purchase-order/entities/purchase-order.entity";
import { Vendor } from "src/vendor/entities/vendor.entity";
import { Repository } from "typeorm";

@Injectable()
export class PerformanceService {
  constructor(
    @InjectRepository(Vendor)
    private vendorRepository: Repository<Vendor>,
    @InjectRepository(PurchaseOrder)
    private poRepository: Repository<PurchaseOrder>,
  ) {}

  async calculateMetrics(vendorId: string) {
    const vendor = await this.vendorRepository.findOne(vendorId, { relations: ['purchaseOrders'] });

    const totalOrders = vendor.purchaseOrders.length;
    const completedOrders = vendor.purchaseOrders.filter(po => po.status === 'completed');

    // Calculate metrics
    const onTimeDeliveryRate = completedOrders.filter(po => po.deliveryDate <= po.orderDate).length / totalOrders;
    const qualityRatingAvg = completedOrders.reduce((sum, po) => sum + (po.qualityRating || 0), 0) / completedOrders.length;
    const averageResponseTime = completedOrders.reduce((sum, po) => sum + ((po.acknowledgmentDate ? new Date(po.acknowledgmentDate).getTime() - new Date(po.issueDate).getTime() : 0) / 1000), 0) / completedOrders.length;
    const fulfillmentRate = completedOrders.filter(po => !po.qualityRating).length / totalOrders;

    // Update vendor performance metrics
    await this.vendorRepository.update(vendorId, {
      onTimeDeliveryRate,
      qualityRatingAvg,
      averageResponseTime,
      fulfillmentRate,
    });

    return { onTimeDeliveryRate, qualityRatingAvg, averageResponseTime, fulfillmentRate };
  }

  async getPerformance(vendorId: string) {
    const vendor = await this.vendorRepository.findOne(vendorId);
    return {
      onTimeDeliveryRate: vendor.onTimeDeliveryRate,
      qualityRatingAvg: vendor.qualityRatingAvg,
      averageResponseTime: vendor.averageResponseTime,
      fulfillmentRate: vendor.fulfillmentRate,
    };
  }
}
