import {inject} from '@loopback/context';
import {HttpErrors} from '@loopback/rest';
import {promisify} from 'util';
import {TokenService, UserProfile} from '@loopback/authentication';
import {TokenServiceBindings} from '../keys';
import {UserProfileExt} from '../models';
import * as _ from 'lodash';

const jwt = require('jsonwebtoken');
const signAsync = promisify(jwt.sign);
const verifyAsync = promisify(jwt.verify);

export class JWTService implements TokenService {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SECRET)
    private jwtSecret: string,
    @inject(TokenServiceBindings.TOKEN_EXPIRES_IN)
    private jwtExpiresIn: string,
  ) {
  }

  async verifyToken(token: string): Promise<UserProfile> {
    if (!token) {
      throw new HttpErrors.Unauthorized(
        `Error verifying token : 'token' is null`,
      );
    }

    try {
      // decode user profile from token
      const decryptedToken = await verifyAsync(token, this.jwtSecret);
      const filtered = _.pick(decryptedToken, ['username', 'email', 'firstName', 'lastName']);

      return new UserProfileExt(filtered);
    } catch (error) {
      throw new HttpErrors.Unauthorized(
        `Error verifying token : ${error.message}`,
      );
    }
  }

  async generateToken(userProfile: UserProfile): Promise<string> {
    if (!userProfile) {
      throw new HttpErrors.Unauthorized(
        'Error generating token : userProfile is null',
      );
    }

    // Generate a JSON Web Token
    let token: string;
    try {
      const tokenData = Object.assign({}, userProfile);
      token = await signAsync(tokenData, this.jwtSecret, {
        expiresIn: Number(this.jwtExpiresIn),
      });
    } catch (error) {
      throw new HttpErrors.Unauthorized(`Error encoding token : ${error}`);
    }

    return token;
  }
}