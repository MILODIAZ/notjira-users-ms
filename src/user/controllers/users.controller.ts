import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MessagePattern, Payload } from '@nestjs/microservices/decorators';

import { UsersService } from '../services/users.service';
import { userDto, updateUserDto } from '../dtos/user.dto';
import { UserMSG } from 'src/common/constants';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @MessagePattern(UserMSG.FIND_ALL)
  async findAll() {
    try {
      const foundUsers = await this.usersService.findAll();
      return {
        success: true,
        message: 'Users found',
        data: foundUsers,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to found users',
        error: error.message,
      };
    }
  }

  @MessagePattern(UserMSG.FIND_ONE)
  async findOne(@Payload() id: number) {
    try {
      const foundUser = await this.usersService.findOne(id);
      return {
        success: true,
        message: 'User found',
        data: foundUser,
      };
    } catch (error) {
      return {
        success: false,
        message: 'User not found',
        error: error.message,
      };
    }
  }

  @MessagePattern(UserMSG.CREATE)
  async create(@Payload() payload: userDto) {
    try {
      const createdUser = await this.usersService.create(payload);
      return {
        success: true,
        message: 'User created succesfully',
        data: createdUser,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to create user',
        error: error.message,
      };
    }
  }

  @MessagePattern(UserMSG.UPDATE)
  async update(@Payload() message: { id: number; payload: updateUserDto }) {
    try {
      const updateUser = await this.usersService.update(
        message.id,
        message.payload,
      );
      return {
        success: true,
        message: 'User updated succesfully',
        data: updateUser,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to update user',
        error: error.message,
      };
    }
  }

  @MessagePattern(UserMSG.DELETE)
  async delete(@Payload() id: number) {
    try {
      const deletedUser = await this.usersService.delete(id);
      return {
        success: true,
        message: 'User deleted succesfully',
        data: deletedUser,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to delete user',
        error: error.message,
      };
    }
  }
}