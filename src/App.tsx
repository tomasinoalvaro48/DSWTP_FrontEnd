import { MainNavbar } from './navigation/MainNavbar.tsx'
import { Home } from './screens/home.tsx'
import { ShowTiposAnomalias } from './components/showTiposAnomalias.tsx'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Routes,
} from 'react-router'

function App() {
  ;<>
    <main>
      <MainNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/show-tipo-anomalia" element={<ShowTiposAnomalias />} />
      </Routes>
    </main>
  </>
}

export default App
