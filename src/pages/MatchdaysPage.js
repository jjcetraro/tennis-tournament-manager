import { Button, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function MatchdaysPage() {
    const navigate = useNavigate();

    const handleClickMatchday = () => navigate("/matchday/3")
    const handleClickEditMatchday = () => navigate("/editMatchday/3")

    return (
        <>
            <h1>Jornadas</h1>
            <Button onClick={handleClickMatchday}>Jornada</Button>
            <Button onClick={handleClickEditMatchday}>Editar Jornada</Button>
            <Row>
                <Col xs={12} md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Jornada 4</Card.Title>
                            <Card.Text>Cancha: -</Card.Text>
                            <Card.Text>-</Card.Text>
                            <Card.Text>-</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Jornada 3</Card.Title>
                            <Card.Text>Cancha: La Academia MG</Card.Text>
                            <Card.Text>2 partidos</Card.Text>
                            <Card.Text>15 de marzo de 2021</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Jornada 2</Card.Title>
                            <Card.Text>Cancha: La Academia MG</Card.Text>
                            <Card.Text>2 partidos</Card.Text>
                            <Card.Text>8 de marzo de 2021</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Jornada 1</Card.Title>
                            <Card.Text>Cancha: La Academia MG</Card.Text>
                            <Card.Text>2 partidos</Card.Text>
                            <Card.Text>1 de marzo de 2021</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        
        
        </>
    )
}