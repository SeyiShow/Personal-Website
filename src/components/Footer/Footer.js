import Image from "next/image";
import { FaInstagram, FaLinkedin, FaBehance, FaDribbble } from "react-icons/fa";
import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.footerInner}`}>
                <div className={styles.left}>
                    <div className={styles.logoArea}>
                        <Image src="/images/white.png" alt="Seyi Sorinade" width={120} height={40} className={styles.logo} />
                    </div>
                    <h3 className={styles.tagline}>
                        Ready to give life<br />to your ideas?
                    </h3>
                    <a href="#consultation" className={`btn btn-primary ${styles.footerBtn}`}>
                        Book a Free Call
                    </a>
                </div>
                <div className={styles.right}>
                    <div className={styles.linksContainer}>
                        <div className={styles.linkGroup}>
                            <a href="#about" className={styles.link}>About</a>
                            <a href="#portfolio" className={styles.link}>Work</a>
                            <a href="#mission" className={styles.link}>Mission</a>
                            <a href="#consultation" className={styles.link}>Consultation</a>
                        </div>
                        <div className={styles.socials}>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                                <FaInstagram />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                                <FaLinkedin />
                            </a>
                            <a href="https://behance.net" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                                <FaBehance />
                            </a>
                            <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                                <FaDribbble />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`container ${styles.bottom}`}>
                <div className={styles.bottomInner}>
                    <p className={styles.copyright}>
                        © {new Date().getFullYear()} Seyi Sorinade. All rights reserved.
                    </p>
                    <p className={styles.developer}>
                        Developed by <a href="https://htcode.vercel.app/" target="_blank" rel="noopener noreferrer">Htcode</a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
