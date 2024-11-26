import { Controller, HttpCode, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto'; // Should be LoginDto

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() createUserDto: CreateUserDto) { // Should be LoginDto
    const user = await this.authService.validateUser(createUserDto.email, createUserDto.password);
    const token = this.authService.createToken(user);
    return { accessToken: token, user }; // Return the token and user info
  }
}