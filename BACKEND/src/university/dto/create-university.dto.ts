<<<<<<< HEAD
import { IsString, IsNumber, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUniversityDto {
    @IsString() // Change to number if RegNo is numeric in the database
    @IsNotEmpty({ message: 'Ensure that there is a registration number' })
    RegNo!: string;



    @IsString() // University should be a string
    @IsNotEmpty({ message: 'Ensure that there is a university name' })
    University!: string;

    @IsEmail()
    @IsNotEmpty({ message: 'Ensure that there is a valid email' })
    email!: string;

    @IsString()
    @IsNotEmpty({ message: 'ensure that there is the program of study' })
    ProgramOfStudy!: string;

    @IsString()
    @IsNotEmpty({ message: 'ensure that there is the year of study' })
    YearOfStudy!: string;

   
}
=======
import { IsString, IsNumber, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUniversityDto {
    @IsString() // Change to number if RegNo is numeric in the database
    @IsNotEmpty({ message: 'Ensure that there is a registration number' })
    RegNo!: string;



    @IsString() 
    @IsNotEmpty({ message: 'Ensure that there is a university name' })
    University!: string;

    @IsEmail()
    @IsNotEmpty({ message: 'Ensure that there is a valid email' })
    email!: string;

    @IsString()
    @IsNotEmpty({ message: 'ensure that there is the program of study' })
    ProgramOfStudy!: string;

    @IsString()
    @IsNotEmpty({ message: 'ensure that there is the year of study' })
    YearOfStudy!: string;

   
}
>>>>>>> cb1368fd7492417344ad1d194a6ef3581f993036
