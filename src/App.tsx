import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { AdminHome } from './screens/adminHome.tsx'
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
import { ShowZonas } from './components/Zona/ShowZonas.tsx'
import { AddZona } from './components/Zona/AddZona.tsx'
import { UpdateZona } from './components/Zona/UpdateZona.tsx'
import { ShowUsuario } from './components/Usuario/ShowUsuario.tsx'
import { AddUsuario } from './components/Usuario/AddUsuario.tsx'
import { UpdateUsuario } from './components/Usuario/UpdateUsuario.tsx'
import { Login } from './components/Auth/Login.tsx'
import { RegisterDenunciante } from './components/Auth/RegisterDenunciante.tsx'
import PrivateRoute from './components/PrivateRoute.tsx'
import { ShowPedidosResolucion } from './components/PedidoResolucion/ShowPedidoResolucion.tsx'
import { GenerarPedidoPaso1 } from './components/PedidoResolucion/CUUGenerarPedido1.tsx'
import { GenerarPedidoPaso2 } from './components/PedidoResolucion/CUUGenerarPedido2.tsx'
import { ShowPosiblesPedidos } from './components/PedidoResolucion/ShowPosiblesPedidos.tsx'
import { RegisterUsuario } from './components/Auth/RegisterUsuario.tsx'
import { ShowPedidosAgregacion } from './components/PedidoAgregacion/ShowPedidosAgregacion.tsx'
import { GenerarPedidoAgregacion1 } from './components/PedidoAgregacion/GenerarPedidoAgregacion1.tsx'
import { GenerarPedidoAgregacion2 } from './components/PedidoAgregacion/GenerarPedidoAgregacion2.tsx'
import { TomarPedidosAgregacion } from './components/PedidoAgregacion/TomarPedidosAgregacion.tsx'

function App() {
  /* ------------ AGREGAR CUANDO ESTÉN LOS HOMES HECHOS  
  import { useAuth } from './auth/AuthContext.tsx'

  const { token, userRol } = useAuth() <-- adentro de App()
 
  Adentro de "<Route path="/" element={<RootLayout />}>":
  {token && userRol == 'operador' && <Route index element={<AdminHome />} />} 
  {token && userRol == 'cazador' && <Route index element={<CazadorHome />} />}
  {token && userRol == 'denunciante' && <Route index element={<DenuncianteHome />} />}
  {!token && <Route index element={<PublicHome />} />}
*/

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<AdminHome />} />
        <Route path="login" element={<Login />} />
        <Route path="register-denunciante" element={<RegisterDenunciante />} />
        <Route path="register-usuario" element={<RegisterUsuario />} />

        <Route element={<PrivateRoute />}>
          <Route path="show-tipo-anomalia" element={<ShowTiposAnomalias />} />
          <Route path="update-tipo-anomalia/:id" element={<UpdateTiposAnomalias />} />
          <Route path="add-tipo-anomalia" element={<AddTiposAnomalias />} />

          <Route path="show-denunciante" element={<ShowDenunciantes />} />
          <Route path="add-denunciante" element={<AddDenunciantes />} />
          <Route path="update-denunciante/:id" element={<UpdateDenunciantes />} />

          <Route path="show-localidad" element={<ShowLocalidad />} />
          <Route path="add-localidad" element={<AddLocalidad />} />
          <Route path="update-localidad/:id" element={<UpdateLocalidad />}></Route>

          <Route path="show-zona" element={<ShowZonas />} />
          <Route path="add-zona" element={<AddZona />} />
          <Route path="update-zona/:id" element={<UpdateZona />}></Route>

          <Route path="show-usuario" element={<ShowUsuario />} />
          <Route path="add-usuario" element={<AddUsuario />} />
          <Route path="update-usuario/:id" element={<UpdateUsuario />} />

          <Route path="show-pedido" element={<ShowPedidosResolucion />} />
          <Route path="/generar-pedido-paso-1" element={<GenerarPedidoPaso1 />} />
          <Route path="/generar-pedido-paso-2" element={<GenerarPedidoPaso2 />} />

          <Route path="/mostrar-posibles-pedidos" element={<ShowPosiblesPedidos />} />

          <Route path="show-pedidos-agregacion" element={<ShowPedidosAgregacion />} />
          <Route path="/generar-pedido-agregacion-1" element={<GenerarPedidoAgregacion1 />} />
          <Route path="/generar-pedido-agregacion-2" element={<GenerarPedidoAgregacion2 />} />

          <Route path="/tomar-pedidos-agregacion" element={<TomarPedidosAgregacion />} />
        </Route>
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
