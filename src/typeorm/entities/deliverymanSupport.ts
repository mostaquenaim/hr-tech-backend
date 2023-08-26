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
  
  @Entity({ name: 'deliverymanSupport' })
  export class DeliverymanSupport {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;
  
    @Column()
    support: string;

    @ManyToOne(() => User, (user) => user.deliverymanSupports)
    user: User;
  
   
  }
  