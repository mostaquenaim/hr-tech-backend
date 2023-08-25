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
  
  @Entity({ name: 'product' })
  export class Product {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;
  
    @Column()
    name: string

    @Column()
    price: string
  
  
    @Column()
    image: string
  
    @Column()
    isAvailable: string
  
   
  }
  