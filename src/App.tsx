import { MainNavbar } from './navigation/MainNavbar.tsx'
import { Home } from './screens/home.tsx'
import { CRUD } from './screens/CRUD.tsx'
import { Route, Routes } from 'react-router'

function App() {
  return (
    <>
      <main>
        <MainNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crud-tipo-anomalia" element={<CRUD />} />
        </Routes>
      </main>
    </>
  )
}

export default App
