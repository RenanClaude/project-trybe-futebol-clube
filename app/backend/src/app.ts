import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import TeamsController from './controllers/teamsController';
import LoginController from './controllers/loginController';
import Encryptor from './middlewares/encryptor';
import LoginService from './sevices/loginService';
import LoginMiddleware from './middlewares/loginMiddleware';

class App {
  public app: express.Express;
  public teamsController = new TeamsController();
  public encryptor = new Encryptor();
  public loginService = new LoginService();
  public loginController = new LoginController(this.loginService, this.encryptor);

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);

    // Endpoint - Requisito 3
    this.app.get('/teams', (req, res) => this.teamsController.getAllTeamsController(req, res));

    // Endpoint - Requisito 5
    this.app.get('/teams/:id', (req: Request, res: Response) => this.teamsController
      .getTeamByIdController(req, res));

    // Endpoint - Requisito 8
    this.app.post(
      '/login',
      (req: Request, res: Response, next: NextFunction) => LoginMiddleware
        .loginValidations(req, res, next),
      (req, res) => this.loginController.loginController(req, res),
    );
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
