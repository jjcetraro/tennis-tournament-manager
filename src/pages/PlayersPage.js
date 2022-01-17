import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Row, Col, Card, Button, Spinner } from "react-bootstrap"
import playerDaoCreator from "../daos/playerDao"
import matchdayDaoCreator from "../daos/matchdayDao"
import EnumMatchdayState from "../entities/EnumMatchdayState";

export default function PlayersPage() {

    const [players, setPlayers] = useState([])
    const [loading, setLoading] = useState(true)
    const [openMatchdaysCount, setOpenMatchdaysCount] = useState(-1)
    const [playerIdsInOpenMatchday, setPlayerIdsInOpenMatchday] = useState([])
    const [openMatchdayId, setOpenMatchdayId] = useState('')

    useEffect(() => {
        const obtenerDatos = async () => {const matchdayDao = matchdayDaoCreator()
            const openMatchdays = await matchdayDao.getMatchdaysByState(EnumMatchdayState.OPEN)
            setOpenMatchdaysCount(openMatchdays.length)
            if(openMatchdays.length === 1){
                setPlayerIdsInOpenMatchday(openMatchdays[0].getPlayersIds())
                setOpenMatchdayId(openMatchdays[0].getId())
            }
            const playerDao = playerDaoCreator()
            let arrayPlayers = await playerDao.getPlayers()
            arrayPlayers.sort((player1, player2) => player1.getName().localeCompare(player2.getName()));
            setPlayers(arrayPlayers)
            setLoading(false)
        }
        obtenerDatos()
    }, [])

    const navigate = useNavigate()

    const handleClickAddPlayer = () => navigate("/addPlayer")


    const handleClickRemovePlayerFromMatchday = async (event, playerId) => {
        event.target.setAttribute('disabled', '');
        const matchdayDao = matchdayDaoCreator()
        await matchdayDao.removePlayerFromMatchday(openMatchdayId, playerId)
        window.location.reload()
            
    }
    
    const handleClickAddPlayerToMatchday = async (event, playerId) => {
        event.target.setAttribute('disabled', '');
        const matchdayDao = matchdayDaoCreator()
        await matchdayDao.addPlayerToMatchday(openMatchdayId, playerId)
        window.location.reload()
    }


    return (
        <>
            <h1>Jugadores</h1>
            <Row>
                <Col className="text-center">
                    <Button onClick={handleClickAddPlayer}>Agregar Jugador</Button>
                </Col>
            </Row>
            <Row>
                {
                    loading 
                    ?
                    <Col xs={12} className="text-center mt-5">
                        <Spinner animation="border" role="status" variant="primary">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </Col>
                    :
                    players.map(player => {
                        return (
                            <Col xs={12} md={4} key={player.getId()}>
                                    <Card>

                                        <Link to={`/player/${player.getId()}`} style={{textDecoration: 'none'}}>
                                            <Card.Body>
                                                <Card.Title>{player.getName()}</Card.Title>
                                                <Card.Text>{player.isMale() ? 'Hombre' : 'Mujer'}</Card.Text>
                                                <Card.Text>{player.getAge() + ' años'}</Card.Text>
                                            </Card.Body>
                                        </Link>
                                        <Card.Footer>
                                        {
                                                openMatchdaysCount === 1
                                                ?
                                                (
                                                    playerIdsInOpenMatchday.includes(player.getId())
                                                    ?
                                                    <Button variant="danger" onClick={event => handleClickRemovePlayerFromMatchday(event, player.getId())}>Quitar de la Jornada</Button>
                                                    :
                                                    <Button onClick={event => handleClickAddPlayerToMatchday(event, player.getId())}>Agregar a la Jornada</Button>
                                                )
                                                :
                                                <></>
                                        }
                                        </Card.Footer>
                                    </Card>
                            </Col>
                        )
                    })
                }
            </Row>
        </>
    )
}