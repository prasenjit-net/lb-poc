/* eslint-disable @typescript-eslint/no-explicit-any */
import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - Credentials
 * Credentials
 */
@model({name: 'Credentials'})
export class Credentials {
  constructor(data?: Partial<Credentials>) {
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
  password: string;

}

