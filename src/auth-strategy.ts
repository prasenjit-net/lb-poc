import {AuthenticationStrategy, TokenService, UserProfile} from '@loopback/authentication';
import {HttpErrors, Request} from '@loopback/rest';
import {TokenServiceBindings} from './keys';
import {inject} from '@loopback/context';

export class MySimpleAuthStrategy implements AuthenticationStrategy {
  name: string = 'token_security';

  constructor(@inject(TokenServiceBindings.TOKEN_SERVICE) private tokenService: TokenService) {
  }

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    const token: string = MySimpleAuthStrategy.extractCredentials(request);
    return await this.tokenService.verifyToken(token);
  }

  static extractCredentials(request: Request): string {
    if (!request.headers.authorization) {
      throw new HttpErrors.Unauthorized(`Authorization header not found.`);
    }

    // for example: Bearer xxx.yyy.zzz
    const authHeaderValue = request.headers.authorization;

    if (!authHeaderValue.startsWith('Bearer')) {
      throw new HttpErrors.Unauthorized(
        `Authorization header is not of type 'Bearer'.`,
      );
    }

    //split the string into 2 parts: 'Bearer ' and the `xxx.yyy.zzz`
    const parts = authHeaderValue.split(' ');
    if (parts.length !== 2)
      throw new HttpErrors.Unauthorized(
        `Authorization header value has too many parts. It must follow the pattern: 'Bearer xx.yy.zz' where xx.yy.zz is a valid JWT token.`,
      );
    return parts[1];
  }

}