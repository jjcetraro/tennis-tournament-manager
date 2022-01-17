export default class Team {
    constructor(player1, player2) {
        this._player1 = player1
        this._player2 = player2
    }

    getPlayer1 = () => this._player1

    getPlayer2 = () => this._player2
}