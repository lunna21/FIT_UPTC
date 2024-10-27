// components/Layout.jsx
export default function Layout({ children }) {
    const currentYear = new Date().getFullYear();
    return (
      <div>
        <header>
          <h1>Mi Aplicación</h1>
          {/* Aquí puedes agregar una barra de navegación */}
        </header>
        <main>{children}</main>
        <footer>
          <p>© {currentYear} Mi Aplicación</p>
        </footer>
      </div>
    );
  }
  