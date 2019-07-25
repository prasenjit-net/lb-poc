/* eslint-disable @typescript-eslint/no-explicit-any */
import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - LoginRequest
 * LoginRequest
 */
@model({name: 'LoginRequest'})
export class LoginRequest {
  constructor(data?: Partial<LoginRequest>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

  /**
   * 
   */
  @property()
  username?: string;

  /**
   * 
   */
  @property()
  password?: string;

}

