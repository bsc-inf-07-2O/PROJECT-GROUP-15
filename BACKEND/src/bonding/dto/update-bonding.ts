import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateBonding } from './create-bonding';

export class UpdateBonding extends PartialType(CreateBonding
  
) {}