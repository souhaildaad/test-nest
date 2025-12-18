import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './vehicule.entity';
import { VehiclesController } from './vehicule.controller';
import { VehiclesService } from './vehicule.service';
import { ValidationMiddleware } from './validation.middleware';
import { NotificationGateway } from './notification.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle])],
  controllers: [VehiclesController],
  providers: [VehiclesService, NotificationGateway],
})
export class VehiclesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidationMiddleware)
      .forRoutes({ path: 'vehicules/create', method: RequestMethod.POST });
  }
}