import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import PokemonList from './components/pokemons/PokemonList'
import Home from './components/home'
import PokemonView from './components/pokemons/PokemonView'
import Header from './components/header/Header'
import LocationList from './components/locations/LocationList'
import BerryList from './components/berries/BerryList';
import BerryView from './components/berries/BerryView';

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/pokemons' element={<PokemonList />} />
          <Route path='/pokemons/:id' element={<PokemonView />} />
          <Route path='/locations/' element={<LocationList />} />
          <Route path='/berries/' element={<BerryList />} />
          <Route path='/berries/:id' element={<BerryView />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
