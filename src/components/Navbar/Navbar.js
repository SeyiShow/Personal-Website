"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Navbar.module.css";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
            <div className={`container ${styles.navInner}`}>
                <a href="#" className={styles.logo}>
                    <Image src="/images/logo.png" alt="Seyi Sorinade" width={120} height={40} priority />
                </a>

                <div className={`${styles.navLinks} ${menuOpen ? styles.open : ""}`}>
                    <a href="#about" className={styles.navLink} onClick={() => setMenuOpen(false)}>About</a>
                    <a href="#portfolio" className={styles.navLink} onClick={() => setMenuOpen(false)}>Work</a>
                    <a href="#consultation" className={`btn btn-primary ${styles.navCta}`} onClick={() => setMenuOpen(false)}>
                        Get Started
                    </a>
                </div>

                <button
                    className={`${styles.hamburger} ${menuOpen ? styles.active : ""}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>
    );
}
