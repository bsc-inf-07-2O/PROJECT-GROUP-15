import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(createUserDto: CreateUserDto): Promise<{
        accessToken: string;
        user: import("../users/Student.entity").User;
    }>;
    resetPasswordRequest(email: string): Promise<void>;
    resetPassword(token: string, newPassword: string): Promise<void>;
}
