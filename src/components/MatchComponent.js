export default function MatchComponent({match, setResult}) {
    return (
        <div className="mb-5">
            <div style={{display: "flex"}}>
                <div style={{flexGrow: 1, borderStyle: "solid"}}>{`${match.getTeam1().getPlayer1().getName()} y ${match.getTeam1().getPlayer2().getName()}`}</div>
                {match.getTeam1Score()[0] === -1 ? <input type="text" style={{borderStyle: "solid", width: "30px"}} onChange={event => setResult(match.getId(), 1, 1, Number(event.target.value))}/> : <div style={{borderStyle: "solid", width: "30px"}}>{match.getTeam1Score()[0]}</div>}
                {match.getTeam1Score()[1] === -1 ? <input type="text" style={{borderStyle: "solid", width: "30px"}} onChange={event => setResult(match.getId(), 1, 2, Number(event.target.value))}/> : <div style={{borderStyle: "solid", width: "30px"}}>{match.getTeam1Score()[1]}</div>}
                {match.getTeam1Score()[2] === -1 ? <input type="text" style={{borderStyle: "solid", width: "30px"}} onChange={event => setResult(match.getId(), 1, 3, Number(event.target.value))}/> : <div style={{borderStyle: "solid", width: "30px"}}>{match.getTeam1Score()[2]}</div>}
            </div>
            <div style={{display: "flex"}}>
                <div style={{flexGrow: 1, borderStyle: "solid"}}>{`${match.getTeam2().getPlayer1().getName()} y ${match.getTeam2().getPlayer2().getName()}`}</div>
                {match.getTeam2Score()[0] === -1 ? <input type="text" style={{borderStyle: "solid", width: "30px"}} onChange={event => setResult(match.getId(), 2, 1, Number(event.target.value))}/> : <div style={{borderStyle: "solid", width: "30px"}}>{match.getTeam2Score()[0]}</div>}
                {match.getTeam2Score()[1] === -1 ? <input type="text" style={{borderStyle: "solid", width: "30px"}} onChange={event => setResult(match.getId(), 2, 2, Number(event.target.value))}/> : <div style={{borderStyle: "solid", width: "30px"}}>{match.getTeam2Score()[1]}</div>}
                {match.getTeam2Score()[2] === -1 ? <input type="text" style={{borderStyle: "solid", width: "30px"}} onChange={event => setResult(match.getId(), 2, 3, Number(event.target.value))}/> : <div style={{borderStyle: "solid", width: "30px"}}>{match.getTeam2Score()[2]}</div>}
            </div>
        </div>
    )
}
