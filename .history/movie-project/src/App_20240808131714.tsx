
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DefaultLayout from './Layout'
import HomePage from './Pages/HomePage'
import PopularPage from './Pages/PopularPage'
import MoviesDetailPage from './Pages/MoviesDetailPage'
import NowPlayingPage from './Pages/NowPlayingPage'
import NoPage from './Pages/NoPage'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/Project/" element={<DefaultLayout />}>
            <Route index element={<HomePage />} />
            <Route path="popular" element={<PopularPage />} />
            <Route path=":id" element={<MoviesDetailPage />} />
            <Route path="now_playing" element={<NowPlayingPage />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
