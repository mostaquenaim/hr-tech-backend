import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';

  
  @Entity({ name: 'productCategory' })
  export class ProductCategory {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;
  
    @Column()
    name: string

   
  }
  