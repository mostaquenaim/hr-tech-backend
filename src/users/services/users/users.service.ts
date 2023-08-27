import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Post } from '../../../typeorm/entities/Post';
import { Profile } from '../../../typeorm/entities/Profile';
import { User } from '../../../typeorm/entities/User';
import {
  CreateUserParams,
  CreateUserPostParams,
  CreateUserProfileParams,
  CreateVehicleParams,
  UpdateUserParams,
  CreateScheduleParams,
  CreateOrderParams,
  CreateMngOrderParams,
  UpdateProfileParams
} from '../../../utils/types';
import { Vehicle } from '../../../typeorm/entities/Vehicle';
import { Schedule } from 'src/typeorm/entities/Schedule';
import { Order } from 'src/typeorm/entities/Order';
import { Mngorder } from 'src/typeorm/entities/ManagementOrder';
import { UpdateProfileDto } from 'src/users/dtos/UpdateProfile.dto';
import { SignInDto } from 'src/users/dtos/CreateSignIn.dto';
import { Customer } from 'src/typeorm/entities/customer';
import { CustomerReview } from 'src/typeorm/entities/customerReviews';
import { Company } from 'src/typeorm/entities/company';
import { Product } from 'src/typeorm/entities/product';
import { ProductCategory } from 'src/typeorm/entities/productCat';
import { DeliverymanFeedback } from 'src/typeorm/entities/deliverymanFeedback';
import { DeliverymanSupport } from 'src/typeorm/entities/deliverymanSupport';



@Injectable()
export class UsersService {
  updateOrderStatus(orderId: number, status: string) {
    throw new Error('Method not implemented.');
  }
  updateProfile(id: number, updateProfileDto: UpdateProfileDto) {
    throw new Error('Method not implemented.');
  }
  trigger(arg0: string, arg1: string, arg2: { username: string; message: string; }) {
    throw new Error('Method not implemented.');
  }
  
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(Vehicle) private  vehicleRepository: Repository<Vehicle>,
    @InjectRepository(Schedule) private scheduleRepository: Repository<Schedule>,
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Mngorder) private mngorderRepository: Repository<Mngorder>,
    @InjectRepository(Customer) private customerRepository: Repository<Customer>,
    @InjectRepository(CustomerReview) private customerReviewRepository: Repository<CustomerReview>,
    @InjectRepository(Company) private companyRepository: Repository<Company>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(ProductCategory) private productCategoryRepository: Repository<ProductCategory>,
    @InjectRepository(DeliverymanFeedback) private feedbackRepository: Repository<DeliverymanFeedback>,
    @InjectRepository(DeliverymanSupport) private supportRepository: Repository<DeliverymanSupport>,
    
  ) {}

  findUsers() {
    return this.userRepository.find({ relations: ['profile', 'posts', 'vehicles', 'schedules', 'orders', 'mngorders'] });
  }



//get user by id

async getUserById(id: number): Promise<User> {
  const user = await this.userRepository.findOneBy({id});

  if (!user) {
    throw new NotFoundException(`User with ID ${id} not found.`);
  }

  return  user;
}

//get all customer reviews
async getAllCustomerReviews() {
      const options: FindManyOptions<CustomerReview> = {};
      const reviews = await this.customerReviewRepository.find(options);
      return reviews;
}

//get all order
async getAllOrder() {
      const options: FindManyOptions<Order> = {};
      const orders = await this.orderRepository.find(options);
      return orders;
}

// get all products 
async getProducts() {
      const options: FindManyOptions<Product> = {};
      const products = await this.productRepository.find(options);
      return products;
}

// upload file 
async uploadFile(email, myFile) {
  const user = await this.userRepository.findOneBy({ email : email });

  if (user) {
    user.filename = myFile; // Update the filename property with the new file value
    return await this.userRepository.save(user); // Save the updated user entity
  }

  return null; // Return null if no user found with the provided email
}

