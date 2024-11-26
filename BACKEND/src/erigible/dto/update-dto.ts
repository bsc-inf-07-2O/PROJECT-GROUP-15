import { OmitType, PartialType } from '@nestjs/mapped-types';

import { CreateStudentDto } from './Student-dto';

export class UpdateDto extends PartialType(CreateStudentDto
  
) {}