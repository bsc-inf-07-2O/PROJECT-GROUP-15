import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/Student.entity';


@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
      ) {}

      async validateUser(email: string, password: string): Promise<User> {
        const user = await this.usersService.validateUser(email, password);
        if (!user) {
          throw new UnauthorizedException('Invalid credentials');
        }
        return user;
      }
}
