/* eslint-disable @typescript-eslint/no-explicit-any */
import {operation, requestBody} from '@loopback/rest';
import {LoginRequest, User, TokenResponse} from '../models';
import {authenticate, AuthenticationBindings, TokenService, UserProfile, UserService} from '@loopback/authentication';
import {inject} from '@loopback/context';
import {TokenServiceBindings, UserServiceBindings} from '../keys';
import {Credentials} from '../repositories';

/**
 * The controller class is generated from OpenAPI spec with operations tagged
 * by security
 * A Security related operations
 */
export class SecurityController {
  constructor(@inject(TokenServiceBindings.TOKEN_SERVICE)
              public jwtService: TokenService,
              @inject(UserServiceBindings.USER_SERVICE)
              public userService: UserService<User, Credentials>) {
  }

  /**
   * Return the current user who is logged in
   *

   * @returns Success Response
   */
  @operation('get', '/user/me')
  @authenticate('token_security')
  async getMe(@inject(AuthenticationBindings.CURRENT_USER)
                currentUserProfile: UserProfile): Promise<UserProfile> {
    return currentUserProfile;
  }

  /**
   * Log in with user credentials
   *

   * @param _requestBody Login request body
   * @returns Login Success
   */
  @operation('post', '/login')
  async login(@requestBody() _requestBody: LoginRequest): Promise<TokenResponse> {
    // ensure the user exists, and the password is correct
    const user = await this.userService.verifyCredentials(_requestBody);

    // convert a User object into a UserProfile object (reduced set of properties)
    const userProfile = this.userService.convertToUserProfile(user);

    // create a JSON Web Token based on the user profile
    const token = await this.jwtService.generateToken(userProfile);

    return new TokenResponse({token: token});
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

