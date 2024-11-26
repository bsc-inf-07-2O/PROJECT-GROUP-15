import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    ValidationPipe,
    BadRequestException,
    NotFoundException,
    ParseIntPipe,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './Student.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async getUsers(): Promise<User[]> {
        return await this.usersService.getAllUsers();
    }

    @Get(':id')
    async getOneUser(@Param('id') id: number): Promise<User> {
        const user = await this.usersService.getUserById(id);
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    @Post('/register')
    async createUser(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<User> {
        if (createUserDto.password !== createUserDto.confirmPassword) {
            throw new BadRequestException('Passwords do not match');
        }
        return await this.usersService.createUser(createUserDto);
    }

    @Put(':id')
    @UseInterceptors(FileInterceptor('profileImage', {
        storage: diskStorage({
            destination: './uploads/profile-images', // Destination directory
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = extname(file.originalname);
                callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
            },
        }),
        fileFilter: (req, file, callback) => {
            if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
                callback(new BadRequestException('Only image files are allowed'), false);
            } else {
                callback(null, true);
            }
        },
    }))
    async updateUser(
        @Param('id', ParseIntPipe) id: number,
        @Body(ValidationPipe) updateUserDto: UpdateUserDto,
        @UploadedFile() file: Express.Multer.File
    ): Promise<User> {
        const imagePath = file ? file.path :undefined;
        return await this.usersService.updateUser(id, updateUserDto, imagePath);
    }

    @Delete(':id')
    async removeUser(@Param('id') id: number): Promise<User> {
        return await this.usersService.removeUser(id);
    }
}
