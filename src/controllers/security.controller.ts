/* eslint-disable @typescript-eslint/no-explicit-any */
import {operation, param, requestBody} from '@loopback/rest';
import {UserDataResponse} from '../models/user-data-response.model';
import {LoginRequest} from '../models/login-request.model';

/**
 * The controller class is generated from OpenAPI spec with operations tagged
 * by security
 * A Security related operations
 */
export class SecurityController {
  constructor() {}

  /**
   * Return the current user who is logged in
   * 

   * @returns Success Response
   */
  @operation('get', '/user/me')
  async getMe(): Promise<UserDataResponse> {
    throw new Error('Not implemented');
  }

  /**
   * Log in with user credentials
   * 

   * @param _requestBody Login request body
   * @returns Login Success
   */
  @operation('post', '/login')
  async login(@requestBody() _requestBody: LoginRequest): Promise<UserDataResponse> {
    throw new Error('Not implemented');
  }

  /**
   * Logout from the system
   * 

   */
  @operation('delete', '/login')
  async logout(): Promise<any> {
    throw new Error('Not implemented');
  }

}

