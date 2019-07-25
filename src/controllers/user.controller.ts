/* eslint-disable @typescript-eslint/no-explicit-any */
import {operation, requestBody} from '@loopback/rest';
import {UserDataResponse, UserCreate, User} from '../models';
import {UserRepository} from '../repositories';
import {repository} from '@loopback/repository';

/**
 * The controller class is generated from OpenAPI spec with operations tagged
 * by user
 * User related operations
 */
export class UserController {
  constructor(@repository(UserRepository) private _userRepo: UserRepository) {
  }

  /**
   * List all available users
   *

   * @returns User list success response
   */
  @operation('get', '/user')
  async listUsers(): Promise<UserDataResponse[]> {
    const users = await this._userRepo.find();
    const respArray: UserDataResponse[] = [];
    for (const it in users) {
      const user = users[it];
      delete user.password;
      delete user.authority;
      delete user.id;
      const udr: UserDataResponse = new UserDataResponse(user);
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
  async createUser(@requestBody() _requestBody: UserCreate): Promise<UserDataResponse> {
    const user = new User(_requestBody);
    const savedUser = await this._userRepo.save(user);
    return new UserDataResponse(savedUser);
  }

}

