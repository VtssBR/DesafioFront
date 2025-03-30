import { Link, Outlet, useNavigate  } from "react-router-dom";
import styles from "./RootLayout.module.css";


export default function RootLayout() {
  const navigate = useNavigate(); 
  
  const handleHome = () =>{
    navigate("/")
    window.location.reload();
  }

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.navContainer}>
          <nav className={styles.nav}>
              <button className={styles.navButton} onClick={handleHome}>Início</button>
            <Link to="/create">
              <button className={styles.navButton}>Criar Cliente</button>
            </Link>
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
