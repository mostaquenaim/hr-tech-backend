import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { Post } from './Post';
  import { Vehicle } from './Vehicle';
  import {Schedule } from  './Schedule';
  import { Order } from './Order';
  import { Mngorder } from './ManagementOrder';
  
  @Entity({ name: 'supplier' })
  export class Supplier {
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
  
    @Column()
    createdAt: Date;
  
    @Column({ nullable: true })
    authStrategy: string;
  
  
    @OneToMany(() => Post, (post) => post.supplier)
    posts: Post[];
  
    @OneToMany(() => Vehicle, (vehicle) => vehicle.supplier)
    vehicles: Vehicle[];
  
    @OneToMany(() => Schedule, (schedule) => schedule.supplier)
    schedules: Schedule[];
  
    @OneToMany(() => Order, (order) => order.supplier)
    orders: Order[];
  
    @OneToMany(() => Mngorder, (mngorder) => mngorder.supplier)
    mngorders: Mngorder[];
   
  }
  