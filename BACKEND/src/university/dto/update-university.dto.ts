import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUniversityDto } from './create-university.dto';
//update
export class UpdateUniversityDto extends PartialType( CreateUniversityDto

) {}
