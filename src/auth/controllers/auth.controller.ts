import { Controller, Req, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('api/v1/auth')
export class AuthController {
  @UseGuards(AuthGuard('local'))
  @MessagePattern('login')
  login(@Req() req: Request) {
    return req.user;
  }
}
