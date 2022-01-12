import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Row, Col, Button, Form } from 'react-bootstrap'

import playerDaoCreator from "../daos/playerDao"
import Player from '../entities/Player'

export default function PositionsPage() {

    // ---------------------------- hooks ----------------------------
    // ---------------------------------------------------------------

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        birthdate: '',
        gender: ''
    })

    // -------------------------- handlers  --------------------------
    // ---------------------------------------------------------------

    const handleInputChange = event => {
        let value = event.target.value
        if(event.target.name === 'gender'){
            value = event.target.dataset.gender
        }
        setFormData({
            ...formData,
            [event.target.name]: value
        })
    }

    const handleOnClickAgregar = async event => {
        if(!validFormData()){
            alert('La información ingresada no es válida')
            return
        }
        event.target.setAttribute('disabled', '');
        const playerDao = playerDaoCreator()
        await playerDao.addPlayer(
            new Player(
                null,
                formData.name,
                formData.gender === 'male', 
                formData.birthdate
            )
        )
        navigate('/players')
    }


    // ----------------------- other functions -----------------------
    // ---------------------------------------------------------------

    const validFormData = () => {
        if(formData.name.length < 2 || formData.name.length > 100) return false
        if(formData.birthdate === '') return false
        if(formData.gender !== 'male' && formData.gender !== 'female') return false
        return true
    }

    // --------------------------- return  ---------------------------
    // ---------------------------------------------------------------

    return (
        <>
            <Row>
                <Form>
                    <Form.Group controlId="formName">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" name="name" onChange={handleInputChange}/>
                    </Form.Group>
                    <Form.Group controlId="formBirthdate">
                        <Form.Label>Fecha de Nacimiento</Form.Label>
                        <Form.Control type="date" name="birthdate" onChange={handleInputChange}/>
                    </Form.Group>
                    <Form.Group onChange={handleInputChange}>
                        <Form.Check name="gender" label="Hombre" type="radio" data-gender="male" inline/>
                        <Form.Check name="gender" label="Mujer" type="radio" data-gender="female" inline/>
                    </Form.Group>
                </Form>
            </Row>
            <Row>
                <Col className="text-center">
                    <Button onClick={handleOnClickAgregar}>Agregar</Button>
                </Col>
            </Row>
        </>
    )
}