import { Request, Response } from 'express';
import TeamsService from '../sevices/teamsService';
// import { ITeamsController } from '../Interfaces/Icontroller/ITeamsController';

export default class TeamsController {
  constructor(private teamsService = new TeamsService()) {}

  public async getAllTeamsController(_req: Request, res: Response) {
    const allTeams = await this.teamsService.getAllTeamsService();
    return res.status(200).json(allTeams);
  }

  public async getTeamByIdController(req: Request, res: Response) {
    const { id } = req.params;
    const team = await this.teamsService.getTeamByIdService(Number(id));
    return res.status(200).json(team);
  }
}
