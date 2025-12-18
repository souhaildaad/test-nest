import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Vehicle } from './vehicule.entity';
import { ObjectId } from 'mongodb';
import { NotificationGateway } from './notification.gateway';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepo: MongoRepository<Vehicle>,
    private readonly notificationGateway: NotificationGateway,
  ) {}

  async create(data: Partial<Vehicle>): Promise<Vehicle> {
    const vehicle = this.vehicleRepo.create(data);
    return this.vehicleRepo.save(vehicle);
  }

  async findAll(): Promise<Vehicle[]> {
    return this.vehicleRepo.find();
  }

  async findOne(id: string): Promise<Vehicle> {
    const vehicle = await this.vehicleRepo.findOneBy({ id: new ObjectId(id) });
    if (!vehicle) {
      throw new NotFoundException('Véhicule non trouvé');
    }
    return vehicle;
  }

  async delete(id: string): Promise<{ message: string }> {
    const result = await this.vehicleRepo.delete({ id: new ObjectId(id) });
    if (result.affected === 0) {
      throw new NotFoundException('Véhicule non trouvé');
    }
    return { message: 'Véhicule supprimé avec succès' };
  }

  async update(id: string, data: Partial<Vehicle>): Promise<Vehicle> {
    const oldVehicle = await this.findOne(id);

    await this.vehicleRepo.update({ id: new ObjectId(id) }, data);

    const updatedVehicle = await this.findOne(id);

    
    if (oldVehicle.available && !updatedVehicle.available) {
      this.notificationGateway.emitUnavailable(updatedVehicle);
    }

    return updatedVehicle;
  }

  async search(brand: string, model: string): Promise<Vehicle[]> {
    if (!brand || !model) {
      throw new BadRequestException('brand et model sont requis');
    }
    return this.vehicleRepo.find({ where: { brand, model } });
  }

  async calculateRent(id: string, days: number): Promise<{ totalCost: number }> {
    const vehicle = await this.findOne(id);
    if (days <= 0) {
      throw new BadRequestException('Le nombre de jours doit être positif');
    }
    return { totalCost: vehicle.pricePerDay * days };
  }

  async getRecent(): Promise<Vehicle[]> {
    return this.vehicleRepo.find({ where: { year: { $gt: 2020 } } });
  }

  // Point 8 : utilisation explicite de MongoRepository
  async getTotalAvailable(): Promise<{ total: number }> {
    const total = await this.vehicleRepo.countBy({ available: true });
    return { total };
  }
}