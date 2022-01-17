import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Row, Col, Spinner, Button } from "react-bootstrap";
import MatchComponent from "../components/MatchComponent"

import matchdayDaoCreator from "../daos/matchdayDao"
import EnumMatchdayState from "../entities/EnumMatchdayState"
import MatchdayUtils from "../utils/MatchdayUtils"

export default function MatchdayPage() {
    const {id} = useParams()
    const navigate = useNavigate()

    const [matchday, setMatchday] = useState({})
    const [matchesResults, setMatchesResults] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const obtenerDatos = async () => {
            const matchdayDao = matchdayDaoCreator()
            const mday = await matchdayDao.getMatchdayById(id)
            setMatchday(mday)
            const mResults = {}
            for(let i = 0; i < mday.getMatches().length; i++){
                const match = mday.getMatches()[i]
                mResults[match.getId()] = [-1, -1, -1, -1, -1, -1]
            }
            setMatchesResults(mResults)
            setLoading(false)
        }
        obtenerDatos()
    }, [])

    const handleClickCloseInscriptions = async event => {
        event.target.setAttribute('disabled', '')
        const matchdayDao = matchdayDaoCreator()
        await matchdayDao.updateMatchdayStateToWaitingForResults(id)
        navigate('/matchdays')
    }

    const handleClickLoadResults = async event => {
        event.target.setAttribute('disabled', '')
        const matchdayDao = matchdayDaoCreator()
        await matchdayDao.loadResults(matchday, matchesResults)
        navigate('/matchdays')
    }

    const setResult = (matchId, teamNumber, setNumber, result) => {
        const mResults = {}
        for(let i = 0; i < matchday.getMatches().length; i++){
            const match = matchday.getMatches()[i]
            mResults[match.getId()] = matchesResults[match.getId()]
        }
        mResults[matchId][(teamNumber-1)*3 + (setNumber-1)] = result
        setMatchesResults(mResults)
    }

    return (
        <>
            {
                loading
                ?
                <Row>
                    <Col xs={12} className="text-center mt-5">
                        <Spinner animation="border" role="status" variant="primary">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </Col>
                </Row>
                :
                (
                    <>
                        <h1>{matchday.getTitle()}</h1>
                        <p>{`Cancha: ${matchday.getPlace()}`}</p>
                        <p>{matchday.getDate()}</p>
                        {
                            matchday.getState() === EnumMatchdayState.OPEN
                            ?
                            <>
                                <h3>Jugadores</h3>
                                {
                                    matchday.getPlayers().map(player => {
                                        return (
                                            <h5 key={player.getId()}>{player.getName()}</h5>
                                        )
                                    })
                                }
                            </>
                            :
                            matchday.getMatches().map(match => {
                                return (
                                    <div key={match.getId()} >
                                        <h3>Partidos</h3>
                                        <MatchComponent match={match} setResult={setResult}/>
                                    </div>
                                )
                            })
                        }
                        {
                            matchday.getState() === EnumMatchdayState.OPEN
                            ?
                            <Button variant="danger" onClick={handleClickCloseInscriptions}>Cerrar Inscripciones</Button>
                            :
                            (
                                matchday.getState() === EnumMatchdayState.WAITING_FOR_RESULTS
                                ?
                                <Button onClick={handleClickLoadResults}>Cargar Resultados</Button>
                                :
                                <></>
                            )
                        }
                    </>
                )
            }
        </>
    )
}