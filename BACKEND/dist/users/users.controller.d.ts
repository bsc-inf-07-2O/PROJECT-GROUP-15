import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './Student.entity';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUsers(): Promise<User[]>;
    getOneUser(id: number): Promise<User>;
    createUser(createUserDto: CreateUserDto): Promise<User>;
    updateUser(id: number, updateUserDto: UpdateUserDto, file: Express.Multer.File): Promise<User>;
    removeUser(id: number): Promise<User>;
}
