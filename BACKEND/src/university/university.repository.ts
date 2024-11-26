<<<<<<< HEAD

import {  EntityRepository, Repository } from "typeorm";
import {University} from './University.entity';

@EntityRepository(University)
export class universityRepository extends Repository<University>{

=======

import {  EntityRepository, Repository } from "typeorm";
import {University} from './University.entity';
//entity
@EntityRepository(University)
export class universityRepository extends Repository<University>{

>>>>>>> cb1368fd7492417344ad1d194a6ef3581f993036
}