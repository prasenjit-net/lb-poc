/* eslint-disable @typescript-eslint/no-explicit-any */
import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - UserDataResponse
 * UserDataResponse
 */
@model({name: 'UserDataResponse'})
export class UserDataResponse {
  constructor(data?: Partial<UserDataResponse>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

  /**
   * 
   */
  @property()
  username: string;

  /**
   * 
   */
  @property()
  email: string;

}

