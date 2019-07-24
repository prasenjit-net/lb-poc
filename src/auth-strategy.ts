import {AuthenticationStrategy, UserProfile} from '@loopback/authentication';
import {Request, HttpErrors} from '@loopback/rest';

export class MySimpleAuthStrategy implements AuthenticationStrategy {
  name: string = 'token_security';

  authenticate(req: Request): Promise<UserProfile | undefined> {
    // check for basic auth header
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
      throw new HttpErrors.Unauthorized('Missing Authorization Header');
    }

    // verify auth credentials
    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    if (username === password) {
      return Promise.resolve({id: username, name: username});
    } else {
      throw new HttpErrors.Unauthorized('Username or password did not match');
    }
  }

}