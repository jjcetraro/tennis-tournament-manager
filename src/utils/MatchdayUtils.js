import EnumMatchdayState from "../entities/EnumMatchdayState"
import Match from "../entities/Match"
import Matchday from "../entities/Matchday"
import Team from "../entities/Team"

function _getRandomInt(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min)
}

export default class MatchdayUtils {

    static closeInscriptionsAndCreateMatches(matchday) {
        const result = Matchday.clone(matchday)
        result.setState(EnumMatchdayState.WAITING_FOR_RESULTS)
        // generate the matches
        const matches = []
        while(result.getPlayers().length >= 4){
            // we need at least 4 players to create a new match
            const playersForNextMatch = []
            for(let i = 0; i < 4; i++){
                const randomNumber = _getRandomInt(0, result.getPlayers().length - 1)
                const player = result.getPlayers()[randomNumber]
                playersForNextMatch.push(player)
                result.removePlayer(player)
            }
            matches.push(
                new Match(
                    null,
                    new Team(playersForNextMatch[0], playersForNextMatch[1]),
                    new Team(playersForNextMatch[2], playersForNextMatch[3]),
                    [-1, -1, -1],
                    [-1, -1, -1]
                )
            )
        }
        result.setMatches(matches)
        return result
    }

    static getWinner(team1Score, team2Score){
        const setWinners = [-1, -1, -1]
        for(let i = 0; i < 3; i++){
            team1Score[i] > team2Score[i] ? setWinners[i] = 1 : setWinners[i] = 2
        }
        console.log(setWinners)
        if(setWinners[0] === setWinners[1]) return setWinners[0]
        else return setWinners[2]
    }
}