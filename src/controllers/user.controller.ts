/* eslint-disable @typescript-eslint/no-explicit-any */
import {operation, requestBody} from '@loopback/rest';
import {User, UserCreate, UserSummary} from '../models';
import {repository} from '@loopback/repository';
import {UserRepository} from '../repositories';
import {inject} from '@loopback/context';
import {PasswordHasherBindings} from '../keys';
import {PasswordHasher} from '../services/password-hash-service';

/**
 * The controller class is generated from OpenAPI spec with operations tagged
 * by user
 * User related operations
 */
export class UserController {
  constructor(@repository(UserRepository) private _userRepo: UserRepository,
              @inject(PasswordHasherBindings.PASSWORD_HASHER)
              public passwordHasher: PasswordHasher) {
  }

  /**
   * List all available users
   * 

   * @returns User list success response
   */
  @operation('get', '/user')
  async listUsers(): Promise<UserSummary[]> {
    const users = await this._userRepo.find();
    const respArray: UserSummary[] = [];
    for (const it in users) {
      const user = users[it];
      delete user.password;
      delete user.authority;
      delete user.id;
      const udr: UserSummary = new UserSummary(user);
      respArray.push(udr);
    }
    return respArray;
  }

  /**
   * Create new user, later can be used for authentication
   * 

   * @param _requestBody Create a User Request
   * @returns User successfully created
   */
  @operation('post', '/user')
  async createUser(@requestBody() _requestBody: UserCreate): Promise<UserSummary> {
    const user = new User(_requestBody);
    user.password = await this.passwordHasher.hashPassword(user.password);
    const savedUser = await this._userRepo.save(user);
    delete savedUser.password;
    delete savedUser.authority;
    delete savedUser.id;
    return new UserSummary(savedUser);
  }

}

