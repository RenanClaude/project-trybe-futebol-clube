export const matchMock = {
  id: 1,
  homeTeamId: 16,
  homeTeamGoals: 1,
  awayTeamId: 8,
  awayTeamGoals: 1,
  inProgress: false,
  homeTeam: { dataValues: {teamName: 'nome'} },
  awayTeam: { dataValues: {teamName: 'nome2'} },
}

export const matchesMock = [matchMock];

export const resultMatchMock = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: { teamName: 'nome' },
    awayTeam: { teamName: 'nome2' },
  }
  ]

  export const reqBodyCreateMatchMock = {
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
  }

  export const resultCreateMatchMock = {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: true,
  }