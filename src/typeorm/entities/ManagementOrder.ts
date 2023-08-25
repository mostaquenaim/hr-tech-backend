import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './User';
import { Supplier } from './supplier';

@Entity({name: 'mng_order'})
export class Mngorder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Title: string;

  @Column()
  Description: string;

 

  @ManyToOne(() => User, (user) => user.mngorders)
  user: User;
  @ManyToOne(() => Supplier, (supplier) => supplier.mngorders)
  supplier: Supplier;
}
