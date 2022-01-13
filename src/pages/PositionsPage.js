import { useState, useEffect } from "react"
import { Table } from "react-bootstrap"
import playerDaoCreator from "../daos/playerDao"

export default function PositionsPage() {

    const [players, setPlayers] = useState([])

    useEffect(() => {
        const obtenerDatos = async () => {
            const playerDao = playerDaoCreator()
            let arrayPlayers = await playerDao.getPlayers()
            arrayPlayers.sort((player1, player2) => player2.getPts() - player1.getPts());
            setPlayers(arrayPlayers)
        }
        obtenerDatos()

    }, [])

    return (
        <>
            <h1>Tabla de Posiciones</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>W</th>
                        <th>L</th>
                        <th>Pts</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        players.map((player, index) => {
                            return (
                                <tr key={player.getId()}>
                                    <td>{index+1}</td>
                                    <td>{player.getName()}</td>
                                    <td>{player.getW()}</td>
                                    <td>{player.getL()}</td>
                                    <td>{player.getPts()}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </>
    )
}
