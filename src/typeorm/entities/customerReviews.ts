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
  
  @Entity({ name: 'customerReview' })
  export class CustomerReview {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;
  
    @Column()
    review: string;
  

    @ManyToOne(()=> Customer,(customer)=>customer.customerReviews)
    customer:Customer
  
   
  }
  