import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Row, Col, Card, Button } from "react-bootstrap"
import playerDaoCreator from "../daos/playerDao"

export default function PlayersPage() {

    const [players, setPlayers] = useState([])

    useEffect(() => {
        const obtenerDatos = async () => {
            const playerDao = playerDaoCreator()
            let arrayPlayers = await playerDao.getPlayers()
            arrayPlayers.sort((player1, player2) => player1.getName().localeCompare(player2.getName()));
            setPlayers(arrayPlayers)
        }
        obtenerDatos()

    }, [])

    const navigate = useNavigate()

    const handleClickAddPlayer = () => navigate("/addPlayer")

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
                    players.map(player => {
                        return (
                            <Col xs={12} md={4} key={player.getId()}>
                                <Link to={`/player/${player.getId()}`} style={{textDecoration: 'none'}}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>{player.getName()}</Card.Title>
                                            <Card.Text>{player.isMale() ? 'Hombre' : 'Mujer'}</Card.Text>
                                            <Card.Text>{player.getAge() + ' años'}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </Col>
                        )
                    })
                }
            </Row>
        </>
    )
}