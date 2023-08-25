import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';
import { Supplier } from './supplier';

@Entity({ name: 'schedule' })
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Day: string;

  @Column()
  Time: string;

  @ManyToOne(() => User, (user) => user.schedules)
  user: User;
 
  @ManyToOne(() => Supplier, (supplier) => supplier.schedules)
  supplier: Supplier;
 
}