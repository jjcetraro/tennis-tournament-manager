import Player from '../entities/Player'
import { collection, getDocs, addDoc } from 'firebase/firestore'
import db from '../firebase/firebaseConfig'

export default function playerDao(){
    
    const PLAYERS_COLLECTION_NAME = 'player'

    async function getPlayers() {
        const datos = await getDocs(collection(db, PLAYERS_COLLECTION_NAME))
        const result = []
        datos.forEach(doc => {
            result.push(new Player(doc.id, doc.data().name, doc.data().isMale, doc.data().birthdate))
        })
        return result
    }

    async function addPlayer(player) {
        await addDoc(collection(db, PLAYERS_COLLECTION_NAME), {
            name: player.getName(),
            birthdate: player.getBirthdate(),
            isMale: player.isMale()
        })
    }
    
    return Object.freeze({ 
      getPlayers, addPlayer
    });
 }