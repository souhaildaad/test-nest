import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity({ name: 'cars' }) 
export class Vehicle {
  @ObjectIdColumn()
  id: ObjectId; 

  @Column({ nullable: false })
  brand: string;

  @Column({ nullable: false })
  model: string;

  @Column({ type: 'int' })
  year: number;

  @Column({ type: 'double' })
  pricePerDay: number;

  @Column({ default: true })
  available: boolean;
}