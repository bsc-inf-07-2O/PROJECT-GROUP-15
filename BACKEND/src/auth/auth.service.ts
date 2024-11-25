import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/Student.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, plainPassword: string): Promise<User> {
    return await this.usersService.validateUser(email, plainPassword);
  }

  createToken(user: User): string {
    const payload = {
      email: user.email,
      FirstName: user.FirstName,
      SurName: user.SurName,
      sub: user.id, // Common convention for unique identifier in JWT
      profileImage: user.profileImage,
      University: user.University,
      RegNo: user.RegNo,
    };
    return this.jwtService.sign(payload);
  }
}
