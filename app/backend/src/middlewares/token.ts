import * as jwt from 'jsonwebtoken';
import { IUser } from '../Interfaces/IUser';

export default class Token {
  private jwt = jwt;
  private secret = 'jwt_secret';

  async getToken(userData: IUser): Promise<string> {
    const { id, email } = userData;
    const payload = { id, email };

    const token = this.jwt.sign(payload, this.secret);
    return token;
  }
}
