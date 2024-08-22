
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
import FavoritesPage from './Pages/FavoritesPage'
import SearchResultsPage from './Pages/SearchResultsPage'
import RankingPage from './Pages/RankingPage'
import Login from './Pages/SignIn/SignInPage'
import Register from './Pages/Register/Register'
import RouteSignIn from './LayoutLogin/LayoutLogin'
import RouteRegister from './LayoutRegister/LayoutRegister'
const queryClient = new QueryClient();
function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            {/*  */}
            <Route path='/Movie' element={<RouteSignIn />}>
              <Route path='login' element={<Login url={`login`} />} />
            </Route>
            {/*  */}
            <Route path='/register' element={<RouteRegister />}>
              <Route path='register' element={<Register url={`register`} />} />
            </Route>
            {/*  */}
            <Route path="/" element={<DefaultLayout />}>
              <Route index element={<HomePage />} />
              <Route path="popular" element={<PopularPage />} />
              <Route path="favourite" element={<FavoritesPage />} />
              <Route path=":id" element={<MoviesDetailPage />} />
              <Route path="now_playing" element={<NowPlayingPage />} />
              <Route path="search:id" element={<SearchResultsPage />} />
              <Route path="ranking" element={<RankingPage />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  )
}

export default App