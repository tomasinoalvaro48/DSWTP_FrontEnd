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

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<AdminHome />} />
        <Route path="show-tipo-anomalia" element={<ShowTiposAnomalias />}>
          <Route
            path="edit-tipo-anomalia/:id"
            element={<AddTiposAnomalias />}
          />
          <Route
            path="delete-tipo-anomalia/:id"
            element={<AddTiposAnomalias />}
          />
        </Route>
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
