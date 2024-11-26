import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/Student.entity';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  private resetTokens = new Map<string, string>(); // To store reset tokens temporarily

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, plainPassword: string): Promise<User> {
    const user = await this.usersService.getUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const isPasswordValid = await bcrypt.compare(plainPassword, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }
    return user;
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

  async sendPasswordResetLink(email: string): Promise<void> {
    const user = await this.usersService.getUserByEmail(email);
    if (!user) {
      throw new NotFoundException('Email does not exist');
    }

    const resetToken = uuidv4(); // Generate unique token
    this.resetTokens.set(resetToken, email); // Map token to email temporarily

    // Mocking sending email logic
    console.log(
      `Password reset link: http://http://localhost:3000/password/?token=${resetToken}`,
    );
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const email = this.resetTokens.get(token);
    if (!email) {
      throw new BadRequestException('Invalid or expired token');
    }

    const user = await this.usersService.getUserByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(newPassword, salt);
    await this.usersService.updateUserPassword(user); // Update password in the database

    this.resetTokens.delete(token); // Remove token after use
  }
}
