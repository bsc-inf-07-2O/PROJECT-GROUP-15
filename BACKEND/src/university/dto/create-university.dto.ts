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
