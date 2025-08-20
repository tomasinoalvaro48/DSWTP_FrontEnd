import { MainNavbar } from './components/Navbar.tsx'
import { CRUDejemplo } from './screens/CRUDejemplo.tsx'

function App() {
  return (
    <>
      <main>
        <header>
          <MainNavbar></MainNavbar>
        </header>
        <section>
          <CRUDejemplo></CRUDejemplo>
        </section>
      </main>
    </>
  )
}

export default App
