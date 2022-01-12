import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Row, Col, Card, Button } from "react-bootstrap"
import playerDaoCreator from "../daos/playerDao"

export default function PlayersPage() {

    const [players, setPlayers] = useState([])

    useEffect(() => {


        const obtenerDatos = async () => {
            /*const datos = await getDocs(collection(db, 'player'))
            datos.forEach(documento => {
                console.log(documento.data())
            })*/

            const playerDao = playerDaoCreator()
            setPlayers(await playerDao.getPlayers())
        }

        obtenerDatos()

    }, [])

    const navigate = useNavigate()

    const handleClickAddPlayer = () => navigate("/addPlayer")

    return (
        <>
            <h1>Players</h1>
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
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{player.getName()}</Card.Title>
                                        <Card.Text>{player.isMale() ? 'Hombre' : 'Mujer'}</Card.Text>
                                        <Card.Text>{player.getAge() + ' años'}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })
                }
            </Row>
        </>
    )
}