import Matchday from '../entities/Matchday'
import { collection, doc, getDocs, updateDoc, writeBatch } from 'firebase/firestore'
import db from '../firebase/firebaseConfig'
import EnumMatchdayState from '../entities/EnumMatchdayState'
import MatchdayUtils from '../utils/MatchdayUtils'

import { v4 as uuidv4 } from 'uuid'

import playerDaoCreator from "../daos/playerDao"
import matchDaoCreator from "../daos/matchDao"

export default function matchdayDao(){
    
    const MATCHDAYS_COLLECTION_NAME = 'matchday'

    async function getMatchdaysByState(state){
        return (await getMatchdays()).filter(matchday => matchday.getState() === state)
    }

    async function getMatchdayById(id) {
        const matchdays = await getMatchdays()
        for(let i = 0; i < matchdays.length; i++){
            if(matchdays[i].getId() === id){
                return matchdays[i]
            }
        }
        return null
    }

    async function getMatchdays() {
        const players = await playerDaoCreator().getPlayers()
        const matches = await matchDaoCreator().getMatches(players)
        
        const datos = await getDocs(collection(db, MATCHDAYS_COLLECTION_NAME))
        const result = []
        datos.forEach(doc => {
            const playersIds = doc.data().players
            const matchesIds = doc.data().matches
            result.push(
                new Matchday(
                    doc.id, 
                    doc.data().title,
                    doc.data().place,
                    doc.data().date,
                    doc.data().state, 
                    players.filter(player => playersIds.includes(player.getId())),
                    matches.filter(match => matchesIds.includes(match.getId()))
                )
            )
        })
        return result
    }

    async function addPlayerToMatchday(matchdayId, playerId){
        const matchday = await getMatchdayById(matchdayId)
        if(!matchday || !matchday.getPlayers()){
            return
        }
        const playersIds = matchday.getPlayers().map(player => player.getId())
        if(playersIds.includes(playerId)){
            return
        }
        playersIds.push(playerId)
        await updateDoc(doc(db, MATCHDAYS_COLLECTION_NAME, matchdayId), {
            players: playersIds
        })
    }

    async function removePlayerFromMatchday(matchdayId, playerId){
        const matchday = await getMatchdayById(matchdayId)
        if(!matchday || !matchday.getPlayers()){
            return
        }
        let playersIds = matchday.getPlayers().map(player => player.getId())
        playersIds = playersIds.filter(id => id !== playerId)
        await updateDoc(doc(db, MATCHDAYS_COLLECTION_NAME, matchdayId), {
            players: playersIds
        })
    }

    async function updateMatchdayStateToWaitingForResults(id){
        const matchday = await getMatchdayById(id)
        const modifiedMatchday = MatchdayUtils.closeInscriptionsAndCreateMatches(matchday)

        // Get a new write batch
        const batch = writeBatch(db);

        // add matches
        const matchesIds = []
        for(let i = 0; i < modifiedMatchday.getMatches().length; i++){
            const match = modifiedMatchday.getMatches()[i]
            const autogeneratedId = uuidv4()
            matchesIds.push(autogeneratedId)
            batch.set(doc(db, 'match', autogeneratedId), {
                team1: [
                    match.getTeam1().getPlayer1().getId(),
                    match.getTeam1().getPlayer2().getId()
                ],
                team1Score: [-1,-1,-1],
                team2: [
                    match.getTeam2().getPlayer1().getId(),
                    match.getTeam2().getPlayer2().getId()
                ],
                team2Score: [-1,-1,-1]
            })
        }
        // add matches to the matchday and change matchday state
        batch.update(doc(db, MATCHDAYS_COLLECTION_NAME, id), {'matches': matchesIds, 'state': EnumMatchdayState.WAITING_FOR_RESULTS});

        // Commit the batch
        await batch.commit()
    }

    async function loadResults(matchday, results){
        // Get a new write batch
        const batch = writeBatch(db);

        // update the result of the matches
        const matchesIds = Object.keys(results)
        for(let i = 0; i < matchesIds.length; i++){
            const matchId = matchesIds[i]
            batch.update(doc(db, 'match', matchesIds[i]), {
                team1Score: [results[matchId][0],results[matchId][1],results[matchId][2]],
                team2Score: [results[matchId][3],results[matchId][4],results[matchId][5]]
            })
        }

        // update matchday state
        batch.update(doc(db, MATCHDAYS_COLLECTION_NAME, matchday.getId()), {'state': EnumMatchdayState.CLOSED});

        // update positions table
        const winners = []
        const losers = []
        for(let i = 0; i < matchesIds.length; i++){
            const matchId = matchesIds[i]
            const winnerTeamNumber = MatchdayUtils.getWinner(
                [results[matchId][0],results[matchId][1],results[matchId][2]],
                [results[matchId][3],results[matchId][4],results[matchId][5]]
            )
            const match = matchday.getMatches().filter(m => m.getId() === matchId)[0]
            if(winnerTeamNumber === 1){
                winners.push(match.getTeam1().getPlayer1())
                winners.push(match.getTeam1().getPlayer2())
                losers.push(match.getTeam2().getPlayer1())
                losers.push(match.getTeam2().getPlayer2())
            }else{
                losers.push(match.getTeam1().getPlayer1())
                losers.push(match.getTeam1().getPlayer2())
                winners.push(match.getTeam2().getPlayer1())
                winners.push(match.getTeam2().getPlayer2())
            }
        }
        for(let i = 0; i < losers.length; i++){
            const player = losers[i]
            batch.update(doc(db, 'player', player.getId()), 
                {
                    'l': player.getL() + 1,
                    'pts': player.getPts() + 1
                }
            )
        }
        for(let i = 0; i < losers.length; i++){
            const player = winners[i]
            batch.update(doc(db, 'player', player.getId()), 
                {
                    'w': player.getW() + 1,
                    'pts': player.getPts() + 2
                }
            )
        }

        // add new matchday
        const matchdaysCount = (await getMatchdays()).length
        batch.set(doc(db, MATCHDAYS_COLLECTION_NAME, uuidv4()),
            {
                title: `Jornada ${matchdaysCount+1}`,
                place: '',
                date: null,
                state: EnumMatchdayState.OPEN,
                players: [],
                matches: []
            }
        )

        // Commit the batch
        await batch.commit()
    }
    
    return Object.freeze({ 
        getMatchdaysByState, 
        getMatchdayById, 
        getMatchdays, 
        addPlayerToMatchday, 
        removePlayerFromMatchday, 
        updateMatchdayStateToWaitingForResults,
        loadResults
    });
 }