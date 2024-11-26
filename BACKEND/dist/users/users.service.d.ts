import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './Student.entity';
import { EmailService } from '../mailer/mailer.service';
export declare class UsersService {
    private userRepository;
    private readonly emailService;
    constructor(userRepository: Repository<User>, emailService: EmailService);
    getAllUsers(): Promise<User[]>;
    getUserById(id: number): Promise<User>;
    getUserByEmail(email: string): Promise<User>;
    createUser(createUserDto: CreateUserDto): Promise<User>;
    updateUserPassword(user: User): Promise<User>;
    updateUser(id: number, updateUserDto: UpdateUserDto, imagePath?: string): Promise<User>;
    removeUser(id: number): Promise<User>;
    validateUser(email: string, plainPassword: string): Promise<User>;
}
