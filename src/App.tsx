import { AdminHome } from './screens/adminHome.tsx'
import { ShowTiposAnomalias } from './components/TipoAnomalia/ShowTiposAnomalias.tsx'
import { AddTiposAnomalias } from './components/TipoAnomalia/AddTiposAnomalias.tsx'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router'
import { RootLayout } from './layout/RootLayout.tsx'
import { UpdateTiposAnomalias } from './components/TipoAnomalia/UpdateTiposAnomalias.tsx'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<AdminHome />} />
        <Route path="show-tipo-anomalia" element={<ShowTiposAnomalias />} />
        <Route
          path="update-tipo-anomalia/:id"
          element={<UpdateTiposAnomalias />}
        />
        <Route path="add-tipo-anomalia" element={<AddTiposAnomalias />} />
      </Route>
    )
  )
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
