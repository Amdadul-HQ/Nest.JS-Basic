import { Body, Controller, Delete, Get, Param, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import sendResponse from 'src/utils/sendResponse';
import { CreateUserDto, UpdateUserDto } from './dto/createUser.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AdminGuard } from 'src/common/guards/admin.gurds';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(@Res() res: Response) {
    const result = await this.usersService.getUsers();
    return sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'User Fetched successfully',
      data: result,
    });
  }
  @Get(':id')
  async getUserById(@Param('id') id: number, @Res() res: Response) {
    const result = await this.usersService.getUserById(Number(id));
    return sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'User Details successfully',
      data: result,
    });
  }
  @Post('create')
  async createUser(@Body() body: CreateUserDto, @Res() res: Response) {
    const { name, email } = body;
    const result = await this.usersService.createUser({ name, email });
    return sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'User created successfully',
      data: result,
    });
  }
  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async deleteUser(@Param('id') id: number, @Res() res: Response) {
    const result = await this.usersService.deleteUser(Number(id));
    return sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'User deleted successfully',
      data: result,
    });
  }
  @Patch(':id')
  async updateUser(@Param('id') id: number, @Body() body: UpdateUserDto, @Res() res: Response) {
    const { name, email } = body;
    const result = await this.usersService.updateUser(Number(id), { name, email });
    return sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'User updated successfully',
      data: result,
    });
  }
}
