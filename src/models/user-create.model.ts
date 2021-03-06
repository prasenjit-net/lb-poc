/* eslint-disable @typescript-eslint/no-explicit-any */
import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - UserCreate
 * UserCreate
 */
@model({name: 'UserCreate'})
export class UserCreate {
  constructor(data?: Partial<UserCreate>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

  /**
   * Username to use for login
   */
  @property({required: true})
  username: string;

  /**
   * Email address for communication
   */
  @property({required: true})
  email: string;

  /**
   * Password for login
   */
  @property({required: true})
  password: string;

  /**
   * First name of the user
   */
  @property()
  firstName?: string;

  /**
   * Last name of the user
   */
  @property()
  lastName?: string;

}

