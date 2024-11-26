
import { Repository } from "typeorm";
import {User} from './Student.entity';

//@EntityRepository(User)
export class userRepository extends Repository<User>{

}