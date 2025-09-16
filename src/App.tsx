import './App.scss'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import Header from './components/Header/Header'
import './styles/global/_fonts.scss'
import { lazy, Suspense } from 'react'
import LoaderPage from './components/LoaderPage/LoaderPage'
function App() {
  const LazyHeroesPage = lazy(() => import('./pages/HeroesPage/HeroesPage'))
  const LazyTopPlayersPage = lazy(() => import('./pages/TopPlayersPage/TopPlayersPage'))
  const LazyPlayerPage = lazy(() => import('./pages/PlayerPage/PlayerPage'))
  const LazyMatchPage = lazy(() => import('./pages/MatchPage/MatchPage'))
  const LazyProPlayersPage = lazy(() => import('./pages/ProPlayersPage/ProPlayersPage'))
  const LazyTeamsPage = lazy(() => import('./pages/TeamsPage/TeamsPage'))
  const LazyTeamPage = lazy(() => import('./pages/TeamPage/TeamPage'))
  const LazyHeroPage = lazy(() => import('./pages/HeroPage/HeroPage'))

  return (
    <BrowserRouter>
      <Header />
      <main>
        <Suspense fallback={<LoaderPage />}>
          <Routes>
            <Route path='/' element={<Navigate to={'/heroes'} />} />
            <Route path='/proPlayers' element={<LazyProPlayersPage />} />
            <Route path='/topPlayers' element={<LazyTopPlayersPage />} />
            <Route path='/heroes' element={<LazyHeroesPage />} />
            <Route path='/heroes/:heroId' element={<LazyHeroPage />} />
            <Route path='/players/:playerId' element={<LazyPlayerPage />} />
            <Route path='/matches/:matchId' element={<LazyMatchPage />} />
            <Route path='/teams' element={<LazyTeamsPage />} />
            <Route path='/teams/:teamId' element={<LazyTeamPage />} />
          </Routes>
        </Suspense>
      </main>
    </BrowserRouter>
  )
}

export default App
