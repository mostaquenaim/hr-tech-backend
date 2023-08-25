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
  
  @Entity({ name: 'company' })
  export class Company {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;
  
    @Column()
    vision: string;

    @Column( )
    mission: string;

  
   
  }
  