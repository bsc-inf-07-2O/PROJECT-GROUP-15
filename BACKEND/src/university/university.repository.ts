
import {  EntityRepository, Repository } from "typeorm";
import {University} from './University.entity';
//entity
@EntityRepository(University)
export class universityRepository extends Repository<University>{

}