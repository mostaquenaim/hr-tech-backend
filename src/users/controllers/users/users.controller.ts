import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Res,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  Session,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../../dtos/CreateUser.dto';
import { CreateUserPostDto } from '../../dtos/CreateUserPost.dto';
import { CreateUserProfileDto } from '../../dtos/CreateUserProfile.dto';
import { UpdateUserDto } from '../../dtos/UpdateUser.dto';
import { UsersService } from '../../services/users/users.service';
import { CreateVehicleDto } from 'src/users/dtos/create-vehicle.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { CreateScheduleDto } from 'src/users/dtos/CreateSchedule.dto';
import { CreateOrderDto } from 'src/users/dtos/CreateOrder.dto';
import { CreateMngOrderDto } from 'src/users/dtos/CreateMngOrder.Dto';
import { UpdateProfileDto } from 'src/users/dtos/UpdateProfile.dto';
import { OrderStatusUpdateDto } from 'src/users/dtos/OrderStatusUpdate.dto';
import { SignInDto } from 'src/users/dtos/CreateSignIn.dto';
import session from "express-session";


@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) { }


  
  //get vehicle by 
  @Get('getVehiclesByEmail/:email')
  @UsePipes(ValidationPipe)
  getVehicle( 
    @Param('email') email,
    // @Body('email') email,
    @Session() session,
  ) {
    return this.userService.getUserVehicle(email);
  }

  //get schedule 
  @Get('schedule/:email')
  @UsePipes(ValidationPipe)
  getUserSchedule( 
    // @Body('email') email,
    @Param('email') email ,
    @Session() session,
  ) {
    return this.userService.getUserSchedule(email);
  }

  
  //get vehicle by id
  @Get('getVehiclesById/:id')
  @UsePipes(ValidationPipe)
  getVehicleById( 
    @Param('id') id ,
    @Session() session,
  ) {
    return this.userService.getVehicleById(id);
  }

  //get schedule by id
  @Get('getScheduleByID/:id')
  @UsePipes(ValidationPipe)
  getScheduleById( 
    @Param('id') id ,
    @Session() session,
  ) {
    return this.userService.getScheduleById(id);
  }

  
  @Get('findUserByEmail/:email')
  getUserByEmail(
    @Param('email') email,
    @Body() body) {
    return this.userService.findUserByEmail(email);
  }



  @Get('/customerReviews')
  async getAllCustomerReviews() {
    return this.userService.getAllCustomerReviews();
  }

  @Get('getAllOrders')
  async getAllOrder() {
    return this.userService.getAllOrder();
  }

  // uploadfile 
  //file upload
  @Post((':email/upload'))
  @UseInterceptors(FileInterceptor('filename',
    {
      storage: diskStorage({
        destination: './uploads',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname)
        }
      })
    }))
  uploadFile(
    @Param('email') email,
    // @Body('file') filename,
    @UploadedFile() file: Express.Multer.File): object {
    console.log("filename")
    console.log(file.filename)
    return this.userService.uploadFile(email, file.filename);
  }
  @Get('/companyDetails')
  async getCompanyDetails() {
    return this.userService.getCompanyDetails();
  }

  @Get('/products')
  async getProducts() {
    return this.userService.getProducts();
  }

  @Get('/productCategories')
  async getProductCategories() {
    return this.userService.getProductCategories();
  }


  //get user by id
  @Get(':id')
  async getUserById(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }

  // get product image 
  @Get('/getProductImage/:name')
  getProductImage(@Param('name') name, @Res() res) {
    res.sendFile(name, { root: './uploads' })
  }

  // get product image 
  // @Get('/getProductImage/:name')
  // getImage(@Param('name') name, @Res() res) {
  //   res.sendFile(name,{ root: './uploads' })
  // }

  @Get('/getImage/:name')
  getImage(@Param('name') name, @Res() res) {
    res.sendFile(name, { root: './uploads' })
  }





  //get order by id
  @Get('/order/:id')
  async getOrderById(@Param('id') id: number) {
    return this.userService.getOrderById(id);
  }

  //get mng order by id
  @Get(':id/mngorder')
  async getmngOrderById(@Param('id') id: number) {
    return this.userService.getmngOrderById(id);
  }



  //create user
  @Post('create')
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  // add feedback 
  @Post(':id/addFeedback')
  createFeedback(
    @Param('id') id,
    @Body() feedbackDto, @Session() session) {
    return this.userService.createFeedback(feedbackDto, id);
  }

  // support 
  @Post(':id/support')
  createSupport(
    @Param('id') id,
    @Body() feedbackDto, @Session() session) {
    return this.userService.createSupport(feedbackDto, id);
  }



  //update profile by id
  @Put('update/:id')
  @UsePipes(ValidationPipe)
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() myDto: UpdateUserDto,
  ) {
    console.log("ashche")
    await this.userService.updateUser(id, myDto);
  }

  //update vehicle by id
  @Put('updateVehicle/:id')
  @UsePipes(ValidationPipe)
  async updateVehicle
    (
      @Param('id', ParseIntPipe) id: number,
      @Body() myDto,
    ) {
    console.log("ashche")
    await this.userService.updateVehicle(id, myDto);
  }

  //updateUserProfile By Id
  @Put(':id/profiles')
  @UsePipes(ValidationPipe)
  async updateProfileById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    await this.userService.updateUserProfile(id, updateProfileDto);
  }


  //delete user by id
  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    await this.userService.deleteUser(id);
  }

  // delete vehicle by id 
  @Delete('deleteVehicle/:id')
  async deleteVehicleById(@Param('id', ParseIntPipe) id: number) {
    await this.userService.deleteVehicleById(id);
  }

  // delete schedule by id 
  @Delete('deleteSchedule/:id')
  async deleteScheduleById(@Param('id', ParseIntPipe) id: number) {
    await this.userService.deleteScheduleById(id);
  }




  //create profile
  // @Post(':id/profiles')
  // @UsePipes(ValidationPipe)
  // createUserProfile(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() createUserProfileDto: CreateUserProfileDto,
  // ) {
  //   return this.userService.createUserProfile(id, createUserProfileDto);
  // }
  //users post by id
  @Post(':id/posts')
  @UsePipes(ValidationPipe)
  createUserPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserPostDto: CreateUserPostDto,
  ) {
    return this.userService.createUserPost(id, createUserPostDto);
  }




  //create vehicle by id
  @Post(':id/vehicles')
  @UsePipes(ValidationPipe)
  createUserVehicle(
    @Param('id') id,
    @Session() session,
    @Body() createUserVehicleDto: CreateVehicleDto,
  ) {
    return this.userService.createUserVehicle(id, createUserVehicleDto);
  }




  //create schedule
  @Post(':id/schedules')
  @UsePipes(ValidationPipe)
  createUserSchedule(
    @Param('id', ParseIntPipe) id: number,
    @Body() createScheduleDto: CreateScheduleDto,
  ) {
    return this.userService.createUserSchedule(id, createScheduleDto);
  }

  //create order
  @Post(':id/orders')
  @UsePipes(ValidationPipe)
  createUserOrder(
    @Param('id', ParseIntPipe) id: number,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return this.userService.createUserOrder(id, createOrderDto);
  }

  //management_order
  @Post(':id/mngorders')
  @UsePipes(ValidationPipe)
  createMngOrder(
    @Param('id', ParseIntPipe) id: number,
    @Body() createMngOrderDto: CreateMngOrderDto,
  ) {
    return this.userService.createMngOrder(id, createMngOrderDto);
  }


  //order status

  @Put(':id/status')
  updateOrderStatus(
    @Param('id') id: number,
    @Body() orderStatusUpdateDto: OrderStatusUpdateDto,
  ) {
    return this.userService.updateOrderStatus(id, orderStatusUpdateDto.status);
  }


  //signin
@Post('signin')
@UsePipes(ValidationPipe)
async signIn(@Body() signInDto: SignInDto) {
  console.log("abcd")
  return this.userService.signIn(signInDto);
}


}
