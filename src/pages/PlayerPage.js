import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap"
import playerDaoCreator from "../daos/playerDao"

export default function PlayerPage() {
    const {id} = useParams()
    const navigate = useNavigate()

    const [player, setPlayer] = useState({
        name: '-',
        gender: '-',
        age: '-'
    })

    useEffect(() => {
        const obtenerDatos = async () => {
            const playerDao = playerDaoCreator()
            let arrayPlayers = await playerDao.getPlayers()
            arrayPlayers.forEach(pl => {
                if(pl.getId() === id){
                    setPlayer({
                        name: pl.getName(),
                        gender: pl.isMale() ? 'Hombre' : 'Mujer',
                        age: pl.getAge()
                    })
                    return;
                }
            });
        }
        obtenerDatos()

    }, [id])

    const handleClickDeletePlayer = async event => {
        if(window.confirm('¿Está seguro que desea borrar a este Jugador?')){
            event.target.setAttribute('disabled', '');
            const playerDao = playerDaoCreator()
            await playerDao.deletePlayer(id)
            navigate('/players')
        }
    }

    return (
        <>
            <h1>{player.name}</h1>
            <h2>{player.gender}</h2>
            <h3>{player.age + ' años'}</h3>
            <Button variant="danger" onClick={handleClickDeletePlayer}>Borrar</Button>
        </>
    )
}