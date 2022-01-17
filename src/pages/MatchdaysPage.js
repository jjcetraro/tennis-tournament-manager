import { useEffect, useState } from "react";
import { Button, Card, Row, Col, Spinner } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

import matchdayDaoCreator from "../daos/matchdayDao"

export default function MatchdaysPage() {
    const navigate = useNavigate();

    const [matchdays, setMatchdays] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const obtenerDatos = async () => {
            const matchdayDao = matchdayDaoCreator()
            const arrayMatchdays = await matchdayDao.getMatchdays()
            setMatchdays(arrayMatchdays)
            setLoading(false)
        }
        obtenerDatos()
    }, [])

    return (
        <>
            <h1>Jornadas</h1>
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
                    matchdays.map(matchday => {
                        return (
                            <Col xs={12} md={4} key={matchday.getId()}>
                                <Link to={`/matchday/${matchday.getId()}`} style={{textDecoration: 'none'}}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>{matchday.getTitle()}</Card.Title>
                                            <Card.Text>{`Cancha: ${matchday.getPlace()}`}</Card.Text>
                                            <Card.Text>{`${matchday.getMatches().length} partidos`}</Card.Text>
                                            <Card.Text>{matchday.getDate()}</Card.Text>
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