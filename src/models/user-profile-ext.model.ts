import {model} from '@loopback/repository';
import {UserProfile} from '@loopback/authentication';

@model({settings: {strict: false}})
export class UserProfileExt implements UserProfile {
  // Define well-known properties here

  email: string;
  id: string;
  name: string;

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<UserProfileExt>) {
    if (data != null && typeof data === 'object') {
      Object.assign(this, data);
    }
  }
}