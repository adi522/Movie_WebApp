import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Trending from './components/Trending'
import Popular from './components/Popular'
import Movie from './components/Movie'
import TvShows from './components/TvShows'
import People from './components/People'
import About from './components/About'
import ContactUs from './components/ContactUs'
import Loading from './components/Loading'
import MovieDetails from './components/MovieDetails'
import TvDetails from './components/TvDetails'
import PeopleDetails from './components/PeopleDetails'

function App() {

  return (
    <div className='w-screen h-screen bg-[#050304] flex '>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/movie/details/:id" element={<MovieDetails />} />
        <Route path="/tv_shows" element={<TvShows />} />
        <Route path="/tv/details/:id" element={<TvDetails />} />
        <Route path="/people" element={<People />} />
        <Route path="/people/details/:id" element={<PeopleDetails />} />
        <Route path="/person/details/:id" element={<PeopleDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact_us" element={<ContactUs />} />
        <Route path="/Loading" element={<Loading />} />
      </Routes>
    </div>
  )
}

export default App
