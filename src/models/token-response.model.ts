import {Model, model, property} from '@loopback/repository';

@model({settings: {}})
export class TokenResponse extends Model {
  @property({
    type: 'string',
    required: true,
  })
  token: string;


  constructor(data?: Partial<TokenResponse>) {
    super(data);
  }
}