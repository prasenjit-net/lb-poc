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
    if (!request.headers.api_key) {
      throw new HttpErrors.Unauthorized(`api_key header not found.`);
    }

    // for example: Bearer xxx.yyy.zzz
    const authHeaderValue = request.headers.api_key;
    console.log(authHeaderValue);
    console.log(typeof authHeaderValue);
    return (authHeaderValue instanceof Array) ? authHeaderValue[0] : authHeaderValue;
  }

}