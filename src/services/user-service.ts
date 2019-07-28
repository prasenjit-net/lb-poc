import {HttpErrors} from '@loopback/rest';
import {Credentials, UserRepository} from '../repositories';
import {User, UserProfileExt} from '../models';
import {UserService, UserProfile} from '@loopback/authentication';
import {repository} from '@loopback/repository';
import {PasswordHasherBindings} from '../keys';
import {inject} from '@loopback/context';
import {PasswordHasher} from './password-hash-service';

export class MyUserService implements UserService<User, Credentials> {
  constructor(
    @repository(UserRepository) public userRepository: UserRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHasher: PasswordHasher,
  ) {
  }

  async verifyCredentials(credentials: Credentials): Promise<User> {
    const foundUser = await this.userRepository.findOne({
      where: {username: credentials.username},
    });

    if (!foundUser) {
      throw new HttpErrors.NotFound(
        `User with email ${credentials.username} not found.`,
      );
    }
    const passwordMatched = await this.passwordHasher.comparePassword(
      credentials.password,
      foundUser.password,
    );

    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized('The credentials are not correct.');
    }

    return foundUser;
  }

  convertToUserProfile(user: User): UserProfile {
    // since first name and lastName are optional, no error is thrown if not provided
    const profile = new UserProfileExt(user);
    profile.name = `${user.firstName} ${user.lastName}`;
    return profile;
  }
}