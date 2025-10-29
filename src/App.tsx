import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { useAuth } from './auth/AuthContext.tsx'
import { RootLayout } from './layout/RootLayout.tsx'
import PrivateRoute from './components/PrivateRoute.tsx'
import ProtectedRoute from './auth/ProtectedRoute.tsx'
import PoliticasDeUso from './footer/PoliticasDeUso.tsx'
import { NavMapPage } from './navigation/NavMapPage.tsx'
import { PublicHome } from './screens/publicHome.tsx'
import { AdminHome } from './screens/adminHome.tsx'
import { CazadorHome } from './screens/cazadorHome.tsx'
import { DenuncianteHome } from './screens/denuncianteHome.tsx'
//---------------------------------------------------------------------------------------------------
import { Login } from './components/Auth/Login.tsx'
import { RegisterUsuario } from './components/Auth/RegisterUsuario.tsx'
import { RegisterDenunciante } from './components/Auth/RegisterDenunciante.tsx'
import { ModificarPerfil } from './components/Auth/ModificarPerfil.tsx'
import { ChangePassword } from './components/Auth/ChangePassword.tsx'
import { UpdatePerfil } from './components/Auth/UpdatePerfil.tsx'
import { DeleteAccount } from './components/Auth/DeleteAccount.tsx'
//---------------------------------------------------------------------------------------------------
import { AddTiposAnomalias } from './components/TipoAnomalia/AddTiposAnomalias.tsx'
import { UpdateTiposAnomalias } from './components/TipoAnomalia/UpdateTiposAnomalias.tsx'
import { ShowTiposAnomalias } from './components/TipoAnomalia/ShowTiposAnomalias.tsx'
//---------------------------------------------------------------------------------------------------
import { AddLocalidad } from './components/Localidad/AddLocalidad.tsx'
import { UpdateLocalidad } from './components/Localidad/UpdateLocalidad.tsx'
import { ShowLocalidad } from './components/Localidad/ShowLocalidad.tsx'
//---------------------------------------------------------------------------------------------------
import { AddZona } from './components/Zona/AddZona.tsx'
import { UpdateZona } from './components/Zona/UpdateZona.tsx'
import { ShowZonas } from './components/Zona/ShowZonas.tsx'
//---------------------------------------------------------------------------------------------------
import { ApproveUsuario } from './components/Usuario/ApproveUsuario.tsx'
import { ShowUsuario } from './components/Usuario/ShowUsuario.tsx'
//---------------------------------------------------------------------------------------------------
import { ShowDenunciantes } from './components/Denunciante/ShowDenunciantes.tsx'
//---------------------------------------------------------------------------------------------------
import { GenerarPedidoPaso1 } from './components/PedidoResolucion/CUUGenerarPedido1.tsx'
import { GenerarPedidoPaso2 } from './components/PedidoResolucion/CUUGenerarPedido2.tsx'
import { AddInspeccion } from './components/PedidoResolucion/AddInspeccion.tsx'
import { FinalizarPedido } from './components/PedidoResolucion/CUUFinalizarPedido.tsx'
import { ShowMisPedidosDenunciante } from './components/PedidoResolucion/ShowMisPedidosDenunciante.tsx'
import { ShowMisPedidosResueltosDenunciante } from './components/PedidoResolucion/ShowMisPedidosResueltosDenunciante.tsx'
import { ShowMisPedidos } from './components/PedidoResolucion/ShowMisPedidosCazador.tsx'
import { ShowPosiblesPedidos } from './components/PedidoResolucion/ShowPosiblesPedidosCazador.tsx'
import { ShowPedidosResolucion } from './components/PedidoResolucion/ShowPedidoResolucionOperador.tsx'
//---------------------------------------------------------------------------------------------------
import { GenerarPedidoAgregacion1 } from './components/PedidoAgregacion/GenerarPedidoAgregacion1.tsx'
import { GenerarPedidoAgregacion2 } from './components/PedidoAgregacion/GenerarPedidoAgregacion2.tsx'
import { TomarPedidosAgregacion } from './components/PedidoAgregacion/TomarPedidosAgregacion.tsx'
import { ShowPedidosAgregacion } from './components/PedidoAgregacion/ShowPedidosAgregacion.tsx'
import { ShowPedidosAgregacionOperador } from './components/PedidoAgregacion/ShowPedidosAgregacionOperador.tsx'


