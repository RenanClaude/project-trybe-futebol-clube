import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { IUser } from '../Interfaces/IUser';

export default class Token {
  private jwt = jwt;
  private static secret = 'jwt_secret';

  async getToken(userData: IUser): Promise<string> {
    const { id, email, role } = userData;
    const payload = { id, email, role };

    const token = this.jwt.sign(payload, Token.secret);
    return token;
  }

  static async tokenValidation(req: Request, res: Response): Promise<Response> {
    const { authorization: token } = req.headers;

    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    try {
      const userData = jwt.verify(token, Token.secret) as jwt.JwtPayload;
      const { role } = userData;
      return res.status(200).json({ role });
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}
