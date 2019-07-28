/* eslint-disable @typescript-eslint/no-explicit-any */
import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - UserSummary
 * A summary of a single user profile data
 */
@model({name: 'UserSummary'})
export class UserSummary {
  constructor(data?: Partial<UserSummary>) {
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

