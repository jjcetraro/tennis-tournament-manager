export default class Matchday {
    constructor(id, title, place, date, state, players, matches) {
        this._id = id
        this._title = title
        this._place = place
        this._date = date
        this._state = state
        this._players = players
        this._matches = matches
    }

    static clone = (matchday) => {
        return new Matchday(
            matchday.getId(),
            matchday.getTitle(),
            matchday.getPlace(),
            matchday.getDate(),
            matchday.getState(),
            [...matchday.getPlayers()],
            [...matchday.getMatches()]
        )
    }

    getId = () => this._id

    getTitle = () => this._title

    getPlace = () => this._place

    getDate = () => this._date

    getState = () => this._state

    setState = (state) => {
        this._state = state
    }

    getPlayers = () => this._players

    getMatches = () => this._matches

    setMatches = (matches) => {
        this._matches = matches
    }

    getPlayersIds = () => this._players.map(player => player.getId())

    removePlayer = player => {
        this._players = this._players.filter(pl => pl.getId() !== player.getId())
    }
}