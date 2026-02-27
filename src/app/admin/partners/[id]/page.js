"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import styles from "../../admin.module.css";

export default function PartnerForm({ params }) {
    const { id } = use(params);
    const isNew = id === "new";
    const [formData, setFormData] = useState({
        name: "",
        logo: "",
        order: 0,
    });
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!isNew) {
            fetch(`/api/partners/${id}`)
                .then(res => res.json())
                .then(data => {
                    if (data && !data.error) setFormData(data);
                });
        }
    }, [id, isNew]);

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const uploadFormData = new FormData();
        uploadFormData.append("file", file);

        try {
            const res = await fetch("/api/admin/upload", {
                method: "POST",
                body: uploadFormData,
            });
            const data = await res.json();
            if (data.imageUrl) {
                setFormData(prev => ({ ...prev, logo: data.imageUrl }));
            } else {
                alert(data.error || "Upload failed");
            }
        } catch (err) {
            alert("Upload failed");
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const url = isNew ? "/api/partners" : `/api/partners/${id}`;
        const method = isNew ? "POST" : "PUT";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push("/admin");
                router.refresh();
            } else {
                const errorData = await res.json();
                alert(errorData.error || "Failed to save partner");
            }
        } catch (error) {
            alert("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: name === "order" ? parseInt(value) : value });
    };

    return (
        <div className={styles.dashboard}>
            <header className={styles.header}>
                <h1>{isNew ? "Add Partner" : "Edit Partner"}</h1>
                <button onClick={() => router.push("/admin")} className={styles.tabsBtn}>Back to Dashboard</button>
            </header>

            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label>Partner Name</label>
                    <input name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className={styles.formGroup}>
                    <label>Logo (SVG or Image)</label>
                    <input type="file" onChange={handleFileUpload} accept="image/*" className={styles.fileInput} />
                    {uploading && <p className={styles.uploadStatus}>Uploading logo...</p>}
                    {formData.logo && (
                        <div style={{ background: '#333', padding: '20px', display: 'inline-block', borderRadius: '4px', marginTop: '10px' }}>
                            <img src={formData.logo} alt="Preview" style={{ maxHeight: '60px' }} />
                        </div>
                    )}
                </div>
                <div className={styles.formGroup}>
                    <label>Order</label>
                    <input name="order" type="number" value={formData.order} onChange={handleChange} />
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button type="submit" className={styles.addBtn} disabled={loading || uploading}>
                        {loading ? "Saving..." : "Save Partner"}
                    </button>
                </div>
            </form>
        </div>
    );
}
