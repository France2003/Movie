
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DefaultLayout from './Layout'
import HomePage from './Pages/HomePage'
import PopularPage from './Pages/PopularPage'
import MoviesDetailPage from './Pages/MoviesDetailPage'
import NowPlayingPage from './Pages/NowPlayingPage'
import NoPage from './Pages/NoPage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient();
function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/Movie/" element={<DefaultLayout />}>
              <Route index element={<HomePage />} />
              <Route path="popular" element={<PopularPage />} />
              <Route path="favourite" element={<PopularPage />} />
              <Route path=":id" element={<MoviesDetailPage />} />
              <Route path="now_playing" element={<NowPlayingPage />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  )
}

export default App
