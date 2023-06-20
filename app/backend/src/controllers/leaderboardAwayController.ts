import { Request, Response } from 'express';
import { IMatch } from '../Interfaces/IMatch';
import MatchesService from '../sevices/matchesService';
import TeamsService from '../sevices/teamsService';

export default class LeaderboardAwayController {
  constructor(
    private teamsService = new TeamsService(),
    private matchesService = new MatchesService(),
  ) {}

  public async matchesfinishedController() {
    const matchesFinished = await this.matchesService.getAllMatchesService(false);
    return matchesFinished;
  }

  public async getAllTeamsController() {
    const allTeams = await this.teamsService.getAllTeamsService();
    return allTeams;
  }

  static getTotalGames(teamId: number, allFinishedMatches: IMatch[]) {
    const allMatches = allFinishedMatches.reduce((accumulator, current) => {
      if (current.awayTeamId === teamId) {
        return accumulator + 1;
      } return accumulator;
    }, 0);
    return allMatches;
  }

  static getTotalVictories(teamId: number, allFinishedMatches: IMatch[]) {
    const allVictories = allFinishedMatches.reduce((accumulator, current) => {
      if (current.awayTeamId === teamId && current.homeTeamGoals < current.awayTeamGoals) {
        return accumulator + 1;
      } return accumulator;
    }, 0);
    return allVictories;
  }

  static getTotalDraws(teamId: number, allFinishedMatches: IMatch[]) {
    const allDraws = allFinishedMatches.reduce((accumulator, current) => {
      if (current.awayTeamId === teamId && current.homeTeamGoals === current.awayTeamGoals) {
        return accumulator + 1;
      } return accumulator;
    }, 0);
    return allDraws;
  }

  static getTotalLosses(teamId: number, allFinishedMatches: IMatch[]) {
    const allLosses = allFinishedMatches.reduce((accumulator, current) => {
      if (current.awayTeamId === teamId && current.homeTeamGoals > current.awayTeamGoals) {
        return accumulator + 1;
      } return accumulator;
    }, 0);
    return allLosses;
  }

  static getGoalsFavor(teamId: number, allFinishedMatches: IMatch[]) {
    const allGoalsFavor = allFinishedMatches.reduce((accumulator, current) => {
      if (current.awayTeamId === teamId) {
        return accumulator + current.awayTeamGoals;
      } return accumulator;
    }, 0);
    return allGoalsFavor;
  }

  static getGoalsOwn(teamId: number, allFinishedMatches: IMatch[]) {
    const allGoalsOwn = allFinishedMatches.reduce((accumulator, current) => {
      if (current.awayTeamId === teamId) {
        return accumulator + current.homeTeamGoals;
      } return accumulator;
    }, 0);
    return allGoalsOwn;
  }

  public async getAwayTeamsStats(_req: Request, res: Response) {
    const allTeams = await this.getAllTeamsController();
    const allFinishedMatches = await this.matchesfinishedController();

    const awayTeamsStats = allTeams.map((team) => ({
      name: team.teamName,
      totalPoints: (LeaderboardAwayController.getTotalVictories(team.id, allFinishedMatches) * 3)
                 + (LeaderboardAwayController.getTotalDraws(team.id, allFinishedMatches)),
      totalGames: LeaderboardAwayController.getTotalGames(team.id, allFinishedMatches),
      totalVictories: LeaderboardAwayController.getTotalVictories(team.id, allFinishedMatches),
      totalDraws: LeaderboardAwayController.getTotalDraws(team.id, allFinishedMatches),
      totalLosses: LeaderboardAwayController.getTotalLosses(team.id, allFinishedMatches),
      goalsFavor: LeaderboardAwayController.getGoalsFavor(team.id, allFinishedMatches),
      goalsOwn: LeaderboardAwayController.getGoalsOwn(team.id, allFinishedMatches),
    }));
    return res.status(200).json(awayTeamsStats);
  }
}
