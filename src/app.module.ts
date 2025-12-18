import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiclesModule } from './vehicule/vehicule.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost:27017/locationA',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, 
    
    }),
    VehiclesModule,
  ],
})
export class AppModule {}