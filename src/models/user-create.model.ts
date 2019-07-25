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
   * 
   */
  @property({required: true})
  username: string;

  /**
   * 
   */
  @property({required: true})
  email: string;

  /**
   * 
   */
  @property({required: true})
  password: string;

}

