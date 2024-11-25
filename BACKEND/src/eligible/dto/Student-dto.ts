import { IsString, IsNumber, IsNotEmpty, Min } from 'class-validator';

export class CreateStudentDto {
  
  @IsString()
  @IsNotEmpty({ message: 'First name is required' })
  FirstName!: string;

  @IsString()
  @IsNotEmpty({ message: 'Last name is required' })
  SurName!: string;

  @IsString()
  @IsNotEmpty({ message: 'University name is required' })
  university!: string;

  @IsNumber()
  @Min(0, { message: 'Tuition must be a positive number' })
  tuition!: number;

  @IsNumber()
  @Min(0, { message: 'Upkeep must be a positive number' })
  upkeep!: number;


}
