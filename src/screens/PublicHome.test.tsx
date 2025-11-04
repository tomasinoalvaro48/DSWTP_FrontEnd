import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { PublicHome } from './publicHome'

describe('PublicHome component', () => {
  beforeEach(() => {
    window.scrollTo = vi.fn()
  })

  it('renderiza el título correctamente', () => {
    render(
      <MemoryRouter>
        <PublicHome />
      </MemoryRouter>
    )

    expect(
      screen.getByText('¡Bienvenido a Cazadores de Anomalías!')
    ).toBeInTheDocument()
  })

  it('muestra el mensaje de inicio de sesión', () => {
    render(
      <MemoryRouter>
        <PublicHome />
      </MemoryRouter>
    )

    expect(
      screen.getByText('Iniciá sesión para empezar a denunciar o resolver anomalías.')
    ).toBeInTheDocument()
  })

  it('tiene los links correctos', () => {
    render(
      <MemoryRouter>
        <PublicHome />
      </MemoryRouter>
    )

    expect(screen.getByRole('link', { name: 'Iniciar sesión' })).toHaveAttribute('href', '/login')
    expect(screen.getByRole('link', { name: 'Quiero registrarme y hacer una denuncia' })).toHaveAttribute('href', '/register-denunciante')
    expect(screen.getByRole('link', { name: 'Quiero ser cazador' })).toHaveAttribute('href', '/register-usuario')
  })

  it('llama a scrollTo al renderizar', () => {
    render(
      <MemoryRouter>
        <PublicHome />
      </MemoryRouter>
    )
    expect(window.scrollTo).toHaveBeenCalled()
  })
})