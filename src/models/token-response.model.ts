/* eslint-disable @typescript-eslint/no-explicit-any */
import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - TokenResponse
 * A response which contains a login success token
 */
@model({name: 'TokenResponse'})
export class TokenResponse {
  constructor(data?: Partial<TokenResponse>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

  /**
   * JWT token to be passed in further requests for getting access
   */
  @property({required: true})
  token: string;

}