// get all product categories
async getProductCategories() {
      const options: FindManyOptions<ProductCategory> = {};
      const categories = await this.productCategoryRepository.find(options);
      return categories;
}

// get company details 
async getCompanyDetails() {
      const options: FindManyOptions<Company> = {};
      const details = await this.companyRepository.find(options);
      return details;
}


//get order by id
async getOrderById(id: number): Promise<Order> {
  const order = await this.orderRepository.findOneBy({id});

  if (!order) {
    throw new NotFoundException(`Order with ID ${id} not found.`);
  }

  return  order;
}

//get manage order by id
async getmngOrderById(id: number): Promise<Mngorder> {
  const mngorder = await this.mngorderRepository.findOneBy({id});

  if (!mngorder) {
    throw new NotFoundException(`Mang Order with ID ${id} not found.`);
  }

  return  mngorder;
}



  //signin
  createUser(userDetails: CreateUserParams) {
    const newUser = this.userRepository.create({
      ...userDetails,
      createdAt: new Date(),
    });
    return this.userRepository.save(newUser);
  }

  // feedback 
  async createFeedback(myDto, id){

    const user = await this.userRepository.findOneBy({ id });

    const userAccount = new DeliverymanFeedback()

    userAccount.feedback = myDto.feedback;
    userAccount.user = user

    return this.feedbackRepository.save(userAccount);
  }


  // support 
  async createSupport(myDto, id){

    const user = await this.userRepository.findOneBy({ id });

    const userAccount = new DeliverymanSupport()

    userAccount.support = myDto.support;
    userAccount.user = user

    return this.supportRepository.save(userAccount);
  }



  // update user 
async updateUser(id: number, updateUserDetails: UpdateUserParams): Promise<void> {
  const user = await this.userRepository.findOneBy({id});

  if (!user) {
    throw new NotFoundException(`User with ID ${id} not found.`);
  }

  await this.userRepository.update(id, { ...updateUserDetails });
}

  // update vehicle 
async updateVehicle(id: number, vehicle): Promise<void> {

  const user = await this.vehicleRepository.findOneBy({id});

  if (!user) {
    throw new NotFoundException(`User with ID ${id} not found.`);
  }

  await this.vehicleRepository.update(id, { ...vehicle });
}

  // get vehicle 
async getUserVehicle(email) {

  const users = await this.userRepository.findOneBy({ email : email });

  return this.vehicleRepository.find({
    where: {
      user: users,
    },
  });
  
}

  // get schedule 
async getUserSchedule(email) {

  const users = await this.userRepository.findOneBy({ email : email });

  return this.scheduleRepository.find({
    where: {
      user: users,
    },
  });
  
}

  // get vehicle by id
async getVehicleById(id) {

  return await this.vehicleRepository.findOneBy({ id });
  
}

  // get schedule by id
async getScheduleById(id) {

  return await this.scheduleRepository.findOneBy({ id });
  
}

 

async updateUserProfile(id: number, updateProfileDetails: UpdateProfileParams): Promise<Profile> {
  const userProfile = await this.profileRepository.findOneBy({id});

  if (!userProfile) {
    throw new NotFoundException(`User profile with ID ${id} not found.`);
  }

  await this.profileRepository.update(id, { ...updateProfileDetails });

  return this.profileRepository.findOneBy({id});
}

//delete user
async deleteUser(id: number): Promise<void> {
  const user = await this.userRepository.findOneBy({id});

  if (!user) {
    throw new NotFoundException(`User with ID ${id} not found.`);
  }

  await this.userRepository.delete(id);
}

//delete vehicle by id
async deleteVehicleById(id: number): Promise<void> {

  const user = await this.vehicleRepository.findOneBy({id});

  if (!user) {
    throw new NotFoundException(`User with ID ${id} not found.`);
  }

  await this.vehicleRepository.delete(id);
}

