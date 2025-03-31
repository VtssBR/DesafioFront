import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import styles from "./RootLayout.module.css";

export default function RootLayout() {
  const navigate = useNavigate();
  const location = useLocation(); 

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.navContainer}>
          <nav className={styles.nav}>
            <Link to="/">
              <button className={styles.btnLayout}>Início</button>
            </Link>
            {location.pathname !== "/" && (
              <button className={styles.btnLayout} onClick={() => navigate(-1)}>
              Voltar
            </button>
            )}
          </nav>
        </div>
      </header>

      <Outlet />

      <footer className={styles.footer}>
        <h4>Desenvolvido por Vitor Souza</h4>
        <h4>2025</h4>
      </footer>
    </div>
  );
}
