import './App.css';
import { Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

import NotFoundPage from './pages/NotFoundPage'
import AddPlayerPage from './pages/AddPlayerPage'
import EditMatchdayPage from './pages/EditMatchdayPage'
import MatchdayPage from './pages/MatchdayPage'
import MatchdaysPage from './pages/MatchdaysPage'
import PlayersPage from './pages/PlayersPage'
import PositionsPage from './pages/PositionsPage'

import MyNavbar from './components/Navbar'

function App() {
  return (
    <Container>
      <BrowserRouter>
        <MyNavbar/>
        <Routes>
          <Route path='/addPlayer' element={<AddPlayerPage/>}/>
          <Route path='/editMatchday/:id' element={<EditMatchdayPage/>}/>
          <Route path='/' element={<Navigate to="/matchdays"/>}/>
          <Route path='/matchday/:id' element={<MatchdayPage/>}/>
          <Route path='/matchdays' element={<MatchdaysPage/>}/>
          <Route path='/players' element={<PlayersPage/>}/>
          <Route path='/positions' element={<PositionsPage/>}/>
          <Route path='*' element={<NotFoundPage/>}/>
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
