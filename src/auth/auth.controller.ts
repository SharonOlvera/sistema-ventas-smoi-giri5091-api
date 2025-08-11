import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

class LoginDto {
  username: string;
  password: string;
}

class RegisterDto {
  nombre: string;
  apellidos: string;
  correo: string;
  username: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authSvc: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authSvc.register(dto);
  }

  @Post('login')
  async login(@Body() { username, password }: LoginDto) {
    return this.authSvc.login(username, password);
  }
}