import { AdminHome } from './screens/adminHome.tsx'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router'
import { RootLayout } from './layout/RootLayout.tsx'
import { ShowTiposAnomalias } from './components/TipoAnomalia/ShowTiposAnomalias.tsx'
import { AddTiposAnomalias } from './components/TipoAnomalia/AddTiposAnomalias.tsx'
import { UpdateTiposAnomalias } from './components/TipoAnomalia/UpdateTiposAnomalias.tsx'
import { ShowDenunciantes } from './components/Denunciante/ShowDenunciantes.tsx'
import { AddDenunciantes } from './components/Denunciante/AddDenunciantes.tsx'
import { UpdateDenunciantes } from './components/Denunciante/UpdateDenunciantes.tsx'
import { ShowLocalidad } from './components/Localidad/ShowLocalidad.tsx'
import { AddLocalidad } from './components/Localidad/AddLocalidad.tsx'
import { UpdateLocalidad } from './components/Localidad/UpdateLocalidad.tsx'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<AdminHome />} />

        <Route path="show-tipo-anomalia" element={<ShowTiposAnomalias />} />
        <Route path="update-tipo-anomalia/:id" element={<UpdateTiposAnomalias />} />
        <Route path="add-tipo-anomalia" element={<AddTiposAnomalias />} />

        <Route path="show-denunciante" element={<ShowDenunciantes />} />
        <Route path="add-denunciante" element={<AddDenunciantes />} />
        <Route path="update-denunciante/:id" element={<UpdateDenunciantes />} />
        
        <Route path="show-localidad" element={<ShowLocalidad/>}/>
        <Route path="add-localidad" element={<AddLocalidad/>}/>
        <Route path='update-localidad/:id' element={<UpdateLocalidad/>}></Route>

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