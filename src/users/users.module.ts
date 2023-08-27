import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../typeorm/entities/Post';
import { Profile } from '../typeorm/entities/Profile';
import { User } from '../typeorm/entities/User';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { Vehicle } from 'src/typeorm/entities/Vehicle';
import { Schedule } from 'src/typeorm/entities/Schedule';
import { Order } from 'src/typeorm/entities/Order';
import { Mngorder } from 'src/typeorm/entities/ManagementOrder';
import { Customer } from 'src/typeorm/entities/customer';
import { Product } from 'src/typeorm/entities/product';
import { Supplier } from 'src/typeorm/entities/supplier';
// import { SupplierController } from './controllers/users/supplier.controller';
// import { SupplierService } from './services/users/supplier.service';
import { CustomerReview } from 'src/typeorm/entities/customerReviews';
import { Company } from 'src/typeorm/entities/company';
import { ProductCategory } from 'src/typeorm/entities/productCat';
import { DeliverymanFeedback } from 'src/typeorm/entities/deliverymanFeedback';
import { DeliverymanSupport } from 'src/typeorm/entities/deliverymanSupport';


@Module({
  imports: [TypeOrmModule.forFeature([User, Profile,DeliverymanFeedback,DeliverymanSupport, Post, Vehicle,Company,ProductCategory, Schedule, Order, Mngorder, CustomerReview, Customer, Product, Supplier])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
