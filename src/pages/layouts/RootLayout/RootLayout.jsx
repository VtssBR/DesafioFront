import { Link, Outlet } from "react-router-dom";
import styles from "./RootLayout.module.css";

export default function RootLayout() {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.navContainer}>
          <nav className={styles.nav}>
            <Link to="/">
              <button className={styles.navButton}>Início</button>
            </Link>
            <Link to="/create">
              <button className={styles.navButton}>Criar Cliente</button>
            </Link>
          </nav>
        </div>
      </header>

        <Outlet />

      {/* Footer */}
      <footer className={styles.footer}>
        <h4>Desenvolvido por Vitor Souza</h4>
        <h4>2025</h4>
      </footer>
    </div>
  );
}