//delete Schedule by id
async deleteScheduleById(id: number): Promise<void> {

  const user = await this.scheduleRepository.findOneBy({id});

  if (!user) {
    throw new NotFoundException(`User with ID ${id} not found.`);
  }

  await this.scheduleRepository.delete(user);
}





  // async createUserProfile(
  //   id: number,
  //   createUserProfileDetails: CreateUserProfileParams,
  // ) {
  //   const user = await this.userRepository.findOneBy({ id });
  //   if (!user)
  //     throw new HttpException(
  //       'User not found. Cannot create Profile',
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   const newProfile = this.profileRepository.create(createUserProfileDetails);
  //   const savedProfile = await this.profileRepository.save(newProfile);
  //   user.profile = savedProfile;
  //   return this.userRepository.save(user);
  // }

  async createUserPost(
    id: number,
    createUserPostDetails: CreateUserPostParams,
  ) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException(
        'User not found. Cannot create Post',
        HttpStatus.BAD_REQUEST,
      );
    const newPost = this.postRepository.create({
      ...createUserPostDetails,
      user,
    });
    return this.postRepository.save(newPost);
  }

//creating vehicle info
async createUserVehicle(
  id , 
  createUserVehicleDetails: CreateVehicleParams,
) {
  const user = await this.userRepository.findOneBy({ id });
  if (!user)
    throw new HttpException(
      'User not found. Cannot Add Vehicle Information',
      HttpStatus.BAD_REQUEST,
    );
  const newVehicle = this.vehicleRepository.create({
    ...createUserVehicleDetails,
    user,
  });
  console.log(newVehicle)
  return this.vehicleRepository.save(newVehicle);
}


  
//creatingSchedule
async createUserSchedule(
  id: number,
  createUserScheduleDetails:  CreateScheduleParams,
) {
  const user = await this.userRepository.findOneBy({ id });
  if (!user)
    throw new HttpException(
      'User not found. Cannot Add Schedule',
      HttpStatus.BAD_REQUEST,
    );
  const newSchedule = this.scheduleRepository.create({
    ...createUserScheduleDetails,
    user,
  });
  return this.scheduleRepository.save(newSchedule);
}


//creating order to Show_Order -_-  
async createUserOrder(
  id: number,
  createUserOrderDetails:  CreateOrderParams,
) {
  const user = await this.userRepository.findOneBy({ id });
  if (!user)
    throw new HttpException(
      'Deliveryman not found. Cannot Assign Order',
      HttpStatus.BAD_REQUEST,
    );
  const newOrder = this.orderRepository.create({
    ...createUserOrderDetails,
    user,
  });
  return this.orderRepository.save(newOrder);
}

//creating managementorder to show


async createMngOrder(
  id: number,
  createMngOrderDetails:  CreateMngOrderParams,
) {
  const user = await this.userRepository.findOneBy({ id });
  if (!user)
    throw new HttpException(
      'Deliveryman not found. Cannot Assign Management Order',
      HttpStatus.BAD_REQUEST,
    );
  const newmngOrder = this.mngorderRepository.create({
    ...createMngOrderDetails,
    user,
  });
  return this.mngorderRepository.save(newmngOrder);
}





//signup

async signIn(signInDto: SignInDto): Promise<User> {
  const { email, password } = signInDto;

  const user = await this.userRepository.findOneBy({ email });
  console.log(user)

  if (!user || user.password !== password) {
    throw new UnauthorizedException('Invalid credentials');
  }

  return user;
}

// find user by email 

async findUserByEmail(email): Promise<User> {

  const user = await this.userRepository.findOneBy({email : email});

  if (!user) {
    throw new NotFoundException(`User with ID ${email} not found.`);
  }

  return  user;
}


}



//out of constructor
//order status
@Injectable()
export class OrderStatusService {
  private orderStatuses: Record<number, string> = {};

  updateOrderStatus(orderId: number, status: string): void {
    if (!this.orderStatuses[orderId]) {
      throw new NotFoundException(`Order with ID ${orderId} not found.`);
    }

    this.orderStatuses[orderId] = status;
  }
}