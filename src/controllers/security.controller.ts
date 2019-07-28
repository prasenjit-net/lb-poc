/* eslint-disable @typescript-eslint/no-explicit-any */
import {operation, requestBody} from '@loopback/rest';
import {UserSummary, Credentials, TokenResponse, User} from '../models';
import {inject} from '@loopback/context';
import {TokenServiceBindings, UserServiceBindings} from '../keys';
import {authenticate, AuthenticationBindings, TokenService, UserProfile, UserService} from '@loopback/authentication';

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
  @authenticate('token_security')
  @operation('get', '/user/me')
  async getMe(@inject(AuthenticationBindings.CURRENT_USER)
                currentUserProfile: UserProfile): Promise<UserSummary> {
    return new UserSummary(currentUserProfile);
  }

  /**
   * Log in with user credentials and get a token
   *

   * @param _requestBody Login request body
   * @returns Login Success
   */
  @operation('post', '/login')
  async login(@requestBody() _requestBody: Credentials): Promise<TokenResponse> {
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

