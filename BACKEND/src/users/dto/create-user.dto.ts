import { IsString, IsNumber, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @IsString() // Change to number if RegNo is numeric in the database
    @IsNotEmpty({ message: 'Ensure that there is a registration string' })
    RegNo!: string;

    @IsString() // FirstName should be a string
    @IsNotEmpty({ message: 'Ensure that there is a first name' })
    FirstName!: string;

    @IsString() // SurName should be a string
    @IsNotEmpty({ message: 'Ensure that there is a last name' })
    SurName!: string;

    @IsString() // University should be a string
    @IsNotEmpty({ message: 'Ensure that there is a university name' })
    University!: string;

    @IsEmail()
    @IsNotEmpty({ message: 'Ensure that there is a valid email' })
    email!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;

    @IsString()
    @IsNotEmpty({ message: 'Confirm password must match the password' })
    confirmPassword!: string;

    profileImage?: string; // Store the image path or URL here
}
