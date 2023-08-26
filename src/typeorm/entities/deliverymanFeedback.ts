import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
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
import { Customer } from './customer';
import { User } from './User';
  
  @Entity({ name: 'deliverymanFeedback' })
  export class DeliverymanFeedback {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;
  
    @Column()
    feedback: string;

    @ManyToOne(() => User, (user) => user.deliverymanFeedbacks)
    user: User;
  
   
  }
  