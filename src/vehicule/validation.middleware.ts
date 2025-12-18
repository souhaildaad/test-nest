import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ValidationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { year, pricePerDay } = req.body;

    if (year == null || year < 2000) {
      throw new BadRequestException('L\'année doit être supérieure ou égale à 2000');
    }

    if (pricePerDay == null || pricePerDay <= 0) {
      throw new BadRequestException('Le prix par jour doit être positif');
    }

    next();
  }
}