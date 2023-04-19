import { Roboto } from "@next/font/google";
import cn from "classnames";
import styles from "./Footer.module.css";

const font = Roboto({
  weight: "500",
  subsets: ["latin"],
});

export const Footer = () => {
  return (
    <footer className={cn(font.className, styles.footer)}>
      <section className={styles.container}>
        <p className={styles.logoText}>
          <img src={"images/logoDiscord.svg"} className={styles.logo} alt="logoDiscord" />
          <span><a href="https://discord.gg/3KFcCyNZjU" className={styles.link}>Discord</a>, </span>
          <img src={"images/logoGithubd.svg"} className={styles.logo} alt="logoGithub" />
          <span><a href="https://github.com/Lunastellia/AionClassicFR" className={styles.link}>Github</a> Par Lunastellia.      ---      </span>
          <span>Ai</span>
          <img src={"images/aion.svg"} className={styles.logo} alt="o" />
          <span>n </span>
          <span><a href="https://persepha.github.io/Aion-classic-stigma-calculator/" className={styles.link}>Version Original</a> (Anglais) by <a href="https://github.com/Persepha/Aion-classic-stigma-calculator" className={styles.link}>Persepha</a>.</span>
          <br />
        </p>
    </footer>
  );
};

