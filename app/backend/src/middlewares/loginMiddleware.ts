import { Request, Response, NextFunction } from 'express';

export default class LoginMiddleware {
  static loginValidations(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    next();
  }
}
