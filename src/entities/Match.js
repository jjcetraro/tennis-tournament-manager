export default class Match {
    constructor(id, team1, team2, team1Score, team2Score) {
        this._id = id
        this._team1 = team1
        this._team2 = team2
        this._team1Score = team1Score
        this._team2Score = team2Score
    }

    getId = () => this._id

    getTeam1 = () => this._team1

    getTeam2 = () => this._team2

    getTeam1Score = () => this._team1Score

    getTeam2Score = () => this._team2Score
}