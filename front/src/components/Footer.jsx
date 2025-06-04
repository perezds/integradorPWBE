import React from "react";
import styles from "./Footer.module.css";
import { Github, Linkedin} from "lucide-react";

const Footer = () => {
  const year = React.useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <span className={styles.brand}>STRΛTA OVΞRSE &copy; {year}</span>
        <p className={styles.slogan}>Conectando sensores, transformando cidades.</p>
        <nav className={styles.social} aria-label="Redes sociais">
          <a
            href="https://github.com/perezds"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub"
            className={styles.iconLink}
          >
            <Github />
          </a>
          <a
            href="https://www.linkedin.com/in/mariaesperez"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="LinkedIn"
            className={styles.iconLink}
          >
            <Linkedin />
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;

