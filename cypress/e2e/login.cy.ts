describe('Página de Login', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('muestra el formulario correctamente', () => {
    cy.contains('Iniciar Sesión')
    cy.get('input#email').should('exist')
    cy.get('input#password').should('exist')
    cy.get('button[type="submit"]').should('contain', 'Ingresar')
  })

  it('muestra mensaje si intento enviar campos vacíos', () => {
    cy.get('button[type="submit"]').click()
    cy.contains('Debe completar todos los campos')
  })

  it('permite escribir en los campos', () => {
    cy.get('input#email').type('usuario@example.com')
    cy.get('input#password').type('secreto123')
    cy.get('input#email').should('have.value', 'usuario@example.com')
  })

  it('muestra mensaje de error si las credenciales son incorrectas', () => {
    cy.get('input#email').type('inexistente@example.com')
    cy.get('input#password').type('contraseña-incorrecta')
    cy.get('button[type="submit"]').click()

    cy.contains('Credenciales inválidas').should('exist')
  })
})
