import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Post } from './typeorm/entities/Post';
import { Profile } from './typeorm/entities/Profile';
import { User } from './typeorm/entities/User';
import { UsersModule } from './users/users.module';
import { Vehicle } from './typeorm/entities/Vehicle';
import { PusherService } from './pusher.service';
import { Schedule } from './typeorm/entities/Schedule';
import { Order } from './typeorm/entities/Order';
import { Mngorder } from './typeorm/entities/ManagementOrder';

import { Service } from './.service';
import { SupplierController } from './users/controllers/users/supplier.controller';
import { Supplier } from './typeorm/entities/supplier';
import { Product } from './typeorm/entities/product';
import { Customer } from './typeorm/entities/customer';
import { CustomerReview } from './typeorm/entities/customerReviews';
import { Company } from './typeorm/entities/company';
import { ProductCategory } from './typeorm/entities/productCat';




@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'hrtech',
      entities: [User, Profile, Post, CustomerReview,ProductCategory, Vehicle,Company, Schedule, Order, Mngorder, Supplier, Product, Customer],
      synchronize: true,
    }),
    UsersModule,
    
  ],
  controllers: [AppController],
  providers: [AppService,PusherService, Service],
})
export class AppModule {}

