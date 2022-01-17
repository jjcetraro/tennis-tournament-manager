import Match from '../entities/Match'
import { collection, doc, getDocs, addDoc, deleteDoc } from 'firebase/firestore'
import db from '../firebase/firebaseConfig'
import Team from '../entities/Team'

export default function matchDao(){
    
    const MATCHS_COLLECTION_NAME = 'match'

    async function getMatches(players) {
        const datos = await getDocs(collection(db, MATCHS_COLLECTION_NAME))
        const result = []
        datos.forEach(doc => {
            result.push(
                new Match(
                    doc.id,
                    new Team(
                        _findPlayer(players, doc.data().team1[0]),
                        _findPlayer(players, doc.data().team1[1])
                    ),
                    new Team(
                        _findPlayer(players, doc.data().team2[0]),
                        _findPlayer(players, doc.data().team2[1])
                    ),
                    [
                        doc.data().team1Score[0],
                        doc.data().team1Score[1],
                        doc.data().team1Score[2]
                    ],
                    [
                        doc.data().team2Score[0],
                        doc.data().team2Score[1],
                        doc.data().team2Score[2]
                    ]
                )
            )
        })
        return result
    }

    const _findPlayer = (players, id) => {
        for(let i = 0; i < players.length; i++){
            if(players[i].getId() === id) return players[i];
        }
        return null;
    }

    return Object.freeze({ 
        getMatches
    });
 }