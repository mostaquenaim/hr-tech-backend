import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './User';
import { Supplier } from './supplier';


@Entity({name: 'vehicle_info'})

export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  company: string;

  @Column()
  model: string;

  @Column()
  year: number;

  // Additional properties and relationships can be added as needed

  @ManyToOne(() => User, (user) => user.vehicles)
  user: User;

  @ManyToOne(() => Supplier, (supplier) => supplier.vehicles)
  supplier: Supplier;

  
}