function App() {
  const { token, userRol } = useAuth()

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
        ) : (
          <Route index element={<PublicHome />} />
        )}

        <Route path="login" element={<Login />} />
        <Route path="register-usuario" element={<RegisterUsuario />} />
        <Route path="register-denunciante" element={<RegisterDenunciante />} />
        <Route path="politicas" element={<PoliticasDeUso />} />

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
            path="/modificar-perfil"
            element={
              <ProtectedRoute allowedRoles={['operador', 'denunciante', 'cazador']}>
                <ModificarPerfil />
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
            path="/delete-account"
            element={
              <ProtectedRoute allowedRoles={['denunciante', 'cazador']}>
                <DeleteAccount />
              </ProtectedRoute>
            }
          />


          {/*Tipo Anomalia*/}
          <Route
            path="add-tipo-anomalia"
            element={
              <ProtectedRoute allowedRoles={['operador']}>
                <AddTiposAnomalias />
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
            path="show-tipo-anomalia"
            element={
              <ProtectedRoute allowedRoles={['operador']}>
                <ShowTiposAnomalias />
              </ProtectedRoute>
            }
          />


          {/*Localidad*/}
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
            path="show-localidad"
            element={
              <ProtectedRoute allowedRoles={['operador']}>
                <ShowLocalidad />
              </ProtectedRoute>
            }
          />


          {/*Zona*/}
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
          />
          <Route
            path="show-zona"
            element={
              <ProtectedRoute allowedRoles={['operador']}>
                <ShowZonas />
              </ProtectedRoute>
            }
          />


          {/*Usuario*/}
          <Route
            path="approve-usuario"
            element={
              <ProtectedRoute allowedRoles={['operador']}>
                <ApproveUsuario />
              </ProtectedRoute>
            }
          />
          <Route
            path="show-usuario"
            element={
              <ProtectedRoute allowedRoles={['operador']}>
                <ShowUsuario />
              </ProtectedRoute>
            }
          />


          {/*Denunciante*/}
          <Route
            path="show-denunciante"
            element={
              <ProtectedRoute allowedRoles={['operador']}>
                <ShowDenunciantes />
              </ProtectedRoute>
            }
          />


          {/*Pedido de Resolución*/}
          <Route
            path="/generar-pedido-paso-1"
            element={
              <ProtectedRoute allowedRoles={['denunciante']}>
                <GenerarPedidoPaso1 />
              </ProtectedRoute>
            }
          />
          <Route
            path="/generar-pedido-paso-2"
            element={
              <ProtectedRoute allowedRoles={['denunciante']}>
                <GenerarPedidoPaso2 />
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
            path="finalizar-pedido/:id"
            element={
              <ProtectedRoute allowedRoles={['cazador']}>
                <FinalizarPedido />
              </ProtectedRoute>
            }
          />
          <Route
            path="show-mis-pedidos-denunciante"
            element={
              <ProtectedRoute allowedRoles={['denunciante']}>
                <ShowMisPedidosDenunciante />
              </ProtectedRoute>
            }
          />
          <Route
            path="show-mis-pedidos-resueltos-denunciante"
            element={
              <ProtectedRoute allowedRoles={['denunciante']}>
                <ShowMisPedidosResueltosDenunciante />
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
            path="/mostrar-posibles-pedidos"
            element={
              <ProtectedRoute allowedRoles={['cazador']}>
                <ShowPosiblesPedidos />
              </ProtectedRoute>
            }
          />
          <Route
            path="show-pedido"
            element={
              <ProtectedRoute allowedRoles={['operador']}>
                <ShowPedidosResolucion />
              </ProtectedRoute>
            }
          />
          

          {/*Pedido de Agregación*/}
          <Route
            path="/generar-pedido-agregacion-1"
            element={
              <ProtectedRoute allowedRoles={['cazador']}>
                <GenerarPedidoAgregacion1 />
              </ProtectedRoute>
            }
          />
          <Route
            path="/generar-pedido-agregacion-2"
            element={
              <ProtectedRoute allowedRoles={['cazador']}>
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
            path="show-pedidos-agregacion"
            element={
              <ProtectedRoute allowedRoles={['cazador']}>
                <ShowPedidosAgregacion />
              </ProtectedRoute>
            }
          />
          <Route
            path="show-pedidos-agregacion-operador"
            element={
              <ProtectedRoute allowedRoles={['operador']}>
                <ShowPedidosAgregacionOperador />
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