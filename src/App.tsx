import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import ProtectedRoute from './auth/ProtectedRoute.tsx'
import { RouterProvider } from 'react-router-dom'
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
import { ShowMisPedidos } from './components/PedidoResolucion/ShowMisPedidos.tsx'
import { AddInspeccion } from './components/PedidoResolucion/AddInspeccion.tsx'
import { TomarPedidosAgregacion } from './components/PedidoAgregacion/TomarPedidosAgregacion.tsx'
import { NavMapPage } from './navigation/NavMapPage.tsx'
import { FinalizarPedido } from './components/PedidoResolucion/CUUFinalizarPedido.tsx'
import { ChangePassword } from './components/Auth/ChangePassword.tsx'
import { ShowMisPedidosDenunciante } from './components/PedidoResolucion/ShowMisPedidosDen.tsx'
import { ShowMisPedidosResueltosDenunciante } from './components/PedidoResolucion/ShowMisPedidosResueltosDen.tsx'
import { UpdatePerfil } from './components/Auth/UpdatePerfil.tsx'
import PoliticasDeUso from './footer/PoliticasDeUso.tsx'
import { useAuth } from './auth/AuthContext.tsx'
import { DenuncianteHome } from './screens/denuncianteHome.tsx'
import { CazadorHome } from './screens/cazadorHome.tsx'

