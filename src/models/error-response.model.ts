/* eslint-disable @typescript-eslint/no-explicit-any */
import {model, property} from '@loopback/repository';

/**
 * The model class is generated from OpenAPI schema - ErrorResponse
 * An object represents a error scenario
 */
@model({name: 'ErrorResponse'})
export class ErrorResponse {
  constructor(data?: Partial<ErrorResponse>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }

  /**
   * Http erro status code
   */
  @property({required: true})
  code: number;

  /**
   * Type of the error
   */
  @property()
  type?: string;

  /**
   * Error message
   */
  @property({required: true})
  message: string;

}

