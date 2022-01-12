import { Table } from "react-bootstrap"

export default function PositionsPage() {
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
                    <tr>
                        <td>1</td>
                        <td>Darío Jomer</td>
                        <td>5</td>
                        <td>2</td>
                        <td>12</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Camila Isola</td>
                        <td>4</td>
                        <td>3</td>
                        <td>11</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Andrés González</td>
                        <td>2</td>
                        <td>5</td>
                        <td>9</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>Bernardo Huerta</td>
                        <td>1</td>
                        <td>6</td>
                        <td>8</td>
                    </tr>
                </tbody>
            </Table>
        </>
    )
}
