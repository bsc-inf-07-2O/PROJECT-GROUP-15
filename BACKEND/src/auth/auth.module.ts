import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module'; // Import UsersModule
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    forwardRef(() => UsersModule), // Use forwardRef to avoid circular dependency
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,  // Ensure this is set correctly in your environment
      signOptions: { expiresIn: '30min' }, // Token expiry time
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
