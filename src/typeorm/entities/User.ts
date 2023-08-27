import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './Post';
import { Profile } from './Profile';
import { Vehicle } from './Vehicle';
import {Schedule } from  './Schedule';
import { Order } from './Order';
import { Mngorder } from './ManagementOrder';
import { DeliverymanFeedback } from './deliverymanFeedback';
import { DeliverymanSupport } from './deliverymanSupport';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email:string;

  @Column()
  password: string;

  @Column({ nullable:true })
  filename: string;

  @Column()
  createdAt: Date;

  @Column({ nullable: true })
  authStrategy: string;


  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Vehicle, (vehicle) => vehicle.user)
  vehicles: Vehicle[];

  @OneToMany(() => DeliverymanSupport, (deliverymanSupport) => deliverymanSupport.user)
  deliverymanSupports: DeliverymanSupport[];

  @OneToMany(() => Schedule, (schedule) => schedule.user)
  schedules: Post[];

  @OneToMany(() => DeliverymanFeedback, (deliverymanFeedback) => deliverymanFeedback.user)
  deliverymanFeedbacks: DeliverymanFeedback[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Mngorder, (mngorder) => mngorder.user)
  mngorders: Post[];
 
}
