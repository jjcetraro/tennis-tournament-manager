import { useParams } from "react-router"
import MatchComponent from "../components/MatchComponent"

export default function MatchdayPage() {
    const {id} = useParams()

    return (
        <>
            <h1>Jornada {id}</h1>
            <p>Cancha: La Academia MG</p>
            <p>15 de marzo de 2021</p>
            <h3>Partidos</h3>
            <MatchComponent/>
        </>
    )
}