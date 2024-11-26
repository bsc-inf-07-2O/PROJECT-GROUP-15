import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/Student.entity';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    private resetTokens;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, plainPassword: string): Promise<User>;
    createToken(user: User): string;
    sendPasswordResetLink(email: string): Promise<void>;
    resetPassword(token: string, newPassword: string): Promise<void>;
}
