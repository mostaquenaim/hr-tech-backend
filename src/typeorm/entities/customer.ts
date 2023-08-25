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
import { CustomerReview } from './customerReviews';
  
  @Entity({ name: 'customer' })
  export class Customer {
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

    @Column({ nullable: true })
    filename: string;
  
    @Column()
    createdAt: Date;
  
    @Column({ nullable: true })
    authStrategy: string;
  
    @OneToMany(()=> CustomerReview,(customerReview)=>customerReview.customer)
    customerReviews:CustomerReview[]
  
   
  }
  