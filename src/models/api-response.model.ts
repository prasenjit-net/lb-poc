/* eslint-disable @typescript-eslint/no-explicit-any */
import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - ApiResponse
 * ApiResponse
 */
@model({name: 'ApiResponse'})
export class ApiResponse {
  constructor(data?: Partial<ApiResponse>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

  /**
   * 
   */
  @property()
  code?: number;

  /**
   * 
   */
  @property()
  type?: string;

  /**
   * 
   */
  @property()
  message?: string;

}

