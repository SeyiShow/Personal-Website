"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./admin.module.css";

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("portfolio");
    const [portfolio, setPortfolio] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [portRes, testRes] = await Promise.all([
                fetch("/api/portfolio"),
                fetch("/api/testimonials"),
            ]);
            if (portRes.ok) setPortfolio(await portRes.json());
            if (testRes.ok) setTestimonials(await testRes.json());
        } catch (error) {
            console.error("Failed to fetch data", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        router.push("/admin/login");
        router.refresh();
    };

    const handleDelete = async (type, id) => {
        if (!confirm(`Are you sure you want to delete this ${type}?`)) return;

        try {
            const res = await fetch(`/api/${type}/${id}`, { method: "DELETE" });
            if (res.ok) {
                if (type === "portfolio") setPortfolio(portfolio.filter(p => p._id !== id));
                else setTestimonials(testimonials.filter(t => t._id !== id));
            }
        } catch (error) {
            alert("Delete failed");
        }
    };

    if (loading) return <div className={styles.loading}>Loading...</div>;

    return (
        <div className={styles.dashboard}>
            <header className={styles.header}>
                <h1>Admin Dashboard</h1>
                <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
            </header>

            <div className={styles.tabs}>
                <button
                    className={activeTab === "portfolio" ? styles.activeTab : ""}
                    onClick={() => setActiveTab("portfolio")}
                >
                    Portfolio
                </button>
                <button
                    className={activeTab === "testimonials" ? styles.activeTab : ""}
                    onClick={() => setActiveTab("testimonials")}
                >
                    Testimonials
                </button>
            </div>

            <div className={styles.content}>
                {activeTab === "portfolio" ? (
                    <section>
                        <div className={styles.sectionHeader}>
                            <h2>Portfolio Items</h2>
                            <button onClick={() => router.push("/admin/portfolio/new")} className={styles.addBtn}>Add Portfolio</button>
                        </div>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th className={styles.hideMobile}>Order</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {portfolio.map(item => (
                                    <tr key={item._id}>
                                        <td>
                                            <div className={styles.tableImg}>
                                                <img src={item.image} alt={item.title} />
                                            </div>
                                        </td>
                                        <td><strong>{item.title}</strong></td>
                                        <td>{item.category}</td>
                                        <td className={styles.hideMobile}>{item.order}</td>
                                        <td>
                                            <div className={styles.actions}>
                                                <button onClick={() => router.push(`/admin/portfolio/${item._id}`)} className={styles.editBtn}>Edit</button>
                                                <button onClick={() => handleDelete("portfolio", item._id)} className={styles.deleteBtn}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                ) : (
                    <section>
                        <div className={styles.sectionHeader}>
                            <h2>Testimonials</h2>
                            <button onClick={() => router.push("/admin/testimonials/new")} className={styles.addBtn}>Add Testimonial</button>
                        </div>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Avatar</th>
                                    <th>Name</th>
                                    <th>Role</th>
                                    <th className={styles.hideMobile}>Rating</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {testimonials.map(item => (
                                    <tr key={item._id}>
                                        <td>
                                            <div className={styles.tableImg}>
                                                <img src={item.avatar || "/images/testimonials/placeholder.png"} alt={item.name} />
                                            </div>
                                        </td>
                                        <td><strong>{item.name}</strong></td>
                                        <td>{item.role}</td>
                                        <td className={styles.hideMobile}>{item.rating} ⭐</td>
                                        <td>
                                            <div className={styles.actions}>
                                                <button onClick={() => router.push(`/admin/testimonials/${item._id}`)} className={styles.editBtn}>Edit</button>
                                                <button onClick={() => handleDelete("testimonials", item._id)} className={styles.deleteBtn}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                )}
            </div>
        </div>
    );
}
