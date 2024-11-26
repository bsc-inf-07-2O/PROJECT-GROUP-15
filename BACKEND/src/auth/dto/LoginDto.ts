


    import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
    @IsEmail()
    email!: string;

    @IsString()
    password!: string;

    @IsString() // FirstName should be a string
  
    FirstName!: string;

    @IsString() // SurName should be a string
   
    SurName!: string;
}