function App() {
  const { token, userRol } = useAuth() // <-- adentro de App()

  //Adentro de "<Route path="/" element={<RootLayout />}>":

  //{!token && <Route index element={<PublicHome />} />}

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        {token ? (
          userRol === 'operador' ? (
            <Route index element={<AdminHome />} />
          ) : userRol === 'cazador' ? (
            <Route index element={<CazadorHome />} />
          ) : userRol === 'denunciante' ? (
            <Route index element={<DenuncianteHome />} />
          ) : null
        ) : null}

        <Route path="login" element={<Login />} />
        <Route path="register-denunciante" element={<RegisterDenunciante />} />
        <Route path="register-usuario" element={<RegisterUsuario />} />
        <Route element={<PrivateRoute />}>
          <Route
            path="nav-map"
            element={
              <ProtectedRoute allowedRoles={['operador', 'denunciante', 'cazador']}>
                <NavMapPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="show-tipo-anomalia"
            element={
              <ProtectedRoute allowedRoles={['operador']}>
                <ShowTiposAnomalias />
              </ProtectedRoute>
            }
          />

          <Route
            path="finalizar-pedido/:id"
            element={
              <ProtectedRoute allowedRoles={['cazador']}>
                <FinalizarPedido />
              </ProtectedRoute>
            }
          />

          <Route
            path="update-tipo-anomalia/:id"
            element={
              <ProtectedRoute allowedRoles={['operador']}>
                <UpdateTiposAnomalias />
              </ProtectedRoute>
            }
          />
          <Route
            path="add-tipo-anomalia"
            element={
              <ProtectedRoute allowedRoles={['operador']}>
                <AddTiposAnomalias />
              </ProtectedRoute>
            }
          />

          <Route
            path="show-denunciante"
            element={
              <ProtectedRoute allowedRoles={['operador']}>
                <ShowDenunciantes />
              </ProtectedRoute>
            }
          />
          <Route
            path="add-denunciante"
            element={
              <ProtectedRoute allowedRoles={['operador']}>
                <AddDenunciantes />
              </ProtectedRoute>
            }
          />
          <Route
            path="update-denunciante/:id"
            element={
              <ProtectedRoute allowedRoles={['operador']}>
                <UpdateDenunciantes />
              </ProtectedRoute>
            }
          />

          <Route
            path="show-localidad"
            element={
              <ProtectedRoute allowedRoles={['operador']}>
                <ShowLocalidad />
              </ProtectedRoute>
            }
          />
          <Route
            path="add-localidad"
            element={
              <ProtectedRoute allowedRoles={['operador']}>
                <AddLocalidad />
              </ProtectedRoute>
            }
          />
          <Route
            path="update-localidad/:id"
            element={
              <ProtectedRoute allowedRoles={['operador']}>
                <UpdateLocalidad />
              </ProtectedRoute>
            }
          />

          <Route
            path="show-zona"
            element={
              <ProtectedRoute allowedRoles={['operador']}>
                <ShowZonas />
              </ProtectedRoute>
            }
          />
          <Route
            path="add-zona"
            element={
              <ProtectedRoute allowedRoles={['operador']}>
                <AddZona />
              </ProtectedRoute>
            }
          />
          <Route
            path="update-zona/:id"
            element={
              <ProtectedRoute allowedRoles={['operador']}>
                <UpdateZona />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="show-usuario"
            element={
              <ProtectedRoute allowedRoles={['operador']}>
                <ShowUsuario />
              </ProtectedRoute>
            }
          />
          <Route
            path="add-usuario"
            element={
              <ProtectedRoute allowedRoles={['operador']}>
                <AddUsuario />
              </ProtectedRoute>
            }
          />
          <Route
            path="update-usuario/:id"
            element={
              <ProtectedRoute allowedRoles={['operador']}>
                <UpdateUsuario />
              </ProtectedRoute>
            }
          />

          <Route
            path="show-pedido"
            element={
              <ProtectedRoute allowedRoles={['operador', 'denunciante']}>
                <ShowPedidosResolucion />
              </ProtectedRoute>
            }
          />

          <Route
            path="show-mis-pedidos-denunciante"
            element={
              <ProtectedRoute allowedRoles={['operador', 'denunciante']}>
                <ShowMisPedidosDenunciante />
              </ProtectedRoute>
            }
          />

          <Route
            path="show-mis-pedidos-resueltos-denunciante"
            element={
              <ProtectedRoute allowedRoles={['operador', 'denunciante']}>
                <ShowMisPedidosResueltosDenunciante />
              </ProtectedRoute>
            }
          />

          <Route
            path="/generar-pedido-paso-1"
            element={
              <ProtectedRoute allowedRoles={['operador', 'denunciante']}>
                <GenerarPedidoPaso1 />
              </ProtectedRoute>
            }
          />
          <Route
            path="/generar-pedido-paso-2"
            element={
              <ProtectedRoute allowedRoles={['operador', 'denunciante']}>
                <GenerarPedidoPaso2 />
              </ProtectedRoute>
            }
          />

          <Route
            path="/show-mis-pedidos"
            element={
              <ProtectedRoute allowedRoles={['cazador']}>
                <ShowMisPedidos />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-inspeccion/:id"
            element={
              <ProtectedRoute allowedRoles={['cazador']}>
                <AddInspeccion />
              </ProtectedRoute>
            }
          />

          <Route
            path="/mostrar-posibles-pedidos"
            element={
              <ProtectedRoute allowedRoles={['operador', 'cazador']}>
                <ShowPosiblesPedidos />
              </ProtectedRoute>
            }
          />

          <Route
            path="show-pedidos-agregacion"
            element={
              <ProtectedRoute allowedRoles={['operador', 'cazador']}>
                <ShowPedidosAgregacion />
              </ProtectedRoute>
            }
          />
          <Route
            path="/generar-pedido-agregacion-1"
            element={
              <ProtectedRoute allowedRoles={['operador', 'cazador']}>
                <GenerarPedidoAgregacion1 />
              </ProtectedRoute>
            }
          />
          <Route
            path="/generar-pedido-agregacion-2"
            element={
              <ProtectedRoute allowedRoles={['operador', 'cazador']}>
                <GenerarPedidoAgregacion2 />
              </ProtectedRoute>
            }
          />

          <Route
            path="/tomar-pedidos-agregacion"
            element={
              <ProtectedRoute allowedRoles={['operador']}>
                <TomarPedidosAgregacion />
              </ProtectedRoute>
            }
          />

          <Route
            path="/change-password"
            element={
              <ProtectedRoute allowedRoles={['operador', 'denunciante', 'cazador']}>
                <ChangePassword />
              </ProtectedRoute>
            }
          />

          <Route
            path="/update-profile"
            element={
              <ProtectedRoute allowedRoles={['denunciante', 'cazador', 'operador']}>
                <UpdatePerfil />
              </ProtectedRoute>
            }
          />

          <Route
            path="/politicas"
            element={
              <ProtectedRoute allowedRoles={['denunciante', 'cazador', 'operador']}>
                <PoliticasDeUso />
              </ProtectedRoute>
            }
          />
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
