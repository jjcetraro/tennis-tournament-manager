import { useParams } from "react-router"

export default function EditMatchdayPage() {
    const {id} = useParams()
    return (
        <h1>EditMatchday ({id})</h1>
    )
}