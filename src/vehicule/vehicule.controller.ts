import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { VehiclesService } from './vehicule.service';

@Controller('vehicules')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post('create')
  async create(@Body() body: any) {
    return this.vehiclesService.create(body);
  }

  @Get('showVehicules')
  async list() {
    return this.vehiclesService.findAll();
  }

  @Get('showVehicules/:id')
  async getOne(@Param('id') id: string) {
    return this.vehiclesService.findOne(id);
  }

  @Delete('DeleteVehicule/:id')
  async delete(@Param('id') id: string) {
    return this.vehiclesService.delete(id);
  }

  @Put('UpdateVehicule/:id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.vehiclesService.update(id, body);
  }

  @Get('search')
  async search(@Query('brand') brand: string, @Query('model') model: string) {
    return this.vehiclesService.search(brand, model);
  }

  @Post('calculateRent/:id')
  async calculateRent(@Param('id') id: string, @Body() body: { days: number }) {
    return this.vehiclesService.calculateRent(id, body.days);
  }

  @Get('recent')
  async recent() {
    return this.vehiclesService.getRecent();
  }

  @Get('total')
  async total() {
    return this.vehiclesService.getTotalAvailable();
  }
}